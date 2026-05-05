function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) return;
    let range = end - start;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        obj.innerHTML = value.toLocaleString() + "+";
        if (value == end) {
            clearInterval(timer);
        }
    }
    timer = setInterval(run, stepTime);
}

document.addEventListener('DOMContentLoaded', () => {

    animateValue("count1", 0, 1250, 2000); 
    animateValue("count2", 0, 5400, 2000); 
});