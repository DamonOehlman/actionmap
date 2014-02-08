var EventEmitter = require('events').EventEmitter;

/** 
  # actionmap

  A module that is designed to work with
  [game-shell](https://github.com/mikolalysenko/game-shell) and allow simple
  intelligent processing of game keys against particular targets.

  ## Example Usage

  TODO
**/

module.exports = function(defs) {
  // initialise the event emitter
  var actions = new EventEmitter();
  var actionNames = Object.keys(defs);

  actions.process = function(shell, targets) {
    var currentActions = actionNames.filter(function(name) {
      return shell.wasDown(name);
    }).map(function(name) { return defs[name]; });

    // if we have no current actions, abort
    if (currentActions.length === 0) {
      return;
    }

    // apply the actions to the targets
    targets.forEach(function(target) {
      currentActions.forEach(function(action) {
        action.call(target);
      });
    });
  };

  return actions;
};