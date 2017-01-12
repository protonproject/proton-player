import React, {
  Component,
  PropTypes
} from 'react';
import { Line } from 'rc-progress';
import styles from './Controls.css';

class Controls extends Component {
  static propTypes = {
    title: PropTypes.string,
    progress: PropTypes.number.isRequired,
    togglePause: PropTypes.func.isRequired,
    seekForward: PropTypes.func.isRequired,
    seekBackward: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired
  };

  forward = (e) => {
    this.props.seekForward();
  };

  backward = (e) => {
    this.props.seekBackward();
  };

  render() {
    return (
      <div className={styles.container}>
        <div className="row middle-lg middle-xs center-xs ">
          <div className={`col-lg-8 ${styles.floating}`}>
            <p className={styles.title}>{this.props.title || 'Ohe!'}</p>
          </div>
        </div>
        <div className={`row ${styles.controlPanel}`}>
          <div className="col-xs-4 col-md-3 col-lg-2 center-xs center-lg middle-xs middle-lg">
            <div className="box icon-container large-icons center-block">
              <button className="button" onClick={this.backward}><i className="icon-control-rewind"/></button>
              <button className="button" onClick={this.props.togglePause}>
                <i
                  className={this.props.playing ? 'icon-control-pause' : 'icon-control-play'}
                />
              </button>
              <button className="button" onClick={this.forward}><i className="icon-control-forward"/></button>
            </div>
          </div>
          <div className="col-xs-5 col-md-6 col-lg-8 middle-xs middle-lg">
            <Line
              percent={this.props.progress}
              strokeWidth="0.5"
              strokeColor="rgba(217, 217, 217, 0.6)"
              trailWidth="0.6"
              trailColor="rgba(217, 217, 217, 0.4)"
              strokeLinecap="square"
            />
            <div>
              {`${this.props.time.hours} : ${this.props.time.minutes} : ${this.props.time.seconds}`}
            </div>
          </div>
          <div className="col-xs-3 col-md-3 col-lg-2 center-lg center-xs middle-lg middle-xs">
            <div className="box icon-container medium-icons center-block">
              <button className="button"><i className="icon-volume-2"/></button>
              <button className="button"><i className="icon-settings"/></button>
              <button className="button"><i className="icon-list"/></button>
            </div>
          </div>
        </div>
      < / div >
    );
  }
}

export default Controls;
