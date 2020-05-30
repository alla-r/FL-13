const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

// Your code goes here
const addBtn = document.querySelector('#add-btn');
const outputDiv = document.querySelector('#output');
addBtn.addEventListener('click', postData);

function postData() {
  let xhr = new XMLHttpRequest();
  const name = document.querySelector('#name').value;
  const username = document.querySelector('#username').value;
  const body = {
    name: name,
    username: username
  };

  xhr.onload = function() {
    if (this.status === 201) {
      alert('User is successfully added');
    } else {
      console.error(this.status);
    }
  }
  xhr.open('POST', baseUrl + '/users');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(body));
}

function getData () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status === 200) {
        document.getElementById('loading').style.display = 'none';
        const data = JSON.parse(xhr.response);
        for (let i = 0; i < data.length; i++) {
          const div = document.createElement('div');
          div.innerHTML = `
          <input type="text" class="user-id" value="${data[i].id}">
          <input type="text" class="user-name" placeholder="Full Name" value="${data[i].name}">
          <input type="text" class="user-username" placeholder="Name" value="${data[i].username}">
          <button type="submit" class="update-btn">Update</button>
          <button type="submit" class="delete-btn">Delete</button>
          `
          outputDiv.appendChild(div);
        }
        resolve();
      }
    }
    xhr.onerror = () => reject(xhr.status);
    xhr.open('GET', baseUrl + '/users');
    xhr.send();
  });
}

getData()
  .then(addEventListenerOnBtn)
  .catch(function(err) {
    console.log(err);
  });


function addEventListenerOnBtn () {
  const updateBtnList = document.querySelectorAll('.update-btn');
  updateBtnList.forEach(el => {
    el.addEventListener('click', () => putData(el));
  });
  const deleteBtnList = document.querySelectorAll('.delete-btn');
  deleteBtnList.forEach(el => {
    el.addEventListener('click', () => deleteData(el));
  });
}

function putData(el) {
  const userId = el.parentNode.querySelector('.user-id').value;
  let xhr = new XMLHttpRequest();
  const name = el.parentNode.querySelector('.user-name').value;
  const username = el.parentNode.querySelector('.user-username').value;
  const body = {
    name: name,
    username: username
  };

  xhr.onload = function() {
    if (this.status === 204) {
      console.log(body);
    } else {
      console.error(this.status);
    }
  }
  xhr.onerror = function() {
    console.log('Something went wrong during updating data');
  }
  xhr.open('PUT', baseUrl + `/users/${userId}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(body));
}

function deleteData(el) {
  const userId = el.parentNode.querySelector('.user-id').value;
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 204) {
      alert('User is successfully deleted');
    } else {
      console.error(this.status);
    }
  }
  xhr.onerror = function() {
    console.log('Something went wrong during deleting data');
  }
  xhr.open('DELETE', baseUrl + `/users/${userId}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'admin');
  xhr.send();
}