/**
 * Récupère les données de qualité de l'air pour Nancy.
 */
export async function getAir() {
  try {
    const air_url = "https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest_5j/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson";
    const response = await fetch(air_url);
    const airData = await response.json();

    if (airData && airData.features && airData.features.length > 0) {
      const currentDate = new Date();
      let currentAir = null;
      let date = null;

      airData.features.forEach(feature => {
        const attributes = feature.attributes;

        // Conversion du timestamp
        let timestamp = attributes.date_ech;
        if (String(timestamp).length > 10) {
          timestamp = Math.floor(timestamp / 1000);
        }

        // Comparaison de la date avec date actuelle
        const newDate = new Date(timestamp * 1000);
        if (newDate.toDateString() === currentDate.toDateString()) {
          currentAir = attributes;
          date = newDate;
        }
      });

      displayAir(currentAir, date);   
    } else {
      console.error("Données de qualité de l'air non disponibles.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}    

/**
 * Affiche les données de qualité de l'air.
*/
function displayAir(air, date) {
  const airDiv = document.getElementById('air');
  airDiv.innerHTML = `
    <h2>Qualité de l'air</h2>
    <div id="rond"></div>
  `;

  if (!air || !date) {
    airDiv.innerHTML = "<p>Aucune donnée de qualité de l'air disponible pour aujourd'hui à Nancy.</p>";
    return;
  }

  const dateElement = document.createElement("p");
  dateElement.textContent = `${date.toLocaleDateString('fr-FR')}`;
  airDiv.appendChild(dateElement);

  const qual = document.createElement("p");
  qual.textContent = air.lib_qual;

  const rondElement = document.getElementById('rond');
  rondElement.style.backgroundColor = air.coul_qual;
  airDiv.appendChild(qual);
}