// ── Travel data ──────────────────────────────────────────────
const travelData = {
  beaches: [
    {
      name: "Bora Bora, French Polynesia",
      description: "A legendary South Pacific island ringed by a turquoise lagoon and powder-white sand. The overwater bungalows are iconic, but the snorkelling off Matira Beach is what keeps people coming back.",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&auto=format&fit=crop"
      ]
    },
    {
      name: "Railay Beach, Thailand",
      description: "Accessible only by boat, Railay is enclosed by dramatic limestone cliffs and sheltered from the mainland crowds. Kayak at dawn, climb at dusk — it rewards the effort to get there.",
      images: [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop"
      ]
    }
  ],

  temples: [
    {
      name: "Angkor Wat, Cambodia",
      description: "The largest religious monument on Earth, built in the 12th century and still standing in extraordinary condition. Arrive before sunrise and watch the temple emerge from the mist above the reflection pool.",
      images: [
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop"
      ]
    },
    {
      name: "Kinkaku-ji, Kyoto, Japan",
      description: "The Golden Pavilion — a Zen Buddhist temple whose top two floors are entirely covered in gold leaf. Reflected in Kyokochi Pond, it looks like a painting regardless of season.",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&auto=format&fit=crop"
      ]
    }
  ],

  countries: [
    {
      name: "Japan",
      description: "From bullet trains to bamboo forests, Japan layers ancient ritual and contemporary design without contradiction. Cherry blossom season (late March–early April) is the most visited, but autumn foliage in November is just as spectacular with shorter queues.",
      images: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=600&auto=format&fit=crop"
      ]
    },
    {
      name: "Peru",
      description: "Machu Picchu draws the crowds, but Peru rewards those who look wider: the Nazca Lines, the floating reed islands of Lake Titicaca, and Lima's world-class food scene make for a full, rich itinerary.",
      images: [
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600&auto=format&fit=crop"
      ]
    }
  ]
};

// ── Search logic ──────────────────────────────────────────────
function handleSearch() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (!query) return;

  let results = [];

  if (query.includes('beach')) {
    results = travelData.beaches;
  } else if (query.includes('temple')) {
    results = travelData.temples;
  } else if (
    query.includes('countr') ||
    query.includes('japan') ||
    query.includes('peru')
  ) {
    results = travelData.countries;
  } else {
    // Search all categories
    results = [
      ...travelData.beaches,
      ...travelData.temples,
      ...travelData.countries
    ].filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  displayResults(results, query);

  // Show clear button, hide category grid
  const clearBtn = document.getElementById('clear-btn');
  if (clearBtn) clearBtn.style.display = 'inline-block';
  const cats = document.getElementById('categories');
  if (cats) cats.style.display = 'none';

  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function searchCategory(category) {
  document.getElementById('search-input').value = category;
  handleSearch();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('results-container').innerHTML = '';
  const clearBtn = document.getElementById('clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  const cats = document.getElementById('categories');
  if (cats) cats.style.display = 'block';
}

function displayResults(items, query) {
  const container = document.getElementById('results-container');

  if (!items.length) {
    container.innerHTML = `
      <div class="no-results">
        <p>No results found for "<strong>${query}</strong>".</p>
        <p>Try searching "beaches", "temples", or "countries".</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <h2 class="results-heading">Results for "${query}"</h2>
    <div class="results-grid">
      ${items.map(item => `
        <article class="result-card">
          <div class="result-images">
            <img src="${item.images[0]}" alt="${item.name} – photo 1" />
            <img src="${item.images[1]}" alt="${item.name} – photo 2" />
          </div>
          <div class="result-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `).join('')}
    </div>`;
}

// ── Mobile nav ────────────────────────────────────────────────
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ── Contact form ──────────────────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  document.getElementById('contact-success').classList.remove('hidden');
  e.target.reset();
}

// ── Enter key triggers search ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
});
