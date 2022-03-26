import Chart from 'chart.js';

var ctx = document.getElementById('mychart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      label: 'コインが表になった回数',
      data: [86, 978, 4439, 11538, 20787, 24404, 20559, 11709, 4347, 1054, 99],
      backgroundColor: "#ff9800",
    }],
  }
});