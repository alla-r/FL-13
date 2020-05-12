const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

// TODO: your code goes here
// Creating a file tree
function startCreatingTree (container, arr) {
  container.append(createTree(arr));
}

function createTree (arr) {
  // validation
  if (arr === null) {
    return;
  }
  
  //creating branches 
  const ul = document.createElement('ul');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].folder === true) {
      const li = document.createElement('li');
      const icon = document.createElement('i');
      const span = document.createElement('span');
      const input = document.createElement('input');
      input.setAttribute('disabled', 'disabled');
      input.setAttribute('type', 'text');
      input.setAttribute('value', `${arr[i].title}`);
      input.className = 'pointer';
      span.append(input);
      span.className = 'pointer';
      icon.className = 'material-icons closed-folder-icon';
      icon.innerHTML = 'folder';
      li.append(icon, span);
      li.className = 'folder pointer';
      
      let childrenUl = createTree(arr[i].children);
      if (childrenUl) {     
        li.appendChild(childrenUl);
        childrenUl.hidden = true;
      } else {
        childrenUl = createEmptyFolder();
        li.appendChild(childrenUl);
        childrenUl.hidden = true;
      }
      ul.append(li);
    } else { 
      const li = document.createElement('li');    
      const icon = document.createElement('i');
      const span = document.createElement('span');
      const input = document.createElement('input');
      input.setAttribute('disabled', 'disabled');
      input.setAttribute('type', 'text');
      input.setAttribute('value', `${arr[i].title}`);
      input.className = 'pointer';
      span.append(input);
      span.className = 'pointer';
      icon.className = 'material-icons file-icon';
      icon.innerHTML = 'insert_drive_file';
      li.append(icon, span);
      li.className = 'file pointer';
      ul.append(li);
    }
  }

  return ul;
}

function createEmptyFolder () {
  const p = document.createElement('p'); 
  p.innerHTML = 'Folder is empty';
  p.className = 'empty-folder';

  return p;
}

startCreatingTree(rootNode, data);

// Opening and closing folders
rootNode.addEventListener('click', function(e) {
  if (e.target.tagName === 'INPUT') {
    let childrenContainerUl = e.target.parentNode.parentNode.querySelector('ul');
    let childrenContainerP = e.target.parentNode.parentNode.querySelector('p');
    let icon = e.target.parentNode.parentNode.querySelector('i');
    if (!childrenContainerUl && !childrenContainerP) {
      return; // no children
    }
    if (childrenContainerUl) {
      childrenContainerUl.hidden = !childrenContainerUl.hidden;
      switchFoldersIcons(icon);
    } else if (childrenContainerP) {
      childrenContainerP.hidden = !childrenContainerP.hidden;
      switchFoldersIcons(icon);
    }
  }

  if (e.target.tagName === 'I') {
    let childrenContainerUl = e.target.parentNode.querySelector('ul');
    let childrenContainerP = e.target.parentNode.querySelector('p');
    let icon = e.target.parentNode.querySelector('i');
    if (!childrenContainerUl && !childrenContainerP) {
      return; // no children
    }
    if (childrenContainerUl) {
      childrenContainerUl.hidden = !childrenContainerUl.hidden;
      switchFoldersIcons(icon);
    } else if (childrenContainerP) {
      childrenContainerP.hidden = !childrenContainerP.hidden;
      switchFoldersIcons(icon);
    }
  }
});

function switchFoldersIcons (icon) {
  icon.classList.contains('closed-folder-icon') ? icon.innerHTML = 'folder_open' : icon.innerHTML = 'folder';
  icon.classList.toggle('closed-folder-icon');
}

// CONTEXT MENU
// creating context menu
const menu = document.createElement('ul');
menu.className = 'context-menu';
const renameButton = document.createElement('li');
renameButton.innerHTML = 'Rename';
renameButton.id = 'renameButton';
renameButton.className = 'menuItem pointer';
menu.append(renameButton);
const deleteButton = document.createElement('li');
deleteButton.innerHTML = 'Delete item';
deleteButton.id = 'deleteButton';
deleteButton.className = 'menuItem pointer';
menu.append(deleteButton);
rootNode.append(menu);

// Opening menu
rootNode.addEventListener( 'contextmenu', e => {
  e.preventDefault();
  menu.classList.add('active');
  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  if (e.target.tagName !== 'INPUT') {
    menu.classList.add('disabled');
  } 
});

rootNode.addEventListener('contextmenu', e => {
  if (e.target.tagName !== 'INPUT') {
    return;
  } 
  let targetedEl = null;
  targetedEl = e.target;

  renameButton.addEventListener('click', () => {
    targetedEl.focus();
    renameItem(targetedEl);
  }, false );
  deleteButton.addEventListener('click', () => deleteItem(e.target) );
})

// Close menu by left click 
document.addEventListener('click', e => {
  if (e.button !== 2) {
    menu.classList.remove('active');
  }
}, false);

// Don't close menu if left click is on menu item
menu.addEventListener('click', e => {
  e.stopPropagation();
}, false);


// Adding functionality to menu items
// Rename
const renameItem = function (el) {
  el.removeAttribute('disabled');
  el.focus();
  el.select();
 
  el.addEventListener('change', updateValue, false);

  function updateValue(e) {
    e.stopPropagation();
    el.value = e.target.value;
    el.setAttribute('disabled', 'disabled');
  }
  menu.classList.remove('active');
};

// Delete 
const deleteItem = function (el) {
  console.log(el.parentNode.parentNode);
  menu.classList.remove('active');
 
  if (el.parentNode.parentNode.parentNode.children.length === 1) {
    const empty = createEmptyFolder();
    el.parentNode.parentNode.parentNode.append(empty); 
  }
  el.parentNode.parentNode.remove();
};