import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation'
import usersList from './components/usersList'
import createProjects from './components/createProjects'


function App() {
  return(
    <Router>
      <Navigation/>
      
      <div className="container p-4">
        <Route path="/" exact component={usersList}/>
        <Route path="/update/:id" component={usersList}/>
        <Route path="/create" component={createProjects}/>
      </div>
      
      
    </Router>
  )
}

export default App;





