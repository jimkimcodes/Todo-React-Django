import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TodosContext = React.createContext()

const getCookie = (name) => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

class TodosProvider extends Component {
  state = {
    user: null,
    todos: null,
    originalTodos: null,
    modalOpen: false,
    modalTodo: null,
    showAll: true,
    showPending: false,
    showCompleted: false,
  }

  SERVER_URL = window.location.origin;

  setUser = () => {
    let element = document.getElementById('user_id');
    this.setState({ user: element.innerText });
  }

  setTodosState = async () => {
    const response = await axios.get(`${this.SERVER_URL}/api/todo/`);
    this.setState({
      originalTodos: response.data,
      todos: response.data,
    });

  }

  checkMessagesToast = () => {
    let parent = document.getElementById('messages');
    if(parent) {
      let children = parent.querySelectorAll('span');
      children.forEach(item => {
        if(item.classList.contains('success')) {
          toast.success(item.innerText);
        } else if(item.classList.contains('error')) {
          toast.error(item.innerText);
        }
      })
    }
  }

  componentDidMount() {
    console.log(this.SERVER_URL);
    this.setUser();
    this.setTodosState();
    toast("Bonjour!💖", { className: 'text-primary' });
    this.checkMessagesToast();
  }

  showAllHandler = () => {
    this.setState({
      todos: this.state.originalTodos,
      showAll: true,
      showPending: false,
      showCompleted: false,
    })
  }

  showPendingHandler = () => {
    this.setState({
      todos: this.state.originalTodos ? this.state.originalTodos.filter(item=> item.completed === false) : null,
      showAll: false,
      showPending: true,
      showCompleted: false,
    })
  }

  showCompletedHandler = () => {
    this.setState({
      todos: this.state.originalTodos ? this.state.originalTodos.filter(item=> item.completed === true) : null,
      showAll: false,
      showPending: false,
      showCompleted: true,
    })
  }

  showTodosForMode = () => {
    if(this.state.showAll){
      this.showAllHandler();
    }else if(this.state.showCompleted){
      this.showCompletedHandler();
    }else if(this.state.showPending){
      this.showPendingHandler();
    }
  }

  completedHandler = async (id) => {
    let tempTodos = [...this.state.todos]
    let currTodo = tempTodos.find(item => item.id === id)

    const csrftoken = getCookie('csrftoken');
    let response = await axios.patch(`${this.SERVER_URL}/api/todo/${id}`, 
      { completed: !currTodo.completed }, 
      { headers: {"X-CSRFToken": csrftoken },}
    );
    console.log(response);

    await this.setTodosState();
    let todoCompleted = response.data.completed? '✅ Completed:' : '❌ Incomplete:';
    let toastMessage = `${todoCompleted} ${response.data.title}`;
    if(response.status == 200){
      toast.info(`${toastMessage}`);
    } else {
      toast.error('Could not update todo');
    }
    this.showTodosForMode();
  }

  addHandler = async (todo) => {
    const csrftoken = getCookie('csrftoken');
    const userTodo = {
      ...todo,
      user: this.state.user,
    }
    let response = await axios.post(`${this.SERVER_URL}/api/todo/`, userTodo,
      { headers: {"X-CSRFToken": csrftoken },}
    );
    console.log(response);
    await this.setTodosState();
    if(response.status == 201) {
      toast.success(`Added ${response.data.title}`);
    } else {
      toast.error('Could not add todo');
    }
    this.showTodosForMode();
  }

  editHandler = async (id, todo) => {
    const csrftoken = getCookie('csrftoken');
    let response = await axios.patch(`${this.SERVER_URL}/api/todo/${id}`, todo,
      { headers: {"X-CSRFToken": csrftoken },}
    );
    console.log(response);
    await this.setTodosState();
    if(response.status = 200){
      toast.info(`Updated ${response.data.title}`);
    } else {
      toast.error('Could not update todo');
    }
    this.showTodosForMode();
  }


  deleteHandler = async (id) => {
    let deletingTodo = this.state.todos.find(item => item.id === id);
    if(confirm('Are you sure you want to delete todo:"'+deletingTodo.title+'"?')) {
      const csrftoken = getCookie('csrftoken');
      let response = await axios.delete(`${this.SERVER_URL}/api/todo/${id}`,{
        headers: {"X-CSRFToken": csrftoken },
      });
      await this.setTodosState();
      toast.error(`Deleted: ${deletingTodo.title}`);

      if(this.state.showAll){
        this.showAllHandler();
      }else if(this.state.showCompleted){
        this.showCompletedHandler();
      }else if(this.state.showPending){
        this.showPendingHandler();
      }
    }
  }

  render() {
    return (
      <TodosContext.Provider value = {{
        ...this.state,
        showAllHandler:       this.showAllHandler,
        showPendingHandler:   this.showPendingHandler,
        showCompletedHandler: this.showCompletedHandler,
        deleteHandler:        this.deleteHandler,
        completedHandler:     this.completedHandler,
        addHandler:           this.addHandler,
        editHandler:          this.editHandler,
      }} >
      {this.props.children}
      </TodosContext.Provider>
      
    );
  }
}

const TodosConsumer = TodosContext.Consumer;

export {TodosContext, TodosProvider, TodosConsumer};