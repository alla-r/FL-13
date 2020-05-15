const root = document.getElementById('root');

// from localStorage
let data;
if (!localStorage.getItem('booksUpdate')) {
  data = JSON.parse(localStorage.getItem('books'));
} else {
  data = JSON.parse(localStorage.getItem('booksUpdate'));
}

// Отрисовка статик части
function staticSide () {
  const staticSide = document.createElement('div');
  staticSide.id = 'static-side';
  staticSide.className = 'container';
  //static side
  const title = document.createElement('h1');
  title.innerHTML = 'Book List';
  title.id = 'main-title';
  const staticBookList = document.createElement('ul');
  staticBookList.id = 'book-list';
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li');
    li.className = 'book-item flex-container';
    li.id = `${i}`;
    const a1 = document.createElement('a');
    a1.setAttribute('href', `?id=${i}#preview`);
    a1.className = 'book-link';
    a1.innerHTML = `${data[i].name}`;
    const a2 = document.createElement('a');
    a2.setAttribute('href', `?id=${i}#edit`);
    a2.className = 'btn edit-btn';
    a2.innerHTML = 'Edit';
    li.append(a1, a2);
    staticBookList.append(li);
  }
  const addButton = document.createElement('a');
  addButton.setAttribute('href', '#add');
  addButton.className = 'btn add-btn';
  addButton.innerHTML = 'Add new book';
  staticSide.append(title, staticBookList, addButton);
  root.append(staticSide);
  let dynamicSide;
  if (!document.querySelector('#dynamic-side')) {
    dynamicSide = document.createElement('div');
    dynamicSide.id = 'dynamic-side';
    dynamicSide.className = 'container';
    root.append(dynamicSide);
  }
  // OPENING PAGES
  const editBtnList = Array.from(document.querySelectorAll('.edit-btn'));
  editBtnList.forEach( btn => {
    const id = btn.parentNode.id;
    const href = btn.getAttribute('href');
    btn.addEventListener('click', e => {
      const state = {
        edit: `${id}`
      }
      e.preventDefault();
      history.pushState(state, ``, `${href}`);
      showEditBook(id);
    });
  });
  const bookItemList = Array.from(document.querySelectorAll('.book-link'));
  bookItemList.forEach( btn => {
    const id = btn.parentNode.id;
    const href = btn.getAttribute('href');
    btn.addEventListener('click', e => {
      const state = {
        preview: `${id}`
      }
      e.preventDefault();
      history.pushState(state, ``, `${href}`);
      showPreviewBook(id);
    });
  });
  addButton.addEventListener('click', e => {
    e.preventDefault();
    const href = addButton.getAttribute('href');
    const state = {
      add: `add`
    }
    history.pushState(state, ``, `/index.html${href}`);
    showAddBook();
  });

  return staticSide;
}

// Book edit
function showEditBook (id) {
  const dynamicSide = document.querySelector('#dynamic-side');
  dynamicSide.innerHTML = '';
  const title = document.createElement('h2');
  title.innerHTML = 'Edit Book';
  title.className = 'title';
  const form = document.createElement('form');
  const bookNameInput = document.createElement('input');
  bookNameInput.setAttribute('type', 'text');
  bookNameInput.setAttribute('value', `${data[id].name}`);
  bookNameInput.required = true;
  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('value', `${data[id].author}`);
  authorInput.required = true;
  const imgURLInput = document.createElement('input');
  imgURLInput.setAttribute('type', 'text');
  imgURLInput.setAttribute('value', `${data[id].image}`);
  imgURLInput.required = true;
  const plotInput = document.createElement('textarea');
  plotInput.setAttribute('type', 'text');
  //plotInput.setAttribute('value', `${data[0].plot}`);
  plotInput.innerHTML = `${data[id].plot}`;
  plotInput.required = true;

  const cancelSaveDiv = document.createElement('div');
  cancelSaveDiv.className = 'flex-container cns-save-btn';
  const cancelBtn = document.createElement('a');
  cancelBtn.className = 'btn add-btn cancel-btn';
  cancelBtn.innerHTML = 'Cancel';
  const saveBtn = document.createElement('a');
  saveBtn.className = 'btn edit-btn save-btn';
  saveBtn.innerHTML = 'Save';
  cancelSaveDiv.append(cancelBtn, saveBtn);
  form.append(bookNameInput, authorInput, imgURLInput, plotInput, cancelSaveDiv);
  dynamicSide.append(title, form);

  // cancel-btn
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('Discard changes?');
    if (result) {
      window.history.back();
    } else {
      return;
    }
  });

  // save-btn
  saveBtn.addEventListener('click', e => {
    e.preventDefault();
    data[id].name = bookNameInput.value;
    data[id].author = authorInput.value;
    data[id].image = imgURLInput.value;
    data[id].plot = plotInput.value;
    // localStorage.clear();
    localStorage.setItem('booksUpdate', JSON.stringify(data));
    const staticSideOld = document.querySelector('#static-side');
    const staticSideNew = staticSide();
    const parent = staticSideOld.parentNode;
    parent.replaceChild(staticSideNew, staticSideOld);
    showPreviewBook(id);

    setTimeout(() => {
      alert('Book successfully updated!');
    }, 300);
  });
}

