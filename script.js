const books = []

function Book(title, author, numPages, isDone) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isDone = isDone;
    this.id = crypto.randomUUID()
}

Book.prototype.toggleIsDone = function () {
    this.isDone = !this.isDone
    console.log(this.title)
    console.log(this.isDone)
}

const createBook = function (title, author, numPages, isDone) {
    const newBook = new Book(title, author,numPages, isDone)
    books.push(newBook)
};

const deleteBook = function (bookId) {
    const index = books.findIndex(book => bookId === book.id)
    if (index !== -1) {
        books.splice(index, 1)
    }
}

const displayBooks = function() {
    const container = document.getElementById("bookCollection")
    container.textContent = "";
    books.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("h3")
        title.classList.add("book-title");

        title.textContent = element.title
        card.append(title);

        const subText = document.createElement("div")
        subText.classList.add("book-description")

        const authorAndPagesText = document.createElement("div")
        authorAndPagesText.textContent = `by ${element.author} [${element.numPages} pages]`
        subText.append(authorAndPagesText);


        const isReadSTatusText = document.createElement("div")
        isReadSTatusText.classList.add("book-status")
        isReadSTatusText.textContent = `${element.isDone ? "FINISHED" : "TO READ"}`
        subText.append(isReadSTatusText)
        const toggleIsReadButton = document.createElement('button')
        toggleIsReadButton.textContent = "switch status of the book"
        toggleIsReadButton.addEventListener("click", () =>{
            element.toggleIsDone()
            displayBooks()
        })
        subText.append(toggleIsReadButton)
        card.append(subText)


        // add delete button
        const deleteBookBtn = document.createElement("button")
        deleteBookBtn.classList.add("delete-book-button")
        deleteBookBtn.textContent = "remove"
        deleteBookBtn.dataset.id = element.id
        deleteBookBtn.addEventListener("click", () =>
            {
                deleteBook(deleteBookBtn.dataset.id);
                displayBooks();
            }
        )
        card.append(deleteBookBtn);

        container.append(card)

    });
}


// create new position
const form = document.getElementById("book-form");
const dialog = document.getElementById("book-dialog");
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // get values that user typed
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numPages = Number(document.getElementById("num-pages").value);
    const isDone = document.getElementById("is-read").checked;
    
    createBook(title, author, numPages, isDone);
    displayBooks()
    form.reset()
    dialog.close()
})

createBook("The Hobbit", "J.R.R. Tolkien", 295, true);
createBook("1984", "George Orwell", 328, false);
createBook("Wiedźmin: Ostatnie życzenie", "Andrzej Sapkowski", 332, true);

displayBooks();