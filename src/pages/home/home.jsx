import React, { Component } from 'react';
import "./home.scss";
import {Link} from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar.component';
import CardXS from '../../components/card-xs/card-xs.component';

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
          <span className="home-title">Productivity Tools</span>
          <div className="home-options">
            <Link to="/collections" style={{textDecoration: 'none'}}>
            <div className="home-item">
              Collections
            </div>
            </Link>
            <Link to="/notes" style={{textDecoration: 'none'}}>
            <div className="home-item">
              Notes
            </div>
            </Link>
            <Link to="/mindmapper" style={{textDecoration: 'none'}}>
            <div className="home-item">
              MindMapper
            </div>
            </Link>
            <Link to="/scheduler" style={{textDecoration: 'none'}}>
            <div className="home-item">
              Scheduler
            </div>
            </Link>
          </div>
      </div>
    )
  }
}

export default Home;