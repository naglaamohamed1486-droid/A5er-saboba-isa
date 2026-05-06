function getCSRF() {
    return document.cookie.split('; ')
        .find(r => r.startsWith('csrftoken='))
        ?.split('=')[1] || '';
}

async function logout() {
    await fetch("/accounts/logout/", {
        method : "POST",
        headers: { "X-CSRFToken": getCSRF() }
    });
    window.location.href = "/";
}