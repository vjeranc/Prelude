import React from 'react';
import { ListItem, Toggle } from 'material-ui';

export default class extends React.Component {
  render() {
    return (
      <ListItem
        primaryText={this.props.text}
        rightToggle={<Toggle
          name={this.props.name}
          defaultToggled={this.props.defaultState}
          onToggle={this.props.onSwitch}
        />}
      />
    );
  }
}
