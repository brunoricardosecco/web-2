import api from './index';

export const getAllCharacters = ({ name }) =>
  api.request({
    method: 'GET',
    url: `/character?name=${name}`,
  });

export const createCharacter = (data) =>
  api.request({
    method: 'POST',
    url: `/character`,
    data,
  });
