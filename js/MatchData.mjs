import ProductData from "./ProductData.mjs";
import { showSpinner, showMessage } from "./utils.mjs";

const api = new ProductData();

// Mock data — replace with real API calls tomorrow
const mockFixtures = [
  {
    home: "FC Barcelona",
    away: "Real Madrid",
    score: "3 - 2",
    date: "2025-03-15",
    time: "20:00",
    venue: "Camp Nou",
    status: "Finished",
    result: "win"
  },
  {
    home: "Atletico Madrid",
    away: "FC Barcelona",
    score: "1 - 1",
    date: "2025-03-08",
    time: "18:30",
    venue: "Metropolitano",
    status: "Finished",
    result: "draw"
  },
  {
    home: "FC Barcelona",
    away: "Sevilla",
    score: "4 - 0",
    date: "2025-03-01",
    time: "21:00",
    venue: "Camp Nou",
    status: "Finished",
    result: "win"
  },
  {
    home: "FC Barcelona",
    away: "PSG",
    score: "TBD",
    date: "2025-03-25",
    time: "21:00",
    venue: "Camp Nou",
    status: "Upcoming",
    result: null
  },
  {
    home: "Valencia",
    away: "FC Barcelona",
    score: "TBD",
    date: "2025-04-01",
    time: "19:00",
    venue: "Mestalla",
    status: "Upcoming",
    result: null
  },
];

export async function loadMatches(teamId, containerId = "matches-list") {
  showSpinner(containerId);

  try {
    // TODO: replace mock with real API call when limit resets:
    // const data = await api.getData(`/football-get-all-fixtures-by-team?teamid=${teamId}`);
    // const fixtures = data.response.fixtures || [];

    const fixtures = mockFixtures; // using mock for now
    renderMatches(fixtures, containerId);
  } catch (err) {
    showMessage(containerId, "Failed to load matches.", "error");
  }
}

function renderMatches(fixtures, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (fixtures.length === 0) {
    showMessage(containerId, "No matches found.", "info");
    return;
  }

  const recent = fixtures.filter(f => f.status === "Finished");
  const upcoming = fixtures.filter(f => f.status === "Upcoming");

  container.innerHTML = `
    <h4 class="section-label">📋 Recent Results</h4>
    ${recent.map(match => matchCard(match)).join("")}
    <h4 class="section-label">📅 Upcoming Fixtures</h4>
    ${upcoming.map(match => matchCard(match)).join("")}
  `;
}

function matchCard(match) {
  const resultClass = match.result ? `result-${match.result}` : "upcoming";
  return `
    <div class="match-card ${resultClass}">
      <div class="match-meta">
        <span class="match-status">${match.status}</span>
        <span class="match-venue">📍 ${match.venue}</span>
      </div>
      <div class="match-teams">
        <span class="team-name">${match.home}</span>
        <strong class="match-score">${match.score}</strong>
        <span class="team-name">${match.away}</span>
      </div>
      <span class="match-date">🗓 ${match.date} at ${match.time}</span>
    </div>
  `;
}