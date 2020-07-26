import React, { Component } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

import './MainContainer.css'
import Navbar from './Navbar'
import About from './About'
import CompWrapper from './CompWrapper'
import {TodosProvider} from '../context'
import { ModalProvider } from './ModalContext';



export default class MainContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container main-container py-3 px-5">
          <Navbar />
          <Switch>
            <Route path="/about" component={About} />
            <TodosProvider>
              <ModalProvider>
                <Route path="/" component={CompWrapper} />
              </ModalProvider>
            </TodosProvider>
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}
