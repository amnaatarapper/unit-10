import React from 'react';

const ErrorsDisplay = (props) => {
    return (<div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {props.errors.map( (error, i) => <li key={i}>{error}</li> )}
        </ul>
      </div>
    </div>
    );
                  
}

export default ErrorsDisplay;
