import React, {Component, PropTypes, View, ScrollView, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-material-design';

import MangaInfo from '../components/manga-info';
import { fetchInfo } from '../redux/actions/catalog';
import { addManga } from '../redux/actions/library';

export default class catalog extends Component {
  static propTypes = {
    catalog: PropTypes.shape({
      info: PropTypes.shape(),
      isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    site: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.onAddPress = this.onAddPress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
  }

  componentDidMount() {
    const { dispatch, link, site } = this.props;
    dispatch(fetchInfo(site.id, link));
  }

  goBack() {
    const { site } = this.props;
    Actions.catalog({ siteId: site.id });
  }

  onAddPress() {
    const { dispatch, catalog: { info } } = this.props;
    dispatch(addManga(info));
    this.goBack();
  }

  onCancelPress() {
    this.goBack();
  }

  renderContent() {
    const { catalog: { info }, site } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <MangaInfo
              manga={info}
              site={site}
          />
        </ScrollView>
        <View style={styles.buttonsBar}>
          <Button
              onPress={this.onCancelPress}
              text="Cancel"
          />
          <Button
              onPress={this.onAddPress}
              text="Add"
          />
        </View>
      </View>
    );
  }

  render() {
    const { catalog: { info, isFetching } } = this.props;

    return (
      <View style={styles.container}>
        {(isFetching || !info
          ? <Text>Loading...</Text>
          : this.renderContent()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});
