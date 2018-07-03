import React, { Component } from 'react';
import Items from '../api/Items';

class Item extends Component {
  
  voteOne = () => {
    Meteor.call('voteOnItem', this.props.item, 'itemOne')
  }
  voteTwo = () => {
    Meteor.call('voteOnItem', this.props.item, 'itemTwo')
      }
  render() {
    return (
      <div className='item'>
        <div className="vote-one" onClick={this.voteOne}>
          <span>{this.props.item.itemOne.value}</span>
            <h3>{this.props.item.itemOne.text}</h3>
        </div>
        <span>Vs</span>
        <div onClick={this.voteTwo} className="vote-to">
          <span>{this.props.item.itemTwo.value}</span>
            <h3>{this.props.item.itemTwo.text}</h3>
        </div>
      </div>
    );
  }

}

export default Item;
