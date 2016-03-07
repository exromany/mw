import React, {Component, PropTypes, ViewPagerAndroid} from 'react-native';
import Page from '../components/Page';

export default class Pages extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape),
  };

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
