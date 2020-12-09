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
let updateReadBtn = document.querySelector('.read');
let books = document.querySelector('.book')
let deleteBtn = document.getElementsByClassName('delete')
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
    const _currentBookID = bookID
    let _bookDiv = document.createElement('div');
    _bookDiv.classList.add('book');
    _bookDiv.setAttribute("id", _currentBookID);

    let _delDiv = document.createElement('div');
    _delDiv.classList.add('delete')
    _delDiv.setAttribute('id', 'delete' + _currentBookID);
    _delDiv.textContent = 'Delete';
    _bookDiv.appendChild(_delDiv);
    _delDiv.addEventListener('click', removeBook)

    let _titleDiv = document.createElement('div');
    _titleDiv.classList.add('label');
    _titleDiv.textContent = "Title";

    let _titleDetailDiv = document.createElement('div');
    _titleDetailDiv.classList.add('detail');
    _titleDetailDiv.textContent = `${myLibrary[_currentBookID].title}`;
    _titleDiv.appendChild(_titleDetailDiv);
    _bookDiv.appendChild(_titleDiv);

    let _authorDiv = document.createElement('div');
    _authorDiv.classList.add('label');
    _authorDiv.textContent = "Author";

    let _authorDetailDiv = document.createElement('div');
    _authorDetailDiv.classList.add('detail');
    _authorDetailDiv.textContent = `${myLibrary[_currentBookID].author}`;
    _authorDiv.appendChild(_authorDetailDiv);
    _bookDiv.appendChild(_authorDiv);

    let _pagesDiv = document.createElement('div');
    _pagesDiv.classList.add('label');
    _pagesDiv.textContent = "Page Count";

    let _pagesDetailDiv = document.createElement('div');
    _pagesDetailDiv.classList.add('detail');
    _pagesDetailDiv.textContent = `${myLibrary[_currentBookID].pages}`;
    _pagesDiv.appendChild(_pagesDetailDiv);
    _bookDiv.appendChild(_pagesDiv);

    let _readDiv = document.createElement('div');
    _readDiv.classList.add('label');
    _readDiv.textContent = "Read?";

    let _readDetailDiv = document.createElement('div');
    _readDetailDiv.classList.add('read');

    if (myLibrary[bookID].read === true) {
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck" checked>';
    }
    if (myLibrary[bookID].read === false) {
        _readDetailDiv.innerHTML = '<input type="checkbox" id="readcheck">';
    }

    _readDetailDiv.addEventListener('click', updateRead);
    _readDiv.appendChild(_readDetailDiv);
    _bookDiv.appendChild(_readDiv);
    mainDiv.appendChild(_bookDiv);
    bookID += 1;
    console.log(myLibrary);

}

function removeBook(e) {
    // find index of book where the selected 'delete' button is located.
    let removeIndex = e.target.parentNode.getAttribute('id');
    // remove that index from library
    myLibrary.splice(removeIndex, 1);
    bookID -= 1;
    applyID();
    // remove book from frontend
    let _book = e.target.parentElement;
    mainDiv.removeChild(_book);

    console.log(myLibrary);
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
    console.log(myLibrary);
}

function updateRead(e) {
    let updateIndex = e.target.parentNode.parentNode.parentNode.getAttribute('id');
    if (myLibrary[updateIndex].read == true) {
        myLibrary[updateIndex].read = false;
        console.log(myLibrary)
    }
    if (myLibrary[updateIndex].read == false) {
        myLibrary[updateIndex].read = true;
        console.log(myLibrary)
    }
    else console.log('Error')
    console.log(myLibrary)
}

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

// inputRead.addEventListener('change', function (){
//     if (myLibrary[_currentBookID].read.value === false) {
//     myLibrary[_currentBookID].read.value = true;
//     }
//     if (myLibrary[_currentBookID].read.value === true) {
//         myLibrary[_currentBookID].read.value = false;
//     }
// })

inputBtn.addEventListener('click', function () {
    // if (inputTitle.value ==="") {

    //     return;
    // }
    // if (inputAuthor.value === "") return;
    addToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);
    console.log(myLibrary);
    newToDisplay();
    overlayOff();
})

