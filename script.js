const myLibrary = [];

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

  // Function to display books in the DOM
  function displayBooks() {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = ''; // Clear the container

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.dataset.index = index;

      bookCard.innerHTML = `e
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="toggle-read-btn">Toggle Read</button>
        <button class="remove-btn">Remove</button>
      `;

      // Add toggle read event
      bookCard.querySelector('.toggle-read-btn').addEventListener('click', () => {
        myLibrary[index].toggleRead();
        displayBooks();
      });

      // Add remove book event
      bookCard.querySelector('.remove-btn').addEventListener('click', () => {
        myLibrary.splice(index, 1); // Remove book from array
        displayBooks(); // Update DOM
      });

      bookContainer.appendChild(bookCard);
    });
  }

  // Open and close modal logic
  const newBookBtn = document.getElementById('new-book-btn');
  const bookFormDialog = document.getElementById('book-form-dialog');
  const closeFormBtn = document.getElementById('close-form-btn');

  newBookBtn.addEventListener('click', () => bookFormDialog.showModal());
  closeFormBtn.addEventListener('click', () => bookFormDialog.close());

  // Add new book logic
  const bookForm = document.getElementById('book-form');
  bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission refresh

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook); // Add book to library array
    displayBooks(); // Update DOM

    bookForm.reset(); // Clear the form
    bookFormDialog.close(); // Close the modal
  });

  // Add some sample books to start
  myLibrary.push(new Book('Atomic Habits', 'James Clear', 310, true));
  myLibrary.push(new Book("Can't Hurt Me", 'David Goggins', 328, false));
  myLibrary.push(new Book('Principles', 'Ray Dalio', 412, true));

  // Display initial books
  displayBooks();