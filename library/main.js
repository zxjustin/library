const books = document.querySelector('.books');

const myLibrary = [{
    title: 'Book1',
    author: 'me',
    page: 500,
    read :true
},{
    title: 'Book2',
    author: 'you',
    page: 5000,
    read :false

}];

function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class",className);
    return element;
}

function createReadElement(bookItem,book){
    const read = document.createElement('div');
    read.setAttribute('class','book-read');
    read.appendChild(createBookElement("h1","Read?","book-read-title"));
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('click', (e) => {
        if(e.target.checked){
            bookItem.setAttribute('Class','read-checked');
            book.read = true;
            renderBooks();
        } else{
            bookItem.setAttribute("class", "read-unchecked");
            book.read = false;
            renderBooks();
        }
    });
    if (book.read) {
        input.checked = true;
        bookItem.setAttribute("class", "read-checked");
    }
    read.appendChild(input);
    return read;

}

function createBookItem (book,index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id',index);
    bookItem.setAttribute('key',index);
    bookItem.setAttribute('class','card book');
    bookItem.appendChild(
        createBookElement('h1', `Title: ${book.title}`, 'book-title')
    );
    bookItem.appendChild(
        createBookElement('h1', `Author: ${book.title}`, 'book-author')
    );
    bookItem.appendChild(
        createBookElement('h1', `Pages: ${book.title}`, 'book-pages')
    );
    bookItem.appendChild(createReadElement(bookItem,book));
    books.insertAdjacentElement('afterbegin', bookItem);
}

function renderBooks () {
    myLibrary.map((books,index) => {
        createBookItem(books,index)
    });
}
renderBooks();