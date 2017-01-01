import React, {
  Component,
  PropTypes
} from 'react';
import { Line } from 'rc-progress';
import styles from './Controls.css';

class Controls extends Component {
  static propTypes = {
    title: PropTypes.string,
    progress: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-2 col-lg-1">
            <div className={`box ${styles.buttons}`}>
              <i className="icon-control-rewind"/>
              <i className="icon-control-play"/>
              <i className="icon-control-forward"/>
            </div>
          </div>
          <div className="col-xs-8 col-lg-10">
            <p className={styles.title}>{this.props.title}</p>
            <Line
              percent={this.props.progress}
              strokeWidth="0.5"
              strokeColor="rgba(217, 217, 217, 0.6)"
              trailWidth="0.6"
              trailColor="rgba(217, 217, 217, 0.4)"
              strokeLinecap="square"
            />
          </div>
          <div className="col-xs-2 col-lg-1">
            <div className="box">
              <i className="icon-volume-2"/>
              <i className="icon-settings"/>
              <i className="icon-list"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
