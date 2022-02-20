import itens from './model/dataset.js';
import foodsModel from './model/foods.js';

foodsModel.load(itens);

let foods = foodsModel.readAll();

function initFoodsCard() {
  for (let item of foods) {
    const view = createFoodCardItem(item);

    let itensCardapio = document.getElementById('itens-cardapio');

    itensCardapio.insertAdjacentHTML('beforeend', view);
  }
}

function createFoodCardItem(item) {
  const image = item.image || './images/product_default.png';
  const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${image}" class="card-img-top" alt="${item.name}">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                      <hr>
                      <h4 class="text-success">${item.price.toLocaleString(
                        'pt-br',
                        { style: 'currency', currency: 'BRL' },
                      )}</h4>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

  return view;
}

const foodForm = document.getElementById('foodForm');

foodForm.onsubmit = function (event) {
  event.preventDefault();

  let newFood = Object.fromEntries(new FormData(foodForm));

  foodsModel.create(newFood);

  const foodCard = createFoodCardItem(newFood);
  let itensCardapio = document.getElementById('itens-cardapio');
  itensCardapio.insertAdjacentHTML('beforeend', foodCard);

  foodForm.reset();
};

function alertSuccess(
  type = 'success',
  message = 'Item cadastrado com sucesso.',
) {
  document.querySelector('#alert-message').innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>Parabéns!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
}

initFoodsCard();
