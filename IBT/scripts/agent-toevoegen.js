document.addEventListener("DOMContentLoaded", loadAgents);

function addAgent() {
  const name = document.getElementById("newAgentName").value.trim();
  const roepnummer = document.getElementById("newAgentRoepnummer").value.trim();
  const rank = document.getElementById("newAgentRank").value;
  const password = document.getElementById("newAgentPassword").value.trim();

  if (!name || !roepnummer || !rank || !password) {
    alert("Vul alle velden in.");
    return;
  }

  let agents = JSON.parse(localStorage.getItem("agents")) || [];

  if (agents.some(a => a.name.toLowerCase() === name.toLowerCase())) {
    alert("Deze agent bestaat al.");
    return;
  }

  agents.push({
    name,
    roepnummer,
    rank,
    password
  });

  localStorage.setItem("agents", JSON.stringify(agents));

  document.getElementById("newAgentName").value = "";
  document.getElementById("newAgentRoepnummer").value = "";
  document.getElementById("newAgentRank").value = "";
  document.getElementById("newAgentPassword").value = "";

  loadAgents();
}

function loadAgents() {
  const list = document.getElementById("agentList");
  list.innerHTML = "";

  const agents = JSON.parse(localStorage.getItem("agents")) || [];

  agents.forEach((agent, index) => {
    const item = document.createElement("div");
    item.className = "agent-item";

    item.innerHTML = `
      <span>${agent.name} – ${agent.roepnummer} – ${agent.rank}</span>
      <button class="delete-btn" onclick="deleteAgent(${index})">Verwijder</button>
    `;

    list.appendChild(item);
  });
}

function deleteAgent(index) {
  let agents = JSON.parse(localStorage.getItem("agents")) || [];
  const removedName = agents[index].name;

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(removedName + "_")) {
      localStorage.removeItem(key);
    }
  });

  agents.splice(index, 1);
  localStorage.setItem("agents", JSON.stringify(agents));

  loadAgents();
}