//DOM Selectors
let mainDiv = document.querySelector('#container')
let plusBtn = document.querySelector('#plusBtn')
let overlay = document.querySelector('#overlay')
let inputExit = document.querySelector('#inputExit')
let inputTitle = document.getElementById('inputTitle')
let inputAuthor = document.getElementById('inputAuthor')
let inputPages = document.getElementById('inputPages')
let inputRead = document.getElementById('inputRead')
let inputBtn = document.querySelector('#enter')
let updateReadBtn = document.querySelector('.read');
let books = document.querySelector('.book')
let deleteBtn = document.getElementsByClassName('delete')
let bookID = 0

//Object array
let myLibrary = [
    {
        title: 'Ubik',
        author: 'Philip K Dick',
        pages: 202,
        read: true,
    },
    {
        title: 'House of Suns',
        author: 'Alastair Reynolds',
        pages: 512,
        read: true,
    },
    {
        title: 'Foundation',
        author: 'Isaac Asimov',
        pages: 255,
        read: true,
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
    const _currentBookID = bookID
    let _bookDiv = document.createElement('div');
    _bookDiv.classList.add('book');
    _bookDiv.setAttribute("id", _currentBookID);

    let _delDiv = document.createElement('div');
    _delDiv.classList.add('delete')
    _delDiv.setAttribute('id', 'delete' + _currentBookID);
    _delDiv.textContent = 'X';
    _bookDiv.appendChild(_delDiv);
    _delDiv.addEventListener('click', removeBook)

    let _titleDiv = document.createElement('div');
    _titleDiv.classList.add('label');
    _titleDiv.innerHTML = "Title <br><hr>";

    let _titleDetailDiv = document.createElement('div');
    _titleDetailDiv.classList.add('detail');
    _titleDetailDiv.textContent = `${myLibrary[_currentBookID].title}`;
    _bookDiv.appendChild(_titleDiv);
    _bookDiv.appendChild(_titleDetailDiv);

    let _authorDiv = document.createElement('div');
    _authorDiv.classList.add('label');
    _authorDiv.innerHTML = "Author <br><hr>";

    let _authorDetailDiv = document.createElement('div');
    _authorDetailDiv.classList.add('detail');
    _authorDetailDiv.textContent = `${myLibrary[_currentBookID].author}`;
    _bookDiv.appendChild(_authorDiv);
    _bookDiv.appendChild(_authorDetailDiv);

    let _pagesDiv = document.createElement('div');
    _pagesDiv.classList.add('label');
    _pagesDiv.innerHTML = "Page Count<br><hr>";

    let _pagesDetailDiv = document.createElement('div');
    _pagesDetailDiv.classList.add('detail');
    _pagesDetailDiv.textContent = `${myLibrary[_currentBookID].pages}`;
    _bookDiv.appendChild(_pagesDiv);
    _bookDiv.appendChild(_pagesDetailDiv);

    let _readDiv = document.createElement('div');
    _readDiv.classList.add('label');
    _readDiv.textContent = "Read?";

    let _readDetailDiv = document.createElement('div');
    _readDetailDiv.classList.add('read');

    if (myLibrary[bookID].read === true) {
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck" checked><span class="checkmark"></span>';
    }
    if (myLibrary[bookID].read === false) {
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck"><span class="checkmark"></span>';
    }

    _readDetailDiv.addEventListener('click', updateRead);
    _bookDiv.appendChild(_readDiv);
    _bookDiv.appendChild(_readDetailDiv);
    mainDiv.appendChild(_bookDiv);
    bookID += 1;
}

function removeBook(e) {
    let removeIndex = e.target.parentNode.getAttribute('id');
    myLibrary.splice(removeIndex, 1);
    bookID -= 1;
    applyID();
    let _book = e.target.parentElement;
    mainDiv.removeChild(_book);
}

//Populate page with pre-existing objects
function addToDisplay() {
    for (i = 0; i <= myLibrary.length; i++) {
        createBook();
    }
    applyID();
}

function newToDisplay() {
    createBook();
}

//Acquire index of "read" checkbox's object and update
function updateRead(e) {
    let updateIndex = e.target.parentNode.parentNode.getAttribute('id');
    if (myLibrary[updateIndex].read == true) {
        myLibrary[updateIndex].read = false;
    }
    if (myLibrary[updateIndex].read == false) {
        myLibrary[updateIndex].read = true;
    }
    else console.log('Error')
}

//Resetting the object's ID property
function applyID() {
    for (i = 0; i < myLibrary.length; i++) {
        myLibrary[i].bookID = i;
    }
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
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
}, false)


inputBtn.addEventListener('click', function () {
    if (inputTitle.value === "") {
        return;
    }
    if (inputAuthor.value === "") {
        return;
    }
    if (inputPages.value === "") {
        return;
    }
    addToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);
    console.log(myLibrary);
    newToDisplay();
    overlayOff();
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
})

