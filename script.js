let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const display = {
  createBookContainer: function(book) {
    const bookContainer = document.createElement('ul');
  
    Object.values(book).forEach(attribute => {
      const listItem = document.createElement('li');
      listItem.textContent = attribute;
  
      bookContainer.appendChild(listItem);
    });
  
    return bookContainer;
  },
  books: function() {
    const bookshelf = document.querySelector('#bookshelf-container');
  
    myLibrary.forEach(book => bookshelf.appendChild(display.createBookContainer(book)));
  },
  newBook: function(book) {
    const bookshelf = document.querySelector('#bookshelf-container');
    const bookContainer = display.createBookContainer(book);
  
    bookshelf.appendChild(bookContainer);
  }
}

document.querySelector('button').addEventListener('click', () => {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const read = document.querySelector('#book-read');
  
  // change to checkbox icon
  const bookRead = read.checked ? 'read' : 'not read';

  const book = new Book(title.value, author.value, pages.value, bookRead);

  addBookToLibrary(book);

  if (document.querySelector('#bookshelf-container').children.length === 0) {
    display.books();
  } else {
    display.newBook(book);
  }

  [title, author, pages, read].forEach(input => input['type'] === 'text' ? input.value = '' : input.checked = false);
});





