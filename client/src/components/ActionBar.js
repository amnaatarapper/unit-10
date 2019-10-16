import React from 'react';
import { Link } from 'react-router-dom';

const ActionBar = (props) => {
    return (
      <React.Fragment>
        <Link className="button" to={`${props.id}/update/`}>Update Course</Link><Link className="button" to={`${props.id}/delete/`}>Delete Course</Link>
      </React.Fragment>
    )
}

export default ActionBar;