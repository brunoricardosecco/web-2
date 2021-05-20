import api from './index';

export const authenticate = (data) =>
  api.request({
    method: 'POST',
    url: '/authenticate',
    data,
  });

export const register = (data) =>
  api.request({
    method: 'POST',
    url: '/user',
    data,
  });
