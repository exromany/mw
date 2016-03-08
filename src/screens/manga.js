import React, {Component, PropTypes, View, ScrollView, ViewPagerAndroid, StyleSheet} from 'react-native';

import MangaInfo from '../components/manga-info';
import Chapters from '../components/chapters';
import { fetchChaptersIfNeeded, fetchChapters } from '../redux/actions';

export default class catalog extends Component {
  static propTypes = {
    chapters: PropTypes.shape(),
    dispatch: PropTypes.func.isRequired,
    manga: PropTypes.shape().isRequired,
    site: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch, manga } = this.props;
    dispatch(fetchChaptersIfNeeded(manga.id));
  }

  onRefresh() {
    const { dispatch, manga: { id } } = this.props;
    dispatch(fetchChapters(id));
  }

  render() {
    const { manga, site, chapters } = this.props;

    return (
      <View style={styles.container}>
        <ViewPagerAndroid
            initialPage={1}
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
            <Chapters chapters={chapters} onRefresh={this.onRefresh}/>
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
    alignItems: 'stretch',
  },
});
