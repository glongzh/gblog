from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework_nested import routers
from myauth.views import AccountViewSet, ProfileViewSet, LoginView, LogoutView
from post.views import PostViewSet
from gblog.views import IndexView
from gblog import settings

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'posts', PostViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gblog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', IndexView.as_view(), name='index'),
) 

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
