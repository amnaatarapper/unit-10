import React from 'react';
import axios from 'axios';
import baseURL from '../baseURL';
import { Link, withRouter } from 'react-router-dom';

const ActionBar = (props) => {
    const deleteCourse = async () => {
    
    await axios({
      url: `${baseURL.apiBaseUrl}/courses/${props.id}`,
      method: 'delete',
      headers: {'Authorization': props.authHeader},
    }).then(r => {
      props.history.push('/');
    }).catch(e => {
      props.history.push('/error');
    })
  }

    return (
      <React.Fragment>
        <Link className="button" to={`${props.id}/update/`}>Update Course</Link><button className="button" onClick={() => {if(window.confirm('Delete the course? This action can\'t be undone!!')){deleteCourse()};}}>Delete Course</button>
      </React.Fragment>
    )
}

export default withRouter(ActionBar);