/**
 * Récupère les données météo pour position donnée
 * @param {string} latitude 
 * @param {string} longitude 
 * @param {string} ville 
 */
export async function getMeteo(latitude, longitude, ville) {
  try {
    const meteoUrl = `https://www.infoclimat.fr/public-api/gfs/json?_ll=${latitude},${longitude}&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2`;

    const response = await fetch(meteoUrl);
    const meteoData = await response.json();

    const currentDate = new Date().toISOString().split("T")[0];

    displayMeteo(meteoData, currentDate, ville);
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
  }
}

/**
 * Affichage des données météo
 * @param {string} data 
 * @param {Date} currentDate 
 * @param {string} ville 
 * @returns 
 */
function displayMeteo(data, currentDate, ville) {
    const meteoDiv = document.getElementById("meteo");
    const titre = document.createElement("h2");
    titre.textContent = `Météo du jour à ${ville}`;
    meteoDiv.insertBefore(titre, meteoDiv.firstChild);
    
    const meteoDataDiv = document.getElementById("meteo-data");    
    meteoDataDiv.innerHTML = "";
    

    const todayData = Object.entries(data).filter(([timestamp]) =>
      timestamp.startsWith(currentDate)
    );
  
    if (todayData.length === 0) {
      meteoDataDiv.innerHTML = "<p>Aucune donnée disponible pour aujourd'hui.</p>";
      return;
    }

    todayData.forEach(([timestamp, details], index) => {
      const heure = timestamp.split(" ")[1].slice(0, 2);
      const temperature = Math.floor(details.temperature["2m"] - 273.15);
      const pluie = details.pluie || 0;
      const vent = details.vent_moyen["10m"] || 0;
      const risqueNeige = details.risque_neige === "oui";

      const periodeDiv = document.createElement("div");
      periodeDiv.className = "periode";
      periodeDiv.id = `periode-${index}`;

      const heureElement = document.createElement("h2");
      heureElement.textContent = `${heure}H`;
      periodeDiv.appendChild(heureElement);

      const pluieElement = document.createElement("p");
      pluieElement.className = "symbol";
      pluieElement.textContent = pluie > 0 ? "🌧️" : "☀️";
      periodeDiv.appendChild(pluieElement);

      const ventElement = document.createElement("p");
      ventElement.className = "symbol";
      if (vent < 2.8) {
        ventElement.textContent = "🍃";
      } else if (vent < 10) {
        ventElement.textContent = "🌬️";
      } else {
        ventElement.textContent = "💨";
      }
      periodeDiv.appendChild(ventElement);

      const neigeElement = document.createElement("p");
      neigeElement.className = "symbol";
      neigeElement.textContent = risqueNeige ? "❄️" : "🌤️";
      periodeDiv.appendChild(neigeElement);

      const tempElement = document.createElement("p");
      tempElement.className = "temperature";
      tempElement.textContent = `${temperature}°C`;
      periodeDiv.appendChild(tempElement);
      
      meteoDataDiv.appendChild(periodeDiv);
    });
  }
  
  
  