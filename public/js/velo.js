/**
 * Récupère les données des vélos disponibles à proximité de la position donnée
 * @param {string} latitude 
 * @param {string} longitude 
 */
export async function getVelos(latitude, longitude) {
  try {
    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    
    const veloUrl = "https://api.cyclocity.fr/contracts/nancy/gbfs/gbfs.json";
    const response = await fetch(veloUrl);
    const veloData = await response.json();

    if (veloData.data.fr.feeds) {
      // Récupération des URLs des données des stations
      const stationInfoUrl = veloData.data.fr.feeds.find(feed => feed.name === "station_information").url;
      const stationStatusUrl = veloData.data.fr.feeds.find(feed => feed.name === "station_status").url;

      //Fetch des données des stations
      const stationsInfo = await fetch(stationInfoUrl).then(res => res.json());
      const stationsStatus = await fetch(stationStatusUrl).then(res => res.json());

      addMarkersToMap(map,stationsInfo, stationsStatus);
    } else {
      console.error("Pas de données provenant de l'API Cyclocity");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

/**
 * Ajoute les marqueurs des stations sur la carte
 * @param {*} map 
 * @param {Array} stationsInfo 
 * @param {Array} stationsStatus 
 */
function addMarkersToMap(map, stationsInfo, stationsStatus) {
  const stations = stationsInfo.data.stations;
  const statuses = stationsStatus.data.stations;

  stations.forEach(station => {
    const status = statuses.find(s => s.station_id === station.station_id);
    if (status) {
      const marker = L.marker([station.lat, station.lon]).addTo(map);

      marker.bindPopup(`
        <strong>${station.name}</strong><br>
        Adresse : ${station.address}<br>
        Vélos disponibles : ${status.num_bikes_available}<br>
        Places libres : ${status.num_docks_available}
      `);
    }
  });
}