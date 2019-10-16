import React from 'react';
import { Link } from 'react-router-dom';

const ActionBar = (props) => {
    return (
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><Link className="button" to={`${props.id}/update/`}>Update Course</Link><Link className="button" to={`${props.id}/delete/`}>Delete Course</Link></span><a
                className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
    )
}

export default ActionBar;