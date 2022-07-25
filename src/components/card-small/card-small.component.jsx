import React, { Component } from 'react'
import './card-small.styles.scss'

export class CardSmall extends Component {

render() {

    const notesItem = this.props.notesItem;
    return (
      <div className='card-small-main-container'>
          {notesItem.map((ele, idx) => {
            return(<div className='card-small-container'>
            <div className='card-small-body' value={idx} onClick={this.props.onClick}>
            <div className='card-small-header' value={idx} onClick={this.props.onClick}>
                {ele.name}
            </div>
            <div className='card-small-inner' value={idx} onClick={this.props.onClick}>
                {ele.data}
            </div>
            </div>
            </div>)})}
      </div>
    )
  }
}

export default CardSmall