/**
 * @flow
 */
import * as types from '../constants/actionTypes';
import * as events from '../constants/supportedEvents';

type Action = {
  type: string,
  payload: ?Object
};

type CommandAction = {
  type: string
};

export function play(path: string): Action {
  return {
    type: types.PLAY,
    payload: {
      path
    }
  };
}

export function togglePause(): CommandAction {
  return {
    type: types.TOGGLE_PAUSE
  };
}

export function renderVideo(element: HTMLElement): Action {
  return {
    type: types.RENDER,
    payload: {
      element
    }
  };
}

export function addEventLister(eventName: string, callback: Function): Action {
  return {
    type: types.ADD_PLAYER_EVENT,
    payload: {
      eventName,
      callback
    }
  };
}

export function updatePlaybackStatus(value: boolean): Action {
  return {
    type: types.PLAYBACK_STATUS_CHANGED,
    payload: {
      playing: value
    }
  };
}
export function updateNowPlying(): CommandAction {
  return {
    type: types.MEDIA_CHANGED
  };
}

export function syncPlayerState() {
  return (dispatch: Function) => {
    dispatch(addEventLister(events.PLAYING, () => {
      dispatch(updatePlaybackStatus(true));
    }));
    dispatch(addEventLister(events.PAUSED, () => {
      dispatch(updatePlaybackStatus(false));
    }));
    dispatch(addEventLister(events.MEDIA_CHANGED, () => {
      dispatch(updateNowPlying(false));
    }));
  };
}

export function seekForward(value: number = 5): Action {
  return {
    type: types.SEEK_FORWARD,
    payload: {
      value
    }
  };
}
export function seekBackward(value: number = 5): Action {
  return {
    type: types.SEEK_BACKWARD,
    payload: {
      value
    }
  };
}
