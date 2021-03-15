import api from './index';

export const getAllCharacters = () =>
  api.request({
    method: 'GET',
    url: '/characters',
  });