function showAddBook () {
  const lastId = data.length; 
  const dynamicSide = document.querySelector('#dynamic-side');
  dynamicSide.innerHTML = '';
  const title = document.createElement('h2');
  title.innerHTML = 'Add Book';
  title.className = 'title';
  const form = document.createElement('form');
  const bookNameInput = document.createElement('input');
  bookNameInput.setAttribute('type', 'text');
  bookNameInput.setAttribute('placeholder', `Book's name`);
  bookNameInput.required = true;
  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('placeholder', `Author`);
  authorInput.required = true;
  const imgURLInput = document.createElement('input');
  imgURLInput.setAttribute('type', 'text');
  imgURLInput.setAttribute('placeholder', `URL of image`);
  imgURLInput.required = true;
  const plotInput = document.createElement('textarea');
  plotInput.setAttribute('type', 'text');
  plotInput.setAttribute('placeholder', `Plot`);
  // plotInput.innerHTML = `${data[0].plot}`;
  plotInput.required = true;
  
  const cancelSaveDiv = document.createElement('div');
  cancelSaveDiv.className = 'flex-container cns-save-btn';
  const cancelBtn = document.createElement('a');
  cancelBtn.className = 'btn add-btn cancel-btn';
  cancelBtn.innerHTML = 'Cancel';
  const saveBtn = document.createElement('a');
  saveBtn.className = 'btn edit-btn save-btn';
  saveBtn.innerHTML = 'Save';
  cancelSaveDiv.append(cancelBtn, saveBtn);
  form.append(bookNameInput, authorInput, imgURLInput, plotInput, cancelSaveDiv);
  dynamicSide.append(title, form);

  // cancel-btn
  cancelBtn.addEventListener('click', () => {
    const result = confirm('Discard changes?');
    if (result) {
      window.history.back();
    } else {
      return;
    }
  });

  // save-btn
  saveBtn.addEventListener('click', e => {
    if (!bookNameInput.value || !authorInput || !imgURLInput || !plotInput) {
      alert('All fields are required!');
      return;
    }
    
    e.preventDefault();
    data[lastId] = {};
    data[lastId].name = bookNameInput.value;
    data[lastId].author = authorInput.value;
    if (!validURL(imgURLInput.value)) {
      alert('Not valid URL!');
      return;
    }
    data[lastId].image = imgURLInput.value;
    data[lastId].plot = plotInput.value;

    localStorage.setItem('booksUpdate', JSON.stringify(data));

    const staticSideOld = document.querySelector('#static-side');
    const staticSideNew = staticSide();
    const parent = staticSideOld.parentNode;
    parent.replaceChild(staticSideNew, staticSideOld);
    showPreviewBook(lastId);
    history.pushState({preview: `${lastId}`}, ``, `?id=${lastId}#preview`);
   
    setTimeout(() => {
      alert('Book successfully updated!');
    }, 300);
  });
}

function validURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// Book preview 
function showPreviewBook (id) {
  const dynamicSide = document.querySelector('#dynamic-side');
  dynamicSide.innerHTML = '';
  const bookName = document.createElement('p');
  bookName.innerHTML = `${data[id].name}`;
  bookName.className = 'book-name';
  const author = document.createElement('p');
  author.innerHTML = `${data[id].author}`;
  author.className = 'book-author';
  const img = document.createElement('img');
  img.setAttribute('src', `${data[id].image}`);
  img.setAttribute('alt', `Image of ${data[id].name} book`);
  const plot = document.createElement('div');
  plot.className = 'plot';
  plot.innerHTML = `${data[id].plot}`;
  dynamicSide.append(bookName, author, img, plot);
}

// btn back and forward
window.addEventListener('popstate', function(e) {
  if (e.state === null) {
    const dynamicSide = document.querySelector('#dynamic-side');
    dynamicSide.innerHTML = '';
  } else if (e.state.add) {
    showAddBook();
  } else if (e.state.preview) {
    showPreviewBook(e.state.preview);
  } else if (e.state.edit) {
    showEditBook(e.state.edit);
  }
});

// Manually changing URL
window.addEventListener('load', () => {
  isURLvalid(location.search, location.hash);
});

function isURLvalid (fPart, sPart) {
  const aList = document.querySelectorAll('a');
  let hrefList = [];
  let idList = [];
  aList.forEach((el, i) => {
    hrefList[i] = el.getAttribute('href');
    idList[i] = el.parentNode.getAttribute('id');
  });
  let secondPartURLlist = [];
  hrefList.forEach( (el,i) => {
    secondPartURLlist[i] = '#' + hrefList[i].split('#')[1];
  });

  const newFPart = fPart.split('=')[1];
  const condition1 = idList.includes(newFPart);
  const condition2 = secondPartURLlist.includes(sPart);
  
  if (condition1 && condition2) {
    if (sPart.slice(1) === 'edit') {
      const state = {
        edit: `${newFPart}`
      }
      history.pushState(state, ``, `${location.search + location.hash}`);
      showEditBook(newFPart);
    } else if (sPart.slice(1) === 'preview') {
      const state = {
        preview: `${newFPart}`
      }
      history.pushState(state, ``, `${location.search + location.hash}`);
      showPreviewBook(newFPart);
    } 
  } else if (sPart.slice(1) === 'add') {
    const state = {
      add: `add`
    }
    history.pushState(state, ``, `/index.html${location.hash}`);
    showAddBook();
  } else {
    history.pushState(null, ``, `/index.html`);
  }
}

staticSide();