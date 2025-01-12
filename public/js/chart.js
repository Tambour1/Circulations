/**
 * Création de deux graphiques à partir des données du fichier data.csv
 * @param {string} zip  Le code postal
 * @param {string} departement Le département
 */
export async function createChart(zip,departement) {
  try {
    const response = await fetch('data.csv'); // Récupération du fichier de données
    const csvText = await response.text();

    const results = Papa.parse(csvText);

    const csvData = results.data;

    const filteredData = csvData.filter(row => row[0] === zip);

    const labels = [];
    const hosp = [];
    const rea = [];

    // Récupération des données d'hospitalisation et de réanimation ainsi que les dates
    filteredData.forEach((row, index) => {
      if (index > 0 && row[9] !== "" && row[10] !== "") {
        labels.push(row[1]);
        hosp.push(row[9]);
        rea.push(row[10]);
      }
    });

    if (departement == "") {
      departement = "Meurthe-et-Moselle";
    }

    // Création des graphiques
    const canva = document.getElementById('hospChart');
    const canva2 = document.getElementById('reaChart');
    const covid = document.getElementsByClassName('covid');
    const title = document.createElement('h2');
    title.textContent = `Données COVID-19 pour le département ${departement}`;
    covid[0].insertBefore(title, covid[0].firstChild);
      
    new Chart(canva, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre d\'hospitalisations',
            data: hosp,
            borderColor: 'rgb(120, 241, 15)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              maxRotation: 90,
              minRotation: 45
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre d\'hospitalisations'
            }
          }
        }
      }
    });
    new Chart(canva2, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de réanimations',
            data: rea,
            borderColor: 'rgb(233, 16, 16)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              maxRotation: 90,
              minRotation: 45
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre de réanimations'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors du chargement du fichier CSV ou de la création du graphique:', error);
  }
}
