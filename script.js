// Selecting Elements
const btnShareFact = document.querySelector('.btn-share-fact');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create new DOM Elements – Render facts in list
factsList.innerHTML = '';

const createFactsList = function (dataArray) {
  const markupArr = dataArray.map(fact => {
    return `
      <li class="fact">
        <p>${fact.text}
          <a class="source" href="${fact.source}" target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: #3b82f6;">${fact.category}</span>
        <div class="vote-buttons">
          <button>👍 ${fact.votesInteresting}</button>
          <button>🤯 ${fact.votesMindblowing}</button>
          <button>⛔️ ${fact.votesFalse}</button>
        </div>
      </li>
    `;
  });

  const markup = markupArr.join('');
  factsList.insertAdjacentHTML('afterbegin', markup);
};

// Load data from Supabase
const loadData = async function () {
  try {
    const res = await fetch(
      'https://hblvjautrtyzfvjrfmxv.supabase.co/rest/v1/facts?select=*',
      {
        headers: {
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibHZqYXV0cnR5emZ2anJmbXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2Mjg3ODQsImV4cCI6MjAwMDIwNDc4NH0.KU-5Fzc3X0EWE3i7ZhSxKcgbPOvOwL8rTDx-c0f307Q',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibHZqYXV0cnR5emZ2anJmbXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2Mjg3ODQsImV4cCI6MjAwMDIwNDc4NH0.KU-5Fzc3X0EWE3i7ZhSxKcgbPOvOwL8rTDx-c0f307Q',
        },
      }
    );

    const data = await res.json();
    createFactsList(data);
  } catch (err) {
    console.error(err.message);
  }
};
loadData();

// Toggle form visibility
btnShareFact.addEventListener('click', function () {
  form.classList.toggle('hidden');
  form.classList.contains('hidden')
    ? (btnShareFact.textContent = 'Share a Fact')
    : (btnShareFact.textContent = 'Close');
});
