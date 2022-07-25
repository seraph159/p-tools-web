import React, { Component } from 'react'


import Home from './pages/home/home';
import Mindmapper from './pages/mindmapper/mindmapper';
import Scheduler from './pages/scheduler/scheduler';
import Collections from './pages/collections/collections';
import Dashboard from './pages/dashboard/dashboard';
import Notes from './pages/notes/notes';
import {Route, Routes, Navigate, withRouter} from "react-router-dom";

//Routes = Switch, Redirect = Navigate
class App extends Component {


  render() {
    return (
      <>

    {/* {console.log( "main Sate", this.props.currentUser.currentUser)} */}
    <Routes>
    <Route path="/">
      <Route index element = {<Home/>} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="notes" element={<Notes />} />
      <Route path="mindmapper" element={<Mindmapper />} />
      <Route path="scheduler" element={<Scheduler />} />
      <Route path="collections" element={<Collections />} />
    </Route>
    {/* <Route path="/app" component={Home} /> */}
    </Routes>

    </>
    )
  }
}

export default App;