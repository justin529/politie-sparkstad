// Basis-Praktijk.js – IBT Praktijkvaardigheden

function renderBasisPraktijk(saved = {}, training = "Basis Praktijk") {
  return `
    <div class="training-form">
      <h3>${training} – IBT Praktijkvaardigheden</h3>

      ${renderOVGField(training, "auto_btgv", "Auto-scenario BTGV (benadering, clearen, waarschuwingsschot)", saved.auto_btgv)}
      ${renderOVGField(training, "legerbasis", "Legerbasis – Tower clearen", saved.legerbasis)}
      ${renderOVGField(training, "stilstaand", "Schietbaan – Stilstaand schieten", saved.stilstaand)}
      ${renderOVGField(training, "bewegend", "Schietbaan – Bewegend schieten", saved.bewegend)}
      ${renderOVGField(training, "huis", "Huis clearen", saved.huis)}
      ${renderOVGField(training, "nummer", "Nummer schieten", saved.nummer)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveBasisPraktijk()">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearBasisPraktijk()">🗑 Wissen</button>
      </div>
    </div>
  `;
}

// Helper O / V / G
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

// ✅ OPSLAAN MET KLEURUPDATE
function saveBasisPraktijk() {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_Basis Praktijk`;

  const data = {
    auto_btgv: document.getElementById("Basis Praktijk_auto_btgv").value,
    legerbasis: document.getElementById("Basis Praktijk_legerbasis").value,
    stilstaand: document.getElementById("Basis Praktijk_stilstaand").value,
    bewegend: document.getElementById("Basis Praktijk_bewegend").value,
    huis: document.getElementById("Basis Praktijk_huis").value,
    nummer: document.getElementById("Basis Praktijk_nummer").value,
    afgerond: document.getElementById("Basis Praktijk_afgerond").value
  };

  localStorage.setItem(key, JSON.stringify(data));
  alert("Basis Praktijk opgeslagen voor " + agent);

  // ✅ Update kleur direct in agenten-look.html
  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes("Basis Praktijk")) {
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

// ✅ WISSEN MET KLEURRESET
function clearBasisPraktijk() {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_Basis Praktijk`;
  localStorage.removeItem(key);

  const fields = [
    "auto_btgv",
    "legerbasis",
    "stilstaand",
    "bewegend",
    "huis",
    "nummer",
    "afgerond"
  ];

  fields.forEach(f => {
    const el = document.getElementById(`Basis Praktijk_${f}`);
    if (el) el.value = "";
  });

  // ✅ Reset kleur
  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes("Basis Praktijk")) {
      item.style.backgroundColor = "#004080"; // standaard blauw
    }
  });

  alert("Basis Praktijk gewist voor " + agent);
}