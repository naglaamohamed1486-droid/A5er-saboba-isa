const role = localStorage.getItem("used-role");
function navbar() {
  const nav = document.getElementById("links");
  const btn = document.getElementById("logs");
  const menue =document.getElementById("menue")
    nav.innerHTML = "";
    btn.innerHTML = "";
    if (role === null) {
        nav.innerHTML += `<li><a href="index.html">Home</a></li>`;
        nav.innerHTML += `<li><a href="search.html">Find Jobs</a></li>`;
        btn.innerHTML += ` <a href="login.html" class="login">Log In</a>`;
        btn.innerHTML += `<a href="signup.html" class="signup ">Sign Up</a>`;
        menue.innerHTML += `<li><a href="index.html">Home</a></li>`;
        menue.innerHTML += `<li><a href="search.html">Find Jobs</a></li>`;
       
    }
    else if (role === "user") {
        const name =localStorage.getItem("username");
        nav.innerHTML += `<li><a href="index.html">Home</a></li>`;
        nav.innerHTML += `<li><a href="search.html">Find Jobs</a></li>`;
        nav.innerHTML += `<li><a href="./saved.html">Saved</a></li>`;
        nav.innerHTML += `<li><a href="AppliedJobs.html">Applied</a></li>`;
        nav.innerHTML += ` <li><a href="./compare.html">Compare</a></li>`;
        btn.innerHTML += `<a href="profile.html" class="profile" ><svg width="14px" height="14px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile [#1341]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#0F1729"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#1341]"> </path> </g> </g> </g> </g></svg>${name}</a>`;
        btn.innerHTML += `<button onclick="logout()" class="logout" id="logout"><svg fill="#EF4343" width="24px" height="14px" viewBox="0 0 32 32" id="Outlined" xmlns="http://www.w3.org/2000/svg" stroke="#EF4343"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Fill"> <path d="M25,2H16V4h9a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1H16v2h9a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2Z"></path> <path d="M21.58,17V15H7l4-4L9.58,9.55l-5,5a2,2,0,0,0,0,2.83l5,5L11,21,7,17Z"></path> </g> </g></svg> Log out</button>`;
         menue.innerHTML += `<li><a href="index.html">Home</a></li>`;
         menue.innerHTML += `<li><a href="search.html">Find Jobs</a></li>`;
         menue.innerHTML += `<li><a href="./saved.html">Saved</a></li>`;
         menue.innerHTML += `<li><a href="AppliedJobs.html">Applied</a></li>`;
         menue.innerHTML += ` <li><a href="./compare.html">Compare</a></li>`;
       
   
    }
    else if (role === "admin") {
        const name =localStorage.getItem("username");
        nav.innerHTML += `<li><a href="./dashboard.html">Dashboard</a></li>`;
        nav.innerHTML += `<li><a href="./joblist.html">Joblist</a></li>`;
        nav.innerHTML += `<li><a href="./addjob.html">Add Job</a></li>`;
        btn.innerHTML += `<a href="profile.html" class="profile" ><svg width="14px" height="14px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile [#1341]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#0F1729"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#1341]"> </path> </g> </g> </g> </g></svg>${name}</a>`;
        btn.innerHTML += `<button onclick="logout()" class="logout" id="logout"><svg fill="#EF4343" width="24px" height="14px" viewBox="0 0 32 32" id="Outlined" xmlns="http://www.w3.org/2000/svg" stroke="#EF4343"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Fill"> <path d="M25,2H16V4h9a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1H16v2h9a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2Z"></path> <path d="M21.58,17V15H7l4-4L9.58,9.55l-5,5a2,2,0,0,0,0,2.83l5,5L11,21,7,17Z"></path> </g> </g></svg> Log out</button>`;
       menue.innerHTML += `<li><a href="./dashboard.html">Dashboard</a></li>`;
       menue.innerHTML += `<li><a href="./joblist.html">Joblist</a></li>`;
       menue.innerHTML += `<li><a href="./addjob.html">Add Job</a></li>`;
      
    }
   
}
function footer() {
    if (role === null) {
        document.querySelector(".footer__col-links a[href='AppliedJobs.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='profile.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='dashboard.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='joblist.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='addjob.html']").setAttribute("href", "signup.html");
        
    }
    else if (role === "user") {
        document.querySelector(".footer__col-links a[href='dashboard.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='joblist.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='addjob.html']").setAttribute("href", "signup.html");
    }
    else if (role === "admin") {
        document.querySelector(".footer__col-links a[href='AppliedJobs.html']").setAttribute("href", "signup.html");
        document.querySelector(".footer__col-links a[href='profile.html']").setAttribute("href", "profile.html");
    }
}

document.addEventListener("DOMContentLoaded", navbar);
document.addEventListener("DOMContentLoaded", footer);

const burger = document.getElementById("burger");
const div = document.getElementById("menue");

burger.addEventListener('click', () => {
   if (div.style.display === "block") {
     div.style.display = "none";
         }
         
        else if(div.style.display === "none") {
     div.style.display = "block";
  
        };

  });
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        div.style.display = "none";
        document.querySelector("main").style.marginTop = "";
    }
});
