// on récupére l'id de notre produit depuis l'url pour cibler notre canapé dans l'API
const produit = window.location.search.replace("?id=", "");
console.log(produit);
// on récupere tout les id et class dans la page html pour pouvoir afficher juste en dessous
let image = document.querySelector(".item__img");
let prix = document.getElementById("price");
let titre = document.getElementById("title");
let description = document.getElementById("description");
let couleur = document.getElementById("colors");
let quantitySelector = parseInt(document.getElementById("quantity"));


//stocker les éléments du produit dans un tableau
let produitData = [];

//récup des données de l'api ou est stocké les canapés
// asynch et await tu attend la résolution de la promise
const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise;
        console.log(produitData);
    });
    
};

// pour afficher les infos de chaque produit de l'accueil
const produitDisplay = async () => {
    await fetchProduit();

    titre.innerHTML = produitData.name;
    image.innerHTML = `<img src="${produitData.imageUrl}" alt="${produitData.altTxt}"></img>`;
    prix.innerHTML = produitData.price;
    description.innerHTML = produitData.description;
    couleur.innerHTML = produitData.colors;
     //Boucle pour la liste des couleurs
  for (let i = 0; i < produitData.colors.length; i++) {
    couleur.innerHTML += `
    <option value="${produitData.colors[i]}">${produitData.colors[i]}</option>`;
  }
  addBasket(produitData);
 
};

produitDisplay();


const addBasket = () => {
  let bouton = document.getElementById("addToCart");
  console.log(bouton);
  bouton.addEventListener("click", () => {
    let produitTableau = JSON.parse(localStorage.getItem("produit")); // parse(tranformer en objet js)
    let select = document.getElementById("colors");
    console.log(select.value);
    console.log(produitTableau);
    // fpc est nouveau objet avec color et quantite
     const fusionProduitColor = Object.assign({}, produitData, {// qu permet d'assigner et rajouter qlqc à unob
       color: `${select.value}`,
       quantite: 1,
     }); 
     console.log(fusionProduitColor);
    // on veut que si il y a rien, on rajoute des produits

    if(produitTableau == null){ // si ptab est null, ptab sera un tableau vide
      produitTableau = [];
      // on va pousser fusionproduitcolor, si tu a rien dans localstorage(ptab), tu m'execute ce code
      produitTableau.push(fusionProduitColor);
      console.log(produitTableau);
      // on va transformer ptab en string pour le stocker dans le localstorage, puis on lui dire tu va prendre une clé qui s'appelle produit et valeur qui sera à l'intérieur sera une string du tableau et voila comment on stocke dans le localS
      
    } else{
      const existProduct = produitTableau.filter(element => {
        return element.id === produit && element.color === couleur;
      })
      if(existProduct.length > 0){
        existProduct[0].quantity += quantitySelector;
      }else{
        let fusionProduitColor;
        produitTableau.push(fusionProduitColor);
      }

    }
    localStorage.setItem("produit", JSON.stringify(produitTableau));
  });
};
