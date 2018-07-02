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
      console.log(this.refs.itemOne.value);
      Items.insert({
        itemOne: {
          text: this.refs.itemOne.value.trim(),
          value: 0
        },
        itemTwo: {
          text: this.refs.itemTwo.value.trim(),
          value: 0
        }
      });
      e.currentTarget.reset();
    }
  }
  render() {
    return(
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
  return {
    items: Items.find({}).fetch()
  }
}, App);
