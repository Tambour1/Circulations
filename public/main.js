import { getGeolocalisation } from "./js/geolocalisation.js";
import { getMeteo } from "./js/meteo.js";
import { getVelos } from "./js/velo.js";

// Récupération de toutes les données
const geolocalisation = await getGeolocalisation();
await getMeteo(geolocalisation.latitude, geolocalisation.longitude, geolocalisation.ville);
await getVelos(geolocalisation.latitude, geolocalisation.longitude);