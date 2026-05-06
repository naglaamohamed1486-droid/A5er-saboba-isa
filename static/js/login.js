function getCSRF() {
    return document.cookie.split('; ')
        .find(r => r.startsWith('csrftoken='))
        ?.split('=')[1] || '';
}

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res  = await fetch("/accounts/login/", {
        method : "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRF() },
        body   : JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
        alert(data.error);
        return;
    }

    if (data.role === "admin") window.location.href = "/jobs/dashboard/";
    else                       window.location.href = "/jobs/search/";
});