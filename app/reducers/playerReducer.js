/**
 * @flow
 */
import * as types from '../constants/actionTypes';

/**
 *
 * @param state
 * @param action
 * @returns {Object}
 */
export default function (state: Object = {}, action: Object): Object {
  switch (action.type) {
    case types.PLAY:
      return {
        ...state,
        playing: true,
        nowPlaying: action.data
      };
    case types.PLAYBACK_STATUS_CHANGED:
      return {
        ...state,
        playing: action.payload.playing
      };
    default:
      return state;
  }
}
