import React, { Component } from 'react'
import Form from './Form'
import {Button, Modal} from 'react-bootstrap'
import {ModalConsumer} from './ModalContext'

export default class EditModal extends Component {
  render() {
    return (
      <ModalConsumer>
        {(context)=>{
          if (context.showEdit){
            return (
              <Modal
                show={context.showEdit}
                onHide={context.handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{context.todo ? 'Edit Todo: '+context.todo.title : 'Add Todo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form todo={context.todo} addTodo={context.handleAdd} editTodo={context.handleEdit} />
                </Modal.Body>
              </Modal>
            )
          }
          else{
            return null;
          }
        }}

      </ModalConsumer>
    )
  }
}
