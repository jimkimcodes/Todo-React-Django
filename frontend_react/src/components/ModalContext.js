import React, { Component } from 'react'
import { TodosContext } from '../context';


const ModalContext = React.createContext();

class ModalProvider extends Component {
  static contextType = TodosContext

  state = {
    todo: null,
    showView:false,
    showEdit:false,
  }


  handleClose = () => this.setState({todo:null, showView:false, showEdit:false});

  handleShowView = (id) => this.setState({
    todo: this.context.todos.find(item=> item.id === id), 
    showView:true
  });

  handleShowEdit = (id) => this.setState({
    todo: this.context.todos.find(item=> item.id === id), 
    showEdit:true
  });

  handleAdd = () => this.setState({
    todo: null, 
    showEdit:true
  });

  handleCompleted = this.context.completedHandler;

  render() {
    return (
      <ModalContext.Provider value={{
        ...this.state,
        handleClose:    this.handleClose,
        handleShowView: this.handleShowView,
        handleShowEdit: this.handleShowEdit,
        handleAdd:      this.handleAdd,
        handleCompleted: this.handleCompleted,
      }}>
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

const ModalConsumer = ModalContext.Consumer;

export {ModalProvider, ModalConsumer};