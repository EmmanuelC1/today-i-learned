const btnShareFact = document.querySelector('.btn-share-fact');
const form = document.querySelector('.fact-form');

// Display and hide form to share new fact
btnShareFact.addEventListener('click', function () {
  form.classList.toggle('hidden');
  form.classList.contains('hidden')
    ? (btnShareFact.textContent = 'Share a Fact')
    : (btnShareFact.textContent = 'Close');
});
