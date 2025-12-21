// ehbo.js

function renderEHBO(saved, training) {
  return `
    <div class="training-form">
      <h3>${training}</h3>
      <div class="form-group">
        <label>Afgerond:</label>
        <select id="${training}_afgerond">
          <option value="">-- Kies --</option>
          <option value="ja" ${saved.afgerond==="ja"?"selected":""}>Ja</option>
          <option value="nee" ${saved.afgerond==="nee"?"selected":""}>Nee</option>
        </select>
      </div>
      <div class="form-actions">
        <button class="save-btn" onclick="saveEHBO('${training}')">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearEHBO('${training}')">🗑 Wissen</button>
      </div>
    </div>
  `;
}

// Opslaan
function saveEHBO(training) {
  const agent = localStorage.getItem('selectedAgent');
  const key = `${agent}_${training}`;

  const data = {
    afgerond: document.getElementById(`${training}_afgerond`).value
  };

  localStorage.setItem(key, JSON.stringify(data));
  alert(training + " status opgeslagen voor " + agent);

  // Update kleur direct
  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes(training)) {
      if (data.afgerond === "ja") {
        item.style.backgroundColor = "#008000"; // groen
      } else if (data.afgerond === "nee") {
        item.style.backgroundColor = "#800000"; // rood
      } else {
        item.style.backgroundColor = "#004080"; // standaard blauw
      }
    }
  });
}

// Wissen
function clearEHBO(training) {
  const agent = localStorage.getItem('selectedAgent');
  const key = `${agent}_${training}`;
  localStorage.removeItem(key);

  document.getElementById(`${training}_afgerond`).value = "";

  const items = document.querySelectorAll(".training-item");
  items.forEach(item => {
    if (item.textContent.includes(training)) {
      item.style.backgroundColor = "#004080"; // standaard blauw
    }
  });

  alert(training + " status gewist voor " + agent);
}