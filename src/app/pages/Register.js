import React, { Component } from 'react'
import { auth } from '../helpers/Auth'
//import 'pure-css/lib/forms.css'
//import 'pure-css/lib/buttons.css'
//import './login-register.css'

export default class Register extends Component {
  constructor(...props) {
    super(...props)

    this.state = { loginMessage: null }

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  handleOnSubmit(e) {
    e.preventDefault()
    auth( this.email.value, this.password.value )
      .catch( err => this.setState( this.setMessage( `Error: ${err.message}` ) ) )
  }

  setMessage(err) {
    return { loginMessage: err }
  }

	render() {
		return (
			<article className="container">
        <div className="row">
        <div className=" col s5">
        <div className="card">
        <div className="card-content">
				<span className="card-title">Registro</span>
        <form className="pure-form AuthForm" onSubmit={this.handleOnSubmit}>
        <div className="row">
          <div className="input-field col s12">
          <input type="email" placeholder="Email" ref={ email => this.email = email }  />
          </div>
          <div className="input-field col s12">
          <input type="password" placeholder="Password" ref={ password => this.password = password } />
          </div>
          {
            this.state.loginMessage &&
            <div className="u-error">
              <p>
                Error:&nbsp;&nbsp;{this.state.loginMessage}
              </p>
            </div>
          }
          <input type="submit" className="btn light-blue darken-4" value="Registrar" />
          
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>
			</article>
		)
	}
}