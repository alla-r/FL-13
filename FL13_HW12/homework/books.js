const bookList = [
  {
    'name': 'Eloquent JavaScript',
    'author': 'Marijn Haverbeke',
    'image': 'https://eloquentjavascript.net/img/cover.jpg',
    'plot': `This is a book about JavaScript, programming, and the wonders of the digital.`
  },
  {
    'name': `You Don't Know JS Yet: Get Started`,
    'author': 'Kyle Simpson',
    'image': 'https://d2sofvawe08yqg.cloudfront.net/ydkjsy-get-started/hero?1580587360',
    'plot': `Surveys the language in multiple layers of detail, laying out a roadmap with the other books as guides.`
  },
  {
    'name': `You Don't Know JS Yet: Scope & Closures`,
    'author': 'Kyle Simpson',
    'image': 'https://d2sofvawe08yqg.cloudfront.net/ydkjsy-scope-closures/hero?1583299851',
    'plot': `Dives deep into how and why to organize variables into different buckets of scope.`
  }
];

if (!localStorage.getItem('booksUpdate')) {
  localStorage.setItem('books', JSON.stringify(bookList));
}
