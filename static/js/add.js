document.addEventListener('DOMContentLoaded', () => {
  const addJobForm = document.querySelector('form');
  const submitBtn = document.querySelector('.btn-post');

  if (addJobForm) {
    addJobForm.addEventListener('submit', () => {
      submitBtn.innerHTML = `<span>⏳ Posting...</span>`;
    });
  }
});