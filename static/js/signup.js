
let roleRadios = document.querySelectorAll('input[name="role"]');
let companyDiv = document.querySelector('.company');
let companyInput = document.getElementById('company');


companyDiv.style.display = "none";

roleRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.value === "admin") {
            companyDiv.style.display = "block";
            companyInput.setAttribute("required", "true");
        } else {
            companyDiv.style.display = "none";
            companyInput.removeAttribute("required");
            companyInput.value = ""; 
        }
    });
});



document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let username = document.getElementById("username").value;

    let email = document.getElementById("email").value;   
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let role = document.querySelector('input[name="role"]:checked')?.value;

    if (!role) {
        alert("Please select a role");
        return;
    }

    if (password !== confirmPassword) {
        alert("Incorrect password");
        return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("role", role);
    localStorage.setItem("used-role",role)

    let totalUsers = parseInt(localStorage.getItem("totalUsers") || "0");
    totalUsers++;
    localStorage.setItem("totalUsers", totalUsers);

    

    if (role === "admin") {
        window.location.href = "dashboard.html";
    } 
    else if (role === "user") {
        window.location.href = "search.html";
    }
});













// document.getElementById("signupForm").addEventListener("submit", function(e) {
//     e.preventDefault(); 

//     let email = document.getElementById("email").value;   
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirm_password").value;
//      let role = document.querySelector('input[name="role"]:checked').value;

    


//     if (password !== confirmPassword) {
//         alert("Incorrect password");
//         return;
//     }

    
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//     localStorage.setItem("role", role);

    
//     if (role === "admin") {
//         window.location.href = "dashboard.html";
//     } 
//     else if (role === "user") {
//         window.location.href = "search.html";
//     } 
//     else {
//         alert("Please select a role");
//     }
// });