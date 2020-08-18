from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
  path('super/todo/', views.TodoListView.as_view(), name='todo-list'),
  path('super/todo/<int:pk>', views.TodoDetailView.as_view(), name='todo-detail'),
  path('todo/', views.UserTodoListView.as_view(), name='todo-list'),
  path('todo/<int:pk>', views.UserTodoDetailView.as_view(), name='todo-detail'),
]
