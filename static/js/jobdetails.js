const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");
fetch("js/jobs.json").then(res => res.json()).then(data => {
    const job = data.find(j => j.id == jobId);
    if (!job) {
        document.body.innerHTML = "<h1> Job not found</h1>";
        return;   
  }
   const currentCompare = JSON.parse(localStorage.getItem("compareJobs") || "[]"); 
  document.getElementById("cover").src=job.Cover
    document.getElementById("title").textContent = job.title;
    document.getElementById("company").textContent = job.company;
    document.getElementById("location").textContent = job.location;
    document.getElementById("time").textContent = job.time;
    document.getElementById("salary").textContent = job.salary;
    document.getElementById("type").textContent = job.type;
    document.getElementById("exp").textContent = job.exp;
    document.getElementById("description").textContent = job.description;
    document.getElementById("companyLocation").textContent = job.companyLocation;
    document.getElementById("employees").textContent = job.employees;

const tagsContainer = document.getElementById("tags");
    job.tags.forEach(tag => {
      let li = document.createElement("li");
     
      li.textContent = tag;
      tagsContainer.appendChild(li);
    });

    const reqList = document.getElementById("required");
    job.required.forEach(req => {
      let li = document.createElement("li");
      li.textContent = req;
      reqList.appendChild(li);
    });

    const benList = document.getElementById("benefit");
    job.benefit.forEach(b => {
      let li = document.createElement("li");
      li.textContent = b;
      benList.appendChild(li);
    });

    const gallery = document.getElementById("gallery");

const track = document.createElement("div");
track.className = "slider-track";
gallery.appendChild(track);

job.gallery.forEach(img => {
  let div = document.createElement("div");
  div.className = "ph";
  let image = document.createElement("img");
  image.src = img;
  div.appendChild(image);
  track.appendChild(div);
});

// dots
const dotsContainer = document.getElementById("dots");
let current = 0;

job.gallery.forEach((img, i) => {
  let dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll(".dot").forEach((d, i) =>
    d.classList.toggle("active", i === current)
  );
}

document.getElementById("prev").addEventListener("click", () =>
  goTo(current > 0 ? current - 1 : job.gallery.length - 1)
);

document.getElementById("next").addEventListener("click", () =>
  goTo(current < job.gallery.length - 1 ? current + 1 : 0)
);

function applyJob(id) {
    window.location.href = `form.html?id=${job.id}`;
  }

  document.getElementById("apply").addEventListener("click", () => {
    applyJob(job.id);
  });
  
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
  function updateSavedCount() {
  const count = getSavedJobs().length;
    localStorage.setItem("saved", count);
  }
 // Save button logic for details page
const saveBtn = document.getElementById("save"); 

if (isJobSaved(job.id)) {
    saveBtn.style.color = "#EF4343";
    saveBtn.querySelector("path").setAttribute("fill", "#EF4343");
}

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
  /* compare */
  const comparebtn = document.querySelector(".compare");
  comparebtn.setAttribute("data-compare-id", job.id); 
   
  if (currentCompare.some(j => j.id === job.id)) { 
        comparebtn.style.background = "#F46734";
        comparebtn.querySelector("path").setAttribute("stroke", "#ffffff");
  }
  
  function compare(job) {
  let list = JSON.parse(localStorage.getItem("compareJobs") || "[]");
         
    if (list.some(j => j.id === job.id)) {
        list = list.filter(j => j.id !== job.id);
        localStorage.setItem("compareJobs", JSON.stringify(list));
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
   comparebtn.addEventListener("click", () => {
        compare(job);
        const updatedList = JSON.parse(localStorage.getItem("compareJobs") || "[]");
        const isNowAdded = updatedList.some(j => j.id === job.id);

        if (isNowAdded) {
            comparebtn.style.background = "#F46734";
            comparebtn.querySelector("path").setAttribute("stroke", "#ffffff"); 
            showToast("✅ Job added to compare!");
        } else {
            comparebtn.style.background = "";
            comparebtn.querySelector("path").setAttribute("stroke", "#F46734"); 
            showToast("❌ Job removed from compare!");
        }
      });
  })