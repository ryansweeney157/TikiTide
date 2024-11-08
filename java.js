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

function addToCart(itemName, itemPrice, itemImage) {
    console.log("Name:", itemName, "Price:", itemPrice, "Image URL:", itemImage);
    const item = { name: itemName, price: itemPrice, image: itemImage };
    cart.push(item);
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}




function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    cartItemsList.innerHTML = ""; 
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");

        const img = document.createElement("img");
        img.src = item.image || "";
        img.alt = item.name;
        img.classList.add("cart-item-img")

        const itemName = document.createElement("span")
        itemName.textContent = item.name;
        itemName.classList.add("cart-item-name")

        const itemPrice = document.createElement("span");
        itemPrice.textContent= ` - $${item.price.toFixed(2)}`;
        itemPrice.classList.add("cart-item-price");

        const removeButton = document.createElement("button")
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => removeFromCart(index);

        listItem.appendChild(img);
        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        listItem.appendChild(removeButton);
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

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem("totalAmount", total.toFixed(2));
    localStorage.setItem("cart", JSON.stringify(cart))

    window.location.href = "checkout.html";
}

   function submitCheckout(event) {
    event.preventDefault();

    alert("Thank you for your purchase!");

    window.location.href = "checkout.html";
}

/* reviews javascript */
const stars = document.querySelectorAll(".stars i")

// loop through stars
stars.forEach((star, index1) => {

    star.addEventListener("click", () => {
      
        
        stars.forEach((star, index2) => {
          index1 >=  index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});
