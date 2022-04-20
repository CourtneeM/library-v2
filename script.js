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

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
}

const display = {
  createBookContainer: function(book) {
    const bookContainer = document.createElement('ul');
  
    Object.values(book).forEach(attribute => {
      const listItem = document.createElement('li');

      if (typeof attribute === "boolean") {
        const readCheckbox = document.createElement('input');
        readCheckbox.type = 'checkbox';
        readCheckbox.checked = attribute;

        readCheckbox.addEventListener('click', () => {
          const bookIndex = [...listItem.parentElement.parentElement.children].indexOf(listItem.parentElement);
          myLibrary[bookIndex - 1].read = !myLibrary[bookIndex - 1].read;
        });
        listItem.appendChild(readCheckbox);
      } else {
        listItem.textContent = attribute;
      }
  
      bookContainer.appendChild(listItem);
    });

    const deleteBookBtnLi = document.createElement('li');
    const deleteBookBtn = document.createElement('img');

    deleteBookBtnLi.classList.add('delete-book-btn-li');
    deleteBookBtn.src = './assets/icons/trash-can-outline.png';
    deleteBookBtnLi.addEventListener('click', () => {
      const bookIndex = [...deleteBookBtnLi.parentElement.parentElement.children].indexOf(deleteBookBtnLi.parentElement);
      deleteBookFromLibrary(bookIndex - 1);
      this.deleteBook(bookIndex);
    });

    deleteBookBtnLi.appendChild(deleteBookBtn);
    bookContainer.appendChild(deleteBookBtnLi);
  
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
  },
  deleteBook: function(bookIndex) {
    const bookshelf = document.querySelector('#bookshelf-container');
    const bookToDelete = [...bookshelf.children][bookIndex];

    bookshelf.removeChild(bookToDelete);
  }
}

document.querySelector('button').addEventListener('click', () => {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const read = document.querySelector('#book-read');

  const book = new Book(title.value, author.value, pages.value, read.checked);

  addBookToLibrary(book);

  if (document.querySelector('#bookshelf-container').children.length === 0) {
    display.books();
  } else {
    display.newBook(book);
  }

  [title, author, pages, read].forEach(input => input['type'] !== 'checkbox' ? input.value = '' : input.checked = false);
});