import React, { Component } from 'react'
import axios from 'axios'

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
  console.log(decodeURIComponent(xsrfCookies[0].split('=')[1]));
  
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

class TodosProvider extends Component {
  state = {
    todos :null, 
    modalOpen: false,
    modalTodo: null,
    showAll: true,
    showPending: false,
    showCompleted: false,
  }

  fetchedData = null;

  componentDidMount() {
    axios.get('http://localhost:8000/api/todo/')
        .then(response=>{
          console.log(response)
          this.fetchedData = response.data
          this.setState({todos:response.data})
        })
  }

  showAllHandler = () => {

    this.setState({
      todos: this.fetchedData,
      showAll: true,
      showPending: false,
      showCompleted: false,
    })
  }

  showPendingHandler = () => {
    this.setState({
      todos: this.fetchedData ? this.fetchedData.filter(item=> item.completed === false) : null,
      showAll: false,
      showPending: true,
      showCompleted: false,
    })
  }

  showCompletedHandler = () => {
    this.setState({
      todos: this.fetchedData ? this.fetchedData.filter(item=> item.completed === true) : null,
      showAll: false,
      showPending: false,
      showCompleted: true,
    })
  }

  completedHandler = async (id) => {
    let tempTodos = [...this.state.todos]
    let currTodo = tempTodos.find(item => item.id === id)

    const csrftoken = getCookie('csrftoken');
    let response = await axios.patch('http://localhost:8000/api/todo/'+id, {"completed":!currTodo.completed}, {headers: {"X-CSRFToken": csrftoken },});
    console.log(response)
    response = await axios.get('http://localhost:8000/api/todo/');
    this.fetchedData = response.data;

    if(this.state.showAll){
      this.showAllHandler();
    }else if(this.state.showCompleted){
      this.showCompletedHandler();
    }else if(this.state.showPending){
      this.showPendingHandler();
    }

  }

  detailsHandler = id => {

  }

  editHandler = (id) => {
    console.log('Edit Called '+id);
  }

  deleteHandler = async (id) => {

    let deletingTodo = this.state.todos.find(item => item.id === id);
    alert('Are you sure you want to delete todo:"'+deletingTodo.title+'"?');

    let response = await axios.delete('http://localhost:8000/api/todo/'+id);
    response = await axios.get('http://localhost:8000/api/todo/');
    this.fetchedData = response.data;

    if(this.state.showAll){
      this.showAllHandler();
    }else if(this.state.showCompleted){
      this.showCompletedHandler();
    }else if(this.state.showPending){
      this.showPendingHandler();
    }

  }

  render() {
    return (
      <TodosContext.Provider value = {{
        ...this.state,
        showAllHandler:       this.showAllHandler,
        showPendingHandler:   this.showPendingHandler,
        showCompletedHandler: this.showCompletedHandler,
        editHandler:          this.editHandler,
        deleteHandler:        this.deleteHandler,
        completedHandler:     this.completedHandler,
      }} >
      {this.props.children}
      </TodosContext.Provider>
      
    );
  }
}

const TodosConsumer = TodosContext.Consumer;

export {TodosContext, TodosProvider, TodosConsumer};