import React, { Component } from 'react'
import {Button, Modal} from 'react-bootstrap';
import {ModalConsumer} from './ModalContext'

export default class ViewModal extends Component {
  render() {
    return (
      <ModalConsumer>
        {(context)=>{
          if (context.showView){
            const deadline = new Date(context.todo.deadline);
            const delayed = deadline.getTime() < (new Date()).getTime();
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
                  <div>
                    <h5>Description:</h5>
                    {context.todo.description}
                  </div>
                  <div className="mt-4">
                    <h5>Description:</h5>
                    <span className={delayed ? "font-weight-bold text-danger":""}>{deadline.toLocaleString()}</span>
                  </div>
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
