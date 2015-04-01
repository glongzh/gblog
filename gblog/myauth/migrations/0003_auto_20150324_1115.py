# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0002_account_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100, blank=True)),
                ('company', models.CharField(max_length=100, blank=True)),
                ('location', models.CharField(max_length=60, blank=True)),
                ('status_text', models.CharField(max_length=200, blank=True)),
                ('website', models.URLField(blank=True)),
                ('github', models.URLField(blank=True)),
                ('twitter', models.URLField(blank=True)),
                ('instagram', models.URLField(blank=True)),
                ('weibo', models.URLField(blank=True)),
                ('douban', models.URLField(blank=True)),
                ('account', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='account',
            name='status_text',
        ),
    ]
