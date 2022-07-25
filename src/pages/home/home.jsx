import React, { Component } from 'react';
import "./home.scss";
import Sidebar from '../../components/sidebar/sidebar.component';
import CardXS from '../../components/card-xs/card-xs.component';

export class Home extends Component {
  render() {
    return (
      <div className="home">
          {/* <div className="main-container">
            <CardXS/>
          </div> */}
          <div className="sidebar-main">
            <Sidebar/>
          </div>
      </div>
    )
  }
}

export default Home;