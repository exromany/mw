import React, { Component, Image, Text, PropTypes } from 'react-native';
import { Card, Button, COLOR, TYPO } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';

export default class MangaCard extends Component {

  static propTypes = {
    manga: PropTypes.shape({
      title: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
      cover: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.onPressCard = this.onPressCard.bind(this);
  }

  onPressCard() {
    const { manga: { id } } = this.props;
    Actions.manga({ mangaId: id });
  }

  render() {
    const { manga } = this.props;

    return (
      <Card>
        <Card.Media
            image={<Image source={{uri: manga.cover}} />}
            overlay
        >
          <Text numberOfLines={1}
              style={[TYPO.paperFontHeadline, COLOR.paperGrey50]}
          >
            {manga.title}
          </Text>
          <Text numberOfLines={1}
              style={[TYPO.paperSubhead, COLOR.paperGrey50]}
          >
            {manga.genres.join(', ')}
          </Text>
        </Card.Media>
        <Card.Actions position="right">
          <Button
              onPress={this.onPressCard}
              text="Open"
          />
        </Card.Actions>
      </Card>
    );
  }
}
