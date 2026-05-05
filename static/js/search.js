
document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    const type  = params.get("type");
    const searchName  = document.getElementById("search");
    const searchLoc = document.getElementById("location");
    const searchType  = document.getElementById("Types");
    const searchTags = document.getElementById("Tags");
    const filterbtn = document.getElementById("f");
    const filterdiv = document.getElementById("tags-filter");
   
    filterbtn.addEventListener("click", function() {
         
        if (filterdiv.style.display === "block") {
        filterdiv.style.display = "none";
         } 
        else {
        filterdiv.style.display = "block";
        };
    })
    function filterJobs() {
        const jobs = document.querySelectorAll(".job-card");

        const name = searchName.value.trim().toLowerCase();
        const loc = searchLoc.value.toLowerCase();
        const typeIn = searchType.value.toLowerCase();
        const tagsIn = searchTags.value.toLowerCase();        
        jobs.forEach(job => {
            if (!job.querySelector(".job-name")?.textContent.trim()) return;
            const title= job.querySelector(".job-name").textContent.trim().toLowerCase();
            const joblocation= job.querySelector(".location").textContent.trim().toLowerCase();
            const type= job.querySelector(".type").textContent.trim().toLowerCase();
         const tag= job.querySelector(".tag").textContent.trim().toLowerCase();

            const match =
                (name === ""|| title.includes(name))&&
                (loc==="all locations"|| joblocation.includes(loc))&&
                (typeIn==="all types"|| type.includes(typeIn))&&
                (tagsIn=== "all-tags"|| tag.includes(tagsIn));   

           if (match) {
            job.style.display = "block";
           }
           else {
                job.style.display = "none";
            }
        });

         updateResetButton();
    }
  
    searchName.addEventListener("input",  filterJobs);
    searchLoc.addEventListener("change",  filterJobs);
    searchType.addEventListener("change", filterJobs);
    searchTags.addEventListener("change", filterJobs);


   document.addEventListener("jobsLoaded", () => {
    if (query) {
        if (type === "tag") {
            searchTags.value = query;   
        } else {
            searchName.value = query; 
        }
    }
    filterJobs();
});

    
    function Filtered() {
    return (
        searchName.value.trim() !== "" ||
        searchLoc.value !== "all locations" ||
        searchType.value !== "all types" ||
        searchTags.value !== "all-tags"
    );
}
function updateResetButton() {
    let resetBtn = document.getElementById("reset");
    
    if (Filtered()) {
        resetBtn.addEventListener("click", () => {
            searchName.value = "";
            searchLoc.value = "all locations";
            searchType.value = "all types";
            searchTags.value = "all-tags";
            window.history.replaceState({}, "", window.location.pathname);
            filterJobs();
            updateResetButton();
        });

    }
}

});

