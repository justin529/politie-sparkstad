// Unmarked – Aanwezig ja/nee

function renderUnmarked(saved = {}, training = "Unmarked") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <h4>Theorie</h4>

      <div class="form-group">
        <label>Aanwezig:</label>
        <select id="${training}_aanwezig">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.aanwezig==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.aanwezig==="nee"?"selected":""}>Nee</option>
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
        <button class="save-btn" onclick="saveUnmarked('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearUnmarked('${training}')">🗑 Wissen</button>
      </div>
    </div>
  `;
}

// ✅ OPSLAAN + KLEURUPDATE
function saveUnmarked(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    aanwezig: document.getElementById(`${training}_aanwezig`).value,
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
function clearUnmarked(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = ["aanwezig","afgerond"];

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