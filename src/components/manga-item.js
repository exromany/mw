import React, {Component, PropTypes, Text, View, StyleSheet, Image} from 'react-native';
import { Avatar, Ripple } from 'react-native-material-design';

export default class Sites extends Component {

  static propTypes = {
    manga: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
    }),
    onMangaPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { manga, onMangaPress } = this.props;
    onMangaPress(manga);
  }

  render() {
    const { manga } = this.props;

    return (
      <Ripple onPress={this.onPress}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Avatar image={<Image source={{uri: manga.cover}} />} />
          </View>
          <View style={styles.center}>
            <Text>{manga.title}</Text>
            <Text numberOfLines={1}>{manga.genres.join(', ')}</Text>
          </View>
        </View>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  left: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  center: {
    flex: 1,
  },
  right: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
