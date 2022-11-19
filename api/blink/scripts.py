import django
import json

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from .models import Blink, Eye
from .serializers import BlinkSerializer
from .utils import DateTimeEncoder

scheduler = BackgroundScheduler()

@util.close_old_connections
def schedule_blinks():
    # Get all blinks that are pending
    blinks = Blink.objects.filter(status=Blink.PENDING)

    # Set the scheduled time to now with UTC
    now = django.utils.timezone.now()
    blinks.update(scheduled=now)

    # Save the changes
    for blink in blinks:
        blink.save()

@util.close_old_connections
def trigger_blinks():
    now = django.utils.timezone.now()

    # Get all the blinks that have a time less than down and add a job to the scheduler
    blinks = Blink.objects.filter(scheduled__lte=now)

    # Add a single run job to the scheduler
    for blink in blinks:
        scheduler.add_job(
            check_blink,
            'date',
            run_date=now,
            args=[blink.id],
            id=str(blink.id)
        )

@util.close_old_connections
def check_blink(blink_id):
    blink = Blink.objects.get(id=blink_id)
    blink.blink()

    channel_layer = get_channel_layer()

    eye = Eye.objects.filter(blinks__in=[blink]).first()
    serializer = BlinkSerializer([blink], many=True)

    async_to_sync(channel_layer.group_send)(
        'organization_%s' % eye.id,
        {
            'type': 'get_blink',
            'payload': json.dumps(
                serializer.data,
                cls=DateTimeEncoder
            )
        }
    )

@util.close_old_connections
def delete_old_job_executions(max_age=60 * 60):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

class JobManager:
    def ready(self, *args, **options):
        scheduler.add_jobstore(DjangoJobStore(), "default")

        # Clean up the dead jobs at the end of every hour
        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(hour="*", minute="*/59"),
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        print("Added: `delete_old_job_executions`")

        # Schedule the blinks
        scheduler.add_job(
            schedule_blinks,
            trigger=CronTrigger(second="*/30"),
            id="schedule_blinks",
            max_instances=1,
            replace_existing=True
        )

        # Trigger the blinks
        scheduler.add_job(
            trigger_blinks,
            trigger=CronTrigger(second="*/1"),
            id="trigger_blinks",
            max_instances=1,
            replace_existing=True
        )

        try:
            print("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")