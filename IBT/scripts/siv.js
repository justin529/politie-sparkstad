// SIV – Theorie + Praktijk

function renderSIV(saved = {}, training = "SIV") {
  return `
    <div class="training-form">
      <h3>${training}</h3>

      <!-- THEORIE -->
      <h4>Theorie</h4>

      ${renderOVGField(training, "t_doel", "1. Doel en rol van SIV", saved.t_doel)}
      ${renderOVGField(training, "t_veiligheid", "2. Veiligheid en voorbereiding", saved.t_veiligheid)}
      ${renderOVGField(training, "t_observatie", "3. Observatie en scanning", saved.t_observatie)}
      ${renderOVGField(training, "t_interventie", "4. Interventie en staandehouding", saved.t_interventie)}
      ${renderOVGField(training, "t_communicatie", "5. Communicatie", saved.t_communicatie)}
      ${renderOVGField(training, "t_werksnelheid", "6. Werksnelheid", saved.t_werksnelheid)}

      <div style="height: 15px;"></div> <!-- ruimte -->

      <!-- PRAKTIJK -->
      <h4>Praktijk</h4>

      ${renderOVGField(training, "p_staandehouding", "Staandehouding", saved.p_staandehouding)}
      ${renderOVGField(training, "p_tijdrijden", "Tijdrijden", saved.p_tijdrijden)}
      ${renderOVGField(training, "p_achtervolging", "Achtervolging", saved.p_achtervolging)}

      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="save-btn" onclick="saveSIV('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearSIV('${training}')">🗑 Wissen</button>
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
function saveSIV(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;

  const data = {
    t_doel: document.getElementById(`${training}_t_doel`).value,
    t_veiligheid: document.getElementById(`${training}_t_veiligheid`).value,
    t_observatie: document.getElementById(`${training}_t_observatie`).value,
    t_interventie: document.getElementById(`${training}_t_interventie`).value,
    t_communicatie: document.getElementById(`${training}_t_communicatie`).value,
    t_werksnelheid: document.getElementById(`${training}_t_werksnelheid`).value,

    p_staandehouding: document.getElementById(`${training}_p_staandehouding`).value,
    p_tijdrijden: document.getElementById(`${training}_p_tijdrijden`).value,
    p_achtervolging: document.getElementById(`${training}_p_achtervolging`).value,

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
function clearSIV(training) {
  const agent = localStorage.getItem("selectedAgent");
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  const fields = [
    "t_doel","t_veiligheid","t_observatie","t_interventie","t_communicatie","t_werksnelheid",
    "p_staandehouding","p_tijdrijden","p_achtervolging",
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