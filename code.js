/*NOTE: 
this project has been updated to use Firebase Firestore to store the data.
No Firebase Authentication has been implemented yet to allow multiple users and multiple libraries.
Old functions/data-types created weren't deleted for reviewing.
*/

//create the grid container for the books
const gridwrapper = document.querySelector("#gridwrapper");
const renderGrid = document.createElement("div");
renderGrid.setAttribute("id", "bookgrid");
gridwrapper.append(renderGrid);

function renderBooks(doc, index) {
  //creates elements and appends it to the grid
  const book = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const btnContainer = document.createElement("div");
    const status = document.createElement("button");
    const deletebook = document.createElement("button");

    book.setAttribute("data-id", `${doc.id}`);
    book.setAttribute("id", `${index}`);
    book.classList.add("book");
    title.classList.add("title");
    btnContainer.classList.add("btnContainer");
    status.classList.add("btn-status");
    deletebook.classList.add("btn-delete");

    title.textContent = doc.data().title;
    author.textContent = doc.data().author;
    pages.textContent = doc.data().pages;
    status.textContent = doc.data().status;
    if (doc.data().status === "Read") book.classList.add("read");
    deletebook.innerHTML = '<i class="fas fa-trash-alt"></i>';

    status.addEventListener("click", (e) => {
      e.target.closest(".book").classList.toggle("read");
      toggleStatus(e);
      
    });

    deletebook.addEventListener("click", (e) => {
      deleteOperation(e);
    });

    renderGrid.appendChild(book);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(btnContainer);
    btnContainer.appendChild(status);
    btnContainer.appendChild(deletebook);
}

async function getLibrary() {
  // get data from cloud and store to myLibrary
  await db.collection("books").orderBy("title").onSnapshot( snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach( (change, i) => {
        if(change.type === "added") {
          renderBooks(change.doc, i);
        } else if ( change.type === "removed") {
          let book = document.querySelector(`[data-id= "${change.doc.id}"]`);
          book.remove();
        }
    });
});
}


/* OLD CODE PLS IGNORE

const myLibrary = [
  // { title: 'One Piece', author: 'Eiichiro Oda', pages: 1000, status: 'Not read',},
  // { title: 'My Hero Academia', author: 'Masashi Kishimoto', pages: 400, status: 'Read' },
];

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
async function addBookArray() {
  //adds a new book to the grid based on input values
  const title = document.getElementById("inputTitle").value;
  const author = document.getElementById("inputAuthor").value;
  const pages = Number(document.getElementById("inputPages").value);
  let status;

  if (document.getElementById("radioRead").checked) {
    status = "Read";
  } else if (document.getElementById("radioNotRead").checked) {
    status = "Not read";
  }


  // const objBook = new Book(title, author, pages, status);
  // myLibrary.push(objBook);

  resetForm();
  document.getElementById("formcontainer").style.display = "none";

  await db.collection('books').add({
    title: title,
    author: author,
    pages: pages,
    status: status
  });

  // console.clear();
  // console.table(myLibrary);

  // bookgrid.remove();
  // addBookToLibrary(myLibrary);
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

    book.setAttribute("data-id", `${array[i].id}`);
    book.setAttribute("id", `${i}`);
    book.classList.add("book");
    status.classList.add("btn-status");
    deletebook.classList.add("btn-delete");

    title.textContent = array[i].title;
    author.textContent = array[i].author;
    pages.textContent = array[i].pages;
    status.textContent = array[i].status;
    if (array[i].status === "Read") book.classList.add("read");
    deletebook.innerHTML = '<i class="fas fa-trash-alt"></i>';

    status.addEventListener("click", (e) => {
      toggleStatus(e);
      let bookParent = e.target.closest(".book");
      bookParent.classList.toggle("read");
    });
    deletebook.addEventListener("click", (e) => {
      deleteOperation(e);
    });

    bookgrid.append(book);
    book.append(title);
    book.append(author);
    book.append(pages);
    book.append(status);
    book.append(deletebook);
  }
}

*/
 function toggleStatus(e) {
  const target = e.target;
  const data_id = e.target.closest(".book").getAttribute("data-id");
  console.log(target.textContent, data_id);
  if (target.textContent === "Read") {
    target.textContent = "Not read";
     db.collection('books').doc(data_id).update({status:"Not read"});
    
  } else if(target.textContent === "Not read"){
    target.textContent = "Read";
     db.collection('books').doc(data_id).update({status:"Read"});
  }

   // const target = e.target.target;
  // const x = parseInt(e.target.closest(".book").id);
  // console.log(x);
}

function deleteOperation(e) {
//remove book from database
const bookTarget = e.target.closest(".book");
const data_id = bookTarget.getAttribute("data-id");
db.collection('books').doc(data_id).delete();

  // const x = this.parentElement.id;
  // bookTarget.remove();
  // myLibrary.splice(x, 1);
  // bookgrid.remove();
  // addBookToLibrary(myLibrary);
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
getLibrary();
