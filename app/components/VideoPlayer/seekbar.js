import React, { Component, PropTypes } from 'react'
import { withMediaProps } from 'react-media-player'

class SeekBar extends Component {
  _isPlayingOnMouseDown = false
  _onChangeUsed = false

  shouldComponentUpdate({ media }) {
    return this.props.media.currentTime !== media.currentTime ||
           this.props.media.duration !== media.duration
  }

  _handleMouseDown = () => {
    this._isPlayingOnMouseDown = this.props.media.isPlaying;
    this.props.media.pause();
  };

  _handleMouseUp = ({ target: { value } }) => {
    // seek on mouseUp as well because of this bug in <= IE11
    // https://github.com/facebook/react/issues/554
    if (!this._onChangeUsed) {
      this.props.media.seekTo(+value)
    }

    // only play if media was playing prior to mouseDown
    if (this._isPlayingOnMouseDown) {
      this.props.media.play();
    }
  };

  _handleChange = ({ target: { value } }) => {
    this.props.media.seekTo(+value);
    this._onChangeUsed = true
  };

  render() {
    const { className, style, media } = this.props;
    const { duration, currentTime } = media;
    return (
      <input
        type="range"
        step="any"
        max={(duration).toFixed(4)}
        value={currentTime}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        onChange={this._handleChange}
        className={className}
        style={{
          backgroundSize: (currentTime * 100 / duration) + '% 100%',
          ...style
        }}
      />
    )
  }
}

export default withMediaProps(SeekBar)