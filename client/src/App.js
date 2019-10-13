import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Stylings
import './global.css';

// Components imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'


// Context helpers
import withContext from './Context';

// Context consumers



const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Courses}/>
          <Route path ='/courses/:id' component={CourseDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
