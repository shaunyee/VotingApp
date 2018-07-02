import React, { Component, Fragment } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Item from './Item';

import Items from '../api/Items';

class App extends Component {
  render() {
    return(
      <Fragment>
        <header>
          <h1>Voting Application</h1>
        </header>
        <main>
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
