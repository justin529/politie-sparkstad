// Afhandelen Verdachte – Praktijk

function renderAfhandelenVerdachte(saved = {}, training = "Afhandelen Verdachte") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "administratie", "Administratie", saved.administratie)}
      ${renderOVGField(training, "communicatie", "Communicatie", saved.communicatie)}
      ${renderOVGField(training, "werksnelheid", "Werksnelheid", saved.werksnelheid)}
      ${renderOVGField(training, "rechten", "Rechten / Plichten", saved.rechten)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveAfhandelenVerdachte('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearAfhandelenVerdachte('${training}')">🗑 Wissen</button>
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
function saveAfhandelenVerdachte(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    administratie: document.getElementById(`${training}_administratie`).value,
    communicatie: document.getElementById(`${training}_communicatie`).value,
    werksnelheid: document.getElementById(`${training}_werksnelheid`).value,
    rechten: document.getElementById(`${training}_rechten`).value,
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
function clearAfhandelenVerdachte(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = ["administratie","communicatie","werksnelheid","rechten","afgerond"];

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