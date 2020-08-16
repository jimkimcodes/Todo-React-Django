import React, { Component } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './MainContainer.css'
import Navbar from './Navbar'
import About from './About'
import Page404 from './Page404'
import CompWrapper from './CompWrapper'
import {TodosProvider} from '../context'
import { ModalProvider } from './ModalContext';

export default class MainContainer extends Component {
  render() {
    return (
      <div className="container main-container py-3 px-md-5">
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <TodosProvider>
            <ModalProvider>
              <Route path="/" component={CompWrapper} />
            </ModalProvider>
          </TodosProvider>
        </Switch>
        {/* <ToastContainer autoClose={2300} bodyClassName="font-weight-bold" /> */}
      </div>
    )
  }
}
