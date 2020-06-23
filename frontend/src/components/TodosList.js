import React, { Component } from 'react'

import {TodosConsumer} from '../context'
import Todo from './Todo'
import ViewModal from './ViewModal'
import EditModal from './EditModal'

export default class TodosList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mt-4">
          <TodosConsumer>
            {(context) => {
              if(!context.todos){
                return <h3 className="mx-auto">Chill man! There's nothing for you <span className="text-primary">"To Do"</span> yet!</h3>
              }else{
                return context.todos.map(item => <Todo key={item.id} item={item} />)
              }
            }}
          </TodosConsumer>
        </div>
        <ViewModal />
        <EditModal />
      </React.Fragment>
    )
  }
}
