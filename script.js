const views = ["dashboard", "devices", "insights", "settings"];

function showView(view) {
  const selected = views.includes(view) ? view : "dashboard";
  views.forEach((name) => {
    document.getElementById(`${name}-view`).classList.toggle("hidden", name !== selected);
  });
  document.querySelectorAll("[data-view]").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === selected);
  });
}

document.querySelectorAll("[data-view]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const view = link.dataset.view;
    history.replaceState(null, "", `#${view}`);
    showView(view);
  });
});

window.addEventListener("hashchange", () => showView(location.hash.slice(1)));
showView(location.hash.slice(1));

document.addEventListener("click", (event) => {
  const button = event.target.closest(".status");
  if (!button) return;

  const isOn = button.classList.contains("on");
  button.classList.toggle("on", !isOn);
  button.classList.toggle("off", isOn);
  button.textContent = isOn ? "off" : "on";
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const goal = document.getElementById("energy-goal");
goal.addEventListener("input", () => {
  document.getElementById("goal-value").textContent = goal.value;
});
