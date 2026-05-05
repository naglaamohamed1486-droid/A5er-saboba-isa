
const jobImages = {
    'frontend': './assets/imgs/frontend.jpg',
    'content writer': './assets/imgs/content writer.jpg',
    'cook': './assets/imgs/cooking.jpg',
    'customer support': './assets/imgs/customer support.jpg',
    'data scientist': './assets/imgs/data-scientist.jpg',
    'financial': './assets/imgs/financial.jpg',
    'graphic': './assets/imgs/graphic-design.webp',
    'photographer': './assets/imgs/photographer.jpg',
    'engineer': './assets/imgs/Software Engineer.jpeg',
    'translator': './assets/imgs/translator.jpg',
    'ui': './assets/imgs/ui.jpg',
    'civil': './assets/imgs/civil.jpg',
    'default': './assets/imgs/empty.jpg' 
};

function getJobImage(title) {
    if (!title) return jobImages.default;
    const lowerTitle = title.toLowerCase();
    for (const key in jobImages) {
        if (lowerTitle.includes(key) && key !== 'default') {
            return jobImages[key];
        }
    }
    return jobImages.default;
}


document.addEventListener('DOMContentLoaded', () => {
    const myAddedJobs = JSON.parse(localStorage.getItem('myJobs')) || [];
    const jobListContainer = document.getElementById('jobList');
    const countText = document.getElementById("countt");

    if (countText){
        countText.textContent = myAddedJobs.length;
    }

    if(myAddedJobs == 0){
        jobListContainer.innerHTML =`
        <div class="emp">
        <p>You haven't posted anything yet</p>
        </div>
        `
        return;
    }

    if (jobListContainer) {
        jobListContainer.innerHTML = ''; 
        myAddedJobs.forEach(job => {
            const cardHtml = `
                <div class="job-card">
                    <div class="company-logo">
                        <img src="${getJobImage(job.title)}" alt="${job.title}">
                    </div>
                    
                    <div class="job-info">
                        <h3>${job.title}</h3>
                        <div class="job-details">
                            <div class="job-comp"><svg width="18" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                            </svg> ${job.company}</div> 

                              <span class="job-typ"><svg width="18" height="15" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                        </svg> ${job.employment || 'Full-time'}</span>

                            <div class="job-sal"><svg width="18" height="15" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>$ ${job.salary}</div>
                        </div>
                    </div>

                    <div class="tags">
                        

                        <div class="badge">${job.type}</div>
                    </div>

                    <div class="action-btns">
                        <button class="edit-btn" onclick="window.location.href='editjob.html?id=${job.id}'">Edit</button>
                        <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
                    </div>
                </div>
            `;
            jobListContainer.innerHTML += cardHtml;
        });
    }
});


function deleteJob(id) {
    if (confirm) {
        let jobs = JSON.parse(localStorage.getItem('myJobs')) || [];
        jobs = jobs.filter(job => job.id !== id);
        localStorage.setItem('myJobs', JSON.stringify(jobs));
        location.reload(); 
    }
}