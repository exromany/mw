import React, { Component, PropTypes, ListView, RefreshControl } from 'react-native';
import Chapter from './chapter';

export default class Library extends Component {

  static propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape),
    isRefreshing: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chapters: [],
  };

  render() {
    const { chapters, onRefresh, onPress, isRefreshing } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(chapters) ;
    const renderItem = chapter => (
      <Chapter
          chapter={chapter}
          key={chapter.link}
          onPress={onPress}
      />
    );

    const refreshControl = (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        tintColor="#ff0000"
        title="Loading..."
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor="#ffff00"
      />
    );

    return (
      <ListView
          dataSource={dataSource}
          refreshControl={refreshControl}
          renderRow={renderItem}
      />
    );
  }
}
