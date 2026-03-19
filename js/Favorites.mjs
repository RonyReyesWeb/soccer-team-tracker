const FAVORITES_KEY = "stt_favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function addFavorite(team) {
  const favorites = getFavorites();
  const exists = favorites.find(f => f.id === team.id);
  if (!exists) {
    favorites.push(team);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(teamId) {
  const favorites = getFavorites().filter(f => f.id !== teamId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(teamId) {
  return getFavorites().some(f => f.id === teamId);
}

export function renderFavorites() {
  const favorites = getFavorites();
  const container = document.getElementById("favorites-list");
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = `<p class="empty-msg">No favorites saved yet.</p>`;
    return;
  }

  container.innerHTML = favorites.map(team => `
    <div class="team-card">
      <img src="${team.logo || ''}" alt="${team.name}" onerror="this.style.display='none'" />
      <div class="team-info">
        <h3>${team.name}</h3>
        <p>${team.country || ""}</p>
      </div>
      <div class="card-actions">
        <a href="team.html?id=${team.id}" class="view-btn">View</a>
        <button class="remove-btn" data-id="${team.id}">★ Remove</button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFavorite(Number(btn.dataset.id));
      renderFavorites();
    });
  });
}