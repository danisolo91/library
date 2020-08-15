let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        read: false
    },
    {
        title: 'The Stranger',
        author: 'Albert Camus',
        pages: 322,
        read: true
    },
    {
        title: 'White Teeth',
        author: 'Zadie Smith',
        pages: 187,
        read: false
    },
    {
        title: 'Bambi',
        author: 'Felix Salten',
        pages: 193,
        read: false
    }
];

const grid = document.querySelector('main');

render();
loadListeners();

function Book() {

}

function addBookToLibrary(book) {

}

function render() {
    while(grid.firstChild) grid.removeChild(grid.lastChild); // clear the grid

    myLibrary.forEach((b, i) => {
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('span');
        const bookOps = document.createElement('div');
        const bookRead = document.createElement('span');
        const bookDelete = document.createElement('button');

        bookCard.classList.add('my-card');
        bookPages.classList.add('pages');
        bookOps.classList.add('my-card-ops');
        bookRead.classList.add('read');
        bookDelete.classList.add('button');
        bookDelete.classList.add('tiny-btn');

        bookCard.setAttribute('id', `book-${i}`);
        bookDelete.setAttribute('id', 'del-book');

        bookTitle.textContent = b.title;
        bookAuthor.textContent = b.author;
        bookPages.textContent = b.pages + ' pages';
        b.read ? bookRead.textContent = 'Read' : bookRead.textContent = 'Not read yet';
        bookDelete.textContent = 'Delete';

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookOps);
        bookOps.appendChild(bookRead);
        bookOps.appendChild(bookDelete);

        grid.appendChild(bookCard);
    });
}

function loadListeners() {
    document.querySelectorAll('.my-card').forEach(c => {
        const bookId = c.getAttribute('id').slice(5);
        const readBook = c.querySelector('.read');
        const delBook = c.querySelector('#del-book');

        readBook.addEventListener('click', e => changeReadStatus(e, bookId));
        delBook.addEventListener('click', e => deleteBook(e, bookId));
    });
}

function changeReadStatus(e, bookId) {
    if(myLibrary[bookId].read) {
        myLibrary[bookId].read = false;
        e.target.textContent = 'Not read yet';
    } else {
        myLibrary[bookId].read = true;
        e.target.textContent = 'Read';
    }
}

function deleteBook(e, bookId) {
    myLibrary.splice(bookId, 1);
    render();
    loadListeners();
}