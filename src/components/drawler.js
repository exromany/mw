import React, { Component, DrawerLayoutAndroid, PropTypes, View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';

export default class Drawler extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    route: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
  }

  renderNavigationView() {
    const { route } = this.props;

    const items = [
      {
        icon: 'home',
        value: 'Library',
        active: route.name === 'home',
        onPress: () => Actions.library(),
      }, {
        icon: 'search',
        value: 'Search',
        active: route.name === 'search',
        onPress: () => React.ToastAndroid.show('Will be implemented in future', React.ToastAndroid.SHORT),
      }, {
        icon: 'schedule',
        value: 'Latest updates',
        label: '0',
        active: route.name === 'updates',
        onPress: () => React.ToastAndroid.show('Will be implemented in future', React.ToastAndroid.SHORT),
      }, {
        icon: 'language',
        value: 'Online catalogs',
        active: route.name === 'sites',
        onPress: () => Actions.sites(),
      }, {
        icon: 'file-download',
        value: 'Download queue',
        active: route.name === 'downloads',
        onPress: () => React.ToastAndroid.show('Will be implemented in future', React.ToastAndroid.SHORT),
      }, {
        icon: 'settings',
        value: 'Settings',
        active: route.name === 'settings',
        onPress: () => Actions.settings(),
      },
    ];

    return (
      <Drawer theme="light">
        <Drawer.Header>
          <View style={styles.header}>
            <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
            <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>React Native Material Design</Text>
          </View>
        </Drawer.Header>
        <Drawer.Section
            items={items}
        />
        <Divider style={styles.divider} />
        <Drawer.Section
            items={[]}
            title="Latest manga"
        />
      </Drawer>
    );
  }

  render() {
    const { children, route } = this.props;

    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          renderNavigationView={this.renderNavigationView}
      >
        {React.Children.map(children, (child) => React.cloneElement(child, { route }))}
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
