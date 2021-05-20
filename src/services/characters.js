import api from './index';

export const getAllCharacters = ({ name }) =>
  api.request({
    method: 'GET',
    url: `/character?name=${name}`,
  });
