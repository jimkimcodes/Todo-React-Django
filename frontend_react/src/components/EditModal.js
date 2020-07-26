import React, { Component } from 'react'
import {Button, Modal} from 'react-bootstrap';
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
                  {context.todo ? context.todo.description : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={()=>context.handleClose()}>
                    Submit
                  </Button>
                </Modal.Footer>
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
