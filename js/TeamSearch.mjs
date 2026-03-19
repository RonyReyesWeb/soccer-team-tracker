import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";

const api = new ProductData();

export async function searchTeams(query) {
  showSpinner("search-results");

  try {
    const data = await api.getData(`/football-search-all-teams?search=${query}`);
    const teams = data.response || [];

    if (teams.length === 0) {
      showMessage("search-results", "No teams found. Try another search.", "error");
      return;
    }

    renderTeams(teams);
  } catch (err) {
    showMessage("search-results", "Something went wrong. Please try again.", "error");
  }
}

function renderTeams(teams) {
  const container = document.getElementById("search-results");

  container.innerHTML = teams.map(team => `
    <div class="team-card">
      <img src="${team.logo || ''}" alt="${team.name} logo" onerror="this.style.display='none'" />
      <div class="team-info">
        <h3>${team.name}</h3>
        <p>${team.country || ""}</p>
      </div>
      <a href="team.html?id=${team.id}" class="view-btn">View Team</a>
    </div>
  `).join("");
}