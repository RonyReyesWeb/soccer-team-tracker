export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function showMessage(elementId, message, type = "info") {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = `<p class="message ${type}">${message}</p>`;
}

export function showSpinner(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = `<div class="spinner"></div>`;
}

export function clearElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = "";
}

const RECENT_KEY = "stt_recently_viewed";
const MAX_RECENT = 5;

export function addRecentlyViewed(team) {
  let recent = getRecentlyViewed();
  recent = recent.filter(t => t.id !== team.id);
  recent.unshift(team);
  recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

export function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
}

export function renderRecentlyViewed() {
  const recent = getRecentlyViewed();
  const container = document.getElementById("recently-viewed-list");
  if (!container) return;

  if (recent.length === 0) {
    container.innerHTML = `<p class="empty-msg">No recently viewed teams yet.</p>`;
    return;
  }

  container.innerHTML = recent.map(team => `
    <a href="team.html?id=${team.id}" class="recent-card">
      <img src="${team.logo || ''}" alt="${team.name}" onerror="this.style.display='none'" />
      <span>${team.name}</span>
    </a>
  `).join("");
}