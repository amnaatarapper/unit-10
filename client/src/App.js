import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Stylings
import './global.css';

// Components imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';

// Context helpers
// import withContext from './Context';

// Context consumers



const App = () => {
  return (
    <BrowserRouter>

        <Header />
        <Switch>
          <Route exact path='/' component={Courses}/>
          <Route path='/courses/create' component={CreateCourse}/>
          <Route path ='/courses/:id' component={CourseDetail} />
        </Switch>

    </BrowserRouter>
  );
}

export default App;
