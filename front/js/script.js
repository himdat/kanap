let sofaData = [];
// console.log(sofaData);

// recup la requête avec la tab produit(données)
// async pour attendre qlqc
const fetchSofa = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) =>{
        sofaData = promise
        console.log(sofaData);
    });
};

//affichage des meubles
const sofaDisplay = async () => {
    // on attend fetchsofa pour pouvoir travailler avec ses réponse
    await fetchSofa();

    document.getElementById("items").innerHTML = sofaData.map(
        (sofa) => `
        
            <a href="./product.html?id=${sofa._id}">
              <article>
                <img src="${sofa.imageUrl}" alt="image de sofa ${sofa.name}">
                <h3 class="productName">${sofa.name}</h3>
                <p class="productDescription">${sofa.description}</p>
              </article>
            </a>
       
        
    `,
    ).join(""); // ça enleve les virgules invisible mise par map

};

sofaDisplay();