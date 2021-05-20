import api from './index';

export const getUserData = () =>
  api.request({
    method: 'GET',
    url: '/user',
  });
