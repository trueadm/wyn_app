"use strict";

var osname = Ti.Platform.osname;

exports.osname = osname;

exports.os = function (map) {
  var def = map.def || null, //default function or value
    selected;
  if (map[osname]) {
    if (typeof map[osname] === 'function') {
      selected = map[osname]();
    } else {
      selected = map[osname];
    }
  } else {
    if (typeof def === 'function') {
      selected = def();
    } else {
      selected = def;
    }
  }
  return selected;
};

exports.styles = require('styles');
