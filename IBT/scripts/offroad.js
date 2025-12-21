// Offroad – Theorie + Praktijk

function renderOffroad(saved = {}, training = "Offroad") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- THEORIE -->
      <h4>Theorie</h4>

      ${renderOVGField(training, "t_veiligheid", "Veiligheid", saved.t_veiligheid)}
      ${renderOVGField(training, "t_vooruitkijken", "Vooruitkijken", saved.t_vooruitkijken)}
      ${renderOVGField(training, "t_realistisch", "Realistisch rijden", saved.t_realistisch)}
      ${renderOVGField(training, "t_trager", "Trager rijden", saved.t_trager)}

      <div style="height: 15px;"></div> <!-- ruimte -->

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "p_veiligheid", "1. Veiligheid", saved.p_veiligheid)}
      ${renderOVGField(training, "p_vooruitkijken", "2. Vooruitkijken", saved.p_vooruitkijken)}
      ${renderOVGField(training, "p_realistisch", "3. Realistisch rijden", saved.p_realistisch)}
      ${renderOVGField(training, "p_trager", "4. Trager rijden", saved.p_trager)}

      <div class="form-group">
        <label>5. Tijd:</label>
        <select id="${training}_p_tijd" onchange="updateSelectColor(this)">
          <option value="">-- Kies --</option>
          <option value="O" ${saved.p_tijd==="O"?"selected":""}>Onvoldoende (gezakt)</option>
          <option value="V" ${saved.p_tijd==="V"?"selected":""}>Voldoende (net aan)</option>
          <option value="G" ${saved.p_tijd==="G"?"selected":""}>Goed (ruim binnen de tijd)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveOffroad('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearOffroad('${training}')">🗑 Wissen</button>
      </div>
    </div>
  `;
}

// Helper O/V/G
function renderOVGField(training, field, label, value) {
  return `
    <div class="form-group">
      <label>${label}:</label>
      <select id="${training}_${field}" onchange="updateSelectColor(this)">
        <option value="">-- Kies --</option>
        <option value="O" ${value==="O"?"selected":""}>Onvoldoende</option>
        <option value="V" ${value==="V"?"selected":""}>Voldoende</option>
        <option value="G" ${value==="G"?"selected":""}>Goed</option>
      </select>
    </div>
  `;
}

// ✅ OPSLAAN + KLEURUPDATE
function saveOffroad(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    t_veiligheid: document.getElementById(`${training}_t_veiligheid`).value,
    t_vooruitkijken: document.getElementById(`${training}_t_vooruitkijken`).value,
    t_realistisch: document.getElementById(`${training}_t_realistisch`).value,
    t_trager: document.getElementById(`${training}_t_trager`).value,

    p_veiligheid: document.getElementById(`${training}_p_veiligheid`).value,
    p_vooruitkijken: document.getElementById(`${training}_p_vooruitkijken`).value,
    p_realistisch: document.getElementById(`${training}_p_realistisch`).value,
    p_trager: document.getElementById(`${training}_p_trager`).value,
    p_tijd: document.getElementById(`${training}_p_tijd`).value,

    afgerond: document.getElementById(`${training}_afgerond`).value
  };

  localStorage.setItem(key, JSON.stringify(data));
  alert(training + " opgeslagen voor " + agent);

  // Update kleur direct
  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes(training)) {
      if (data.afgerond === "ja") {
        item.style.backgroundColor = "#008000"; // groen
      } else if (data.afgerond === "nee") {
        item.style.backgroundColor = "#800000"; // rood
      } else {
        item.style.backgroundColor = "#004080"; // blauw
      }
    }
  });
}

// ✅ WISSEN + RESET
function clearOffroad(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = [
    "t_veiligheid","t_vooruitkijken","t_realistisch","t_trager",
    "p_veiligheid","p_vooruitkijken","p_realistisch","p_trager","p_tijd",
    "afgerond"
  ];

  fields.forEach(f => {
    const el = document.getElementById(`${training}_${f}`);
    if (el) el.value = "";
  });

  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes(training)) {
      item.style.backgroundColor = "#004080"; // standaard blauw
    }
  });

  alert(training + " gewist voor " + agent);
}