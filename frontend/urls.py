from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

app_name = 'frontend'

urlpatterns = [
    re_path(r'.*$', login_required(TemplateView.as_view(template_name='frontend/index.html')), name='index'),
]