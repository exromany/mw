import React, {Component, PropTypes, Text, View, StyleSheet, Image} from 'react-native';
import { Avatar } from 'react-native-material-design';

export default class Sites extends Component {

  static propTypes = {
    manga: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      cover: PropTypes.string,
    }).isRequired,
    site: PropTypes.shape({
      icon: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { manga, site } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text>{manga.title}</Text>
          <Text>{manga.authors.join(', ')}</Text>
        </View>
        <Avatar image={<Image source={{uri: site.icon}} />} />
        <Avatar image={<Image source={{uri: manga.cover}} />} />
        <View>
          <Text>{manga.genres.join(', ')}</Text>
          <Text>{manga.summary}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
