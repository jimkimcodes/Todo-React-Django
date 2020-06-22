import React, { Component } from 'react'
import axios from 'axios'

const TodosContext = React.createContext()

class TodosProvider extends Component {
  state = {
    todos :[
      {
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },], 
    modalOpen: false,
    modalTodo: null,
    showAll: true,
    showPending: false,
    showCompleted: false,
  }

  fetchedData = null;

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response=>{
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
      todos: this.fetchedData.filter(item=> item.completed === false),
      showAll: false,
      showPending: true,
      showCompleted: false,
    })
  }

  showCompletedHandler = () => {
    this.setState({
      todos: this.fetchedData.filter(item=> item.completed === true),
      showAll: false,
      showPending: false,
      showCompleted: true,
    })
  }

  completedHandler = (id) => {
    let tempTodos = [...this.state.todos]
    let currTodo = tempTodos.find(item => item.id === id)
    let changedTodo = currTodo
    changedTodo.completed = !currTodo.completed

    this.setState({todos:tempTodos})
  }

  detailsHandler = id => {

  }

  editHandler = (id) => {
    console.log('Edit Called '+id);
  }

  deleteHandler = (id) => {
    console.log('Delete Called '+id);
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