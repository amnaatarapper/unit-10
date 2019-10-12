import React from 'react';

// Stylings
import './global.css';

// Components imports
import Courses from './components/Courses';
import Header from './components/Header';

// Context helpers
import withContext from './Context';

// Context consumers
const CoursesWithContext = withContext(Courses);


const App = () => {
  return (
    <div>
      <Header />
      <CoursesWithContext />
    </div>
  );
}

export default App;
