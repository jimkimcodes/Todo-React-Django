from rest_framework import generics, viewsets
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

class SuperUserTestMixin(UserPassesTestMixin):
  def test_func(self):
    return self.request.user.is_authenticated and self.request.user.is_superuser
        
class TodoListView(SuperUserTestMixin, generics.ListCreateAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer

class TodoDetailView(SuperUserTestMixin, generics.RetrieveUpdateDestroyAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer

class UserTodoListView(LoginRequiredMixin, generics.ListCreateAPIView):
  serializer_class = TodoSerializer

  def get_queryset(self):
    return Todo.objects.filter(user=self.request.user)

class UserTodoDetailView(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
  serializer_class = TodoSerializer

  def get_queryset(self):
    return Todo.objects.filter(user=self.request.user)