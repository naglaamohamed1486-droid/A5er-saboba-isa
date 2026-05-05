const jobs = JSON.parse(localStorage.getItem('myJobs')) || [];
document.getElementById('totalJobsCount').textContent = jobs.length;
localStorage.getItem('myJobs')

const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
document.getElementById('totalApplicationsCount').textContent = appliedJobs.length;





// مش فاهم كود ال recent applications
const recentContainer = document.querySelector('.recent');
if (recentContainer && appliedJobs.length > 0) {
    const lastTwo = appliedJobs.slice(-2).reverse();
    
    const cardsHTML = lastTwo.map(job => `
        <div class="app-card">
            <div class="left">
                <div class="avatar">${job.title.charAt(0).toUpperCase()}</div>
                <div>
                    <h4>${job.title}</h4>
                    <p>${job.company}</p>
                </div>
            </div>
            <span class="status ${job.status.toLowerCase()}">${job.status}</span>
        </div>
    `).join('');

    recentContainer.innerHTML = `<h3>Recent Applications</h3>` + cardsHTML;
}