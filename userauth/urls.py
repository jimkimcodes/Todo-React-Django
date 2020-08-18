from django.urls import path, re_path, reverse_lazy, reverse
from django.views.generic import TemplateView
from django.contrib.auth import views as AuthViews
from django.contrib.auth.decorators import login_required

from . import views

app_name = 'userauth'

urlpatterns = [
  path('login/', views.LoginView.as_view(), name='login'),
  path('logout/', views.LogoutView.as_view(next_page=reverse_lazy('userauth:signup')), name='logout'),

  path('signup/', views.signup, name='signup'),
  path('about/',  TemplateView.as_view(template_name='userauth/about.html'), name='about'),

  re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.account_activate, name='account_activate'),
  path('activation-email-sent/', TemplateView.as_view(template_name='userauth/account_activation_sent.html'), name='account_activation_sent'),

  path('password_change/', login_required(views.PasswordChangeView.as_view()), name='password_change'),

  path('password_reset/', views.PasswordResetView.as_view(), name='password_reset'),
  path('password_reset/done/', AuthViews.PasswordResetDoneView.as_view(template_name='userauth/password_reset/password_reset_done.html'), name='password_reset_done'),
  path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

  path('delete-account/', login_required(views.delete_user), name='delete_user'),
]
