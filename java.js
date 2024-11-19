function signup() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    let user = {
        password: pass,
        rewardsPoints: 100 // Initial rewards points
    };

    
    localStorage.setItem(email, JSON.stringify(user));
    
    window.location.href = "signup.html"; 
}


function guest(){
    localStorage.removeItem("loggedInUserEmail")
    window.location.href = "index.html"; 
}

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    let user = JSON.parse(localStorage.getItem(email));

    if (user) {
        if (pass === user.password) {
            let lastLoginDate = new Date(user.lastLogin || 0);
            let today = new Date().setHours(0,0,0,0);

            if(lastLoginDate < today) {
                user.rewardsPoints += 10;
                user.lastLogin = new Date();
                localStorage.setItem(email, JSON.stringify(user));
            }

            localStorage.setItem("loggedInUserEmail", email);
            location.replace("home.html");
    } else {
        alert("wrong password");
        }
    } else {
        alert("User not found");
    }
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
    saveMenu();
}


function addItem(type) {
    let itemName, itemPrice, itemImage, itemInfo, itemCalories;

    if (type === 'main') {
        itemName = document.getElementById("main-name").value;
        itemPrice = document.getElementById("main-price").value;
        itemImage = document.getElementById("main-image").value;
        itemInfo = document.getElementById("main-info").value;
        itemCalories = document.getElementById("main-calories").value;
    } else if (type === 'dessert') {
        itemName = document.getElementById("dessert-name").value;
        itemPrice = document.getElementById("dessert-price").value;
        itemImage = document.getElementById("dessert-image").value;
        itemInfo = document.getElementById("dessert-info").value;
        itemCalories = document.getElementById("dessert-calories").value;
    } else if (type === 'drink') {
        itemName = document.getElementById("drink-name").value;
        itemPrice = document.getElementById("drink-price").value;
        itemImage = document.getElementById("drink-image").value;
        itemInfo = document.getElementById("drink-info").value;
        itemCalories = document.getElementById("drink-calories").value;
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
            <p>${itemInfo}</p>
            <p>Calories: ${itemCalories}</p>
            <button class="menu-btn" onclick="addToCart('${itemName}', ${itemPrice}, '${itemImage}')">Add to Cart</button>
           <button class="manager-btn" onclick="removeItem(this)">Remove</button>
        `;
        
        if (type === 'main') {
            document.getElementById("main-dishes").appendChild(newItem);
        } else if (type === 'dessert') {
            document.getElementById("desserts").appendChild(newItem);
        } else if (type === 'drink') {
            document.getElementById("drinks").appendChild(newItem);
        }

        clearManagerInputs(type);
        saveMenu(); // Save to localStorage
    } else {
        alert("Please fill out all fields to add a new item.");
    }
}






function clearManagerInputs(type) {
    if (type === 'main') {
        document.getElementById("main-name").value = "";
        document.getElementById("main-info").vlaue = "";
        document.getElementById("main-calories").value = "";
        document.getElementById("main-price").value = "";
        document.getElementById("main-image").value = "";

    } else if (type === 'dessert'){
        document.getElementById("dessert-name").value = "";
        document.getElementById("dessert-info").value = "";
        document.getElementById("dessert-calories").value = "";
        document.getElementById("dessert-price").value = "";
        document.getElementById("dessert-image").value = "";

    } else if (type === 'drink'){
        document.getElementById("drink-name").value = "";
        document.getElementById("drink-info").value = "";
        document.getElementById("drink-calories").value = "";
        document.getElementById("drink-price").value = "";
        document.getElementById("drink-image").value = "";
    }
}
let cart = []; 

function addToCart(itemName, itemPrice, itemImage, itemInfo, itemCalories) {
    console.log("Name:", itemName, "Price:", itemPrice, "Image URL:", itemImage, "Info:", itemInfo, "Calories:", itemCalories);
    const item = { name: itemName, price: itemPrice, image: itemImage, info: itemInfo, calories: itemCalories };
    cart.push(item);
    updateCartDisplay();
}

function removeFromCart(index) {
    console.log(`Removing item at index: ${index}`); 
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
        img.classList.add("cart-item-img");

        const itemName = document.createElement("span");
        itemName.textContent = item.name;
        itemName.classList.add("cart-item-name");

        const itemPrice = document.createElement("span");
        itemPrice.textContent = ` - $${item.price.toFixed(2)}`;
        itemPrice.classList.add("cart-item-price");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = function() {
            console.log(`Remove button clicked for index: ${index}`);
            removeFromCart(index);
        }

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

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        let user = JSON.parse(localStorage.getItem(loggedInUserEmail));
        if (user) {
            let points = 0;

            cart.forEach(item => {
                if(item.info === 'main') {
                    points += 100;
                } else if (item.info === 'dessert') {
                    points += 50;
                }
            });

            user.rewardsPoints += points;
            localStorage.setItem(loggedInUserEmail, JSON.stringify(user));
        }
    }
    window.location.href = "checkout.html";
}


   function submitCheckout(event) {
    event.preventDefault();

    alert("Thank you for your purchase!");

    window.location.href = "checkout.html";


}


/* saves any changes to the menu */
function saveMenu() {
    const mainDishes = document.getElementById("main-dishes").innerHTML;
    const desserts = document.getElementById("desserts").innerHTML;
    const drinks = document.getElementById("drinks").innerHTML;

    localStorage.setItem("mainDishes", mainDishes);
    localStorage.setItem("desserts", desserts);
    localStorage.setItem("drinks", drinks);
}

function loadMenu() {
    if (localStorage.getItem("mainDishes")) {
        document.getElementById("main-dishes").innerHTML = localStorage.getItem("mainDishes");
    }

    if (localStorage.getItem("desserts")) {
        document.getElementById("desserts").innerHTML = localStorage.getItem("desserts");
    }

    if (localStorage.getItem("drinks")) {
        document.getElementById("drinks").innerHTML = localStorage.getItem("drinks");
    }
}


function applyStyles() {
    if (localStorage.getItem("userPage") === "true") {
        document.body.classList.add("hide-remove-buttons")
    } else {
        document.body.classList.remove("hide-remove-buttons");
    }
}

window.onload = function() {
    applyStyles();
    loadMenu();
}

/* reviews javascript */

const stars = document.querySelectorAll(".stars i");
let selectedRating = 0; 

stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        selectedRating = index + 1; 

        stars.forEach((star, idx) => {
            idx < selectedRating ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});

function displayRewardsPoints() {
    let email = localStorage.getItem("loggedInUserEmail");

    if (email) {
        let user = JSON.parse(localStorage.getItem(email));

        if (user) {
            document.getElementById("rewards-points").textContent = user.rewardsPoints;
        } else {
            document.getElementById("rewards-points").textContent = "0";
        }
    } else {
        document.getElementById("rewards-points").textContent = "0";
    }
}

window.onload = displayRewardsPoints;


function calculateTime(orders) {
    let total_time = 15; 
    const itemCounts = {}; 
    
    orders.forEach(order => {
        if (itemCounts[order]) {
            itemCounts[order]++;
        } else {
            itemCounts[order] = 1;
        }
    });

    for (const item in itemCounts) {
        if (itemCounts[item] > 1) {
            total_time += 5 * (itemCounts[item] - 1); 
        }
    }

    return total_time;
}

function displayOrderSummary() { 
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummaryElement = document.getElementById("order-summary"); 
    const totalAmountElement = document.getElementById("total-amount"); 
    let total = localStorage.getItem("totalAmount");

    cart.forEach(item => { 
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        orderSummaryElement.appendChild(listItem); 
    }); 
  
    totalAmountElement.textContent = total; 
}

let countdownTime = 15 * 60; 

function startCountdown() {
    const countdownElement = document.getElementById("countdown");

    const interval = setInterval(() => {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;

        countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (countdownTime <= 0) {
            clearInterval(interval);
            countdownElement.textContent = "Your order has arrived!";
        }

        countdownTime--;
    }, 1000);
}

window.onload = function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const orders = cart.map(item => item.name); 
    
    const totalMinutes = calculateTime(orders);
    countdownTime = totalMinutes * 60; 
    displayOrderSummary();
    startCountdown();
};
