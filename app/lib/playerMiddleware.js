import worker from './playerMiddlewareWorker';
import SPlayer from '../lib/SPlayer';

const vp = new SPlayer({ debug: true });

const playerMiddleware = player => store => next => action => { //eslint-disable-line no-unused-vars
  if (!action.type.includes('PLAYER')) return next(action);
  return next({
    ...action,
    data: worker(action, player)
  });
};

export default playerMiddleware(vp);
