/**
 * Carregar os itens de food do dataset para o LocalStorage.
 * @param {*} newFoods
 */
 function load(newFoods) {
    localStorage.setItem('foods-app:foods', JSON.stringify(newFoods));
  }
  
  /**
   * Ler todos os registros de food.
   * @returns json
   */
  function readAll() {
    const stringFood = localStorage.getItem('foods-app:foods');
    return JSON.parse(stringFood);
  }
  
  function nextId() {
    const foods = readAll();
  
    const ids = foods.map((food) => food.id);
  
    const maxId = Math.max(...ids);
  
    return maxId + 1;
  }
  
  /**
   * Criar um novo registro de food.
   * @param {*} food
   * @returns food
   */
  function create(food) {
    let id = nextId();
  
    food = { id: id, ...food };
  
    const foods = readAll();
  
    const newFoods = [...foods, food];
  
    load(newFoods);
  
    return food;
  }
  
  export default { load, readAll, create };