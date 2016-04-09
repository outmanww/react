import { connect } from '../../config/validation';

export function format(columns) {
  if (typeof columns !== 'object') {
    throw new Error(`Invalid argument supplied, expected typeof object`);
  }
  if (columns === null) {
    throw new Error(`Argument should not be null`);
  }

  let formated = new Object();

  if (Array.isArray(columns)) {
    formated = columns.reduce((pre, column) => {
      pre[column] = { value: '', status: 0, message: '' };
      return pre;
    }, {});

  } else {
    formated = Object.keys(columns).reduce((pre, key) => {
      pre[key] = { value: columns[key], status: 0, message: '' };
      return pre;
    }, {});      
  } 

  return formated;
}

// Lecture
export function validatLectureName(name) {
  if (typeof name !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (name.length === 0) {
    return { value: name, status: 2, message: 'required' };
  }

  if (name.length > 8) {
    return { value: name, status: 2, message: 'max:8'};
  }

  return { value: name, status: 1, message: '' };
}

export function validatLectureCode(code) {
  if (typeof code !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (code.length === 0) {
    return { value: code, status: 2, message: 'required' };
  }

  if (code.match(/[^A-Za-z0-9]+/)) {
    return { value: code, status: 2, message: 'alphaNum'};
  }

  if (code.length > 8) {
    return { value: code, status: 2, message: 'max:8'};
  }

  return { value: code, status: 1, message: '' };
}


export function validatLecturePlace(place) {
  if (typeof place !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (place.length === 0) {
    return { value: place, status: 2, message: 'required' };
  }

  if (place.length > 20) {
    return { value: place, status: 2, message: 'max:16'};
  }

  return { value: place, status: 1, message: '' };
}


export function validatTypeDesc(desc) {
  if (desc.length === 0) {
    return { value: desc, status: 2, message: 'required' };
  }

  if (desc.length > 120) {
    return { value: desc, status: 2, message: 'max:120'};
  }

  return { value: desc, status: 1, message: '' };
}


  // if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
  // if (pass.match(/^[a-z\d]{6,20}$/)) {
  // } else if (pass.match(/^[a-z\d]{1,5}$/)) {
