import { addFavorite, removeFavorite, isFavorite } from "./Favorites.mjs";
import { loadMatches } from "./MatchData.mjs";
import { loadPlayers } from "./PlayerStats.mjs";
import { loadStandings } from "./LeagueStandings.mjs";
import { getParam, addRecentlyViewed } from "./utils.mjs";

const teamId = getParam("id");

const mockTeam = {
  id: teamId || 1,
  name: "FC Barcelona",
  country: "Spain",
  logo: "https://images.fotmob.com/image_resources/logo/teamlogo/41.png",
  leagueId: 87
};

function loadTeamHeader() {
  document.getElementById("team-logo").src = mockTeam.logo;
  document.getElementById("team-name").textContent = mockTeam.name;
  document.getElementById("team-country").textContent = mockTeam.country;
  document.title = `${mockTeam.name} | Soccer Team Tracker`;
  document.querySelector('meta[name="description"]').setAttribute(
    "content",
    `View matches, players and standings for ${mockTeam.name}.`
  );

  addRecentlyViewed({
    id: mockTeam.id,
    name: mockTeam.name,
    logo: mockTeam.logo,
    country: mockTeam.country
  });

  const favBtn = document.getElementById("favorite-btn");
  updateFavBtn(favBtn);

  favBtn.addEventListener("click", () => {
    if (isFavorite(mockTeam.id)) {
      removeFavorite(mockTeam.id);
    } else {
      addFavorite(mockTeam);
    }
    updateFavBtn(favBtn);
  });
}

function updateFavBtn(btn) {
  if (isFavorite(mockTeam.id)) {
    btn.textContent = "★ Remove Favorite";
    btn.classList.add("fav-active");
  } else {
    btn.textContent = "☆ Add to Favorites";
    btn.classList.remove("fav-active");
  }
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
  });
});

loadTeamHeader();
loadMatches(teamId);
loadPlayers(teamId);
loadStandings(mockTeam.leagueId, mockTeam.name);