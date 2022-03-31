// on récupére l'id de notre produit depuis l'url pour cibler notre canapé dans l'API
const produit = window.location.search.replace("?id=", "");
console.log(produit);
// on récupere tout les id et class dans la page html pour pouvoir afficher juste en dessous
let image = document.querySelector(".item__img");
let prix = document.getElementById("price");
let titre = document.getElementById("title");
let description = document.getElementById("description");
let couleur = document.getElementById("colors");

//récup des données de l'api ou est stocké les canapés
// asynch et await tu attend la résolution de la promise
const fetchProduit = async () => {
    const response = await fetch(`http://localhost:3000/api/products/${produit}`);

    return await response.json();
};

// pour afficher les infos de chaque produit de l'accueil
const produitDisplay = async () => {
    const produitData = await fetchProduit();

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
};

const addBasketListener = () => {
    const bouton = document.getElementById("addToCart");
    bouton.addEventListener("click", () => {
        let produitTableau = JSON.parse(localStorage.getItem("produit")); // parse(tranformer en objet js)
        const select = document.getElementById("colors");
        // fpc est nouveau objet avec color et quantite
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = urlSearchParams.get('id');
        const quantity = parseInt(document.getElementById('quantity').value)
        const color = select.value;
        if (quantity < 1) {
            alert('Vous devez choisir au moins une quantité égale à 1 produit.')
            return;
        }
        const objectToAdd = {
            id: id,
            color: color,
            quantite: quantity
        }
        console.log(objectToAdd);
        if(produitTableau == null) { // si ptab est null, ptab sera un tableau vide
            console.log(produitTableau);
            produitTableau = [];
            console.log(produitTableau);
        }
            //TODO 1 . Chercher la présence d'un produit existant dans le panier
            // [
            //     {
            //         id: '223',
            //         color: 'Blue',
            //         quantite
            //     },
            //     {
            //         id: '223',
            //         color: 'Blue',
            //         quantite
            //     }
            // ]
            const cartFiltered = produitTableau.filter(item => item.id === id && item.color === color);
            console.log(cartFiltered);
            if (cartFiltered.length === 0) {
                //TODO 1.1 Si pas de produit -> j'ajoute le produit au tableau
                produitTableau.push(objectToAdd);
            } else {
                //TDOO 1.2 Si produit -> J'additionne quantité existante avec nouvelle quantité reçu
                cartFiltered[0].quantite += quantity
            }
            // on va transformer ptab en string pour le stocker dans le localstorage, puis on lui dire tu va prendre une clé qui s'appelle produit et valeur qui sera à l'intérieur sera une string du tableau et voila comment on stocke dans le localS
            localStorage.setItem("produit", JSON.stringify(produitTableau));
    });
};

produitDisplay();
addBasketListener();
