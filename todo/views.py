from rest_framework import generics, viewsets

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
class TodoListView(generics.ListCreateAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer