//  Storage.clear()
const cartItems = document.querySelector('#cart__items')
//TODO 1 . Récupération des items dans le local storage
let saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"))// pour le retranscrire en js
if (saveProductLocalStorage == null){
    saveProductLocalStorage = [];
}


const fetchUniqueProductData = async (id) => {
    const response = await fetch('http://localhost:3000/api/products/' + id)

    return await response.json();
}


//TODO 2. Iteration des items dans le local storage pour faire appel api sur produit detail pour enrichir le DOM
  const listIds = [];

  saveProductLocalStorage.forEach(async (object) => {
    const dataProduct = await fetchUniqueProductData(object.id);
    const template = document.querySelector('#cart-line');
    const cloneCartLine = document.importNode(template.content, true);

    const h2title = cloneCartLine.querySelector('.cart__item__content__description > h2');
    h2title.textContent = dataProduct.name;


    const price = cloneCartLine.querySelector('.cart__item__content__description__price');
     const unitPrice = dataProduct.price * object.quantite
     price.textContent = `${unitPrice} €`

    
     const color = cloneCartLine.querySelector('.cart__item__content__description__color');
     color.textContent = object.color;

     const quantity = cloneCartLine.querySelector('input');
      quantity.value = object.quantite;

      const img = cloneCartLine.querySelector('img');
      img.src = dataProduct.imageUrl;
      img.textContent = dataProduct.altTxt ;

    cartItems.appendChild(cloneCartLine);
  })
  const initDeleteEventListener = (element, productInCart, costLine) => {
    const cartItems = document.querySelector('#cart__items');
    const totalPriceContainer = document.querySelector('#totalPrice')
    element.addEventListener('click', (e) => {
        const product = {
            id: productInCart.id,
            color: productInCart.color
        }
        CardHelper.removeProductFromCart(product);
        const parent = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
        totalPriceContainer.textContent = parseFloat(totalPriceContainer.textContent) - parseFloat(costLine);
        cartItems.removeChild(parent);
    })
}
 

//  cartProduct.forEach(item => {
//     listIds.push(item.id)
//  })
//  console.log(listIds);
// //TODO 3. - EERFD-ATERF
// const objectToSendOrder = {
//     products: listIds,
//     contact: {
//         firstname
//    }
//  }

	
	
	
