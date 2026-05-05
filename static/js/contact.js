document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const btn = document.querySelector('.btn-submit');
    btn.innerHTML = 'Sending...';
    btn.style.opacity = '0.7';

   
    setTimeout(() => {
        window.location.href = "thank-you.html";
    }, 1000);
});