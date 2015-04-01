#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: Glong

import os
from gblog import settings
from rest_framework import serializers
from .models import Post
from myauth.serializers import AccountSerializer

class TagsSerializer(serializers.ListField):
	def to_representation(self, obj):
		if type(obj) is not list:
			return [tag.name for tag in obj.all()]
		return obj

class PostSerializer(serializers.ModelSerializer):
	author = AccountSerializer(read_only=True, required=False)
	tags = TagsSerializer(read_only=True, required=False)
	cover_image = serializers.SerializerMethodField('get_cover_url')
	# slug = serializers.SerializerMethodField('get_slug')

	class Meta:
		model = Post
		fields = ('id', 'title', 'author', 'content', 'slug', 'tags', 'cover_image', 'created_at', 'updated_at')
		read_only_fields = ('id', 'created_at', 'updated_at')
	
	def get_validation_exclusions(self):
		exclusions = super(PostSerializer, self).get_validation_exclusions()

		return exclusions + ['author']

	def get_cover_url(self, post):
		return os.path.join(settings.MEDIA_URL, post.cover_image.url)
	
	# def get_slug(self, post):
	# 	pass

	def create(self, validated_data):
		instance = super(PostSerializer, self).create(validated_data)
		print instance
		req = self.context.get('request')
		if 'tags' in req.data:
			[instance.tags.add(tag.strip()) for tag in req.data['tags'].split(',')]

		return instance

	def update(self, instance, validated_data):
		instance = super(PostSerializer, self).update(instance, validated_data)

		req = self.context.get('request')

		if 'tags' in req.data:
			instance.tags.clear()
			[instance.tags.add(tag.strip()) for tag in req.data['tags'].split(',')]

		return instance
