import React, { Component, DrawerLayoutAndroid, PropTypes, View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Drawer as DrawerView, Divider, COLOR, TYPO } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';
import {DefaultRenderer} from 'react-native-router-flux';

export default class Drawer extends Component {
  static propTypes = {
    navigationState: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this._drawer = null;
  }

  close() {
    if (this._drawer) {
      this._drawer.closeDrawer();
    }
  }

  goto(action, params) {
    Actions[action].apply(undefined, params);
    this.close();
  }

  getNavigationItems() {
    const { navigationState } = this.props;
    let selected = navigationState.children[navigationState.index];

    return [
      {
        icon: 'home',
        value: 'Library',
        active: selected.name === 'library',
        onPress: () => this.goto('library'),
      }, {
        icon: 'search',
        value: 'Search',
        active: selected.name === 'search',
        onPress: () => this.close(),
      }, {
        icon: 'schedule',
        value: 'Latest updates',
        label: '0',
        active: selected.name === 'updates',
        onPress: () => React.ToastAndroid.show('Will be implemented in future', React.ToastAndroid.SHORT),
      }, {
        icon: 'language',
        value: 'Online catalogs',
        active: selected.name === 'sites',
        onPress: () => this.goto('sites'),
      }, {
        icon: 'file-download',
        value: 'Download queue',
        active: selected.name === 'downloads',
        onPress: () => React.ToastAndroid.show('Will be implemented in future', React.ToastAndroid.SHORT),
      }, {
        icon: 'settings',
        value: 'Settings',
        active: selected.name === 'settings',
        onPress: () => this.goto('settings'),
      },
    ];
  }

  renderNavigationView() {
    const items = this.getNavigationItems();

    return (
      <DrawerView theme="light">
        <DrawerView.Header>
          <View style={styles.header}>
            <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
            <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>React Native Material Design</Text>
          </View>
        </DrawerView.Header>
        <DrawerView.Section
            items={items}
        />
        <Divider style={styles.divider} />
        <DrawerView.Section
            items={[]}
            title="Latest manga"
        />
      </DrawerView>
    );
  }

  render() {
    const { navigationState } = this.props;
    let selected = navigationState.children[navigationState.index];

    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          ref={(ref) => this._drawer = ref}
          renderNavigationView={this.renderNavigationView}
      >
        <DefaultRenderer
            key={selected.key}
            navigationState={selected}
            {...selected}
        />
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
  },
  text: {
    marginTop: 20,
  },
  divider: {
    marginTop: 8,
  },
});
