const candidatos = [];
const tabla = document.getElementById('tabla-candidatos');
const tbody = tabla.querySelector('tbody');
const canvas = document.getElementById('myChart');

function agregarCandidato() {
  const nombre = document.getElementById('nombre').value;
  const color = document.getElementById('color').value;

  const nuevoCandidato = {
    nombre,
    color,
    votos: 1 // Se asigna 1 voto al agregar el candidato
  };

  candidatos.push(nuevoCandidato);
  mostrarCandidatos();
  crearGrafico();
}

function mostrarCandidatos() {
  tbody.innerHTML = '';
  const totalVotos = candidatos.reduce((total, candidato) => total + candidato.votos, 0);

  candidatos.forEach((candidato, indice) => {
    const porcentaje = (candidato.votos / totalVotos) * 100;
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${candidato.nombre}</td>
      <td style="background-color: ${candidato.color}"></td>
      <td>${candidato.votos}</td>
      <td>${porcentaje.toFixed(2)}%</td>
      <td><button onclick="votar(${indice})">Votar</button></td> <!-- Botón para votar -->
    `;
    tbody.appendChild(fila);
  });
}

function votar(indice) {
  candidatos[indice].votos++; // Incrementa los votos del candidato seleccionado
  mostrarCandidatos();
  crearGrafico();
}

function crearGrafico() {
  const ctx = canvas.getContext('2d');
  const labels = candidatos.map(c => c.nombre);
  const data = candidatos.map(c => c.votos);

  // Destruir el gráfico anterior si ya existe
  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votos',
        data: data,
        backgroundColor: candidatos.map(c => c.color)
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
