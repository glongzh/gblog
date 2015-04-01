import os
from rest_framework import serializers
from .models import Account, Profile
from django.contrib.auth import update_session_auth_hash
from gblog import settings

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('title', 'company', 'location', 
				'status_text', 'website', 'github', 'twitter',
				'instagram', 'weibo', 'douban')


class AccountSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True, required=False)
	confirm_password = serializers.CharField(write_only=True, required=False)
	avatar = serializers.SerializerMethodField('get_avatar_url')
	profile = ProfileSerializer(required=False)

	class Meta:
		model = Account
		fields = ('id', 'email', 'username', 'realname', 'avatar',
				'password', 'confirm_password', 'created_at', 'updated_at', 'profile')
		read_only_fields = ('created_at', 'updated_at')

	def validate(self, data):
		if self.context.get('request').method == 'POST' and not data['password'] == data['confirm_password']:
			raise serializers.ValidationError("password and confirm_password do not match")
		return data

	# def create(self, validated_data):
	# 	instance = Account.objects.create(**validated_data)
	# 	p = Profile(account=instance)
	# 	p.save()
	# 	print 'aaaaaaaaaaaaaaaa'
	# 	print p
	# 	return instance

	def update(self, instance, validated_data):
		import pdb
		pdb.set_trace()
		instance.username = validated_data.get('username', instance.username)
		instance.realname = validated_data.get('realname', instance.realname)
		if not hasattr(instance, 'profile'):
			instance.profile = Profile(account=instance)
		# res = Profile.objects.filter(pk=instance.profile.id).update(**validated_data.get('profile'))
		instance.profile.title = validated_data.get('profile').get('title', instance.profile.title)
		instance.profile.company = validated_data.get('profile').get('company', instance.profile.company)
		instance.profile.location = validated_data.get('profile').get('location', instance.profile.location)
		instance.profile.github = validated_data.get('profile').get('github', instance.profile.github)
		instance.profile.twitter = validated_data.get('profile').get('twitter', instance.profile.twitter)
		instance.profile.instagram = validated_data.get('profile').get('instagram', instance.profile.instagram)
		instance.profile.weibo = validated_data.get('profile').get('weibo', instance.profile.weibo)
		instance.profile.douban = validated_data.get('profile').get('douban', instance.profile.douban)
		instance.profile.website = validated_data.get('profile').get('website', instance.profile.website)
		instance.profile.status_text = validated_data.get('profile').get('status_text', instance.profile.status_text)
		instance.profile.save()
		instance.save()

		password = validated_data.get('password', None)
		confirm_password = validated_data.get('confirm_password', None)

		if password and password==confirm_password:
			instance.set_password(password)
			instance.save()

			update_session_auth_hash(self.context.get('request'), instance)

		return instance

	def get_avatar_url(self, account):
		return os.path.join(settings.MEDIA_URL, account.avatar.url)


