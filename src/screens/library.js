import React, { Component, PropTypes } from 'react-native';
import MangaList from '../components/manga-list';

export default class Library extends Component {

  static propTypes = {
    library: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  render() {
    const { library } = this.props;

    return (
      <MangaList dataSource={library} />
    );
  }

}
