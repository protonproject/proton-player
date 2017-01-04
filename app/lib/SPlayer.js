/**
 * @flow
 */

import wcjs from 'wcjs-prebuilt';
import render from 'wcjs-renderer';
import * as supportedEvents from '../constants/supportedEvents';

class Player {
  vlc: Object;
  options: Object;
  eventNames: Array<string>;

  constructor(options: Object = {}) {
    this.options = options;
    this.vlc = wcjs.createPlayer();
    this.eventNames = Object.keys(supportedEvents).map(key => supportedEvents[key]);
    this.vlc.playlist.mode = this.vlc.playlist.Loop;
    if (this.options.debug) {
      window.player = this;
      console.log(`Debug mode wcjs ${this.vlc.vlcVersion}`); //eslint-disable-line
    }
  }

  renderVideo = (element: HTMLElement, options: Object = {}) => {
    render.bind(element, this.vlc, options);
  };

  play = (file: string): Object | any => {
    const item = this.addToPlaylist(file);
    this.vlc.playlist.playItem(item);
    return this.nowPlaying();
  };

  nowPlaying = (): Object => this.vlc.playlist.items[this.vlc.playlist.currentItem];

  addToPlaylist = (item: string): number => this.vlc.playlist.add(item);

  getPlayListItems = (): Array<Object> => {
    const count = this.vlc.playlist.items.count;
    const items = [];
    for (let i = 0; i < count; i += 1) {
      items.push(this.vlc.playlist.items[i]);
    }
    return items;
  };

  togglePause = (): boolean => {
    this.vlc.togglePause();
    return this.isPlaying();
  };

  isPlaying = (): boolean => !this.vlc.playing;

  isMute = (): boolean => this.vlc.mute;

  getPosition = (): number => this.vlc.position * 100;

  setPosition = (value: number): number => (this.vlc.position = (value / 100));

  addEventListener = (eventName: string, callback: Function) => {
    if (this.eventNames.includes(eventName)) {
      this.vlc[eventName] = callback;
    } else {
      throw Error(`${eventName} is a not a valid player event`);
    }
  }

}

export default Player;
