function signup(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    // console.log(email)
    // console.log(pass)

    localStorage.setItem(email, pass)
    window.location.href = "signup.html"; 
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

function manager() {
    window.location.href = "manager.html"
}

function managerLog() {
    let email = document.getElementById("email").value;
    let pass =  document.getElementById("pass").value;

    if (email === "ryansweeney157@gmail.com" && pass === "56watermelon78") {
        alert("Login successful!");
        window.location.href = "manager-menu.html"
    } else {
        alert("Incorrect email or password!")
    }
}
function removeItem(button) {
    const menuItem = button.closest(".menu-item");
    menuItem.remove();
}

function addItem(type) {
    let itemName, itemPrice, itemImage;

    if (type === 'main') {
        itemImage = document.getElementById("main-image").value;
        itemName = document.getElementById("main-name").value;
        itemPrice = document.getElementById("main-price").value;

    } else if (type === 'dessert') {
        itemImage = document.getElementById("dessert-image").value;
        itemName = document.getElementById("dessert-name").value;
        itemPrice = document.getElementById("dessert-price").value;
    } else if (type === 'drink') {
        itemImage = document.getElementById("drink-image").value;
        itemName = document.getElementById("drink-name").value;
        itemPrice = document.getElementById("drink-price").value;
    }

    if (itemName && itemPrice && itemImage) {
        const newItem = document.createElement("div");
        newItem.classList.add("menu-item");
        newItem.innerHTML = `
        <div>
            <img class="menu-img" src="${itemImage}">
        </div>
        <div>
            <h4>${itemName} - $${parseFloat(itemPrice).toFixed(2)}</h4>
            <p>Description: Enter description here. <em>Calories</em></p>
            <button class="menu-btn" onclick="addToCart('${itemName}')">Add to Cart</button>
            <button class="manager-btn" onclick="removeItem(this)">Remove</button>
        </div>
        `;
        if (type === 'main') {
            document.getElementById("main-dishes").appendChild(newItem);
        } else if (type === 'dessert') {
            document.getElementById("desserts").appendChild(newItem);
        } else if (type === 'drink') {
            document.getElementById("drinks").appendChild(newItem);
        }
        clearManagerInputs(type);
    } else {
        alert("Please fill out all fields to add a new item.");
    }
}

function clearManagerInputs(type) {
    if (type === 'main') {
        document.getElementById("main-name").value = "";
        document.getElementById("main-price").value = "";
        document.getElementById("main-image").value = "";

    } else if (type === 'dessert'){
        document.getElementById("dessert-name").value = "";
        document.getElementById("dessert-price").value = "";
        document.getElementById("dessert-image").value = "";

    } else if (type === 'drink'){
        document.getElementById("drink-name").value = "";
        document.getElementById("drink-price").value = "";
        document.getElementById("drink-image").value = "";
    }
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
