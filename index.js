//DOM Selectors
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
let deleteBtn = document.getElementById('')
let bookID = 0

//Object array
let myLibrary = [
    {
        title: 'My Story',
        author: 'John Smith',
        pages: 500,
        read: true,
        
    },
    {
        title: 'My Tale',
        author: 'Jane Doe',
        pages: 300,
        read: false,
        
    },
    {
        title: 'Sci-Fi',
        author: 'Glaxt',
        pages: 300,
        read: false,
        
    }
]

//New object
function book(_title, _author, _pages, _read) {
    this.title = _title
    this.author = _author
    this.pages = _pages
    this.read = _read
}

//Add object to array
function addToLibrary(_title, _author, _pages, _read) {
    const newBook = new book(_title, _author, _pages, _read)
    myLibrary.push(newBook)
}

//Create page content
function createBook(i) {
    const _currentBookID = bookID.toString()
    let _bookDiv = document.createElement('div');
    _bookDiv.classList.add('book');
    _bookDiv.setAttribute("id", 'book'+_currentBookID);

    let _delDiv = document.createElement('div');
    _delDiv.setAttribute('id', 'delete'+_currentBookID);
    _delDiv.textContent = 'Delete';
    _bookDiv.appendChild(_delDiv);

    let _titleDiv = document.createElement('div');
    _titleDiv.classList.add('label');
    _titleDiv.textContent = "Title";

    let _titleDetailDiv = document.createElement('div');
    _titleDetailDiv.classList.add('detail');
    _titleDetailDiv.textContent = `${myLibrary[_currentBookID].title}`
    _titleDiv.appendChild(_titleDetailDiv);
    _bookDiv.appendChild(_titleDiv);

    let _authorDiv = document.createElement('div');
    _authorDiv.classList.add('label');
    _authorDiv.textContent = "Author";

    let _authorDetailDiv = document.createElement('div');
    _authorDetailDiv.classList.add('detail');
    _authorDetailDiv.textContent = `${myLibrary[_currentBookID].author}`
    _authorDiv.appendChild(_authorDetailDiv);
    _bookDiv.appendChild(_authorDiv);

    let _pagesDiv = document.createElement('div');
    _pagesDiv.classList.add('label');
    _pagesDiv.textContent = "Page Count";

    let _pagesDetailDiv = document.createElement('div');
    _pagesDetailDiv.classList.add('detail');
    _pagesDetailDiv.textContent = `${myLibrary[_currentBookID].pages}`
    _pagesDiv.appendChild(_pagesDetailDiv);
    _bookDiv.appendChild(_pagesDiv);

    let _readDiv = document.createElement('div');
    _readDiv.classList.add('label');
    _readDiv.textContent = "Read?";
    
    let _readDetailDiv = document.createElement('div');
    _readDetailDiv.classList.add('detail');

    if (myLibrary[bookID].read === true){
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck" checked>';
    }
    else {
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck">';
    }

    _readDiv.appendChild(_readDetailDiv);

    _bookDiv.appendChild(_readDiv);

    myLibrary[bookID].bookID = _currentBookID;
    mainDiv.appendChild(_bookDiv);
    bookID += 1;

}

//Populate page with pre-existing objects
function addToDisplay() {
    for (i = 0; i <= myLibrary.length; i++) {
        createBook();
    }
}


function newToDisplay() {
    createBook();
}

function deleteBook(_id) {
    let _div = document.querySelector(`#delete${_id}`)
    mainDiv.removeChild(_div)
}

function overlayOn() {
    overlay.setAttribute('style', 'display: flex');
}

function overlayOff() {
    overlay.setAttribute('style', 'display: none');
}

//Event Listeners
document.addEventListener("DOMContentLoaded", function (event) {
    addToDisplay();
})

plusBtn.addEventListener('click', function () {
    overlayOn();
}, false)

inputExit.addEventListener('click', function () {
    overlayOff();
}, false)

inputRead.addEventListener('change', function (){
    if (myLibrary[_currentBookID].read.value === false) {
    myLibrary[_currentBookID].read.value = true;
    }
    if (myLibrary[_currentBookID].read.value === true) {
        myLibrary[_currentBookID].read.value = false;
    }
})

inputBtn.addEventListener('click', function () {
    addToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);
    console.log(myLibrary)
    newToDisplay();
    overlayOff();
})

