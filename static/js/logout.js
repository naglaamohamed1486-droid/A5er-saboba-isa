function logout() {
    localStorage.removeItem("used-role");
    window.location.href = "index.html"; 
}
