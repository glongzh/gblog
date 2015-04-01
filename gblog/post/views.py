from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from .serializers import PostSerializer
from .models import Post
from .permissions import IsAuthorOfPost

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
	parser_classes = (FormParser, MultiPartParser,)
	serializer_class = PostSerializer
	queryset = Post.objects.all()

	def get_permissions(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)
		return (permissions.IsAuthenticated(), IsAuthorOfPost(),)
	
	def perform_create(self, serializer):
		if 'file' in self.request.data:
			serializer.save(author=self.request.user, cover_image=self.request.data['file'])
		else:
			serializer.save(author=self.request.user)

		return super(PostViewSet, self).perform_create(serializer)
