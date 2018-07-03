import React, { Component, Fragment } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/std:accounts-ui';
import Item from './Item';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Items from '../api/Items';

class App extends Component {
  addItems = e => {
    e.preventDefault();
  const itemOne = this.refs.itemOne.value.trim();
  const itemTwo = this.refs.itemTwo.value.trim();
  if(itemOne !== '' && itemTwo !== '') {
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if(!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        }
      });
    }
  }
  render() {
    if(!this.props.ready) {
      return <div>Loading</div>
    }
    return (
      <Fragment>
        <header>
          <h1>Voting Application</h1>
          <AccountsUIWrapper />
        </header>
        <main>
          <form className='new-items' onSubmit={this.addItems}>
          <input type="text" ref='itemOne'/>
          <input type="text" ref='itemTwo'/>
          <button type="submit">Add Items</button>
          </form>
          {this.props.items.map((item) => {
            return <Item item={item} key={item._id}/>
          })}
        </main>
      </Fragment>
    )
  }
}

export default createContainer(() => {
  let itemsSub = Meteor.subscribe('allItems');
  return {
    ready: itemsSub.ready(),
    items: Items.find({}, {
      limit: 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App);
