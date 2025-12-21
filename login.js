function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const agents = JSON.parse(localStorage.getItem("agents")) || [];

    const found = agents.find(a =>
        a.name.toLowerCase() === username.toLowerCase() &&
        a.password === password
    );

    if (!found) {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    localStorage.setItem("selectedAgent", found.name);
    localStorage.setItem("selectedRank", found.rank);
    localStorage.setItem("selectedRoepnummer", found.roepnummer);

    window.location.href = "/agenten/dashboard.html";
}