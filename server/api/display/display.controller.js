'use strict';

import jsonpatch from 'fast-json-patch';
import DisplayEvents from './display.events';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

var display = [
  'a ą b c ć d e ę f g h i j k l ',
  'ł m n ń o ó p r s ś t u w x y ',
  'z ż ź _                       ',
  '0 1 2 3 4 5 6 7 8 9           ',
  'a ą b c ć d e ę f g h i j k l ',
  'ł m n ń o ó p r s ś t u w x y ',
  'z ż ź _                       ',
  '                              ',
  'a ą b c ć d e ę f g h i j k l ',
  'ł m n ń o ó p r s ś t u w x y ',
];

export function get(req, res) {
  res.send(display);
}

export function post(req, res) {
  console.log('New display!')
  display = req.body;
  res.end('it worked!');
  DisplayEvents.emit('save', display);
}
