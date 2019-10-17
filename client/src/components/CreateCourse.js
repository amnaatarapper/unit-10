import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import ErrorsDisplay from './ErrorsDisplay';

class CreateCourse extends React.Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
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
       userId: this.props.context.authenticatedUser.id
     }
 
     axios({
       url: `${baseURL.apiBaseUrl}/courses`, 
       method: 'post',
       data: course,
       headers: {'Authorization': this.props.context.authenticatedUser.authHeader},
     }).then(r => {
       alert('The course has been created!')
       this.props.history.push(`/courses/${r.data.courseId}`);
       
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
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            {
              this.state.errors.length ? <ErrorsDisplay errors={this.state.errors} /> : null
            }
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change}/></div>
                    <p>By Joe Smith</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.change}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" value={estimatedTime} onChange={this.change}/></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.change}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
              </form>
            </div>
          </div>
    );
  }
}

export default CreateCourse;