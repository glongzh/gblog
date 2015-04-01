from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class AccountManager(BaseUserManager):
	def create_user(self, email, username, password=None, **kwargs):
		if not email:
			raise ValueError('Users must have an email')
		if not username:
			raise ValueError('Users must have an username')

		account = self.model(
			email=self.normalize_email(email),
			username=username
		)

		account.set_password(password)
		account.save()
		return account

	def create_superuser(self, email, username, password, **kwargs):
		account = self.create_user(email, username, password, **kwargs)

		account.is_admin = True
		account.save()
		return account

class Account(AbstractBaseUser):
	email = models.EmailField(unique=True)
	username = models.CharField(max_length=50, unique=True)
	realname = models.CharField(max_length=50, blank=True)
	
	avatar = models.ImageField(upload_to='avatars', default='avatars/noavatar-default.png')

	is_admin = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at =models.DateTimeField(auto_now=True)

	objects = AccountManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	def __unicode__(self):
		return self.email


class Profile(models.Model):
	account = models.OneToOneField(Account)
	title = models.CharField(max_length=100, blank=True)
	company = models.CharField(max_length=100, blank=True)
	location = models.CharField(max_length=60, blank=True)
	status_text = models.CharField(max_length=200, blank=True)

	website = models.URLField(blank=True)
	github = models.URLField(blank=True)
	twitter = models.URLField(blank=True)
	instagram = models.URLField(blank=True)
	weibo = models.URLField(blank=True)
	douban = models.URLField(blank=True)

	def __unicode__(self):
		return self.account.email;
