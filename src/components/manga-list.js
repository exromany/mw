import React, { Component, ScrollView, View, PropTypes, StyleSheet, ListView } from 'react-native';
import MangaCard from './manga-card';
import MangaItem from './manga-item';

export default class MangaList extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape).isRequired,
    itemsInRow: PropTypes.number,
    onMangaPress: PropTypes.func,
    type: PropTypes.string,
  };

  static defaultProps = {
    itemsInRow: 2,
  };

  render() {
    // TODO: try do not separate rows but set item width
    const { dataSource, itemsInRow, type, onMangaPress } = this.props;
    const rows = [];

    const renderItem = item => (
      <MangaCard manga={item} />
    );

    for (let i = 0, j = dataSource.length; i < j; i += itemsInRow) {
      let row = dataSource.slice(i, i + itemsInRow);
      if (row.length < itemsInRow) {
        row = row.concat(Array(itemsInRow - row.length).fill(null));
      }
      rows.push(row);
    }

    if (type === 'list') {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const dataSource1 = ds.cloneWithRows(dataSource) ;
      const renderItem = (item, itemIndex) =>
        <MangaItem key={itemIndex} manga={item} onMangaPress={onMangaPress}/>;

      return (
        <ListView dataSource={dataSource1} renderRow={renderItem} />
      );
    }

    return (
      <ScrollView style={styles.column}>
        {rows.map((row, rowIndex) =>
          <View key={rowIndex}
              style={styles.row}
          >
            {row.map((item, itemIndex) =>
              <View key={itemIndex}
                  style={styles.item}
              >
                {item ? renderItem(item) : null}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    flex: 1,
  },
});
