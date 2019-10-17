import React from 'react';
import { Redirect } from 'react-router-dom';

// Logs out the user and sets the new status of the app on the state of Context
export default ({context}) => {
    
  context.actions.signout();
  return (
    <Redirect to="/" />
  );
}