document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (validateLoginForm(username, password)) {
    sessionStorage.setItem("username", username);
    window.location.href = "/shopping/index.html";
  }
});


function validateLoginForm(username, password) {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return false;
  }

  if (username === "admin" && password === "password") {
    return true;
  } else {
    alert("Invalid username or password.");
    return false;
  }
}
