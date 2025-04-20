/* eslint-disable import/no-mutable-exports */
import { store } from '@store';

export let domain = '';
export let tagName = store.getState().auth?.baseTagName;

export const setDomainApp = (newDomain) => {
  domain = newDomain;
};

export const setTagNameApp = (newTagName) => {
  tagName = newTagName;
};
