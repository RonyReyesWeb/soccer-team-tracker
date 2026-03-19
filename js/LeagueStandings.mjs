import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";

const api = new ProductData();

const mockStandings = [
  { pos: 1,  team: "FC Barcelona",    played: 28, won: 20, drawn: 5, lost: 3, gf: 68, ga: 28, points: 65 },
  { pos: 2,  team: "Real Madrid",     played: 28, won: 19, drawn: 4, lost: 5, gf: 61, ga: 32, points: 61 },
  { pos: 3,  team: "Atletico Madrid", played: 28, won: 17, drawn: 5, lost: 6, gf: 52, ga: 30, points: 56 },
  { pos: 4,  team: "Athletic Bilbao", played: 28, won: 14, drawn: 7, lost: 7, gf: 45, ga: 35, points: 49 },
  { pos: 5,  team: "Villarreal",      played: 28, won: 13, drawn: 6, lost: 9, gf: 41, ga: 38, points: 45 },
  { pos: 6,  team: "Real Sociedad",   played: 28, won: 12, drawn: 7, lost: 9, gf: 38, ga: 36, points: 43 },
  { pos: 7,  team: "Real Betis",      played: 28, won: 11, drawn: 8, lost: 9, gf: 36, ga: 37, points: 41 },
  { pos: 8,  team: "Valencia",        played: 28, won: 10, drawn: 6, lost: 12, gf: 33, ga: 42, points: 36 },
];

export async function loadStandings(leagueId, teamName = "", containerId = "standings-list") {
  showSpinner(containerId);

  try {
    // TODO: replace mock with real API call:
    // const data = await api.getData(`/football-get-standing?leagueid=${leagueId}`);
    // const standings = data.response.standings || [];

    const standings = mockStandings;
    renderStandings(standings, teamName, containerId);
  } catch (err) {
    showMessage(containerId, "Failed to load standings.", "error");
  }
}

function renderStandings(standings, teamName, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (standings.length === 0) {
    showMessage(containerId, "No standings available.", "info");
    return;
  }

  container.innerHTML = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        ${standings.map(row => `
          <tr class="${row.team === teamName ? "highlight-row" : ""}">
            <td>${row.pos}</td>
            <td class="team-col">${row.team}</td>
            <td>${row.played}</td>
            <td>${row.won}</td>
            <td>${row.drawn}</td>
            <td>${row.lost}</td>
            <td>${row.gf}</td>
            <td>${row.ga}</td>
            <td><strong>${row.points}</strong></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}