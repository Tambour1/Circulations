export async function getGeolocalisation(apiKey) {
  try {
    // Récupération de l'adresse IP
    if (!apiKey) {
      // Clé API par défaut si l'utilisateur n'a pas configuré de clé
      apiKey = "41d15e5d79cf461fbbab930237377c7a"; // la clé API n'est pas exposé normalement
    }
    const ipUrl = 'https://api.ipify.org?format=json';
    const ipResponse = await fetch(ipUrl);
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Récupération de la géolocalisation
    const locUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
    const locResponse = await fetch(locUrl);
    const locData = await locResponse.json();

    const latitude = locData.latitude;
    const longitude = locData.longitude;
    const zip = locData.zipcode.slice(0, 2);
    const departement = locData.district;
    const ville = locData.city;

    return {latitude, longitude, zip, ipUrl, locUrl,ville,departement};

  } catch (error) {
    console.log('Erreur dans la récupération de la géolocalisation:', error);
  }
}

