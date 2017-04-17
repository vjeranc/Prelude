import React from 'react';
import { Checkbox, ListItem } from 'material-ui';

export default class extends React.Component {
  render() {
    return (
      <ListItem
        primaryText={this.props.text}
        leftCheckbox={<Checkbox
          name={this.props.name}
          defaultChecked={this.props.defaultState}
          onCheck={this.props.onSwitch}
        />}
      />
    );
  }
}
