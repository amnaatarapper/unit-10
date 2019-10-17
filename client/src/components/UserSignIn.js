import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

class UserSignIn extends React.Component {

  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit();
  }
  
  handleCancel(event) {
    event.preventDefault();
    this.cancel();
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = async () => {

   const {
      emailAddress,
      password
    } = this.state;

   
    axios({
      url: `${baseURL.apiBaseUrl}/users`, 
      method: 'get',
      auth: {
        username: emailAddress,
        password: password
      }
    }).then(r => {
      alert(`Welcome, ${r.data.user.firstName}!`)

      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      const authHeader = `Basic ${encodedCredentials}`;

      this.props.context.actions.signin(r.data.user, authHeader);

      if (this.props.location.state)
        this.props.history.push(this.props.location.state.from.pathname);
      else
        this.props.history.push('/');
      
    }).catch(e => {
      let errors = this.state.errors;

      if(typeof(e.response) === 'object' && typeof(e.response.data) === 'object' && typeof(e.response.data.errors) === 'object')
        errors = e.response.data.errors;
      else
        this.props.history.push('/error')
      
      this.setState({
        errors: errors.filter((error, index) => errors.indexOf(error) === index)
      })
    })
  }

  cancel = () => {
    this.props.history.push('/');
  }

    render() {
        return (
          
            <div className="bounds">
        <div className="grid-33 centered signin">
        {         
          this.state.errors.length ? <ErrorsDisplay errors={this.state.errors} /> : null
        }

          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={this.state.emailAddress} onChange={this.change}/></div>
              <div><input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.change}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
        )
    }
}

export default UserSignIn;