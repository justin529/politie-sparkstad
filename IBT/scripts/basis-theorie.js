// basis-theorie.js

function renderBasisTheorie(saved, training) {
  return `
    <div class="training-form">
      <h3>${training} – Vragenlijst</h3>

      ${renderYesNoField(training, "rondleiding", "Rondleiding", saved.rondleiding)}

      ${renderOVGField(training, "kleding", "Kleding", saved.kleding)}
      ${renderOVGField(training, "voertuigen", "Voertuigen (B-klasse, Vito, topsnelheden, uitrusting)", saved.voertuigen)}
      ${renderOVGField(training, "portofoon", "Portofoon & Communicatie (statussen, noodknop, locatieknop, MEOS)", saved.portofoon)}
      ${renderOVGField(training, "wegafzetting", "Wegafzetting (theorie, pionnen, hekjes, voertuigen)", saved.wegafzetting)}
      ${renderOVGField(training, "administratie", "Administratie (steekwoorden, AI, scenario’s)", saved.administratie)}
      ${renderOVGField(training, "wetboek", "Wetboek (veelvoorkomende situaties)", saved.wetboek)}
      ${renderOVGField(training, "regels", "Regels & Tips (kernset gedragsregels)", saved.regels)}
      ${renderOVGField(training, "geweldsmiddelen", "Geweldsmiddelen (handboeien, wapenstok, pepperspray, taser, vuurwapen, hond)", saved.geweldsmiddelen)}
      ${renderOVGField(training, "samenwerking", "Samenwerking (politie ↔ KMar, communicatie, respect, frictie)", saved.samenwerking)}
      ${renderOVGField(training, "ehbo", "EHBO & RP (reanimeren, verbinden, stabiele zijligging, shockherkenning)", saved.ehbo)}

      <div class="form-actions">
        <button class="save-btn" onclick="saveBasisTheorie()">💾 Opslaan</button>
        <button class="delete-btn" onclick="clearBasisTheorie()">🗑 Wissen</button>
      </div>
    </div>
  `;
}

// Helper voor Ja/Nee veld
function renderYesNoField(training, field, label, value) {
  return `
    <div class="form-group">
      <label>${label}:</label>
      <select id="${training}_${field}">
        <option value="">-- Kies --</option>
        <option value="ja" ${value==="ja"?"selected":""}>Ja</option>
        <option value="nee" ${value==="nee"?"selected":""}>Nee</option>
      </select>
    </div>
  `;
}

// Helper voor O/V/G veld
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

// Opslaan
function saveBasisTheorie() {
  const agent = localStorage.getItem('selectedAgent');
  const key = `${agent}_Basis Theorie`;

  const data = {
    rondleiding: document.getElementById("Basis Theorie_rondleiding").value,
    kleding: document.getElementById("Basis Theorie_kleding").value,
    voertuigen: document.getElementById("Basis Theorie_voertuigen").value,
    portofoon: document.getElementById("Basis Theorie_portofoon").value,
    wegafzetting: document.getElementById("Basis Theorie_wegafzetting").value,
    administratie: document.getElementById("Basis Theorie_administratie").value,
    wetboek: document.getElementById("Basis Theorie_wetboek").value,
    regels: document.getElementById("Basis Theorie_regels").value,
    geweldsmiddelen: document.getElementById("Basis Theorie_geweldsmiddelen").value,
    samenwerking: document.getElementById("Basis Theorie_samenwerking").value,
    ehbo: document.getElementById("Basis Theorie_ehbo").value,
    // Nieuw veld: afgerond
    afgerond: "ja" // of "nee", afhankelijk van jouw logica
  };

  localStorage.setItem(key, JSON.stringify(data));
  alert("Basis Theorie opgeslagen voor " + agent);

  // Trainingblok kleur
  const section = document.querySelector(".rank-section");
  section.querySelectorAll(".training-item").forEach(item => {
    if (item.textContent.includes("Basis Theorie")) {
      if (data.rondleiding.toLowerCase() === "nee") {
        item.style.backgroundColor = "#800000"; // rood
      } else if (data.rondleiding.toLowerCase() === "ja") {
        item.style.backgroundColor = "#008000"; // groen
      } else {
        item.style.backgroundColor = "#004080"; // standaard blauw
      }
    }
  });
}

// Wissen
function clearBasisTheorie() {
  const agent = localStorage.getItem('selectedAgent');
  const key = `${agent}_Basis Theorie`;
  localStorage.removeItem(key);

  const fields = ["rondleiding","kleding","voertuigen","portofoon","wegafzetting","administratie","wetboek","regels","geweldsmiddelen","samenwerking","ehbo"];
  fields.forEach(f => {
    document.getElementById(`Basis Theorie_${f}`).value = "";
  });

  const section = document.querySelector(".rank-section");
  section.querySelectorAll(".training-item").forEach(item => {
    if (item.textContent.includes("Basis Theorie")) {
      item.style.backgroundColor = "#004080"; // standaard blauw
    }
  });

  alert("Basis Theorie gewist voor " + agent);
}