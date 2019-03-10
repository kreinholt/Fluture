import {cons, cat, nil} from './list';
import mediator from './mediator';

/* istanbul ignore next: non v8 compatibility */
export var captureStackTrace = Error.captureStackTrace || captureStackTraceFallback;

export function captureContext(previous, tag, fn){
  return mediator.debug(function debugCaptureContext(){
    var context = {
      tag: tag,
      name: ' from ' + tag + ':',
    };
    captureStackTrace(context, fn);
    return cat(previous, cons(context, nil));
  }) || previous;
}

export function captureStackTraceFallback(x){
  var e = new Error;
  /* istanbul ignore else: non v8 compatibility */
  if(typeof e.stack === 'string'){
    x.stack = x.name + '\n' + e.stack.split('\n').slice(1).join('\n');
  }else{
    x.stack = x.name;
  }
}
