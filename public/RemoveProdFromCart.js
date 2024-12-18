import { getCartProductFromLS } from "./getCartProducts"

export const removeProdFromCart = (id) => {
    let cartProducts= getCartProductFromLS();
    cartProducts = cartProducts.filter((currProd) => currProd.id === id);

    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    //to remove div on click
    let removeDiv = document.getElementById(`card${id}`);
    if(removeDiv){
        removeDiv.remove();
        
    }
    updatecartValue(cartProducts);
};