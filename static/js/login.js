document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");
    let savedRole = localStorage.getItem("role");

    
    if (!savedEmail || email !== savedEmail) {
        alert("Email not found, please sign up first");
        return;
    }

    
    if (password !== savedPassword) {
        alert("Incorrect password");
        return;
    }

     localStorage.setItem("used-role", savedRole); 
    
    if (savedRole === "user") {
        window.location.href = "search.html";
    } 
    else if (savedRole === "admin") {
        window.location.href = "dashboard.html";
    } 
    else {
        alert("No role found, please sign up first");
    }
});