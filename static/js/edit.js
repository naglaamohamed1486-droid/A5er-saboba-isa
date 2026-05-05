document.addEventListener('DOMContentLoaded', () => {
    // 1. استخراج الـ ID من عنوان الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    if (jobId) {
        // 2. البحث عن الوظيفة في الـ LocalStorage
        const jobs = JSON.parse(localStorage.getItem('myJobs')) || [];
        const job = jobs.find(j => j.id == jobId);

      if (job) {
    document.getElementById('jobtitle').value = job.title;
    document.getElementById('salary').value = job.salary;
    document.getElementById('companyname').value = job.company;
    document.getElementById('status').value = job.status;
    document.getElementById('year').value = job.experience;
    document.getElementById('description').value = job.description;

    // الربط الذكي للـ Select
    if (job.type) {
        document.getElementById('job-type').value = job.type.toLowerCase();
    }
    
    if (job.employment) {
        document.getElementById('employment-type').value = job.employment.toLowerCase();
    }
}
    
    }

   
    const editForm = document.querySelector('form');
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let jobs = JSON.parse(localStorage.getItem('myJobs')) || [];
    const index = jobs.findIndex(j => j.id == jobId);

    if (index !== -1) {
        
        jobs[index].title = document.getElementById('jobtitle').value;
        jobs[index].salary = document.getElementById('salary').value;
        jobs[index].company = document.getElementById('companyname').value;
        jobs[index].status = document.getElementById('status').value;
        jobs[index].experience = document.getElementById('year').value;
        jobs[index].description = document.getElementById('description').value;

     
        jobs[index].type = document.getElementById('job-type').value; 
        jobs[index].employment = document.getElementById('employment-type').value; 
        localStorage.setItem('myJobs', JSON.stringify(jobs));
        
        alert("Job Updated Successfully! ✅");
        window.location.href = 'joblist.html';
    }
});
});