var selectedItems = [];
var allFoodItems = [];

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var searchTerm = document.getElementById("searchTerm").value.toLowerCase();
  var foodList = document.getElementById("foodList");

  // Clear previous results
  foodList.innerHTML = "";

  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    var filteredItems = allFoodItems.filter(function (foodItem) {
      return (
        foodItem.name.toLowerCase().includes(searchTerm) ||
        foodItem.product.toLowerCase().includes(searchTerm) ||
        foodItem.brand.toLowerCase().includes(searchTerm)
      );
    });

    if (filteredItems.length > 0) {
      displayFoodItems(filteredItems);
    } else {
      foodList.innerHTML = "<li class='list-group-item'>No food items found.</li>";
    }
  } else {
    displayFoodItems(allFoodItems);
    console.log(allFoodItems)
    sessionStorage.setItem("allFoodItems",JSON.stringify(allFoodItems));
  }

  // Show the results
  document.getElementById("results").style.display = "block";
  document.getElementById("orderDetails").style.display = "none";
});

function displayFoodItems(foodItems) {
  var foodList = document.getElementById("foodList");
  foodList.innerHTML = "";

  for (var i = 0; i < foodItems.length; i++) {
    var foodItem = foodItems[i];
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <input type="checkbox" id="foodItem${i}" value="${foodItem.name}">
      <label for="foodItem${i}">
        <h5>${foodItem.name}</h5>
        <p>Price: ${foodItem.price}/-</p>
      </label>
    `;
    foodList.appendChild(listItem);
  }
}

function addToCart() {
  var checkboxes = document.querySelectorAll("#foodList input[type=checkbox]:checked");
  selectedItems = Array.from(checkboxes).map(function (checkbox) {
    return checkbox.value;
  });

  if (selectedItems.length > 0) {
    sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    window.location.href = "order.html";
  } else {
    alert("Please select at least one item.");
  }
}



function getAllFoodItemsFromAPI() {
  // Simulated API call to get all food items
  var foodItems = [
    { name: "Patanjali Pure Honey 500ml", price: 150, product: "honey", brand: "patanjali" },
    { name: "Dabur Pure Honey 1000ml", price: 236, product: "honey", brand: "Dabur" },
    { name: "Colgate Visible White 200g", price: 250, product: "toothpaste", brand: "Colgate" },
    { name: "Patanjali Kesh Kanti 500ml", price: 130, product: "shampoo", brand: "patanjali" },
    { name: "Amul Pure Honey 1000ml", price: 300, product: "honey", brand: "Amul" },
    { name: "Colgate Charcoal 200g", price: 150, product: "toothpaste", brand: "Colgate" },
    // Add more food items
  ];

  return foodItems;
}

// Fetch all food items from the API and display them
allFoodItems = getAllFoodItemsFromAPI();
displayFoodItems(allFoodItems);

// Retrieve selected items from local storage
var storedSelectedItems = sessionStorage.getItem("selectedItems");
if (storedSelectedItems) {
  selectedItems = JSON.parse(storedSelectedItems);
  displayOrderDetails();
}
