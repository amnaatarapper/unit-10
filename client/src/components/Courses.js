import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';

import Course from './Course';

class Courses extends React.Component {

  state= {
    courses: [],
  }

  async componentDidMount() {

    await axios.get(baseURL.apiBaseUrl + '/courses')
      .then( response => { 
        this.setState({ courses: response.data.courses})
      })
      .catch( error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <div className="bounds">

        {this.state.courses.map(course => <Course key={course.id} title={course.title} id={course.id}/>)}

        <div className="grid-33">
          <a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a>
        </div>
      </div>
    );
  }

};

export default Courses;