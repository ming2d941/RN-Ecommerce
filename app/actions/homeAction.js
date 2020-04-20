/**
 * Created by ARUN
 * on MARCH 05, 2020
 * Loading - Actions for data in home screen 
 */




import * as types from './types';

export function homeRequest() {
  return {
    type: types.GET_HOME_REQUEST
  };
};

export function homeResponse(response) {
  return {
    type: types.GET_HOME_RESPONSE,
    response
  };
};

export function homeFailure() {
  return {
    type: types.GET_HOME_FAILED,
  };
};