// Vuurwapen – Theorie + Praktijk

function renderVuurwapen(saved = {}, training = "Vuurwapen") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- THEORIE -->
      <h4>Theorie</h4>

      <div class="form-group">
        <label>Aanwezig:</label>
        <select id="${training}_theorie">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.theorie==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.theorie==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div style="height: 15px;"></div> <!-- ruimte -->

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "auto_btgv", "1. Auto‑scenario BTGV (benadering, clearen, waarschuwingsschot)", saved.auto_btgv)}
      ${renderOVGField(training, "tower", "2. Legerbasis – Tower clearen", saved.tower)}
      ${renderOVGField(training, "stilstaand", "3. Schietbaan – Stilstaand schieten", saved.stilstaand)}
      ${renderOVGField(training, "bewegend", "4. Schietbaan – Bewegend schieten", saved.bewegend)}
      ${renderOVGField(training, "huis", "5. Huis clearen", saved.huis)}
      ${renderOVGField(training, "nummer", "6. Nummer schieten", saved.nummer)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveVuurwapen('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearVuurwapen('${training}')">🗑 Wissen</button>
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
function saveVuurwapen(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    theorie: document.getElementById(`${training}_theorie`).value,

    auto_btgv: document.getElementById(`${training}_auto_btgv`).value,
    tower: document.getElementById(`${training}_tower`).value,
    stilstaand: document.getElementById(`${training}_stilstaand`).value,
    bewegend: document.getElementById(`${training}_bewegend`).value,
    huis: document.getElementById(`${training}_huis`).value,
    nummer: document.getElementById(`${training}_nummer`).value,

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
function clearVuurwapen(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = [
    "theorie",
    "auto_btgv","tower","stilstaand","bewegend","huis","nummer",
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