import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";

const api = new ProductData();

export async function loadLeagues() {
  showSpinner("leagues-list");

  try {
    const data = await api.getData("/football-get-all-leagues");
    const leagues = data.response || [];

    if (leagues.length === 0) {
      showMessage("leagues-list", "No leagues found.", "error");
      return;
    }

    renderLeagues(leagues);
  } catch (err) {
    showMessage("leagues-list", "Failed to load leagues. Please try again.", "error");
  }
}

export async function loadTeamsByLeague(leagueId) {
  showSpinner("search-results");

  try {
    const data = await api.getData(`/football-get-all-teams-by-league?leagueid=${leagueId}`);
    const teams = data.response || [];

    if (teams.length === 0) {
      showMessage("search-results", "No teams found for this league.", "error");
      return;
    }

    renderTeams(teams);
  } catch (err) {
    showMessage("search-results", "Failed to load teams. Please try again.", "error");
  }
}

function renderLeagues(leagues) {
  const container = document.getElementById("leagues-list");

  container.innerHTML = leagues.map(league => `
    <div class="league-card" data-id="${league.id}">
      <img src="${league.logo || ''}" alt="${league.name}" onerror="this.style.display='none'" />
      <span>${league.name}</span>
    </div>
  `).join("");

  container.querySelectorAll(".league-card").forEach(card => {
    card.addEventListener("click", () => {
      loadTeamsByLeague(card.dataset.id);
      document.getElementById("search-results").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderTeams(teams) {
  const container = document.getElementById("search-results");

  container.innerHTML = teams.map(team => `
    <div class="team-card">
      <img src="${team.logo || ''}" alt="${team.name}" onerror="this.style.display='none'" />
      <div class="team-info">
        <h3>${team.name}</h3>
        <p>${team.country || ""}</p>
      </div>
      <a href="team.html?id=${team.id}" class="view-btn">View Team</a>
    </div>
  `).join("");
}