window.addEventListener('DOMContentLoaded', () => {
    const timeSpan = document.querySelector('[data-testid="test-user-time"] span');
  timeSpan.textContent = Date.now();
});
