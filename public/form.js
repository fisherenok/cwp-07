function createNewArticle() {
    let auth = document.getElementById('author').value;
    let titl = document.getElementById('title').value;
    let txt = document.getElementById('text').value;
    const date = new Date();
    let dat = '' + validDate(date.getDate()) + '.' + validDate(date.getMonth() + 1) + '.' + date.getFullYear();
    let obj = JSON.stringify({ title: titl, text: txt, date: dat, author: auth, comments: [] });
    console.log(obj);
    $.post("/api/articles/create", obj, (data) => {
        window.location.replace("./");
        alert('Create successful');
    });
}
function validDate(param) {
    if (param < 10)
        return '0' + param;
    else return param;
}