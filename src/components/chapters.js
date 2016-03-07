import React, { Component, PropTypes, ListView } from 'react-native';

import Chapter from './chapter';

export default class Library extends Component {

  static propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape),
  };

  render() {
    const { chapters } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(chapters) ;
    const renderItem = chapter => <Chapter key={chapter.link} chapter={chapter}/>;

    return (
      <ListView
          dataSource={dataSource}
          renderRow={renderItem}
      />
    );
  }
}
