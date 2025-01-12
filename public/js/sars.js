/**
 * Récupère les données SARS sur data.gouv.fr
 */
export async function getSars() {
    try {
        const sarsUrl = 'https://www.data.gouv.fr/fr/datasets/r/2963ccb5-344d-4978-bdd3-08aaf9efe514';
        const response = await fetch(sarsUrl);
        const csvText = await response.text();

        const results = Papa.parse(csvText);

        const lastRow = results.data[results.data.length - 2];
        
        const lastWeek = lastRow[0];
        const maxevilleValue = lastRow[33];

        displaySars(lastWeek, maxevilleValue);
    } catch (error) {
        console.log('Erreur dans la récupération des données SARS:', error);
    }
}

/**
 * Affichage des données SARS
 * @param {string} lastWeek 
 * @param {string} maxevilleValue 
 * @returns 
 */
function displaySars(lastWeek, maxevilleValue) {
    const sarsDiv = document.getElementById('sars');
    sarsDiv.innerHTML = '';

    if (!lastWeek || !maxevilleValue) {
        sarsDiv.innerHTML = "Aucune donnée trouvée pour Maxeville.";
        return;
    }
    const lastWeekElement = document.createElement('p');
    lastWeekElement.innerHTML = `<strong>Semaine:</strong> ${lastWeek}`;
    sarsDiv.appendChild(lastWeekElement);

    const maxevilleElement = document.createElement('p');
    maxevilleElement.innerHTML = `<strong>Valeur de Maxeville:</strong> ${maxevilleValue}`;
    sarsDiv.appendChild(maxevilleElement);
}
