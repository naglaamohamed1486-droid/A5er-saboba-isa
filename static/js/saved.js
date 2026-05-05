    
document.addEventListener("DOMContentLoaded", () => {

  const savedList  = document.getElementById("savedList");
  const emptyState = document.getElementById("emptyState");
  const savedCount = document.getElementById("savedCount");

   
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

  
  if (savedJobs.length === 0) {
    savedCount.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  savedCount.textContent = `${savedJobs.length} job${savedJobs.length > 1 ? "s" : ""} saved`;


  savedJobs.forEach(job => {
    const card = buildJobCard(job);
    savedList.appendChild(card);
  });
});

/* ════════════════════════════════════════════
   BUILD JOB CARD
════════════════════════════════════════════ */
function buildJobCard(job) {
  const card = document.createElement("div");
  card.className = "job-card";
  card.style.display = "block";

  card.innerHTML = `
    <img class="cover" src="${job.Cover || ''}" width="450" height="250" alt="${job.title}" />
    <div class="head">
      <h2 class="job-name">${job.title}</h2>
      <div class="action">
        <button class="saved saved--active" title="Remove from saved">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
              stroke="#EF4343" stroke-width="2" fill="#EF4343"/>
          </svg>
        </button>
      </div>
    </div>
    <p class="company">${job.company}</p>
    <ul class="details">
      <li class="typetag">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#2B3EEE" stroke-width="1.5"/><path d="M12 6V12" stroke="#2B3EEE" stroke-width="1.5" stroke-linecap="round"/><path d="M16.24 16.24L12 12" stroke="#2B3EEE" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="type">${job.type}</span>
      </li>
      <li class="loctag">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#F59F0A"><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#F59F0A" stroke-width="2"/><path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#F59F0A" stroke-width="2"/></svg>
        <span class="location">${job.location}</span>
      </li>
      <li class="money">
        <span class="salary">${job.salary}</span>
      </li>
    </ul>
    <ul style="list-style:none;" class="tag">
      ${job.tags.map(t => `<li>${t}</li>`).join('')}
    </ul>
    <hr />
    <div class="foot">
      <div class="timestamp">${job.time}</div>
      <button class="view"><a href="jobDetails.html?id=${job.id}">View Details</a></button>
    </div>
  `;

 
  card.querySelector(".saved").addEventListener("click", () => {
    // اشيل الـ job من localStorage
    let saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    saved = saved.filter(j => j.id !== job.id);
    localStorage.setItem("savedJobs", JSON.stringify(saved));
    localStorage.setItem("saved", saved.length);

    // اشيل الكارت من الصفحة
    card.style.opacity = "0";
    card.style.transition = "opacity 0.3s";
    setTimeout(() => {
      card.remove();

      // لو مفيش كروت — اعرض الـ empty state
      const remaining = document.querySelectorAll(".job-card");
      if (remaining.length === 0) {
        document.getElementById("savedCount").style.display = "none";
        document.getElementById("emptyState").style.display = "block";
      } else {
        document.getElementById("savedCount").textContent =
          `${remaining.length} job${remaining.length > 1 ? "s" : ""} saved`;
      }
    }, 300);

    showToast("💔 Job removed from saved");
  });

  return card;
}

/* ════════════════════════════════════════════
   TOAST
════════════════════════════════════════════ */
// function showToast(msg) {
//   const toast = document.createElement("div");
//   toast.textContent = msg;
//   toast.style.cssText = `
//     position: fixed; bottom: 2rem; right: 2rem;
//     background: #0F1729; color: #fff;
//     padding: 0.75rem 1.25rem; border-radius: 0.75rem;
//     font-size: 0.88rem; font-weight: 600;
//     box-shadow: 0 8px 24px rgba(0,0,0,0.2);
//     z-index: 999;
//   `;
//   document.body.appendChild(toast);
//   setTimeout(() => toast.remove(), 2500);
// }
