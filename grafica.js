document.addEventListener('DOMContentLoaded', () => {
const ctx = document.getElementById('myChart');


window.chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
        label: 'Función',
        data: [],
        borderWidth: 2
    }]
    },
    options: {
        responsive: true
    }
});
});