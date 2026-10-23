// Find your line: technique / species / lb filters over the product cards (data-* attributes rendered from the JSON).
(function () {
  const state = { tech: null, species: null, lb: "" };
  const cards = Array.from(document.querySelectorAll("article.card"));
  const count = document.getElementById("count");
  const lbSel = document.getElementById("lb");

  function apply() {
    let shown = 0;
    const active = state.tech || state.species || state.lb;
    cards.forEach((c) => {
      const tech = (c.dataset.tech || "").split(" ");
      const sp = (c.dataset.species || "").split(" ");
      const lbs = (c.dataset.lbs || "").split(" ");
      let ok = true;
      if (state.tech && !tech.includes(state.tech)) ok = false;
      if (state.species && !sp.includes(state.species)) ok = false;
      if (state.lb && !lbs.includes(state.lb)) ok = false;
      if (c.classList.contains("tools") && active) ok = false;
      c.classList.toggle("dim", !ok);
      if (ok) shown++;
    });
    count.textContent = active ? `${shown} line${shown === 1 ? "" : "s"} fit` : "";
    document.querySelectorAll(".chips[data-filter] button").forEach((b) => {
      const k = b.parentElement.dataset.filter;
      b.classList.toggle("on", state[k] === b.dataset.v);
    });
  }

  document.querySelectorAll(".chips[data-filter]").forEach((group) => {
    group.addEventListener("click", (ev) => {
      const b = ev.target.closest("button");
      if (!b) return;
      const k = group.dataset.filter;
      state[k] = state[k] === b.dataset.v ? null : b.dataset.v;
      apply();
    });
  });
  lbSel.addEventListener("change", () => { state.lb = lbSel.value; apply(); });
  document.getElementById("reset").addEventListener("click", () => {
    state.tech = null; state.species = null; state.lb = ""; lbSel.value = ""; apply();
  });
  apply();
})();
