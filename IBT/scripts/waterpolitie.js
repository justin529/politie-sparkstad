// Waterpolitie – Praktijk

function renderWaterpolitie(saved = {}, training = "Waterpolitie") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <h4>Praktijk</h4>

      ${renderOVGField(training, "veiligheid", "Veiligheid", saved.veiligheid)}
      ${renderOVGField(training, "communicatie", "Communicatie", saved.communicatie)}
      ${renderOVGField(training, "navigatie", "Navigatie & samenwerking", saved.navigatie)}
      ${renderOVGField(training, "bevoegdheden", "Bevoegdheden & regels", saved.bevoegdheden)}
      ${renderOVGField(training, "incident", "Incidentafhandeling & administratie", saved.incident)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveWaterpolitie('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearWaterpolitie('${training}')">🗑 Wissen</button>
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
function saveWaterpolitie(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    veiligheid: document.getElementById(`${training}_veiligheid`).value,
    communicatie: document.getElementById(`${training}_communicatie`).value,
    navigatie: document.getElementById(`${training}_navigatie`).value,
    bevoegdheden: document.getElementById(`${training}_bevoegdheden`).value,
    incident: document.getElementById(`${training}_incident`).value,
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
function clearWaterpolitie(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = [
    "veiligheid","communicatie","navigatie","bevoegdheden","incident","afgerond"
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