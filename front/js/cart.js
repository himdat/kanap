//  Storage.clear()
const cartItems = document.querySelector('#cart__items')
let suppressions = document.querySelectorAll(".deleteItem");
//TODO 1 . Récupération des items dans le local storage
let saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"))// pour le retranscrire en js
if (saveProductLocalStorage == null){
    saveProductLocalStorage = [];
}
const totalQuantityContainer = document.querySelector('#totalQuantity')
totalQuantityContainer.textContent = saveProductLocalStorage.length;
const totalPriceContainer = document.querySelector('#totalPrice');
let initTotalPrice = 0;
const btnSubmit = document.querySelector('#order');
const inputFirstname = document.querySelector('#firstName');
const containerErrorFirstname = document.querySelector('#firstNameErrorMsg');
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let isAllValid = true;
    const firstNameRegex = /^[a-zA-Zéè]{3,20}$/
    if (!firstNameRegex.test(inputFirstname.value)){
        isAllValid = false;
        containerErrorFirstname.textContent = "Le prénom doit faire au minimum 3 caractères et maximum 20 caractères"
    }
    if (isAllValid){
        const objectToSendApi = {
            productsIds: ['ID 1'],
            contact:{
                firstname: inputFirstname.value
            }
        }
        fetch(
            'http://localhost:3000/api/order/',
            {
                method: 'POST',
                body: JSON.stringify(objectToSendApi)
            }
        )
         .then(resp => resp.json())
         .then(resultOrder => {
             const orderId = resultOrder.orderId;
             window.location.href = "/confirmation?orderId=" + orderId;
         })
    }
})

inputFirstname.addEventListener('change', (e) =>{
    const valueInput = e.currentTarget.value;
    const firstNameRegex = /^[a-zA-Zéè]{3,20}$/
    if (!firstNameRegex.test(valueInput)){
        containerErrorFirstname.textContent = "Le prénom doit faire au minimum 3 caractères et maximum 20 caractères"
    } else{
        allInputValid = true;
        containerErrorFirstname.textContent = "";
    }
})
inputFirstname.addEventListener('focus', (e) =>{
    containerErrorFirstname.textContent = "";
})

const fetchUniqueProductData = async (id) => {
    const response = await fetch('http://localhost:3000/api/products/' + id)

    return await response.json();
}


//TODO 2. Iteration des items dans le local storage pour faire appel api sur produit detail pour enrichir le DOM
  const listIds = [];

  saveProductLocalStorage.forEach(async (object, index) => {
    const dataProduct = await fetchUniqueProductData(object.id);
    const template = document.querySelector('#cart-line');
    const cloneCartLine = document.importNode(template.content, true);

    const h2title = cloneCartLine.querySelector('.cart__item__content__description > h2');
    h2title.textContent = dataProduct.name;


    const price = cloneCartLine.querySelector('.cart__item__content__description__price');
     const totalLine = dataProduct.price * object.quantite
     price.textContent = `${totalLine} €`
    initTotalPrice = initTotalPrice + totalLine;
    
     const color = cloneCartLine.querySelector('.cart__item__content__description__color');
     color.textContent = object.color;

     const quantity = cloneCartLine.querySelector('input');
      quantity.value = object.quantite;

      const img = cloneCartLine.querySelector('img');
      img.src = dataProduct.imageUrl;
      img.textContent = dataProduct.altTxt;
      const deleteLink = cloneCartLine.querySelector('.deleteItem');
      deleteLink.addEventListener('click', (e) => {
          // suppression element du dom html
         const element = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
         element.parentNode.removeChild(element);
         // suppression du produit dans le localstorage
         saveProductLocalStorage.splice(index, 1);
         localStorage.setItem('produit', JSON.stringify(saveProductLocalStorage));
         //mise à jour du nbr total d'article dans le panier
         totalQuantityContainer.textContent = (parseInt(totalQuantityContainer.textContent) - 1).toString();
         //mise à jour du prix total du panier
         totalPriceContainer.textContent = (parseFloat(totalPriceContainer.textContent) - parseFloat(price.textContent)).toString();
      })

    cartItems.appendChild(cloneCartLine);
    totalPriceContainer.textContent = initTotalPrice;
  })
 
//   const initDeleteEventListener = (element, productInCart) => {
//   }
  

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

	
	
	


	
	
	
