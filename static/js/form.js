const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

fetch("js/jobs.json").then(res => res.json()).then(data => {
    const job = data.find(j => j.id == jobId);
    if (!job) {
        document.body.innerHTML = "<h1> Job not found</h1>";
        return;
    }
    document.getElementById("title").textContent = job.title;
    document.getElementById("company").textContent = job.company;
    document.getElementById("type").textContent = job.type;

    
    const applyForm = document.querySelector("form"); 

    if (applyForm) {
        applyForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            
            const applications = JSON.parse(localStorage.getItem('appliedJobs')) || [];
            const alreadyApplied = applications.some(app => app.id == job.id);

            if (alreadyApplied) {
                alert("You have already applied for this position!");
                window.location.href = "AppliedJobs.html"; 
                return;
            }

    
            const newApplication = {
                id: job.id,
                title: job.title,
                company: job.company,
                type: job.type,
                date: new Date().toLocaleDateString(), 
                status: "Pending",
                logo: job.Cover || "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
                userName: document.getElementById("text").value,
                userEmail: document.getElementById("email").value
            };

            applications.push(newApplication);
            localStorage.setItem('appliedJobs', JSON.stringify(applications));
            localStorage.setItem("applied", applications.length);
            window.location.href = "AppliedJobs.html"; 
        });
    }
});