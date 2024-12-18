import products from "./api/products.json";
import { getCartProductFromLS } from "./getCartProducts";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((currProd) => {
    return cartProducts.some((currElem) => currElem.id === currProd.id);
    //console.log(currProd.id == cartProducts.id);

});

console.log(filterProducts);

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplates");


const showCartProduct = () => {
    filterProducts.forEach((currProd) => {
        const {category, id, image, namr, stock, price} = currProd;
        let productClone = document.importNode(templateContainer.textContent, true)

        const LSActualData= fetchQuantityFromCartLS(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;

        productClone.querySelector(".productName").textContent = name;

        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = LSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = LSActualData.price;

        productClone
        .querySelector(`.remove-to-cart-button`)
        .addEventListener('click', () => removeProductFromCart(id));



        cartElement.appendChild(productClone);

    });
    
//showing the cart product//

};



showCartProduct();