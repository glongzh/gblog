#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Glong

from rest_framework import permissions
class IsAuthorOfPost(permissions.BasePermission):
	def has_object_permission(self, request, view, post):
		if request.user:
			if request.user == post.author:
				return True
		return False
		