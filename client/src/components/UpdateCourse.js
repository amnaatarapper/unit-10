import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import ErrorsDisplay from './ErrorsDisplay';

class UpdateCourse extends React.Component {

  state= {
      user: {},
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
  }

  async componentDidMount() {

    await axios.get(baseURL.apiBaseUrl + '/courses/' + this.props.match.params.id )
      .then( response => { 

        const {
          id,
          title,
          description,
          estimatedTime,
          materialsNeeded,
        } = response.data.course;

        this.setState({
          id,
          title,
          description,
          estimatedTime,
          materialsNeeded,
          user: response.data.course.User
        })
      })
      .catch( error => {
        this.props.history.push('/error');
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.user.id === this.props.context.authenticatedUser.id)
      this.submit();
    else 
      this.setState({ errors: this.state.errors.push('forbidden')});
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
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: this.state.user.id
    }

    axios({
      url: `${baseURL.apiBaseUrl}/courses/${this.state.id}`, 
      method: 'put',
      data: course,
      auth: {
        username: this.props.context.authenticatedUser.emailAddress,
        password: this.props.context.authenticatedUser.password
      }
    }).then(r => {
      alert('updated')
      this.props.history.push(`/courses/${id}`);
      
    }).catch(e => {
      let errors = this.state.errors;

      if(typeof(e.response) === 'object' && typeof(e.response.data) === 'object' && typeof(e.response.data.errors) === 'object')
        errors = e.response.data.errors;
      else
        errors = ["Server internal error"];
      
      this.setState({
        errors: errors.filter((error, index) => errors.indexOf(error) === index)
      })
    })
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }

  render() {

      const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        } = this.state;
        
        const {
          firstName,
          lastName
        } = this.state.user;


      return (<div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>

        {
          this.state.errors.length ? <ErrorsDisplay errors={this.state.errors} /> : null
        }

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                  value={title} onChange={this.change}/></div>
              <p>By {firstName} {lastName}</p>
            </div>
            <div className="course--description">
              <div><textarea id="description" value={description} name="description" className="" placeholder="Course description..." onChange={this.change}>
                  
              </textarea></div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                      placeholder="Hours" value={estimatedTime} onChange={this.change} /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" value={materialsNeeded} name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change}>
                  
                      </textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit" disabled={this.state.user.id !== this.props.context.authenticatedUser.id}>Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
          
        </form>
      </div>
    </div>);
  }


    
}

export default UpdateCourse;