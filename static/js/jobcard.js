const container = document.querySelector(".job-list");
const jobcard = container.querySelector(".job-card");

console.log("Template found:", jobcard);

// بيجيب الـ saved jobs من localStorage
function getSavedJobs() {
  return JSON.parse(localStorage.getItem("savedJobs") || "[]");
}

// بيحفظ الـ saved jobs في localStorage
function setSavedJobs(jobs) {
  localStorage.setItem("savedJobs", JSON.stringify(jobs));
}

// بيتحقق لو الـ job اتحفظت
function isJobSaved(jobId) {
  return getSavedJobs().some(j => j.id === jobId);
}

// بيضيف أو يشيل الـ job
function toggleSave(job) {
  let saved = getSavedJobs();
  const exists = saved.some(j => j.id === job.id);

  if (exists) {
    saved = saved.filter(j => j.id !== job.id);
  } else {
    saved.push(job);
  }

  setSavedJobs(saved);
  return !exists;
}

/*
   UPDATE SAVED COUNT في الـ profile
*/
function updateSavedCount() {
  const count = getSavedJobs().length;
  localStorage.setItem("saved", count);
}

/* compare */
function compare(job) {
  let list = JSON.parse(localStorage.getItem("compareJobs") || "[]");

 
  if (list.some(j => j.id === job.id)) {
    list = list.filter(j => j.id !== job.id);
    localStorage.setItem("compareJobs", JSON.stringify(list));
    updateCompare(job.id, false);
    return;
  }

  if (list.length >= 2) {
    showToast("⚠️ You can only compare 2 jobs at a time!");
    return;
  }

  
  list.push(job);
  localStorage.setItem("compareJobs", JSON.stringify(list));
  updateCompare(job.id, true);
}


function updateCompare(jobId, isAdded) {
  const btn = document.querySelector(`[data-compare-id="${jobId}"]`);
 
  if (btn) {
    btn.classList.toggle("active", isAdded);
    btn.querySelector("path").setAttribute("stroke", isAdded ? "#ffffff" : "#F46734");
    btn.style.background = isAdded ? "#F46734" : "";
  }
}


fetch("js/jobs.json")
  .then(res => res.json())
  .then(jobs => {
    console.log("Jobs loaded:", jobs);

    
    const currentCompare = JSON.parse(localStorage.getItem("compareJobs") || "[]");

    jobs.forEach(job => {
      const card = jobcard.cloneNode(true);
      card.style.display = "block";
      card.querySelector(".cover").src = job.Cover;
      card.querySelector(".job-name").textContent = job.title;
      card.querySelector(".company").textContent = job.company;
      card.querySelector(".type").textContent = job.type;
      card.querySelector(".location").textContent = job.location;
      card.querySelector(".salary").textContent = job.salary;
      card.querySelector(".timestamp").textContent = job.time;

     
      const tagsContainer = card.querySelector(".tag");
      job.tags.forEach(tag => {
        const li = document.createElement("li");
        li.textContent = tag;
        tagsContainer.appendChild(li);
      });

     
      card.querySelector(".view a").setAttribute("href", `jobDetails.html?id=${job.id}`);

      const saveBtn = card.querySelector(".saved");
      const comparebtn = card.querySelector(".compare");


      comparebtn.setAttribute("data-compare-id", job.id);

      // الحالة الأولية للـ save button
      if (isJobSaved(job.id)) {
        saveBtn.querySelector("path").setAttribute("fill", "#EF4343");
      }

     
      if (currentCompare.some(j => j.id === job.id)) {
        comparebtn.style.background = "#F46734";
  
        comparebtn.querySelector("path").setAttribute("stroke", "#ffffff");
      }

     
      comparebtn.addEventListener("click", () => {
        compare(job);
        const updatedList = JSON.parse(localStorage.getItem("compareJobs") || "[]");
        const isNowAdded = updatedList.some(j => j.id === job.id);

        if (!isCurrentlyAdded && list.length >= 2) {
            showToast("⚠️ You can only compare 2 jobs at a time!");
            return;
        }
        
        if (isNowAdded) {
          comparebtn.style.background = "#F46734";
          comparebtn.querySelector("path").setAttribute("stroke", "#ffffff");
          showToast("✅ Job added to compare!");
        } else  {
          comparebtn.style.background = "";
          comparebtn.querySelector("path").setAttribute("stroke", "#F46734");
          showToast("❌ Job removed from compare!");
        }
      });

      // save button click
      saveBtn.addEventListener("click", () => {
        const nowSaved = toggleSave(job);
        updateSavedCount();

        if (nowSaved) {
          saveBtn.querySelector("path").setAttribute("fill", "#EF4343");
          showToast("❤️ Job saved!");
        } else {
          saveBtn.querySelector("path").setAttribute("fill", "none");
          showToast("💔 Job removed!");
        }
      });

      container.appendChild(card);
    });

    
    document.dispatchEvent(new CustomEvent("jobsLoaded"));
  });

// toast function
function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: #0F1729; color: #fff;
    padding: 0.75rem 1.25rem; border-radius: 0.75rem;
    font-size: 0.88rem; font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}