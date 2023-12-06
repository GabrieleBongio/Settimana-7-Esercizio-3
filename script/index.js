let cart = [];
let total = 0;
cart = JSON.parse(localStorage.getItem("cart"));

fetch("https://striveschool-api.herokuapp.com/books/")
  .then((resultsObj) => resultsObj.json())
  .then((bookObj) => {
    const container = document.querySelector("#listOfBooks");
    bookObj.forEach((book) => {
      const newCol = document.createElement("div");
      newCol.classList = "col-6 col-lg-4 col-xl-3 col-xxl-2";
      newCol.innerHTML = `<div class="card my-2">
            <div class="w-100 d-flex justify-content-center overflow-hidden">
                <img src="${book.img}" style="height:200px; max-width:100%" alt="Copertina del libro">
            </div>
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.price}€</p>
                <button class="btn btn-primary w-100 mb-1">Compra Ora</button>
                <button class="btn btn-danger w-100">Scarta</button>
            </div>
        </div>`;
      container.appendChild(newCol);
    });
    const buttonScartaList = document.querySelectorAll(".card-body > .btn-danger");
    const buttonScartaArr = Array.from(buttonScartaList);
    buttonScartaArr.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.target.parentElement.parentElement.parentElement.remove();
      });
    });
    const buttonAggiungiList = document.querySelectorAll(".card-body > .btn-primary");
    const buttonAggiungiArr = Array.from(buttonAggiungiList);
    buttonAggiungiArr.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const newCartElem = {};
        newCartElem.title = e.target.parentElement.children[0].innerText;
        newCartElem.price = e.target.parentElement.children[1].innerText;
        newCartElem.img = e.target.parentElement.parentElement.children[0].children[0].src;
        cart.push(newCartElem);
        console.log(cart);
        createCart();
        document.querySelector("p.ms-2").innerHTML = calcTotal() + "€";
        const stringifyCart = JSON.stringify(cart);
        localStorage.setItem("cart", stringifyCart);
      });
    });
  })
  .catch((error) => console.log(error));

const calcTotal = function () {
  let total = 0;
  cart.forEach((book) => {
    total += parseFloat(book.price);
  });
  return total.toFixed(2);
};

const createCart = () => {
  document.querySelector("ul").innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList = "list-group-item px-1 overflow-hidden";
    newLi.innerHTML = `<div class="row g-1">
            <div class="col-2 col-sm-4">
                <img class="img-fluid" src=${cart[i].img} alt="copertina libro"/>
            </div>
            <div class="col-10 col-sm-8">
                <div class="description">
                    <h5>${cart[i].title}</h5>
                    <p>${cart[i].price}</p>
                    <button class="btn btn-danger" id="button${i}">Riumovi</button>
                </div>
            </div>
        </div>`;
    document.querySelector("ul").appendChild(newLi);

    document.querySelector("#button" + i).addEventListener("click", function (e) {
      e.preventDefault();
      cart.splice(parseInt(e.target.getAttribute("id").slice(6)), 1);
      createCart();
      document.querySelector("p.ms-2").innerHTML = calcTotal() + "€";
      console.log(cart);
      const stringifyCart = JSON.stringify(cart);
      localStorage.setItem("cart", stringifyCart);
    });
  }
};

createCart();
document.querySelector("p.ms-2").innerHTML = calcTotal() + "€";
