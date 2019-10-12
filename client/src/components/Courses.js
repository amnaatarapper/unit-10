import React from 'react';

import Course from './Course';

class Courses extends React.Component {

  state= {
    courses: [],
  }

  componentDidMount() {
    const { context } = this.props;
    const getCourses = context.data.getCourses();
    
    Promise.all([getCourses])
    .then(courses => this.setState({courses: courses[0].courses}))
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="bounds">
        
        {this.state.courses.map(course => <Course key={course.id} title={course.title} />)}
        
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