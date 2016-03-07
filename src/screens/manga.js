import React, {Component, PropTypes, View, ScrollView, ViewPagerAndroid, StyleSheet} from 'react-native';

import MangaInfo from '../components/manga-info';
import Chapters from '../components/chapters';
import { fetchChapters } from '../redux/actions/manga';

export default class catalog extends Component {
  static propTypes = {
    chapters: PropTypes.shape(),
    dispatch: PropTypes.func.isRequired,
    manga: PropTypes.shape().isRequired,
    site: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, manga } = this.props;
    dispatch(fetchChapters(manga.siteId, manga.link, manga.id));
  }

  render() {
    const { manga, site, chapters } = this.props;

    return (
      <View style={styles.container}>
        <ViewPagerAndroid
            initialPage={0}
            style={styles.viewPager}
        >
          <View style={styles.pageStyle}>
            <ScrollView>
              <MangaInfo
                  manga={manga}
                  site={site}
              />
            </ScrollView>
          </View>
          <View style={styles.pageStyle}>
            <Chapters chapters={chapters ? chapters.chapters : []}/>
          </View>
        </ViewPagerAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
});
