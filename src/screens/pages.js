import React, {Component, PropTypes, ViewPagerAndroid} from 'react-native';
import Page from '../components/page2';
import { fetchPages } from '../redux/actions';

export default class Pages extends Component {
  static propTypes = {
    chapter: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
    manga: PropTypes.shape().isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape),
  };

  static defaultProps = {
    pages: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, manga, chapter } = this.props;
    dispatch(fetchPages(manga.id, chapter.id));
  }

  render() {
    const {pages} = this.props;

    return (
      <ViewPagerAndroid
          initialPage={0}
          style={{flex: 1}}
      >
        {pages.map((page, index) => (
          <Page key={index}
              source={page}
          />
        ))}
      </ViewPagerAndroid>
    );
  }
}
