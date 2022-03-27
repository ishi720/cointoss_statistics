import Chart from 'chart.js';

function coinToss(){
    var coin = ['表','裏'];
    return coin[Math.floor(Math.random() * coin.length)];
}

function createData(trialCount,coinTossCount) {
  //trialCountの数だけ実施
  var coinTossRes = [];
  for (var i=0;i<trialCount;i++) {
      var omote = 0;
      var ura = 0;

      //コイントスをcoinTossCountの数だけ実施
      for (var j=0;j<coinTossCount;j++) {
          if (coinToss() == "表") {
              omote++;
          } else {
              ura++;
          }
      }
      //表になった回数を記録する
      coinTossRes.push(omote);
  }

  // 重複している値をカウント
  var count = {};
  for (var i = 0;i<coinTossRes.length;i++) {
    var elm = coinTossRes[i];
    count[elm] = (count[elm] || 0) + 1;
  }

  // データ生成
  var labelsArray = [];
  var data = [];
  for (var i=0;i<=coinTossCount;i++) {
      labelsArray.push(i);
      if (count[i]) {
        data.push(count[i]);
      } else {
        data.push(0);
      }
  }
  return [labelsArray,data]
}

var trialCount = 100000;
var coinTossCount = 100;

var [labelsArray,data] = createData(trialCount,coinTossCount);


var ctx = document.getElementById('mychart');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,
      datasets: [{
        label: 'コインが表になった回数',
        data: data,
        backgroundColor: "#ff9800",
      }],
    }
});

function renderChart() {
  var trialCount = document.getElementsByClassName("trialCount")[0].value;
  var coinTossCount = document.getElementsByClassName("coinTossCount")[0].value;
  var [labelsArray,dataArray] = createData(trialCount,coinTossCount);
  myChart.data.labels = labelsArray;
  myChart.data.datasets[0].data = dataArray;
  myChart.update();
}
window.renderChart = renderChart;