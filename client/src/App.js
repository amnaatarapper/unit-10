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

// Helpers
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Context consumers
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);



const App = () => {
  return (
    <BrowserRouter>
        <HeaderWithContext />
        
        <Switch>
          <Route exact path='/' component={Courses}/>
          <PrivateRoute exact path='/courses/create' component={CreateCourse}/>
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <Route exact path='/signup' component={UserSignUpWithContext} />
          <Route exact path='/signin' component={UserSignInWithContext} />
          <Route exact path="/signout" component={UserSignOutWithContext} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
