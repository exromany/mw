import React, { Component, PropTypes } from 'react-native';
import Image from 'react-native-image-zoom';

export default class Page extends Component {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const { source } = this.props;

    return (
      <Image
          scale={1}
          source={source}
      />
    );
  }
}
