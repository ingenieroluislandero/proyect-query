import React, { Component } from 'react'
import { login } from '../helpers/Auth'
import {firebaseAuth} from '../data/config'


export default class Login extends Component {
  constructor(...props) {
    super(...props)

    this.state = { loginMessage: null }
    this.handleClick = this.handleClick.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleClick(){
    console.log('funcionando');
    let provider = new firebaseAuth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
   firebaseAuth().signInWithPopup(provider).then(result =>{
      console.log(result);
    })
    .catch(error =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;

      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('es el mismo usuario');
      }
    });

   }

  handleOnSubmit(e) {
    e.preventDefault()
    //alert('Enviando formulario')
    login( this.email.value, this.password.value )
      .catch( error => this.setState( this.setErrorMessage('Usuario o Password incorrectos') ) )
  }

  setErrorMessage(err) {
    return { loginMessage: err }
  }

	render() {
		return (
			<article className="container">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
              <span className="card-title">Entrar</span>
        <form  onSubmit={this.handleOnSubmit}>
          <div className="row">
            <div className="input-field col s12">
          <input type="email" placeholder="Email" ref={ email => this.email = email }  />
          </div>
          <div className="input-field col s12">
          <input type="password" placeholder="Password" ref={ password => this.password = password } />
          </div>
          {
            this.state.loginMessage &&
            <div className="error">
              <p>
                Error: {this.state.loginMessage}
              </p>
            </div>
          }
          <input type="submit" className="btn light-blue darken-4 " value="Entrar" />
          </div>
        </form>
        </div>
        
        </div>
        </div>
        </div>
        <button  onClick={this.handleClick} className="btn light-blue darken-4" style={{margin: '4px'}}>
         authGoogle</button>
        </article>
		)
    }
}