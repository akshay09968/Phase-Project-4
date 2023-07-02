var allFoodItems = sessionStorage.getItem("allFoodItems");
var FoodItems = allFoodItems ? JSON.parse(allFoodItems) : [];
console.log(allFoodItems);

function displayOrderDetails() {
    var orderList = document.getElementById("orderList");
    var totalAmount = 0;
  
    orderList.innerHTML = ""; // Clear previous order details
  
    // Retrieve the selected items from local storage
    var storedSelectedItems = sessionStorage.getItem("selectedItems");
    var selectedItems = storedSelectedItems ? JSON.parse(storedSelectedItems) : [];
  
    for (var i = 0; i < selectedItems.length; i++) {
      var itemName = selectedItems[i];
      var item = FoodItems.find(function (foodItem) {
        return foodItem.name === itemName;
      });
  
      if (item) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
          <h5>${item.name}</h5>
          <p>Price: ${item.price}/-</p>
        `;
        orderList.appendChild(listItem);
        totalAmount += item.price;
      }
    }
  
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
  }

  function placeOrder() {
    // Retrieve the selected items from local storage
    var storedSelectedItems = sessionStorage.getItem("selectedItems");
    var selectedItems = storedSelectedItems ? JSON.parse(storedSelectedItems) : [];
  
    // Calculate the total amount
    var totalAmount = 0;
    for (var i = 0; i < selectedItems.length; i++) {
      var itemName = selectedItems[i];
      var item = FoodItems.find(function (foodItem) {
        return foodItem.name === itemName;
      });
  
      if (item) {
        totalAmount += item.price;
      }
    }
  
    // Store the total amount in local storage
    sessionStorage.setItem("totalAmount", totalAmount.toFixed(2));
  
    // Redirect to the confirmation page
    window.location.href = "payment.html";
  }