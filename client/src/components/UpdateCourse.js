import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';

class UpdateCourse extends React.Component {

    state= {
        course: [],
        user: {}
    }

    async componentDidMount() {

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

    handleUpdate = () => {
        
    }

    render() {

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
          } = this.state.course;
          
          const {
            firstName,
            lastName
          } = this.state.user;


        return (<div class="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                <div><input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..."
                    value={title} /></div>
                <p>By {firstName} {lastName}</p>
              </div>
              <div class="course--description">
                <div><textarea id="description" value={description} name="description" class="" placeholder="Course description...">
                    
                </textarea></div>
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input"
                        placeholder="Hours" value={estimatedTime} /></div>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" value={materialsNeeded} name="materialsNeeded" class="" placeholder="List materials...">
                    
                        </textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid-100 pad-bottom"><button class="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
          </form>
        </div>
      </div>);
    }


    
}

export default UpdateCourse;