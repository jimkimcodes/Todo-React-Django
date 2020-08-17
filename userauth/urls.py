from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView

app_name = 'userauth'

urlpatterns = [
  path('signup/', views.signup, name='signup'),
  path('about/', views.signup, name='about'),
  re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.account_activate, name='account_activate'),
  path('activation-email-sent/', TemplateView.as_view(template_name='userauth/account_activation_sent.html'), name='account_activation_sent'),
]
