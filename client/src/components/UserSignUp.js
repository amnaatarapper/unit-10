import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import ErrorsDisplay from './ErrorsDisplay';
import { Link } from 'react-router-dom';


// Sign up a new user
class UserSignUp extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      password,
      confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        errors: this.state.errors.concat('Passwords arent matching')
      })
    } else {
      this.submit();
    }
    
    
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
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;
    
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    // Posts new user data to the api
    axios.post(`${baseURL.apiBaseUrl}/users`, user).then(r => {
      
      alert('Account created and signed in!');

      const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`);
      const authHeader = `Basic ${encodedCredentials}`;
      // Asks the server(api) for the new user data then populates Context's state
      axios({
        url: `${baseURL.apiBaseUrl}/users`, 
        method: 'get',
        headers: {'Authorization': authHeader}
      }).then(response => {

        const newUser = response.data.user;
        this.props.context.actions.signin(newUser, authHeader);
        this.props.history.push('/');
      }).catch(error => this.props.history.push('/error'));

      
    }).catch(e => {
      let errors = this.state.errors;

      if(typeof(e.response) === 'object' && typeof(e.response.data) === 'object' && typeof(e.response.data.errors) === 'object')
        errors = e.response.data.errors;
      else
        this.props.history.push('/error');
      
      this.setState({
        errors: errors.filter((error, index) => errors.indexOf(error) === index)
      })
    })
  }
  
  cancel = () => {
    this.props.history.push('/');
  }

  render() {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state;

        return (
            <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            {
              this.state.errors.length ? <ErrorsDisplay errors={this.state.errors} /> : null
            }
            
              <form onSubmit={this.handleSubmit.bind(this)}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={this.change} /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={this.change} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={this.change} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={this.change} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  value={confirmPassword} onChange={this.change} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to='signin'>Click here</Link> to sign in!</p>
        </div>
      </div>
        );
    }
}


export default UserSignUp;


