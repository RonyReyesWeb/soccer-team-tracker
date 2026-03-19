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