from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
  path('todo/', views.TodoListView.as_view(), name='todo-list'),
  path('todo/<int:pk>', views.TodoDetailView.as_view(), name='todo-detail')
]
