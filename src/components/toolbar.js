import React, { Component } from 'react-native';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';

export default class Toolbar extends Component {
  render() {
    const actions = [{
      icon: 'settings',
      onPress: Actions.settings,
    }, {
      icon: 'apps',
      onPress: Actions.sites,
    }, {
      icon: 'list',
      onPress: Actions.library,
    }];

    return (
      <MaterialToolbar
          actions={actions}
          icon="android"
          primary="paperGreen"
          title="MW"
          style={{top: -40, position: 'absolute', flex: 1}}
      />
    );
  }
}
