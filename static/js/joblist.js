document.querySelectorAll('.toast').forEach(toast => {
  toast.addEventListener('animationend', e => {
    if (e.animationName === 'toastOut') toast.remove();
  });
});