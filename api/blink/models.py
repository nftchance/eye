import datetime
import django
import requests

from django.db import models

class Blink(models.Model):
    PENDING, FAILED, SUCCESS, ERROR = 'P', 'F', 'S', 'E'

    STATUSES = (
        (PENDING, 'Pending'),
        (FAILED, 'Failed'),    
        (SUCCESS, 'Success'),
        (ERROR, 'Error'),
    )

    frequency = models.IntegerField(default=60) # seconds between status checks

    url = models.URLField()

    status = models.CharField(max_length=1, choices=STATUSES, default=PENDING)

    scheduled = models.DateTimeField(null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url

    def blink(self):
        now = django.utils.timezone.now()

        # Check the status of the blink
        try:
            response = requests.get(self.url)
            if response.status_code == 200:
                self.status = self.SUCCESS
            else:
                self.status = self.FAILED
        except:
            self.status = self.ERROR

        # Set the scheduled time to now + frequency
        self.scheduled = now + datetime.timedelta(seconds=self.frequency)

        # Save the changes
        self.save()