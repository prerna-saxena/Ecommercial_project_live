import {getCartProductFromLS} from "./getCartProducts";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart= (event, id, stock) =>{
let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity= currentProdElem.querySelector(".productQuantity").innerText;
    let price= currentProdElem.querySelector(".productPrice").innerText;
    
    //console.log(quantity, price);
    //console.log(currentProdElem);


    price = price.replace("₹", "");


    let existingProd=arrLocalStorageProduct.find(
        (currProd) => currProd.id === id
    );

    console.log(existingProd);

    if(existingProd && quantity > 1){

        quantity = Number(existingProd.quantity) + Number(quantity);
        price= Number(price * quantity);
        let updatedCart= {id, quantity,  price};

        updatedCart = arrLocalStorageProduct.map((currProd) =>{
            return currProd.id === id  ? updatedCart: currProd;
                

        });
        console.log(updatedCart);



        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
        

    }
    
    if(existingProd) {
        //alert(`bhai duplicate hain`);
        return false;
    }



    price = Number(price * quantity);
    quantity = Number(quantity);

    //let updateCart = {id, quantity, price};
    arrLocalStorageProduct.push({id, quantity, price});
    localStorage.setItem("cartproductLS", JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct);




};