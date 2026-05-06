function getCSRF() {
    return document.cookie.split('; ')
        .find(r => r.startsWith('csrftoken='))
        ?.split('=')[1] || '';
}

async function initNavbar() {
    const res  = await fetch("/accounts/me/");
    const data = await res.json();
    const role = data.logged_in ? data.role : null;
    const name = data.username || '';

    const nav   = document.getElementById("links");
    const btn   = document.getElementById("logs");
    const menue = document.getElementById("menue");

    nav.innerHTML   = "";
    btn.innerHTML   = "";
    menue.innerHTML = "";

    if (role === null) {
        nav.innerHTML   += `<li><a href="/">Home</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/search/">Find Jobs</a></li>`;
        btn.innerHTML   += `<a href="/accounts/login/" class="login">Log In</a>`;
        btn.innerHTML   += `<a href="/accounts/signup/" class="signup">Sign Up</a>`;
        menue.innerHTML += `<li><a href="/">Home</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/search/">Find Jobs</a></li>`;
    }
    else if (role === "user") {
        nav.innerHTML   += `<li><a href="/">Home</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/search/">Find Jobs</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/saved/">Saved</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/applied/">Applied</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/compare/">Compare</a></li>`;
        btn.innerHTML   += `<a href="/accounts/profile/" class="profile">${name}</a>`;
        btn.innerHTML   += `<button onclick="logout()" class="logout">Log out</button>`;
        menue.innerHTML += `<li><a href="/">Home</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/search/">Find Jobs</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/saved/">Saved</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/applied/">Applied</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/compare/">Compare</a></li>`;
    }
    else if (role === "admin") {
        nav.innerHTML   += `<li><a href="/jobs/dashboard/">Dashboard</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/joblist/">Joblist</a></li>`;
        nav.innerHTML   += `<li><a href="/jobs/addjob/">Add Job</a></li>`;
        btn.innerHTML   += `<a href="/accounts/profile/" class="profile">${name}</a>`;
        btn.innerHTML   += `<button onclick="logout()" class="logout">Log out</button>`;
        menue.innerHTML += `<li><a href="/jobs/dashboard/">Dashboard</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/joblist/">Joblist</a></li>`;
        menue.innerHTML += `<li><a href="/jobs/addjob/">Add Job</a></li>`;
    }
}

document.addEventListener("DOMContentLoaded", initNavbar);

const burger = document.getElementById("burger");
const div    = document.getElementById("menue");

burger.addEventListener('click', () => {
    if (div.style.display === "block") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        div.style.display = "none";
    }
});