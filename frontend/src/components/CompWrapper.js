import React, { Component } from 'react'

import {Button} from 'react-bootstrap';
import {TodosConsumer} from '../context';
import TodosList from './TodosList'
import { ModalConsumer } from './ModalContext';

export default class CompWrapper extends Component {

  render() {
    return (
      <TodosConsumer>
        {(context)=>{
          return (
            <div className="mt-3">
              <div className="row px-3">
                <div className="mr-auto">
                  <Button variant={context.showAll? 'dark': 'outline-dark'} className="mr-1 mr-lg-2" disabled={context.showAll} onClick={context.showAllHandler}>All</Button>
                  <Button variant={context.showPending? 'dark': 'outline-dark'} className="mr-1 mr-lg-2" disabled={context.showPending} onClick={context.showPendingHandler}>Pending</Button>
                  <Button variant={context.showCompleted? 'dark': 'outline-dark'} className="mr-1 mr-lg-2" disabled={context.showCompleted} onClick={context.showCompletedHandler}>Completed</Button>
                </div>
                <div className="">
                  <ModalConsumer>
                    {(modalContext)=>{
                      return (<Button variant='primary' onClick={()=>modalContext.handleShowAdd()}>Add</Button>)
                    }}
                  </ModalConsumer>
                </div>
              </div>
              <TodosList />
            </div>
          )
        }}
      </TodosConsumer>
    )
  }
}
