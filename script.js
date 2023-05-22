const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

// Selecting Elements
const btnShareFact = document.querySelector('.btn-share-fact');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create new DOM Elements – Render facts in list
factsList.innerHTML = '';

const getCategoryColor = function (category) {
  return CATEGORIES.find(cat => cat.name === category).color;
};

// Create & Render facts lists with a given dataArray
const createFactsList = function (dataArray) {
  const markupArr = dataArray.map(fact => {
    //prettier-ignore
    return `
      <li class="fact">
        <p>${fact.text}
          <a class="source" href="${fact.source}" target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: ${getCategoryColor(fact.category)};">${fact.category}</span>
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
