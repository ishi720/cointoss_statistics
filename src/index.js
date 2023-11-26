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

/**
 * グラフ表示用のデータを作成する
 * @param {number} trialCount 試行回数
 * @param {number} coinTossCount コイントスの回数
 * @return {array} [ラベルの配列,データの配列]
 */
const createData = (trialCount,coinTossCount) => {
    const graphData = Array(coinTossCount+1).fill(0);
    let count = 0;

    // データ表示用のラベルを生成する
    const labelsArray = [...Array(coinTossCount+1)].map((_, i) => i);

    // コイントスを実際に行い二項分布のデータを生成する
    for (let i=0; i<trialCount; i++) {
        count = binomialDistribution(coinTossCount, 0.5);
        graphData[count] = graphData[count] + 1
    }

    // 結果を返却
    return [labelsArray,graphData]
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
    trialCount = Number(document.getElementsByClassName("trialCount")[0].value);
    coinTossCount = Number(document.getElementsByClassName("coinTossCount")[0].value);
    console.log(trialCount,coinTossCount);
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
