function getCSRF() {
    return document.cookie.split('; ')
        .find(r => r.startsWith('csrftoken='))
        ?.split('=')[1] || '';
}

// إظهار/إخفاء حقل الشركة حسب الـ role
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

document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const role = document.querySelector('input[name="role"]:checked')?.value;
    if (!role) {
        alert("Please select a role");
        return;
    }

    const body = {
        username        : document.getElementById("username").value,
        email           : document.getElementById("email").value,
        password        : document.getElementById("password").value,
        confirm_password: document.getElementById("confirm_password").value,
        role            : role,
        age             : document.getElementById("age").value,
       gender          : document.getElementById("gender")?.value || "",
        company         : document.getElementById("company")?.value || ""
    };

    const res  = await fetch("/accounts/signup/", {
        method : "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRF() },
        body   : JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) {
        alert(data.error);
        return;
    }

    if (data.role === "admin") window.location.href = "/jobs/dashboard/";
    else                       window.location.href = "/jobs/search/";
});