let myLibrary = [
    // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
    // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'read' }
];

let bookcounter = 0;
const bookscontainer = document.querySelector('#bookscontainer');
/*
const book = document.createElement('div');
const booktitle = document.createElement('h2');
const bookauthor = document.createElement('h2');
const bookpages = document.createElement('h2');
const bookstatus = document.createElement('h2');
const booktoggle = document.createElement('button');
const bookdelete = document.createElement('button');


booktitle.textContent = 'Title: ' + myLibrary[0].title;
bookauthor.textContent = 'Author: ' + myLibrary[0].author;
bookpages.textContent = 'Pages: ' + myLibrary[0].pages;
bookstatus.textContent = 'Status: ' + myLibrary[0].status;
bookstatus.setAttribute('id', 'booker');
booktoggle.textContent = 'Toggle status';
bookdelete.textContent = 'Delete Book';

book.classList.add('book');
booktoggle.classList.add('togglebook', 'btn');
bookdelete.classList.add('deletebook', 'btn');

booktoggle.addEventListener('click', () => {
    myLibrary[0].togglestatus();
})

bookdelete.addEventListener('click', deleteBook);


bookscontainer.append(book);
book.append(booktitle);
book.append(bookauthor);
book.append(bookpages);
book.append(bookstatus);
book.append(booktoggle);
book.append(bookdelete);
*/





function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.togglestatus = function () {
        if (this.status == 'read') {
            console.clear();
            console.table(bookArray);
            this.status = 'not read';
        }
        else if (this.status == 'not read') {
            console.clear();
            console.table(bookArray);
            this.status = 'read';
        }
    }
}


function deleteBook() {
    console.log('book deleted');
}


function addBookArray() {

    const title = document.getElementById('inputTitle').value;
    const author = document.getElementById('inputAuthor').value;
    const pages = Number(document.getElementById('inputPages').value);
    let status;

    if (document.getElementById('radioRead').checked)
        status = 'read';
    else if (document.getElementById('radioNotRead').checked)
        status = 'not read';


    let objBook = new Book(title, author, pages, status);
    myLibrary.push(objBook);

    resetForm();
    document.getElementById("formcontainer").style.display = "none";

   
    console.clear();
    console.table(myLibrary);

    addBookToLibrary(myLibrary, bookcounter);
    
}

function addBookToLibrary(bookArray) {

    for (i = bookcounter; i < bookArray.length; i++) {
        const book = document.createElement('div');
        const booktitle = document.createElement('h2');
        const bookauthor = document.createElement('h2');
        const bookpages = document.createElement('h2');
        const bookstatus = document.createElement('h2');
        const booktoggle = document.createElement('button');
        const bookdelete = document.createElement('button');

        booktitle.textContent = 'Title: ' + bookArray[i].title;
        bookauthor.textContent = 'Author: ' + bookArray[i].author;
        bookpages.textContent = 'Pages: ' + bookArray[i].pages;
        bookstatus.textContent = 'Status: ' + bookArray[i].status;
        booktoggle.textContent = 'Toggle status';
        bookdelete.textContent = 'Delete Book';

        book.setAttribute('id', `${i}`);
        book.classList.add('book');
        booktoggle.classList.add('togglebook', 'btn');
        bookdelete.classList.add('deletebook', 'btn');

        booktoggle.addEventListener('click', () => {
            let findstatus = document.getElementById(`${i}`).children;
            bookArray[i].togglestatus();

            findstatus[4].textContent = 'Status: ' + bookArray[i].status;
        })

        bookdelete.addEventListener('click', deleteBook);

        bookscontainer.append(book);
        book.append(booktitle);
        book.append(bookauthor);
        book.append(bookpages);
        book.append(bookstatus);
        book.append(booktoggle);
        book.append(bookdelete);

        
    }

    bookcounter++;

}


function openForm() {
    document.getElementById("formcontainer").style.display = "block";
}

function closeForm() {
    document.getElementById("formcontainer").style.display = "none";

}

function resetForm() {
    document.getElementById("addform").reset();
}




resetForm();
console.table(myLibrary);

