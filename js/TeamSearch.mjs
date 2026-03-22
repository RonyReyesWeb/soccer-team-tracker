import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";
import { addFavorite, removeFavorite, isFavorite, renderFavorites } from "./Favorites.mjs";

const api = new ProductData();

export async function loadLeagues() {
  showSpinner("leagues-list");
  console.log("🏆 loadLeagues() called...");

  try {
    const data = await api.getData("/football-get-all-leagues");
    console.log("🏆 Raw leagues API response:", data);

    const leagues = data.response.leagues || []; // ← FIXED
    console.log("🏆 Number of leagues found:", leagues.length);

    if (leagues.length === 0) {
      showMessage("leagues-list", "No leagues found.", "error");
      return;
    }

    console.log("🏆 First league sample:", leagues[0]);
    renderLeagues(leagues);
  } catch (err) {
    console.error("❌ loadLeagues error:", err);
    showMessage("leagues-list", "Failed to load leagues. Please try again.", "error");
  }
}

export async function loadTeamsByLeague(leagueId) {
  showSpinner("search-results");
  console.log("👕 loadTeamsByLeague() called with leagueId:", leagueId);

  try {
    const data = await api.getData(`/football-get-list-all-team?leagueid=${leagueId}`);
    console.log("👕 Raw teams response:", data);

    const teams = data.response.list || [];
    console.log("👕 Teams found:", teams.length);
    console.log("👕 First team:", teams[0]);

    if (teams.length === 0) {
      showMessage("search-results", "No teams found for this league.", "error");
      return;
    }

    renderTeams(teams);
  } catch (err) {
    console.error("❌ loadTeamsByLeague error:", err);
    showMessage("search-results", "Failed to load teams. Please try again.", "error");
  }
}

function renderLeagues(leagues) {
  console.log("🎨 renderLeagues() called with", leagues.length, "leagues");
  const container = document.getElementById("leagues-list");

  container.innerHTML = leagues.map(league => `
    <div class="league-card" data-id="${league.id}">
      <img src="${league.logo || ''}" alt="${league.name}" onerror="this.style.display='none'" />
      <span>${league.name}</span>
    </div>
  `).join("");

  container.querySelectorAll(".league-card").forEach(card => {
    card.addEventListener("click", () => {
      console.log("🖱️ League card clicked — ID:", card.dataset.id);
      loadTeamsByLeague(card.dataset.id);
      document.getElementById("search-results").scrollIntoView({ behavior: "smooth" });
    });
  });

  console.log("✅ Leagues rendered successfully");
}

function renderTeams(teams) {
  console.log("🎨 renderTeams() called with", teams.length, "teams");
  const container = document.getElementById("search-results");

  container.innerHTML = teams.map(team => `
    <div class="team-card">
      <img src="${team.logo || ''}" alt="${team.name}" onerror="this.style.display='none'" />
      <div class="team-info">
        <h3>${team.name}</h3>
        <p>${team.country || ""}</p>
      </div>
      <div class="card-actions">
        <a href="team.html?id=${team.id}" class="view-btn">View</a>
        <button class="fav-toggle-btn" data-team='${JSON.stringify({id: team.id, name: team.name, logo: team.logo, country: team.country})}'>
          ☆ Save
        </button>
      </div>
    </div>
  `).join("");

  updateFavButtons();
  container.querySelectorAll(".fav-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const team = JSON.parse(btn.dataset.team);
      console.log("⭐ Favorite button clicked for team:", team.name);
      if (isFavorite(team.id)) {
        console.log("💔 Removing from favorites:", team.name);
        removeFavorite(team.id);
      } else {
        console.log("❤️ Adding to favorites:", team.name);
        addFavorite(team);
      }
      updateFavButtons();
      renderFavorites();
    });
  });

  console.log("✅ Teams rendered successfully");
}

function updateFavButtons() {
  console.log("🔄 updateFavButtons() called");
  document.querySelectorAll(".fav-toggle-btn").forEach(btn => {
    const team = JSON.parse(btn.dataset.team);
    if (isFavorite(team.id)) {
      btn.textContent = "★ Saved";
      btn.classList.add("fav-saved");
    } else {
      btn.textContent = "☆ Save";
      btn.classList.remove("fav-saved");
    }
  });
}