// Simplify states, contexts and binding to forms
// ironboy 2022

import { useState, useDebugValue } from 'react';

const savedStates = {};

export function useStates(initObj, contextName) {

  typeof initObj === 'string'
    && ([initObj, contextName] = [contextName, initObj]);

  useDebugValue(contextName || 'local state');

  const [state, setState] = initObj ?
    useState({ state: initObj }) : savedStates[contextName];

  contextName && (savedStates[contextName] = [state, setState]);

  const proxyHandler = {
    get(obj, key) {
      return {
        _isProxy: true,
        bind: (...args) => bind(makeProxy(obj), ...args)
      }[key]
        || makeProxy(obj[key]);
    },
    set(obj, key, val) {
      obj[key] = val;
      setState({ ...state });
      return true;
    },
    deleteProperty(obj, key) {
      delete obj[key];
      setState({ ...state });
      return true;
    }
  };

  const makeProxy = x => x instanceof Object && !x._isProxy ?
    new Proxy(x, proxyHandler) : x;

  return makeProxy(state.state);
}

function bind(obj, name, value = obj[name], altValue) {
  return {
    name,
    value,
    checked: obj[name] === value,
    onChange: ({ target: t }) =>
      t.type === 'checkbox' ?
        obj[name] = t.checked ? value : altValue :
        obj[name] = t.type === 'number' ?
          (isNaN(+t.value) ? t.value : +t.value) : t.value
  }
}