import React, { Component } from 'react'
import {Button, Modal} from 'react-bootstrap';
import {ModalConsumer} from './ModalContext'

export default class ViewModal extends Component {
  render() {
    return (
      <ModalConsumer>
        {(context)=>{
          if (context.showView){
            return (
              <Modal
                show={context.showView}
                onHide={context.handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{context.todo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {context.todo.description}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={()=>context.handleCompleted(context.todo.id)}>
                    Mark as {context.todo.completed ? 'Incomplete!' : 'Complete!' }
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
