import { getGeolocalisation } from "./js/geolocalisation.js";
import { getMeteo } from "./js/meteo.js";
import { getVelos } from "./js/velo.js";
import { getAir } from "./js/air.js";
import { createChart} from "./js/chart.js";
import { getSars } from "./js/sars.js";

const configResponse = await fetch('/config');
const config = await configResponse.json();
const apiKey = config.apiKey;

// Récupération de toutes les données
const geolocalisation = await getGeolocalisation(apiKey);
await getMeteo(geolocalisation.latitude, geolocalisation.longitude, geolocalisation.ville);
await getVelos(geolocalisation.latitude, geolocalisation.longitude);
await getAir();
await createChart(geolocalisation.zip, geolocalisation.departement);
await getSars();

// URLs
const meteoUrl = `https://www.infoclimat.fr/public-api/gfs/json?_ll=${geolocalisation.latitude},${geolocalisation.longitude}&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2`;
const airUrl = "https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest_5j/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson";
const veloUrl = "https://api.cyclocity.fr/contracts/nancy/gbfs/gbfs.json";
const sarsUrl = "https://www.data.gouv.fr/fr/datasets/r/2963ccb5-344d-4978-bdd3-08aaf9efe514";

// Ajout des URLs dans la page d'informations sur les APIS
document.getElementById("ip-url").href = geolocalisation.ipUrl;
document.getElementById("loc-url").href = geolocalisation.locUrl;
document.getElementById("meteo-url").href = meteoUrl;
document.getElementById("air-url").href = airUrl;
document.getElementById("velo-url").href = veloUrl;
document.getElementById("sars-url").href = sarsUrl;