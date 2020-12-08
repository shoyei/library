let mainDiv = document.querySelector('#container')
let plusBtn = document.querySelector('#plusButton')
let overlay = document.querySelector('#overlay')
let inputExit = document.querySelector('#inputExit')
let inputTitle = document.getElementById('inputTitle')
let inputAuthor = document.getElementById('inputAuthor')
let inputPages = document.getElementById('inputPages')
let inputRead = document.getElementById('inputRead')
let inputBtn = document.querySelector('#enter')
let books = document.querySelector('.book')

let myLibrary = [
    {
        title: 'My Story',
        author: 'John Smith',
        pages: 500,
        read: true
    },
    {
        title: 'My Tale',
        author: 'Jane Doe',
        pages: 300,
        read: false
    },
    {
        title: 'Sci-Fi',
        author: 'Glaxt',
        pages: 300,
        read: false
    }
]

function book(_title, _author, _pages, _read) {
    this.title = _title
    this.author = _author
    this.pages = _pages
    this.read = _read
}

function addToLibrary(_title, _author, _pages, _read) {
    const newBook = new book(_title, _author, _pages, _read)
    myLibrary.unshift(newBook)
}

function addToDisplay() {
    console.log(mainDiv)
    for (i = 0; i <= myLibrary.length; i++) {
        let _bookDiv = document.createElement('div');
        _bookDiv.classList.add('book');
        _bookDiv.setAttribute("id", `book${i}`);

        let _delDiv = document.createElement('div');
        _delDiv.classList.add('delete');
        _delDiv.textContent = "Read?";
        _delDiv.textContent = 'Delete';
        _bookDiv.appendChild(_delDiv);

        let _titleDiv = document.createElement('div');
        _titleDiv.classList.add('label');
        _titleDiv.textContent = "Title";

        let _titleDetailDiv = document.createElement('div');
        _titleDetailDiv.classList.add('detail');
        _titleDetailDiv.textContent = `${myLibrary[i].title}`
        _titleDiv.appendChild(_titleDetailDiv);
        _bookDiv.appendChild(_titleDiv);

        let _authorDiv = document.createElement('div');
        _authorDiv.classList.add('label');
        _authorDiv.textContent = "Author";

        let _authorDetailDiv = document.createElement('div');
        _authorDetailDiv.classList.add('detail');
        _authorDetailDiv.textContent = `${myLibrary[i].author}`
        _authorDiv.appendChild(_authorDetailDiv);
        _bookDiv.appendChild(_authorDiv);

        let _pagesDiv = document.createElement('div');
        _pagesDiv.classList.add('label');
        _pagesDiv.textContent = "Page Count";

        let _pagesDetailDiv = document.createElement('div');
        _pagesDetailDiv.classList.add('detail');
        _pagesDetailDiv.textContent = `${myLibrary[i].pages}`
        _pagesDiv.appendChild(_pagesDetailDiv);
        _bookDiv.appendChild(_pagesDiv);

        let _readDiv = document.createElement('div');
        _readDiv.classList.add('label');
        _readDiv.textContent = "Read?";

        let _readDetailDiv = document.createElement('div');
        _readDetailDiv.classList.add('detail');
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck">';
        _readDiv.appendChild(_readDetailDiv);
        _bookDiv.appendChild(_readDiv);

        mainDiv.appendChild(_bookDiv);
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    addToDisplay();
})

plusBtn.addEventListener('click', function () {
    overlayOn();
}, false)

inputExit.addEventListener('click', function () {
    overlayOff();
}, false)

function overlayOn() {
    overlay.setAttribute('style', 'display: flex'); 
}

function overlayOff() {
    overlay.setAttribute('style', 'display: none');
}


inputBtn.addEventListener('click', function () {
    addToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value);
    addToDisplay();
    overlayOff();
})