
// Add items to cart
// Add items to cart and save in the database
// Add items to cart and save in the database
function addToCart(itemName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,  // Only saving the name of the dish
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Send cart information to the server to save in the database
    fetch('/save-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: cart.map(item => item.name),  // Send only dish names to the server
            totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: "Pending",  // or any status you prefer
            orderDate: new Date().toISOString()
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cart saved in database:', data);
        alert(`${itemName} has been added to your cart.`);
    })
    .catch(error => {
        console.error('Error saving cart:', error);
    });
}

// Search menu functionality
function searchMenu() {
    const query = document.querySelector(".search-input").value.toLowerCase();

    // Get menu sections
    const breakfastItems = document.querySelectorAll("#breakfast-menu li");
    const lunchItems = document.querySelectorAll("#lunch-menu li");

    // Get the search results container
    const searchResultsContainer = document.getElementById("search-results-container");

    // Clear previous results
    searchResultsContainer.innerHTML = '';

    // Restore default view if query is empty
    if (query.trim() === "") {
        document.querySelector(".canteen-name").style.display = "block";
        document.querySelector(".menu-timings").style.display = "block";
        document.querySelector(".cards-container").style.display = "grid";
        searchResultsContainer.style.display = "none";
        return;
    }

    // Add a title to search results
    const searchResultTitle = document.createElement('h2');
    searchResultTitle.textContent = "Search Results:";
    searchResultsContainer.appendChild(searchResultTitle);

    let hasMatchingItems = false;

    // Helper function to add matching items to the search results container
    function addMatchingItems(items) {
        items.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(query)) {
                searchResultsContainer.appendChild(item.cloneNode(true));
                hasMatchingItems = true;
            }
        });
    }

    // Search in both breakfast and lunch items
    addMatchingItems(breakfastItems);
    addMatchingItems(lunchItems);

    // Display a message if no items match
    if (!hasMatchingItems) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = "No matching items found.";
        searchResultsContainer.appendChild(noResultsMessage);
    }

    // Adjust visibility of original sections
    document.querySelector(".canteen-name").style.display = "none";
    document.querySelector(".menu-timings").style.display = "none";
    document.querySelector(".cards-container").style.display = "none";
    searchResultsContainer.style.display = "block";
}

// Event listener for search input
document.querySelector(".search-input").addEventListener("input", searchMenu);

// Ensure a container exists for search results
window.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector(".main-content");
    let searchResultsContainer = document.getElementById("search-results-container");

    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement("div");
        searchResultsContainer.id = "search-results-container";
        searchResultsContainer.style.display = "none";
        mainContent.appendChild(searchResultsContainer);
    }
});
