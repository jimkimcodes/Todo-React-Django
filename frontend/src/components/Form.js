import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class FormComponent extends Component {
  constructor(props) {
    super(props)
    let title = this.props.todo ? this.props.todo.title : '';
    let description = this.props.todo ? this.props.todo.description : '';
    let deadline = this.props.todo ? this.props.todo.deadline.slice(0, 16) : '';
    this.isAdder = this.props.todo == null;

    this.state = {
      title: title,
      description: description,
      deadline: deadline,
    }
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isAdder) {
      this.props.addTodo(this.state);
    } else {
      this.props.editTodo(this.props.todo.id, this.state);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter title of todo..." />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" name="description" onChange={this.handleChange} value={this.state.description} rows="3" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Deadline:</Form.Label>
          <Form.Control type="datetime-local" name="deadline" onChange={this.handleChange} value={this.state.deadline} placeholder="Enter deadline of todo..." />
        </Form.Group>
        <hr/>
        <div className="text-center">
          <Button variant="primary" type="submit" className="text-right" >{ this.isAdder ? 'Add Todo' : 'Update Todo' }</Button>
        </div>
      </Form>
    )
  }
}
