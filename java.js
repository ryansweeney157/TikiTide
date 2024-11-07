function signup(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    // console.log(email)
    // console.log(pass)

    localStorage.setItem(email, pass)
}

function login(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    //console.log(email)
    // console.log(pass)

    if(localStorage.getItem(email)){
        if(pass === localStorage.getItem(email)){
            location.replace("home.html")
        }
        else
            alert("wrong passward")

    }
    else
        alert("user not found")


}
let cart = []; 

function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    cartItemsList.innerHTML = ""; 
    let total = 0;

    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });

    totalDisplay.textContent = total.toFixed(2); 
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}