import React, { Component, StyleSheet, PropTypes } from 'react-native';
import { Router, Route } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  selectSites,
  selectCatalog,
  selectInfo,
  selectLibrary,
  selectManga,
  selectPages,
} from './redux/store/selectors';

import Drawler from './components/drawler';
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
      <Router hideNavBar>
        <Route name="main">
          <Drawler>
            <Router
                footer={Toolbar}
                style={styles.router}
            >
              <Route component={Settings}
                  name="settings"
                  title="Settings Screen"
              />
              <Route component={connect(selectSites)(Sites)}
                  name="sites"
                  title="Sites List"
              />
              <Route component={connect(selectCatalog)(Catalog)}
                  name="catalog"
                  title="Catalog List"
              />
              <Route component={connect(selectInfo)(Info)}
                  name="info"
                  title="Info"
              />
              <Route component={connect(selectLibrary)(Library)}
                  initial
                  name="library"
                  title="Library"
              />
              <Route component={connect(selectManga)(Manga)}
                  name="manga"
                  title="Manga"
              />
            </Router>
          </Drawler>
        </Route>
        <Route component={connect(selectPages)(Pages)}
            name="pages"
            title="Pages"
        />
      </Router>
    );
  }
}

export default connect(() => ({}), dispatch => ({dispatch}))(App);

const styles = StyleSheet.create({
  router: {
    paddingTop: 56,
  },
});
