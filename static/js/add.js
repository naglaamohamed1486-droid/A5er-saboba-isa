document.addEventListener('DOMContentLoaded', () => {
    const addJobForm = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-post');

    if (addJobForm) {
        addJobForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const jobData = {
    id: Date.now(),
    title: document.getElementById('jobtitle').value.trim(),
    salary: document.getElementById('salary').value,
    company: document.getElementById('companyname').value.trim(),
    status: document.getElementById('status').value,
    experience: document.getElementById('year').value,
    type: document.getElementById('job-type').value, // ده الـ Work Mode
    // جوه الـ jobData
employment: document.getElementById('employment-type').value,
    description: document.getElementById('description').value.trim(),
    createdAt: new Date().toLocaleDateString()
};

            submitBtn.innerHTML = `<span>⏳ Posting...</span>`;
            submitBtn.disabled = true;

            try {
                
                let savedJobs = JSON.parse(localStorage.getItem('myJobs')) || [];
                savedJobs.push(jobData);
                localStorage.setItem('myJobs', JSON.stringify(savedJobs));

                localStorage.setItem("totalJobs", savedJobs.length);
              

                setTimeout(() => {
                    alert("SUCCESS: Job posted successfully! 🎉");
                    window.location.href = './joblist.html'; // هيحولك لصفحة الوظائف
                }, 1500);

            } catch (error) {
                alert("ERROR: Something went wrong");
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Add Job</span>`;
            }
        });
    }
});