import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import ErrorsDisplay from './ErrorsDisplay';

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

    const { context } = this.props;
  
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;
    
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    // if state:password == "" || state:password == " "
    // else if state:password !== state:confirmPassowrd
    // else push('/')

    if (password === "") {
      this.setState({
        errors: this.state.errors.concat('Please provide a password')
      })
    } else if (password !== confirmPassword) {
      this.setState({
        errors: this.state.errors.concat('Passwords arent matching')
      })
    } else {
      this.props.history.push('/error')
    }
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
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
        );
    }
}

export default UserSignUp;


