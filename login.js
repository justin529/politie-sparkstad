// Functie om de inloggegevens te controleren
async function checkLogin(event) {
    event.preventDefault();  // Voorkomt het opnieuw laden van de pagina

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Laad het JSON-bestand met inloggegevens
        const response = await fetch('afbeelding/A1/a3/a6/h/hah/Nieuwe map/s/afbeeldingen.json');
        
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van de gegevens.');
        }

        const users = await response.json();

        // Zoek naar een gebruiker met de juiste gebruikersnaam en wachtwoord
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Inloggen is succesvol
            alert('Welkom, ' + username + '!');
            window.location.href = 'agenten/dashboard.html';  // Stuur de gebruiker door naar het dashboard
        } else {
            // Ongeldige inloggegevens
            document.getElementById('error-message').style.display = 'block';
        }

    } catch (error) {
        console.error('Er is een fout opgetreden bij het inladen van het bestand:', error);
        alert('Er is een fout opgetreden bij het inloggen. Probeer het later opnieuw.');
    }
}
