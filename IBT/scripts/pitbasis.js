// PIT-manoeuvre Basis – Theorie + Praktijk

function renderPit(saved = {}, training = "PIT-manoeuvre Basis") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- THEORIE -->
      <div class="form-group">
        <label><strong>Theorie – Aanwezig:</strong></label>
        <select id="${training}_theorie">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.theorie==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.theorie==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div style="height: 15px;"></div> <!-- ruimte tussen theorie en praktijk -->

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "praktijk", "Algemene praktijk", saved.praktijk)}
      ${renderOVGField(training, "pitten", "Pitten", saved.pitten)}
      ${renderOVGField(training, "beuken", "Beuken", saved.beuken)}
      ${renderOVGField(training, "boxen", "Boxen", saved.boxen)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="savePit('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearPit('${training}')">🗑 Wissen</button>
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
function savePit(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    theorie: document.getElementById(`${training}_theorie`).value,
    praktijk: document.getElementById(`${training}_praktijk`).value,
    pitten: document.getElementById(`${training}_pitten`).value,
    beuken: document.getElementById(`${training}_beuken`).value,
    boxen: document.getElementById(`${training}_boxen`).value,
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
function clearPit(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = ["theorie","praktijk","pitten","beuken","boxen","afgerond"];
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