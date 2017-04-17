import React from 'react';
import {
  Avatar,
  CardHeader,
} from 'material-ui';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import { white, yellow600 } from 'material-ui/styles/colors';
import Card from './card';

/**
 * Special kind of Card for displaying tips on the home screen
 */
export default class extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader
          title="Tip"
          subtitle={this.props.title}
          avatar={<Avatar icon={<LightbulbIcon />} color={white} backgroundColor={yellow600} />}
        />
        {this.props.children}
      </Card>
    );
  }
}
