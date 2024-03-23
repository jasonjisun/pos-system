function addFoodItem() {
  // Get the selected food choice
  var foodChoice = document.getElementById("street-foods").value;

  // Get the quantity input value
  var quantity = document.getElementById("quantity").value;

  // Validate quantity input
  if (quantity === "" || isNaN(quantity) || parseInt(quantity) <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  // Create a new list item with the selected food and quantity
  var newItem = document.createElement("li");
  newItem.textContent =
    foodChoice.charAt(0).toUpperCase() +
    foodChoice.slice(1) +
    " - " +
    "₱" +
    getPrice(foodChoice) * parseInt(quantity) +
    " (" +
    quantity +
    " pcs)";

  // Append the new item to the street foods list
  document.querySelector(".street foods ul").appendChild(newItem);

  // Clear the quantity input field
  document.getElementById("quantity").value = "";
}

// Function to get the price of a food item
function getPrice(foodChoice) {
  switch (foodChoice) {
    case "burger":
      return 60;
    case "fries":
      return 50;
    case "fishball":
    case "kikiam":
      return 20;
    default:
      return 0;
  }
}

// Function to handle payment submission
document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the cash amount input value
    var cashAmount = parseFloat(document.getElementById("cash").value);

    // Calculate total order amount
    var totalAmount = calculateTotal();

    // Check if cash amount is sufficient
    if (cashAmount >= totalAmount) {
      var change = cashAmount - totalAmount;
      alert("Payment successful! Change: ₱" + change.toFixed(2));

      // Clear the street foods list
      document.querySelector(".street foods ul").innerHTML = "";
    } else {
      alert("Insufficient cash amount. Please enter a higher value.");
    }

    // Clear the cash amount input field
    document.getElementById("cash").value = "";
  });

// Function to calculate the total order amount
function calculateTotal() {
  var total = 0;
  var items = document.querySelectorAll(".street foods ul li");
  items.forEach(function (item) {
    var priceString = item.textContent.split(" - ")[1].split(" ")[0].slice(1);
    total += parseFloat(priceString);
  });
  return total;
}
