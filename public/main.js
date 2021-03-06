class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    books = [
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

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(bookId) {
        this.books.splice(bookId, 1);
    }

    changeReadStatus(bookId) {
        if(this.books[bookId].read) {
            this.books[bookId].read = false;
            return false;
        } else {
            this.books[bookId].read = true;
            return true;
        }
    }
}

class ViewController {

    grid = document.querySelector('main');
    addButton = document.querySelector('#add-book');
    bookForm = document.querySelector('#book-form');
    library = new Library();

    renderLibary() {
        while(this.grid.firstChild) this.grid.removeChild(this.grid.lastChild); // clear the grid
        
        this.library.books.forEach((b, i) => {
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
    
            this.grid.appendChild(bookCard);
        });

        this.loadEvents();
    }

    loadEvents() {
        this.bookForm.onsubmit = this.addBook.bind(this);
        document.querySelectorAll('.my-card').forEach(c => {
            const bookId = c.getAttribute('id').slice(5);
            const readBook = c.querySelector('.read');
            const delBook = c.querySelector('#del-book');
    
            readBook.addEventListener('click', e => this.changeReadStatus(e, bookId));
            delBook.addEventListener('click', () => this.deleteBook(bookId));
        });
    }

    changeReadStatus(e, bookId) {
        if(this.library.changeReadStatus(bookId)) {
            e.target.textContent = 'Read';
        } else {
            e.target.textContent = 'Not read yet';
        }
    }

    deleteBook(bookId) {
        this.library.deleteBook(bookId);
        this.renderLibary();
    }

    addBook(e) {
        e.preventDefault();

        let book =  new Book(
            e.target.elements.title.value,
            e.target.elements.author.value,
            e.target.elements.pages.value,
            e.target.elements.read.checked
        );

        this.library.addBook(book);
        this.bookForm.reset();
        this.addButton.click();
        this.renderLibary();
    }
}

let viewController = new ViewController();
viewController.renderLibary();