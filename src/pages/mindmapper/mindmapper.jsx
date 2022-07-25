import React, { Component } from 'react'
import Nodemap from 'react-nodemap'
import 'react-nodemap/dist/index.css'
import './mindmapper.scss'
import Sidebar from '../../components/sidebar/sidebar.component';

export class MindMapper extends Component {

  state = {
    data: [
      {
        name: 'Root',
        children:[]
      }
    ]
  }

  onDataChange = (value) =>{
    this.setState({
      data: value
    })
  }

  render() {
    return (
      <div className="mindmapper-main-container">
      <div className="mindmapper-container">
      <Nodemap 
      defaultValue={this.state.data}
      value={this.state.data}  
      onDataChange={this.onDataChange}
      depthLimit={4}
      style={{width: "100%", height: "600px", cursor: "pointer"}}
      fields={['id','createdAt']}// output fields will be ['name', 'children','id','createdAt'], others will be omitted
      />
      
      <Sidebar />
      </div>
      </div>
    )
  }
}

export default MindMapper