import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {
  List,
  Subheader,
} from 'material-ui';

import Card from './card';
import PrefsToggle from './prefs-toggle';
import PrefsCheckbox from './prefs-checkbox';

/**
 * Wrapper component for practice modes, containing general functionality for
 * displaying an initial options screen with a "start" button to begin an
 * exercise.
 *
 * See SightReadingPracticeIntro and PerfectPitchPracticeIntro for examples of
 * how to use.
 */
class PracticeIntro extends React.Component {
  constructor(props) {
    super(props);

    // If localStorage doesn't have prefs yet, pre-populate with defaults
    let prefs = localStorage[`prefs.${this.props.prefsNamespace}`];
    if (prefs === undefined) {
      const defaults = {};
      this.props.prefDefs.forEach((section) => {
        section.items.forEach((item) => {
          defaults[item.pref] = item.default;
        });
      });
      prefs = JSON.stringify(defaults);
    }

    // Initial state
    this.state = {
      started: false,
      prefs: JSON.parse(prefs),
    };
  }

  componentWillMount = () => {
    this.end();
  }

  /**
   * Handler for all toggle switches and checkboxes
   */
  onToggle = (e, enabled) => {
    const name = e.target.name;
    const prefs = this.state.prefs;
    prefs[name] = enabled;
    this.setChanges({ prefs });
  }

  setChanges = (changes) => {
    this.setState(changes);
    if ('prefs' in changes) {
      this.persistPrefs();
    }
  }

  /**
   * Save the prefs currently in the state into localStorage
   */
  persistPrefs = () => {
    localStorage[`prefs.${this.props.prefsNamespace}`] = JSON.stringify(this.state.prefs);
  }

  /**
   * Begin the practice session
   * TODO: Possibly do this using routing in the future
   * TODO: If we use routing, maybe pass the options as query params in the URL (would allow deep-linking to specific modes)
   */
  start = () => {
    this.setChanges({ started: true });
    this.context.appbar(
      this.props.title,
      <IconButton onTouchTap={this.end}><NavigationBackIcon /></IconButton>,
    );
  }

  /**
   * End the practice session and return to the intro/prefs screen
   */
  end = () => {
    this.setChanges({ started: false });
    this.context.appbar(
      this.props.title,
      null,
      <FlatButton label="Start" onTouchTap={this.start} />,
    );
  }

  render() {
    if (this.state.started) {
      return (
        <this.props.component prefs={this.state.prefs} />
      );
    }
    return (
      <Card>
        {
            this.props.prefDefs.map((section, i) => (
              <List key={i}>
                <Subheader>{section.header}</Subheader>
                {
                    section.items.map((item, j) => {
                      if (item.type == 'checkbox') {
                        return (
                          <PrefsCheckbox text={item.label} name={item.pref} defaultState={this.state.prefs[item.pref]} onSwitch={this.onToggle} key={j} />
                        );
                      }
                      if (item.type == 'toggle') {
                        return (
                          <PrefsToggle text={item.label} name={item.pref} defaultState={this.state.prefs[item.pref]} onSwitch={this.onToggle} key={j} />
                        );
                      }
                    })
                  }
              </List>
              ))
          }
      </Card>
    );
  }
}
PracticeIntro.contextTypes = {
  snackbar: React.PropTypes.func,
  appbar: React.PropTypes.func,
};
export default PracticeIntro;
