document.addEventListener("DOMContentLoaded", () => {
    const jobContainer = document.getElementById("job-container");
    const countText = document.getElementById("job-count");

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (countText) {
        countText.textContent = appliedJobs.length;
    }

    
    if (appliedJobs.length === 0) {
        jobContainer.innerHTML = `
            <div class="atop">
                <p>You haven't applied for any jobs yet.</p>
                <a href="search.html" class="brow-btn">Browse Jobs →</a>
                
            </div>`;
        return;
    }



    
    
    jobContainer.innerHTML = appliedJobs.reverse().map(job => `
        <div class="job-card">
            <div class="job-info">
                <img class="cover" src="${job.logo}" alt="${job.title}" />
                <div class="job-text">
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                    <span>Applied ${job.date}</span>
                </div>
            </div>

            <div class="job-actions">
                <span class="status pending">🕒 ${job.status}</span>
                <button class="cancel-btn" onclick="cancelJob(${job.id})">cancel</button>
                <button class="view-btn" onclick="window.location.href='jobDetails.html?id=${job.id}'">
                    View Job →
                </button>
                
            </div>
        </div>
    `).join('');
});

function cancelJob(id){
    if(confirm){
        let jobs= JSON.parse(localStorage.getItem("appliedJobs"))|| [];
        jobs = jobs.filter(job => job.id !== id);
        localStorage.setItem('appliedJobs', JSON.stringify(jobs));
        localStorage.setItem("totalApplications", jobs.length);
        localStorage.setItem("applied", jobs.length);
        location.reload(); 
    }
}