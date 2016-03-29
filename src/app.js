import React, { Component, StyleSheet, PropTypes } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  selectSites,
  selectCatalog,
  selectInfo,
  selectLibrary,
  selectManga,
  selectPages,
} from './redux/store/selectors';

import Drawer from './components/drawer';
import Toolbar from './components/toolbar';
import Settings from './screens/settings';
import Sites from './screens/sites';
import Catalog from './screens/catalog';
import Info from './screens/info';
import Library from './screens/library';
import Manga from './screens/manga';
import Pages from './screens/pages';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="main" component={Drawer}>
            <Scene key="toolbar"
                navBar={Toolbar}
                style={styles.sceneWithNavbar}
            >
              <Scene key="sites"
                  component={connect(selectSites)(Sites)}
              />
              <Scene key="catalog"
                  component={connect(selectCatalog)(Catalog)}
              />
              <Scene key="info"
                  component={connect(selectInfo)(Info)}
              />
              <Scene key="library"
                  initial
                  component={connect(selectLibrary)(Library)}
              />
              <Scene key="manga"
                  component={connect(selectManga)(Manga)}
              />
            </Scene>
          </Scene>
          <Scene key="pages"
              component={connect(selectPages)(Pages)}
              hideNavBar
          />
          <Scene key="settings"
              hideNavBar
              component={Settings}
          />
        </Scene>
      </Router>
    );
  }
}

export default connect(() => ({}), dispatch => ({dispatch}))(App);

const styles = StyleSheet.create({
  sceneWithNavbar: {
    flex: 1,
    position: 'relative',
    paddingTop: 50,
  },
});
