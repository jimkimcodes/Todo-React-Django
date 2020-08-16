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

  handleShowAdd = () => this.setState({
    todo: null, 
    showEdit:true
  });

  handleCompleted = (id) => { 
    this.handleClose(); 
    this.context.completedHandler(id); 
  };

  handleAdd = (todo) => { 
    this.handleClose();
    this.context.addHandler(todo);
  };

  handleEdit = (id, todo) => { 
    this.handleClose();
    this.context.editHandler(id, todo);
  };

  render() {
    return (
      <ModalContext.Provider value={{
        ...this.state,
        handleClose:    this.handleClose,
        handleShowView: this.handleShowView,
        handleShowEdit: this.handleShowEdit,
        handleShowAdd:  this.handleShowAdd,
        handleAdd:      this.handleAdd,
        handleEdit:     this.handleEdit,
        handleCompleted: this.handleCompleted,
      }}>
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

const ModalConsumer = ModalContext.Consumer;

export {ModalProvider, ModalConsumer};