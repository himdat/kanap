// récup produittab qui est dans le locals dans le panier
let cartProduct = JSON.parse(localStorage.getItem("produit"));// pour le retranscrire en js


//TODO 1 . Récupération des items dans le local storage

//TODO 2. Iteration des items dans le local storage pour faire appel api sur produit detail pour enrichir le DOM
const listIds = [];
cartProduct.forEach(item => {
    listIds.push(item.id)
})
console.log(listIds);
//TODO 3. - EERFD-ATERF
const objectToSendOrder = {
    products: listIds,
    contact:{
        
    }
}

   
