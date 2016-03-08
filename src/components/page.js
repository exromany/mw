import React, { Component, View, Image, StyleSheet, PropTypes, PanResponder, Dimensions } from 'react-native';
// import Orientation from 'react-native-orientation';

export default class Page extends Component {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });
    this._previous = {
      left: 0,
      top: 0,
    };
    this._translation = {
      left: this._previous.left,
      top: this._previous.top,
    };
    const {width, height} = Dimensions.get('window');
    this._bound = {
      top: 0,
      left: 0,
      right: width - this.props.source.width,
      bottom: height - this.props.source.height,
    };
  }

  _panResponder: {};
  _previous: {};
  _translation: {};
  _bound: {};
  img: null;

  _updatePosition() {
    this.img && this.img.setNativeProps({style: this._translation});
  }

  _handleStartShouldSetPanResponder() {
    return false;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    if (this._previous.left === this._bound.left) {
      if (gestureState.dx > 0)
        return false;
    } else if (this._previous.left === this._bound.right) {
      if (gestureState.dx < 0)
        return false;
    }
    return true;
  }

  _handlePanResponderMove(e, gestureState) {
    this._translation.left = this._previous.left + gestureState.dx;
    this._translation.top = this._previous.top + gestureState.dy;

    if (this._translation.left > this._bound.left) {
      this._translation.left = this._bound.left;
      this._previous.left = this._bound.left;
      gestureState.dx = 0;
    }
    if (this._translation.left < this._bound.right) {
      this._translation.left = this._bound.right;
      this._previous.left = this._bound.right;
      gestureState.dx = 0;
    }

    if (this._translation.top > this._bound.top) {
      this._translation.top = this._bound.top;
      this._previous.top = this._bound.top;
      gestureState.dy = 0;
    }
    if (this._translation.top < this._bound.bottom) {
      this._translation.top = this._bound.bottom;
      this._previous.top = this._bound.bottom;
      gestureState.dy = 0;
    }

    this._updatePosition();
  }

  _handlePanResponderEnd(e, gestureState) {
    this._previous.left += gestureState.dx;
    this._previous.top += gestureState.dy;
  }

  render() {
    const { source } = this.props;
    const getRef = img => this.img = img;

    return (
      <View collapsable={false}
          style={styles.container}
      >
        <Image ref={getRef}
            source={source}
            style={styles.page}
            {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A37472',
    flex: 1,
  },
  page: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
