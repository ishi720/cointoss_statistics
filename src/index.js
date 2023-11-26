import Chart from 'chart.js';
import 'chota/dist/chota.min.css';

/**
 * ベルヌーイ分布
 * @param {number} p 確率 (0.0 ~ 1.0)
 * @return {boolean} true:成功, false:失敗
 */
const bernoulliDistribution = (p) => Math.random() < p;

/**
 * 二項分布
 * @param {number} n 試行回数
 * @param {number} p 確率 (0.0 ~ 1.0)
 * @return {number} 成功した回数
 */
const binomialDistribution = (n, p) => {
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (bernoulliDistribution(p)) count++;
    }
    return count;
}

const createData = (trialCount,coinTossCount) => {
    //trialCountの数だけ実施
    let coinTossRes = [];
    for (let i=0; i<trialCount; i++) {

        let omote = binomialDistribution(coinTossCount, 0.5);

        coinTossRes.push(omote);
    }

    // 重複している値をカウント
    let count = {};
    for (let i = 0; i<coinTossRes.length; i++) {
      let elm = coinTossRes[i];
      count[elm] = (count[elm] || 0) + 1;
    }

    // データ生成
    let labelsArray = [];
    let data = [];
    for (let i=0; i<=coinTossCount; i++) {
        labelsArray.push(i);
        if (count[i]) {
            data.push(count[i]);
        } else {
            data.push(0);
        }
    }
    return [labelsArray,data]
}

let trialCount = 100000;
let coinTossCount = 100;

let [labelsArray,data] = createData(trialCount,coinTossCount);


const ctx = document.getElementById('mychart');

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelsArray,
        datasets: [{
          label: 'コインが〇回表になった回数',
          data: data,
          backgroundColor: "#ff9800",
        }],
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    }
});

const renderChart = () => {
    trialCount = document.getElementsByClassName("trialCount")[0].value;
    coinTossCount = document.getElementsByClassName("coinTossCount")[0].value;
    let [labelsArray,dataArray] = createData(trialCount,coinTossCount);
    myChart.data.labels = labelsArray;
    myChart.data.datasets[0].data = dataArray;
    myChart.update();
}
window.renderChart = renderChart;

// //順列
// const permutation = (n,r) => {
//   for(let i=0,res=1;i<r;i++) {
//     res *= n-i;
//   }
//   return res;
// }
// //組み合わせ
// const combination = (n,r) => {
//   return permutation(n, r) / permutation(r, r);
// }

// //べき乗
// const exponentiation = (x,y) => {
//   return x ** y;
// }

// window.exponentiation = exponentiation;
// window.combination = combination;
