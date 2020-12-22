

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status} yet`;
    }
}

    

    function openForm() {
        document.getElementById("formcontainer").style.display = "block";
    }

    function closeForm() {
        document.getElementById("formcontainer").style.display = "none";
        
    }

    function addBook() {
        document.getElementById("formcontainer").style.display = "none";
    }



