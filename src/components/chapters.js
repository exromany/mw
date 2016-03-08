import React, { Component, PropTypes, ListView, PullToRefreshViewAndroid } from 'react-native';
import Chapter from './chapter';

export default class Library extends Component {

  static propTypes = {
    chapters: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      chapters: PropTypes.arrayOf(PropTypes.shape),
    }).isRequired,
    onRefresh: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chapters: {
      isFetching: true,
      chapters: [],
    },
  };

  render() {
    const { chapters: { chapters, isFetching }, onRefresh } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(chapters) ;
    const renderItem = chapter => <Chapter key={chapter.link} chapter={chapter}/>;

    return (
      <PullToRefreshViewAndroid
          style={styles.layout}
          refreshing={isFetching}
          onRefresh={onRefresh}
          // colors={['#ff0000', '#00ff00', '#0000ff']}
          // progressBackgroundColor={'#ffff00'}
      >
        <ListView
            dataSource={dataSource}
            renderRow={renderItem}
        />
      </PullToRefreshViewAndroid>
    );
  }
}

const styles = React.StyleSheet.create({
  layout: {
    flex: 1,
  },
});
