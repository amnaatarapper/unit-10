import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

import ActionBar from './ActionBar';

class CourseDetail extends React.Component {


    state= {
        course: [],
        user: {},
        authenticatedUser: null
    }

    async componentDidMount() {

      this.setState({authenticatedUser: this.props.context.authenticatedUser})

      await axios.get(baseURL.apiBaseUrl + '/courses/' + this.props.match.params.id )
        .then( response => { 
          this.setState({ 
            course: response.data.course,
            user: response.data.course.User
          })
        })
        .catch( error => {
          console.log('Error fetching and parsing data', error);
        });
    }


    render() {
      const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
      } = this.state.course;
      
      const {
        firstName,
        lastName
      } = this.state.user;

      return (
      <>
        

        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <span>
              {
                (this.state.authenticatedUser === null || this.state.authenticatedUser.id !== this.state.user.id) ? null : <ActionBar id={id}/>
              }
            </span>
            <Link className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>

        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {firstName} {lastName}</p>
            </div>
            <div className="course--description">
                    <ReactMarkdown source={description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
            <ul className="course--stats--list">
                        
              {
                  <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{estimatedTime}</h3>
                  </li>
              }

              
              {
                  <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ReactMarkdown source={materialsNeeded} />
                  </li>
              }
            </ul>
            </div>
          </div>
        </div>
      </>
        );
    }
}

export default CourseDetail;