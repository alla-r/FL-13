const login = prompt('Login: ');
let password;

// Check login
if (login === null) {
  alert('Canceled');
} else if (login.length < 4 && login) {
  alert('I don\'t know any users having name length less than 4 symbols');
} else {
  switch (login) {
    case '':
      alert('Canceled');
      break;
    case 'User':
    case 'Admin':
      password = prompt('Password: ');
      break;
    default:
      alert('I don\'t know you');
  }
}

// Check password
if (login === 'User' || login === 'Admin') {
  if (login === 'User' && password === 'UserPass') {
    const currentHours = new Date().getHours();
    if (currentHours > 8 && currentHours < 20) {
      alert('Good day, dear User');
    } else {
      alert('Good evening, dear User');
    }
  } else if (login === 'Admin' && password === 'RootPass') {
    const currentHours = new Date().getHours();
    if (currentHours > 8 && currentHours < 20) {
      alert('Good day, dear Admin');
    } else {
      alert('Good evening, dear Admin');
    }
  } else {
    switch (password) {
      case null:
      case '': 
        alert('Canceled');
        break;
      default:
        alert('Wrong password');
    }
  }
}