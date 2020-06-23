import React, { Component } from 'react'
import styled from 'styled-components';

import {Button} from 'react-bootstrap';
import {TodosConsumer} from '../context'
import {ModalConsumer} from './ModalContext'

export default class Todo extends Component {
  render() {
    const deadline = new Date(this.props.item.deadline);
    const delayed = deadline.getTime() < (new Date()).getTime();
    return (
      <TodoDiv className="col-12 ">
        <div className="row p-2">
          <div className="col-sm-9">
            <p>
            <TodosConsumer>
              {(context)=>{
                return(
                  <>
                  <input type="checkbox" className="mr-3" checked={this.props.item.completed} onChange={()=>context.completedHandler(this.props.item.id)}/>
                  <ModalConsumer>
                  {(modalContext)=>{
                    return(
                      <span className={"text-capitalize h5 " + (this.props.item.completed ? "text-muted": "")} onClick={()=>modalContext.handleShowView(this.props.item.id)} style={this.props.item.completed ? {textDecoration: 'line-through'}: null}>{this.props.item.title}</span>
                    )
                  }}
                  </ModalConsumer>
                  
                  <span className="ml-3">Deadline: <span className={delayed ? "font-weight-bold text-danger":""}>{deadline.toLocaleString()}</span></span>
                  </>
                )}}
              </TodosConsumer>
            </p>
          </div>
          <div className="col-sm-3 text-right">
            <TodosConsumer>
              {(context)=>{
                return(
                  <>
                  <ModalConsumer>
                    {(modalContext)=>{
                      return(
                        <Button onClick={()=> modalContext.handleShowEdit(this.props.item.id)} size="sm" variant="outline-primary"><i className="fa fa-pencil mr-1"></i>Edit</Button>
                      )
                    }}
                    </ModalConsumer>
                  <Button onClick={()=> context.deleteHandler(this.props.item.id)} size="sm" variant="outline-danger" className="ml-2"><i className="fa fa-trash mr-1"></i>Delete</Button>
                  </>
                )
              }}
            </TodosConsumer>

          </div>
        </div>
      </TodoDiv>
    )
  }
}

const TodoDiv = styled.div`
  transition: 0.2s;
  :hover{
    background: #c7c7c7 ;
  }
`;