import React, {Component, View, Text, StyleSheet, PropTypes} from 'react-native';
import {Checkbox, Icon} from 'react-native-material-design';

export default class Chapter extends Component {

  static propTypes = {
    chapter: PropTypes.shape(),
  };

  render() {
    const {chapter} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Checkbox
              label="I agree to the terms and conditions"
              value="accepted"
          />
        </View>
        <View style={styles.center}>
          <Text>{chapter.title}</Text>
          <Text>{chapter.date}</Text>
        </View>
        <View style={styles.right}>
          <Icon name="download"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  left: {

  },
  center: {

  },
  right: {

  },
});
