import React, { Component } from 'react';
import "./sidebar.styles.scss";
import { BiNetworkChart, BiAnalyse } from "react-icons/bi";
import { Link} from 'react-router-dom';

export default class Sidebar extends Component {

  constructor(){
    super();
    this.state = {
            moduleLinks: [
                {
                    id:1,
                    navName: "Collections",
                    iconClass: BiNetworkChart,
                    to: "/collections"
                },
                {
                    id:2,
                    navName: "Notes",
                    iconClass: BiAnalyse,
                    to: "/notes"
                },
                {
                    id:3,
                    navName: "Mind Mapper",
                    iconClass: BiAnalyse,
                    to: "/mindmapper"
                },
                {
                    id:4,
                    navName: "Scheduler",
                    iconClass: BiAnalyse,
                    to: "/scheduler"
                }
            ],
            activeLink: 2,
        }
    }  


  render() {
    
    const {activeLink, moduleLinks} = this.state;

    return (
    <div className="sidebar-container">
      <div className="sidebar-main">
          <div className="top">
              {/* <div className="logo">
                    <span>Reflex</span>
              </div> */}
          </div>
          <div className="center">
            <ul id="js-nav-menu" className="nav-menu">

                {/* <li class="nav-title">Modules</li> */}

                {moduleLinks.map(link=>{
                    
                    const LinkCollection = link.iconClass;
                    return(
                    <Link to={link.to} style={{textDecoration: 'none'}}>
                    <li key={link.id} className={link.navName}>
                        <LinkCollection />
                        <span className="sidebar-text">{link.navName}</span>
                    </li>
                    </Link>
                    )})
}
            </ul>
          </div>
          <div className="bottom">

          </div>
      </div>
      </div>
    )
  }
}
