from django.db import models
from taggit.managers import TaggableManager
from myauth.models import Account

# Create your models here.

class Post(models.Model):
	title = models.CharField(max_length=200, default=None)
	author = models.ForeignKey(Account)
	content = models.TextField()
	slug = models.CharField(max_length=250, blank=True)
	tags = TaggableManager(blank=True)
	cover_image = models.ImageField(upload_to='covers', default='covers/nocover-default.png')

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def get_tags_display(self):
		return self.tags.values_list('name', flat=True)

	def __unicode__(self):
			return self.title

	class Meta:
		ordering = ['-created_at']