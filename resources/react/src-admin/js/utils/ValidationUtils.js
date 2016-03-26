function validatUserId(userId) {
  if (userId.length === 0) {
    return {
      value: userId,
      status: 'error',
      message: 'validation.userId.required'
    };
  } else if (userId.length > 0) {
    return {
      value: userId,
      status: '',
      message: ''
    };
  }
}

function validatEmail(email) {
  if (email.length === 0) {
    return {
      value: email,
      status: 'error',
      message: 'validation.email.required'
    };
  }
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
    return {
      value: email,
      status: '',
      message: ''
    };
  } else {
    return {
      value: email,
      status: 'error',
      message: 'validation.email.notMatch'
    };
  }
}

function validatPassword(pass) {
  if (pass.length === 0) {
    return {
      value: pass,
      status: 'error',
      message: 'validation.password.required'
    };
  }
  if (pass.match(/^[a-z\d]{6,20}$/)) {
    return {
      value: pass,
      status: '',
      message: ''
    };
  } else if (pass.match(/^[a-z\d]{1,5}$/)) {
    return {
      value: pass,
      status: 'error',
      message: 'validation.password.mustOver6'
    };
  } else {
    return {
      value: pass,
      status: 'error',
      message: 'validation.password.mustUnder20'
    };
  }
}

function validatPasswordConf(passConf, pass) {
  if (passConf.length === 0) {
    return {
      value: passConf,
      status: 'error',
      message: 'validation.passwordConfomation.required'
    };
  }
  if (pass === passConf) {
    return {
      value: passConf,
      status: '',
      message: ''
    };
  } else {
    return {
      value: passConf,
      status: 'error',
      message: 'validation.passwordConfomation.notMatch'
    };
  }
}

function validatAge(age) {
  if (age.length === 0) {
    return {
      value: age,
      status: '',
      message: ''
    };
  }
  if (/^[\d]{1,3}$/i.test(age)) {
    return {
      value: age,
      status: '',
      message: ''
    };
  } else {
    return {
      value: age,
      status: 'error',
      message: 'validation.age.notValid'
    };
  }
}

function validatPostalCode(code) {
  if (code.toString().length === 0) {
    return {
      value: code,
      status: '',
      message: ''
    };
  }
  if (/^\d{7}$/i.test(code)) {
    return {
      value: code,
      status: '',
      message: ''
    };
  } else {
    return {
      value: code,
      status: 'error',
      message: 'validation.postalCode.notValid'
    };
  }
}

function validatName(name) {
  if (name.length === 0) {
    return {
      value: name,
      status: 'error',
      message: 'validation.name.required'
    };
  } else if (name.length > 0) {
    return {
      value: name,
      status: '',
      message: ''
    };
  }
}

function validatSort(sort) {
  if (sort.length === 0) {
    return {
      value: sort,
      status: 'error',
      message: 'validation.sort.required'
    };
  } else if (sort.length > 0) {
    return {
      value: sort,
      status: '',
      message: ''
    };
  }
}

function validatFile(file) {
  if (file === '') {
    return {
      value: file,
      status: 'error',
      message: 'validation.file.required'
    };
  } else {
    return {
      value: file,
      status: '',
      message: ''
    };
  }
}

export function validate(type, value1, value2) {
  switch (type) {
    case 'userId': return validatUserId(value1);
    case 'email': return validatEmail(value1);
    case 'password': return validatPassword(value1, value2);
    case 'passwordConfirmation': return validatPasswordConf(value1, value2);
    case 'age': return validatAge(value1);
    case 'postalCode': return validatPostalCode(value1);
    case 'name': return validatName(value1);
    case 'sort': return validatSort(value1);
    case 'file': return validatFile(value1);
    default:
      return {
        value: value1,
        status: '',
        message: ''
      };
  }
}

export function format(string, array = []) {
  const formatedString = string.reduce((request, key) => {
    request[key] = { value: '', status: 'default', message: '' };
    return request;
  }, {});

  const formatedArray = array.reduce((request, key) => {
    request[key] = { value: [], status: 'default', message: '' };
    return request;
  }, {});

  return Object.assign({}, formatedString, formatedArray);
}
