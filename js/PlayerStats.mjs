import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";

const api = new ProductData();

const mockPlayers = [
  { name: "Marc-André ter Stegen", position: "Goalkeeper", goals: 0, assists: 0, appearances: 28, rating: 7.4 },
  { name: "Ronald Araújo", position: "Defender", goals: 2, assists: 1, appearances: 24, rating: 7.1 },
  { name: "Jules Koundé", position: "Defender", goals: 1, assists: 3, appearances: 26, rating: 7.3 },
  { name: "Pedri", position: "Midfielder", goals: 5, assists: 7, appearances: 25, rating: 7.9 },
  { name: "Gavi", position: "Midfielder", goals: 3, assists: 4, appearances: 22, rating: 7.6 },
  { name: "Frenkie de Jong", position: "Midfielder", goals: 2, assists: 5, appearances: 20, rating: 7.5 },
  { name: "Lamine Yamal", position: "Forward", goals: 12, assists: 9, appearances: 28, rating: 8.4 },
  { name: "Robert Lewandowski", position: "Forward", goals: 18, assists: 6, appearances: 27, rating: 8.1 },
  { name: "Raphinha", position: "Forward", goals: 14, assists: 11, appearances: 27, rating: 8.2 },
];

export async function loadPlayers(teamId, containerId = "players-list") {
  showSpinner(containerId);

  try {
    // TODO: replace mock with real API call:
    // const data = await api.getData(`/football-get-squad-by-team?teamid=${teamId}`);
    // const players = data.response.players || [];

    const players = mockPlayers;
    renderPlayers(players, containerId);
  } catch (err) {
    showMessage(containerId, "Failed to load players.", "error");
  }
}

function renderPlayers(players, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (players.length === 0) {
    showMessage(containerId, "No players found.", "info");
    return;
  }

  // Group by position
  const groups = {
    Goalkeeper: players.filter(p => p.position === "Goalkeeper"),
    Defender: players.filter(p => p.position === "Defender"),
    Midfielder: players.filter(p => p.position === "Midfielder"),
    Forward: players.filter(p => p.position === "Forward"),
  };

  container.innerHTML = Object.entries(groups).map(([position, group]) => `
    <div class="position-group">
      <h4 class="position-label">${positionEmoji(position)} ${position}s</h4>
      ${group.map(player => playerCard(player)).join("")}
    </div>
  `).join("");
}

function positionEmoji(position) {
  const emojis = {
    Goalkeeper: "🧤",
    Defender: "🛡️",
    Midfielder: "⚙️",
    Forward: "⚡"
  };
  return emojis[position] || "⚽";
}

function playerCard(player) {
  const ratingClass = player.rating >= 8 ? "rating-high" :
                      player.rating >= 7 ? "rating-mid" : "rating-low";
  return `
    <div class="player-card">
      <div class="player-info">
        <strong>${player.name}</strong>
        <span>${player.appearances} appearances</span>
      </div>
      <div class="player-stats">
        <span>⚽ ${player.goals}</span>
        <span>🎯 ${player.assists}</span>
        <span class="player-rating ${ratingClass}">${player.rating}</span>
      </div>
    </div>
  `;
}