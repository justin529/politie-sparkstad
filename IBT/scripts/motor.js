// Motor – Theorie + Praktijk

function renderMotor(saved = {}, training = "Motor") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- THEORIE -->
      <h4>Theorie</h4>

      ${renderOVGField(training, "t_gevaren", "Gevaren", saved.t_gevaren)}
      ${renderOVGField(training, "t_snelheid", "Snelheid", saved.t_snelheid)}
      ${renderOVGField(training, "t_plaats", "Plaats achtervolging", saved.t_plaats)}
      ${renderOVGField(training, "t_communicatie", "Communicatie", saved.t_communicatie)}

      <div style="height: 15px;"></div> <!-- ruimte -->

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "p_obstakels", "Obstakels", saved.p_obstakels)}
      ${renderOVGField(training, "p_achtervolging", "Achtervolging", saved.p_achtervolging)}
      ${renderOVGField(training, "p_tijdrijden", "Tijdrijden", saved.p_tijdrijden)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveMotor('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearMotor('${training}')">🗑 Wissen</button>
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
function saveMotor(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    t_gevaren: document.getElementById(`${training}_t_gevaren`).value,
    t_snelheid: document.getElementById(`${training}_t_snelheid`).value,
    t_plaats: document.getElementById(`${training}_t_plaats`).value,
    t_communicatie: document.getElementById(`${training}_t_communicatie`).value,

    p_obstakels: document.getElementById(`${training}_p_obstakels`).value,
    p_achtervolging: document.getElementById(`${training}_p_achtervolging`).value,
    p_tijdrijden: document.getElementById(`${training}_p_tijdrijden`).value,

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
        item.style.backgroundBackground = "#800000"; // rood
      } else {
        item.style.backgroundColor = "#004080"; // blauw
      }
    }
  });
}

// ✅ WISSEN + RESET
function clearMotor(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = [
    "t_gevaren","t_snelheid","t_plaats","t_communicatie",
    "p_obstakels","p_achtervolging","p_tijdrijden",
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