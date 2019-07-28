import React, { Component } from 'react'
import { 
	Route,
	BrowserRouter as Router,
	Link,
	Redirect,
	Switch
} from 'react-router-dom'
import { firebaseAuth } from './data/config'
import Protegida from './pages/protect/index'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import { logout } from './helpers/Auth'
//import 'pure-css/lib/menus.css'
//import './index.css'


const PrivateRoute = ( { component: Component, authed, rest } ) => (
  <Route
    {...rest}
    render={
      props => authed === true
        ? <Component {...props} />
        : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
    }
  />
)

const PublicRoute = ( { component: Component, authed, rest } ) => (
  <Route
    {...rest}
    render={
      props => authed === false
        ? <Component {...props} />
        : <Redirect to='/form' />
    }
  />
)

class App extends Component {
  constructor(...props) {
    super(...props)

    this.state = {
      authed: false,
      loading: true
    }

    
  }

 

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged( user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true
      ? <h1>Cargando...</h1> 
      : (
        <Router>
          <div>
            <nav className="light-blue darken-4 container">
               <div className="container" >
                <div className="nav-wrapper">
                <a href="#" className="brand-logo center">Logo</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                  <li >
                    <Link to="/"  onClick={this.handleOnClick}>Home</Link>
                  </li>
                 
                  {
                    (this.state.authed)
                      ?
                        <span>
                          <li>
                            <Link to="/form"  onClick={this.handleOnClick}>formulario</Link>
                          </li>
                          <li>
                            <Link 
                              to="/"
                              
                              onClick={() => {
                                logout()
                                this.setState( {authed: false} )
                                
                              }}
                            >Salir</Link>
                          </li>
                        </span>
                      :
                        <span>
                          <li>
                              <Link to="/registro"  >Registro</Link>
                          </li>
                          <li >
                              <Link to="/login"  >Ingresar</Link>
                          </li>
                        </span>
                  }
                </ul>
                </div>
              </div>
            </nav>
            <main className="Main">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/registro' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/form' component={Protegida} />
                <Route component={Error404} />
              </Switch>
            </main>
          </div>
        </Router>
      )
  }
}

export default App