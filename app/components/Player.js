import React, {
  Component,
  PropTypes
} from 'react';
import parseMs from 'parse-ms';
import { remote } from 'electron';
import Controls from './Controls';
import styles from './Player.css';
import * as playerEvents from '../constants/supportedEvents';

const registerShortcut = remote.require('electron-localshortcut');

class Player extends Component {
  static propTypes = {
    renderVideo: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    addEventLister: PropTypes.func.isRequired,
    togglePause: PropTypes.func.isRequired,
    nowPlaying: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
    playing: PropTypes.bool.isRequired,
    syncPlayerState: PropTypes.func.isRequired,
    seekForward: PropTypes.func.isRequired,
    seekBackward: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      progress: 0,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    };
  }

  componentDidMount() {
    document.addEventListener('dragover', e => e.preventDefault());
    document.addEventListener('drop', this.onDrop);
    registerShortcut.register('Space', () => {
      this.props.togglePause();
    });
    this.props.renderVideo(this.playerCanvas);
    this.props.addEventLister(playerEvents.POSITION_CHANGED, (position) => {
      this.setState({
        progress: position * 100
      });
    });
    this.props.addEventLister(playerEvents.TIME_CHANGED, (time) => {
      this.setState({
        time: parseMs(time)
      });
    });
    this.props.syncPlayerState();
  }

  componentWillUnmount() {
    document.removeEventListener('dragover', e => e.preventDefault());
    document.removeEventListener('drop', this.onDrop);
  }

  onDrop = (e) => {
    e.preventDefault();
    this.props.play(`file://${e.dataTransfer.files[0].path}`);
  };

  render() {
    return (
      <div>
        <Controls
          progress={this.state.progress}
          {...this.props.nowPlaying}
          togglePause={this.props.togglePause}
          playing={this.props.playing}
          time={this.state.time}
          seekForward={this.props.seekForward}
          seekBackward={this.props.seekBackward}
        />
        <canvas
          className={styles.player}
          ref={(playerCanvas) => { this.playerCanvas = playerCanvas; }}
          id="splayer"
        />
      </div>
    );
  }
}

export default Player;

