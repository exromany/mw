import React, { Component, StyleSheet, PropTypes } from 'react-native';
import { Router, Route } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Toolbar from './components/toolbar';
import Settings from './screens/settings';
import Sites from './screens/sites';
import Catalog from './screens/catalog';
import Info from './screens/info';
import Library from './screens/library';
import Manga from './screens/manga';
// import Pages from './screens/pages';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  render() {
    return (
      <Router hideNavBar>
        <Route name="main">
          <Router
              footer={Toolbar}
              style={styles.router}
          >
            <Route component={Settings}
                name="settings"
                title="Settings Screen"
            />
            <Route component={connect(selectSites)(Sites)}
                initial
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
                name="library"
                title="Library"
            />
            <Route component={connect(selectManga)(Manga)}
                name="manga"
                title="Manga"
            />
          </Router>
        </Route>
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

function selectSites(state) {
  return {
    sites: state.sites,
  };
}

function selectCatalog(state, { siteId }) {
  return {
    catalog: state.catalog,
    site: state.sites.find(site => site.id === siteId),
  };
}

function selectInfo(state, { siteId, link }) {
  return {
    link,
    catalog: state.catalog,
    site: state.sites.find(site => site.id === siteId),
  };
}

function selectLibrary(state) {
  return {
    library: state.library,
  };
}

function selectManga(state, { mangaId }) {
  const manga = state.library.find(item => item.id === mangaId);
  return {
    manga,
    chapters: state.chapters[mangaId],
    site: state.sites.find(site => site.id === manga.siteId),
  };
}
