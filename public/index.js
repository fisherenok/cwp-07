let fieldSelector;
let orderSelector;

let xhr = new XMLHttpRequest();
xhr.open('POST', "./api/articles/readall", true);
xhr.onreadystatechange = processRequest;
xhr.send(JSON.stringify({}));

window.onload = function () {
    fieldSelector = document.getElementById("field-selector");
    orderSelector = document.getElementById("order-selector");

    fieldSelector.addEventListener("change", onChange, false);
    orderSelector.addEventListener("change", onChange, false);
};

function onClick(emitter) {
    xhr = new XMLHttpRequest();
    xhr.open('POST', "./api/articles/readall", true);
    console.log('Click')
    let request = {
        "sortField" : fieldSelector,
        "sortOrder" : orderSelector,
        "page" : emitter.innerHTML
    };
    xhr.onreadystatechange = processRequest;
    xhr.send(JSON.stringify(request));
}

function onChange() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', "./api/articles/read", true);
    console.log('Change')
    let request = {
        "sortField" : fieldSelector,
        "sortOrder" : orderSelector
    };
    xhr.onreadystatechange = processRequest;
    xhr.send(JSON.stringify(request));
}

function processRequest(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        removeArticles();
        removePagination();
        addArticles(xhr);
    }
}

function addArticles(xhr) {
    let response = JSON.parse(xhr.responseText);
    let container = document.getElementById("articles");

    response.items.forEach((article) => {
        let div = document.createElement("div");
        div.setAttribute("class", "article card text-center");
        div.setAttribute("id", article.id);

        let title = document.createElement("h3");
        title.setAttribute("class", "article-title card-title bg-warning");
        title.appendChild(document.createTextNode(article.title));
        div.appendChild(title);

        let date = document.createElement("h6");
        date.setAttribute("class", "article-date card-subtitle text-muted");
        date.appendChild(document.createTextNode("Date: " + article.date));
        div.appendChild(date);

        let newString = document.createElement("br");
        div.appendChild(newString);

        let author = document.createElement("h6");
        author.setAttribute("class", "article-date card-subtitle text-muted");
        author.appendChild(document.createTextNode("Author: " + article.author));
        div.appendChild(author);

        let text = document.createElement("p");
        text.setAttribute("class", "article-text card-body");
        text.appendChild(document.createTextNode(article.text));
        div.appendChild(text);

        container.appendChild(div);
    });

    let paginationDiv = document.getElementById("pagination");
    let ul = document.createElement("ul");
    ul.setAttribute("class", "pagination pagination-sm");

    for (let i = 0; i < response.meta.pages; i++) {
        let li = document.createElement("li");
        li.setAttribute("class", "page-item");
        if (i + 1 == response.meta.page) li.setAttribute("class", "page-item active");

        let a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "#");
        a.innerHTML = i + 1;
        a.setAttribute("onclick", "onClick(this)");

        li.appendChild(a);
        ul.appendChild(li);
    }
    paginationDiv.appendChild(ul);
}

function removeArticles() {
    document.getElementById("articles").innerHTML = "";
}

function removePagination() {
    document.getElementById("pagination").innerHTML = "";
}