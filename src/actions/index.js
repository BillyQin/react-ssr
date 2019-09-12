const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createActionTypes = (base) => {
  const res = {};
  const instructions = [REQUEST, SUCCESS, FAILURE];
  instructions.forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
};

const action = (type, payload = {}) => ({ type, ...payload });

export const HOT = createActionTypes('HOT');

export const hot = {
  request: (name) => action(HOT.REQUEST, { name }),
  success: (name, response) => action(HOT.SUCCESS, { name, response }),
  failure: (name, error) => action(HOT.FAILURE, { name, error })
};
