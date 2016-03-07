import React, {Component, PropTypes, Text, ScrollView, View, StyleSheet, Image} from 'react-native';
import { Avatar, Ripple } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';

export default class Sites extends Component {
  static propTypes = {
    sites: PropTypes.arrayOf(PropTypes.shape),
  };

  onPress(site) {
    Actions.catalog({ siteId: site.id });
  }

  render() {
    const { sites } = this.props;

    return (
      <ScrollView>
        {sites.map(site =>
          <Ripple key={site.name}
              onPress={this.onPress.bind(this, site)}
          >
            <View style={styles.container}>
              <View style={styles.left}>
                <Avatar image={<Image source={{uri: site.icon}} />} />
              </View>
              <View style={styles.center}>
                <Text>{site.name}</Text>
                <Text>{site.url}</Text>
              </View>
              <View style={styles.right}>
                <Text>{site.lang}</Text>
              </View>
            </View>
          </Ripple>
        )}
      </ScrollView>
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
