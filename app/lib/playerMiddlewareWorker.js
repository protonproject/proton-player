import * as types from '../constants/actionTypes';

export default function worker(action, player) {
  switch (action.type) {
    case types.PLAY:
      return player.play(action.payload.path);
    case types.TOGGLE_PAUSE:
      return player.togglePause();
    case types.RENDER:
      player.renderVideo(action.payload.element);
      return true;
    case types.ADD_PLAYER_EVENT:
      player.addEventListener(action.payload.eventName, action.payload.callback);
      return true;
    case types.MEDIA_CHANGED:
      return player.nowPlaying();
    case types.SEEK_BACKWARD:
      return player.seek(-1 * action.payload.value);
    case types.SEEK_FORWARD:
      return player.seek(action.payload.value);
    default:
      return null;
  }
}
