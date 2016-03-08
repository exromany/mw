import React, {Component, View, Text, StyleSheet, PropTypes} from 'react-native';
import { Icon, Ripple } from 'react-native-material-design';

export default class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.shape().isRequired,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { chapter, onPress } = this.props;
    onPress(chapter);
  }

  render() {
    const {chapter} = this.props;
    return (
      <Ripple onPress={this.onPress}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Icon name="check-box-outline-blank"/>
          </View>
          <View style={styles.center}>
            <Text numberOfLines={1}>{chapter.title}</Text>
            <Text>{chapter.data}</Text>
          </View>
          <View style={styles.right}>
            <Icon name="file-download"/>
          </View>
        </View>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  left: {
    alignSelf: 'center',
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  right: {
    alignSelf: 'center',
  },
});
