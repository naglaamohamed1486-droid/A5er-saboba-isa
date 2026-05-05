document.addEventListener("DOMContentLoaded", () => {
    const List = JSON.parse(localStorage.getItem("compareJobs") || "[]");

    console.log("compareJobs:", List);

    if (List.length < 2) {
        document.querySelector(".big").innerHTML = `
            <p class="empty">Please select 2 jobs to compare.</p>
            <a href="search.html" class="search">Browse Jobs</a>`;
        return;
    }

    fetch("js/jobs.json")
        .then(res => res.json())
        .then(data => {
          
            const job1 = data.find(j => j.id == List[0].id);
            const job2 = data.find(j => j.id == List[1].id);

            console.log("job1:", job1, "job2:", job2);

            if (!job1 || !job2) {
                showToast("⚠️ One or more jobs no longer exist.");
                return;
            }

            Job(job1, "1");
            Job(job2, "2");

            document.getElementById("apply1").addEventListener("click", () => {
                window.location.href = `form.html?id=${job1.id}`;
            });
            document.getElementById("apply2").addEventListener("click", () => {
                window.location.href = `form.html?id=${job2.id}`;
            });
            document.getElementById("cancel1").addEventListener("click", () => {
                remove(job1.id);
            });
            document.getElementById("cancel2").addEventListener("click", () => {
                remove(job2.id);
            });
        });
});

function Job(job, suffix) {
    document.getElementById(`name${suffix}`).textContent = job.title;
    document.getElementById(`comp${suffix}`).textContent = job.company;
    document.getElementById(`salary${suffix}`).textContent = job.salary;
    document.getElementById(`location${suffix}`).textContent = job.location;
    document.getElementById(`type${suffix}`).textContent = job.type;
    document.getElementById(`exp${suffix}`).textContent = job.exp;
   const benList = document.getElementById(`benifit${suffix}`);
    job.benefit.forEach(b => {
      let li = document.createElement("li");
      li.textContent = b;
      benList.appendChild(li);
    });
}

function remove(jobId) {
    let list = JSON.parse(localStorage.getItem("compareJobs") || "[]");
    list = list.filter(j => j.id != jobId);
    localStorage.setItem("compareJobs", JSON.stringify(list));
    window.location.href = "search.html";
}

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