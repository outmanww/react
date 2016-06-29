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

export function getValues(data) {
  return　Object.keys(data).reduce((pre, key) => {
    if (typeof data[key] === 'object') {
      pre[key] = data[key].value;
    }
    return pre;
  }, {});
}

export function validatSelectBox(value) {
  if (typeof value !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  return { value: value, status: 1, message: '' };
}

export function validatSelectBoxRequired(value) {
  if (typeof value !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (value === "" || value === "default") {
    return { value: value, status: 2, message: 'required' };
  }

  return { value: value, status: 1, message: '' };
}


// Lecture
export function validatLectureTitle(title) {
  if (typeof title !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (title.length === 0) {
    return { value: title, status: 2, message: 'required' };
  }

  if (title.length > 30) {
    return { value: title, status: 2, message: 'max:30'};
  }

  return { value: title, status: 1, message: '' };
}

export function validatLectureCode(code) {
  if (typeof code !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (code.match(/[^A-Za-z0-9]+/)) {
    return { value: code, status: 2, message: 'alphaNum'};
  }

  if (code.length > 15) {
    return { value: code, status: 2, message: 'max:15'};
  }

  return { value: code, status: 1, message: '' };
}

export function validatLecturePlace(place) {
  if (typeof place !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (place.length > 30) {
    return { value: place, status: 2, message: 'max:30'};
  }

  return { value: place, status: 1, message: '' };
}

export function validatLectureLength(length) {
  if (typeof length !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (length.match(/[^0-9]+/)) {
    return { value: place, status: 2, message: 'num'};
  }

  return { value: length, status: 1, message: '' };
}

export function validatLectureDescription(description) {
  if (typeof description !== 'string') {
    throw new Error(`Invalid argument supplied, expect string`);
  }

  if (description.length > 120) {
    return { value: description, status: 2, message: 'max:120'};
  }

  return { value: description, status: 1, message: '' };
}







  // if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
  // if (pass.match(/^[a-z\d]{6,20}$/)) {
  // } else if (pass.match(/^[a-z\d]{1,5}$/)) {
