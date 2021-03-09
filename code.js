const myLibrary = [
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
  // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'read' },
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
  // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'read' },
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
  // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'read' },
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
  // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'read' },
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'not read',},
];

const gridwrapper = document.querySelector("#gridwrapper");

// prototype
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.togglestatus = function () {
    if (this.status == "Read") {
      this.status = "Not read";
    } else if (this.status == "Not read") {
      this.status = "Read";
    }
  };
}

// functions below
function addBookArray() {
  const title = document.getElementById("inputTitle").value;
  const author = document.getElementById("inputAuthor").value;
  const pages = Number(document.getElementById("inputPages").value);
  let status;

  if (document.getElementById("radioRead").checked) {
    status = "Read";
  } else if (document.getElementById("radioNotRead").checked) {
    status = "Not read";
  }

  const objBook = new Book(title, author, pages, status);
  myLibrary.push(objBook);

  resetForm();
  document.getElementById("formcontainer").style.display = "none";

  console.clear();
  console.table(myLibrary);

  bookgrid.remove(); 
  addBookToLibrary(myLibrary);
}

function addBookToLibrary(array) {
  const bookgrid = document.createElement("div");
  bookgrid.setAttribute("id", "bookgrid");
  gridwrapper.append(bookgrid);

  // console.clear();
  // console.table(myLibrary);

  for (let i = 0; i < array.length; i++) {
    const book = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("button");
    const deletebook = document.createElement("button");

    book.setAttribute("id", `${i}`);
    book.classList.add("book");
    status.classList.add("btn-status");
    deletebook.classList.add("btn-delete");


    title.textContent = array[i].title;
    author.textContent = array[i].author;
    pages.textContent = array[i].pages;
    status.textContent = array[i].status;
    if(array[i].status === "Read") book.classList.add("read");
    deletebook.textContent = "Delete";

    status.addEventListener("click", (e) => {
      toggleStatus(e);
      let bookParent = e.target.closest(".book");
      bookParent.classList.toggle("read");
    });
    deletebook.addEventListener("click", deleteOperation);

    bookgrid.append(book);
    book.append(title);
    book.append(author);
    book.append(pages);
    book.append(status);
    book.append(deletebook);
  }
}

function toggleStatus(e) {
  const target = e.target;
  const x = parseInt(e.target.closest(".book").id);
  console.log(x);

  if (target.textContent === "Read") {
    target.textContent = "Not read";
    myLibrary[x].status = "Not read";
  } else {
    target.textContent = "Read";
    myLibrary[x].status = "Read";
  }

  console.clear();
  console.table(myLibrary);
}

function deleteOperation() {
  const x = this.parentElement.id;
  console.log(`my parent element id is: ${x}`);

  myLibrary.splice(x, 1);

  bookgrid.remove();
  addBookToLibrary(myLibrary);
}

function openForm() {
  document.getElementById("formcontainer").style.display = "block";
}

function closeForm() {
  document.getElementById("formcontainer").style.display = "none";
}

function resetForm() {
  document.getElementById("addformid").reset();
}

resetForm();
console.table(myLibrary);
addBookToLibrary(myLibrary);
