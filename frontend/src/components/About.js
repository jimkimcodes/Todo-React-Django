import React, { Component } from 'react'
import axios from 'axios'

export default class About extends Component {
  state = {
    affirmation: null
  }

  componentDidMount() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://www.affirmations.dev/";
      axios.get(proxyurl + url)
        .then(response => {
          console.log(response.data)
          this.setState({
            affirmation: response.data.affirmation,
          })
        })
  }
  render() {
    return (
      <React.Fragment>
        <div className="p-5 text-center border-bottom">
          <h3>"{this.state.affirmation}"</h3>
        </div>
        <div className="text-center mt-3">
          <small>Made with <i className="fa fa-heart text-danger"></i> ( and litte bit of <i className="fa fa-coffee"></i> ) by <a href="https://www.linkedin.com/in/eswar-clynn/">Eswar Clynn</a></small>
        </div>
      </React.Fragment>
    )
  }
}
