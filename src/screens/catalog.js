import React, {Component, PropTypes, View, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';

import MangaList from '../components/manga-list';
import { fetchCatalogIfNeeded } from '../redux/actions';

export default class catalog extends Component {
  static propTypes = {
    catalog: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape).isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
    site: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.onMangaPress = this.onMangaPress.bind(this);
  }

  componentDidMount() {
    const { dispatch, site } = this.props;
    dispatch(fetchCatalogIfNeeded(site.id));
  }

  onMangaPress(manga) {
    const { site } = this.props;
    Actions.info({ link: manga.link, siteId: site.id });
  }

  render() {
    const { catalog: { items, isFetching } } = this.props;

    return (
      <View style={{flex: 1}}>
        <Text>{items.length}</Text>

        {(isFetching
          ? <Text>Loading...</Text>
          : <MangaList dataSource={items}
              onMangaPress={this.onMangaPress}
              type="list"
            />
        )}
      </View>
    );
  }
}
