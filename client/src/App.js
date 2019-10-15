import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Stylings
import './global.css';

// Components imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
// Context helpers
import withContext from './Context';

// Context consumers
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {
  return (
    <BrowserRouter>
        <HeaderWithContext />
        
        <Switch>
          <Route exact path='/' component={Courses}/>
          <Route path='/courses/create' component={CreateCourse}/>
          <Route path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route path='/courses/:id' component={CourseDetail} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
