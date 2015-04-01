#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Glong

from .models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save)
def account_post_save(sender, instance, created):
	if not instance.profile:
		instance.profile = Profile()
		instance.save()