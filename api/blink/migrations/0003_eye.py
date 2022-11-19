# Generated by Django 4.1.1 on 2022-11-19 02:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("blink", "0002_blink_scheduled"),
    ]

    operations = [
        migrations.CreateModel(
            name="Eye",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, null=True)),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("updated", models.DateTimeField(auto_now=True)),
                ("blinks", models.ManyToManyField(to="blink.blink")),
            ],
        ),
    ]