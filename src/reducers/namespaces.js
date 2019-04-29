/*
Copyright 2019 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { combineReducers } from 'redux';
import keyBy from 'lodash.keyby';

function byName(state = {}, action) {
  switch (action.type) {
    case 'NAMESPACES_FETCH_SUCCESS':
      return keyBy(action.data, 'metadata.name');
    default:
      return state;
  }
}

function selected(state = 'default', action) {
  switch (action.type) {
    case 'NAMESPACE_SELECT':
      return action.namespace;
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case 'NAMESPACES_FETCH_REQUEST':
      return true;
    case 'NAMESPACES_FETCH_SUCCESS':
    case 'NAMESPACES_FETCH_FAILURE':
      return false;
    default:
      return state;
  }
}

function errorMessage(state = null, action) {
  switch (action.type) {
    case 'NAMESPACES_FETCH_FAILURE':
      return action.error.message;
    case 'NAMESPACES_FETCH_REQUEST':
    case 'NAMESPACES_FETCH_SUCCESS':
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  byName,
  errorMessage,
  isFetching,
  selected
});

export function getNamespaces(state) {
  return Object.values(state.byName);
}

export function getSelectedNamespace(state) {
  return state.selected;
}

export function getNamespacesErrorMessage(state) {
  return state.errorMessage;
}

export function isFetchingNamespaces(state) {
  return state.isFetching;
}