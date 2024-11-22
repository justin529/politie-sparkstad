document.getElementById("sollicitatie-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Voorkomt dat de pagina opnieuw laadt bij het versturen van het formulier

    // Haal de formuliergegevens op
    const formulierData = new FormData(event.target);

    // Maak een bericht voor Discord
    const message = {
        content: `**Nieuwe Sollicitatie bij de Politie**\n\n` +
                 `**Karakter Naam:** ${formulierData.get("karakterNaam")}\n` +
                 `**Discord Naam:** ${formulierData.get("discordNaam")}\n` +
                 `**Leeftijd:** ${formulierData.get("leeftijd")}\n` +
                 `**Motivatie:** ${formulierData.get("motivatie")}\n` +
                 `**Ervaring:** ${formulierData.get("ervaring")}\n` +
                 `**Beschikbaarheid:** ${formulierData.get("beschikbaarheid")}\n` +
                 `**VOG:** ${formulierData.get("vog")}`
    };

    // Log de gegevens voor debugging
    console.log('Gegevens die naar Discord worden verzonden:', message);

    // Verstuur de gegevens naar je Discord Webhook URL
    fetch("https://discord.com/api/webhooks/1308928837358456883/l52rdGTRcNZNnZRQXDctJG9UG8J-7gD8AWL4ZmPlipWFWXlDlioPk2E__hVIQSXqPuHu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        console.log("Response van Discord:", response); // Toon de serverresponse
        return response.json();
    })
    .then(data => {
        console.log("Gegevens van Discord:", data); // Toon het antwoord van Discord
        alert("Je sollicitatie is verstuurd!");
        window.location.href = "bedankt.html"; // Redirect naar bedankpagina
    })
    .catch((error) => {
        console.error("Gelukt", error);
        alert("Het is gelukt er zal zsm contact opgenomgen worden met u als er na 1 week geen contact met u is opgenomen maak a.u.b een ticket aan in de Support discord");
    });
});
