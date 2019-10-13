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

// Context helpers
// import withContext from './Context';

// Context consumers

/**
/ - Courses
/courses/create - CreateCourse
/courses/:id/update - UpdateCourse
/courses/:id - CourseDetail
/signin - UserSignIn
/signup - UserSignUp
/signout - UserSignOut
 */

const App = () => {
  return (
    <BrowserRouter>

        <Header />
        <Switch>
          <Route exact path='/' component={Courses}/>
          <Route path='/courses/create' component={CreateCourse}/>
          <Route path='/courses/:id/update' component={UpdateCourse} />
          <Route path='/courses/:id' component={CourseDetail} />
        </Switch>

    </BrowserRouter>
  );
}

export default App;
