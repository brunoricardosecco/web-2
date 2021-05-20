import api from './index';

export const getAllCharacters = ({ characterName = '' } = '') =>
  api.request({
    method: 'GET',
    url: `/character`,
  });
