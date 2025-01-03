const serverUrl = 'http://10.5.2.116:3000'; // Replace with the actual IP of your server

// Function to add item to the cart
function addToCart() {
    const itemName = document.getElementById('itemInput').value; // Get item name from input field
    
    if (!itemName) {
        alert('Please enter an item name');
        return;
    }

    console.log('Adding to cart:', itemName);

    fetch(`${serverUrl}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: itemName })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item added to cart:', data);
        displayCart(data.cart);  // Update cart display on the client side
    })
    .catch((error) => {
        console.error('Error adding to cart:', error);
    });
}

// Function to display the cart on the client side
function displayCart(cart) {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '<h2>Items in Cart:</h2>';
    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = item;
        cartDiv.appendChild(itemElement);
    });
}

// Function to handle notifications from the server
function startNotificationListener() {
    const eventSource = new EventSource(`${serverUrl}/notify`);
    eventSource.onmessage = function(event) {
        const notificationDiv = document.getElementById('notification');
        notificationDiv.textContent = event.data; // Display the notification message
    };

    eventSource.onerror = function() {
        console.error('Notification connection error');
    };
}

// Start listening for notifications when the page loads
window.onload = startNotificationListener;
