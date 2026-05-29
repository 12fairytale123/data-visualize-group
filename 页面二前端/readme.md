<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>草木之精 · 六大茶类加工工艺与成分对比</title>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #ffffff;
      font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", sans-serif;
      color: #2e4a2c;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container { width: 100%; max-width: 1200px; display: flex; flex-direction: column; gap: 28px; }
    .main-title {
      text-align: center; font-size: 2rem; font-weight: 500;
      color: #2c5e2e; letter-spacing: 4px; margin-bottom: 5px;
    }

    /* 光谱条 */
    .spectrum-wrapper { position: relative; margin: 20px 0 10px; padding-top: 25px; }
    .spectrum-labels {
      position: absolute; top: 0; left: 0; right: 0;
      display: flex; justify-content: space-between; padding: 0 6px;
      font-size: 0.85rem; color: #444; font-weight: 500; letter-spacing: 1px;
    }
    .spectrum-bar {
      display: flex; width: 100%; border-radius: 12px; overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,40,0,0.08); cursor: pointer; user-select: none;
    }
    .tea-btn {
      flex: 1; padding: 14px 4px; text-align: center; font-size: 0.95rem;
      font-weight: 500; color: white; transition: all 0.25s ease;
      border: none; outline: none;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      line-height: 1.4; position: relative; min-width: 0;
      opacity: 0.7;
    }
    .tea-btn .cn-name { font-weight: 600; letter-spacing: 1px; }
    .tea-btn .en-name { font-size: 0.7rem; opacity: 0.85; margin-top: 3px; font-style: italic; }
    .tea-btn:hover { filter: brightness(1.1); box-shadow: inset 0 0 0 2px rgba(255,255,255,0.8); }
    .tea-btn.active {
      opacity: 1;
      box-shadow: inset 0 -6px 0 rgba(255,255,255,0.9), 0 0 12px rgba(44,94,46,0.4);
      transform: scale(1.02); font-weight: 700; z-index: 2;
    }
    .tea-btn.green  { background: #6a9e4b; }
    .tea-btn.white  { background: #b5aa8c; }
    .tea-btn.yellow { background: #cfb53b; }
    .tea-btn.oolong { background: #2e8b9e; }
    .tea-btn.black  { background: #b53c2c; }
    .tea-btn.dark   { background: #3e2e1f; }

    .chart-card {
      background: #fafcf8; border: 1px solid #d4e2c4; border-radius: 20px;
      padding: 24px 20px; box-shadow: 0 6px 18px rgba(80,120,60,0.06);
    }
    .radar-section { height: 460px; width: 100%; }

    .flow-comparison {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .flow-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .flow-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-right: 16px;
    }
    .color-dot {
      width: 14px;
      height: 14px;
      border-radius: 4px;
    }
    .tea-name-label {
      font-size: 15px;
      font-weight: 600;
      color: #2c5e2e;
      white-space: nowrap;
    }
    .flow-steps {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0;
    }
    .step-box {
      background: #ffffff;
      border: 2px solid #ccc;
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 14px;
      font-weight: bold;
      color: #1e3b1a;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      transition: all 0.3s ease;
    }
    .step-arrow {
      margin: 0 10px;
      font-size: 20px;
      color: #ccc;
      font-weight: 300;
    }

    @media (max-width: 768px) {
      .tea-btn { font-size: 0.75rem; padding: 12px 2px; }
      .tea-btn .en-name { font-size: 0.6rem; }
      .radar-section { height: 360px; }
      .step-box { padding: 8px 12px; font-size: 13px; }
      .step-arrow { margin: 0 6px; font-size: 18px; }
      .flow-label { margin-right: 8px; }
    }
  </style>
</head>
<body>
<div class="container">
  <h1 class="main-title">草木之精 · 六大茶类加工工艺与成分对比</h1>

  <div class="spectrum-wrapper">
    <div class="spectrum-labels">
      <span>发酵度 0%</span>
      <span>发酵度 100%</span>
    </div>
    <div class="spectrum-bar" id="spectrumBar">
      <div class="tea-btn green active" data-name="绿茶">
        <span class="cn-name">绿茶</span><span class="en-name">Green Tea</span>
      </div>
      <div class="tea-btn white" data-name="白茶">
        <span class="cn-name">白茶</span><span class="en-name">White Tea</span>
      </div>
      <div class="tea-btn yellow" data-name="黄茶">
        <span class="cn-name">黄茶</span><span class="en-name">Yellow Tea</span>
      </div>
      <div class="tea-btn oolong" data-name="青茶">
        <span class="cn-name">青茶/乌龙茶</span><span class="en-name">Oolong Tea</span>
      </div>
      <div class="tea-btn black" data-name="红茶">
        <span class="cn-name">红茶</span><span class="en-name">Black Tea</span>
      </div>
      <div class="tea-btn dark" data-name="黑茶">
        <span class="cn-name">黑茶</span><span class="en-name">Dark Tea</span>
      </div>
    </div>
  </div>

  <div class="chart-card"><div id="radarChart" class="radar-section"></div></div>

  <div class="chart-card">
    <div id="flowContainer" class="flow-comparison"></div>
  </div>
</div>

<script>
  (function() {
    // 修正后的数据：白茶保留更多原始成分，黄茶因闷黄而茶多酚降低、茶黄素升高
    const teaData = [
      { name: '绿茶', ferment: 0,  color: '#6a9e4b', process: ['鲜叶','杀青','揉捻','干燥'],
        features: { '茶多酚':18.5,'咖啡碱':4.2,'茶氨酸':2.8,'可溶性糖':3.5,'茶黄素':0.1,'茶红素':0.2 } },
      { name: '白茶', ferment: 10, color: '#b5aa8c', process: ['鲜叶','萎凋','干燥'],
        features: { '茶多酚':17.8,'咖啡碱':4.0,'茶氨酸':3.5,'可溶性糖':4.2,'茶黄素':0.2,'茶红素':0.3 } },
      { name: '黄茶', ferment: 20, color: '#cfb53b', process: ['鲜叶','杀青','揉捻','闷黄','干燥'],
        features: { '茶多酚':14.5,'咖啡碱':3.6,'茶氨酸':2.2,'可溶性糖':3.8,'茶黄素':0.8,'茶红素':1.2 } },
      { name: '青茶', ferment: 40, color: '#2e8b9e', process: ['鲜叶','萎凋','做青','杀青','揉捻','干燥'],
        features: { '茶多酚':13.6,'咖啡碱':3.6,'茶氨酸':1.9,'可溶性糖':4.5,'茶黄素':0.4,'茶红素':4.2 } },
      { name: '红茶', ferment: 80, color: '#b53c2c', process: ['鲜叶','萎凋','揉捻','发酵','干燥'],
        features: { '茶多酚':12.5,'咖啡碱':3.8,'茶氨酸':2.1,'可溶性糖':4.2,'茶黄素':0.6,'茶红素':9.3 } },
      { name: '黑茶', ferment: 95, color: '#3e2e1f', process: ['鲜叶','杀青','揉捻','渥堆','干燥'],
        features: { '茶多酚':9.8,'咖啡碱':3.2,'茶氨酸':1.2,'可溶性糖':5.8,'茶黄素':0.2,'茶红素':10.5 } }
    ];

    const allValues = teaData.flatMap(t => Object.values(t.features));
    const globalMax = Math.ceil(Math.max(...allValues) * 1.1);

    let selectedTeas = [teaData[0]]; // 默认绿茶

    const spectrumBar = document.getElementById('spectrumBar');
    const teaButtons = spectrumBar.querySelectorAll('.tea-btn');
    const radarChart = echarts.init(document.getElementById('radarChart'));
    const flowContainer = document.getElementById('flowContainer');

    function updateButtons() {
      const selectedNames = selectedTeas.map(t => t.name);
      teaButtons.forEach(btn => {
        const teaName = btn.getAttribute('data-name');
        btn.classList.toggle('active', selectedNames.includes(teaName));
      });
    }

    function updateRadarChart() {
      const series = selectedTeas.map(tea => ({
        name: tea.name,
        type: 'radar',
        data: [{
          value: Object.values(tea.features),
          name: tea.name,
          areaStyle: { color: tea.color + '30' },
          lineStyle: { color: tea.color, width: 2 },
          itemStyle: { color: tea.color },
          symbol: 'circle',
          symbolSize: 5
        }]
      }));

      radarChart.setOption({
        title: {
          text: '理化成分对比',
          left: 'center',
          top: 8,
          textStyle: { color: '#2c5e2e', fontSize: 16, fontWeight: '500' }
        },
        legend: {
          bottom: 10,
          data: selectedTeas.map(t => t.name),
          textStyle: { color: '#4a6741' }
        },
        radar: {
          center: ['50%', '50%'],
          radius: '65%',
          indicator: Object.keys(teaData[0].features).map(key => ({ name: key, max: globalMax })),
          axisName: { color: '#4a6741', fontSize: 11 },
          splitArea: { areaStyle: { color: ['rgba(180,210,150,0.06)', 'rgba(180,210,150,0.03)'] } },
          splitLine: { lineStyle: { color: '#c3d6b8' } },
          axisLine: { lineStyle: { color: '#9cb88c' } }
        },
        series: series
      });
    }

    function updateFlowChart() {
      flowContainer.innerHTML = '';
      selectedTeas.forEach(tea => {
        const row = document.createElement('div');
        row.className = 'flow-row';

        const labelDiv = document.createElement('div');
        labelDiv.className = 'flow-label';

        const dot = document.createElement('span');
        dot.className = 'color-dot';
        dot.style.backgroundColor = tea.color;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'tea-name-label';
        nameSpan.textContent = tea.name;

        labelDiv.appendChild(dot);
        labelDiv.appendChild(nameSpan);
        row.appendChild(labelDiv);

        const stepsDiv = document.createElement('div');
        stepsDiv.className = 'flow-steps';

        tea.process.forEach((step, idx) => {
          const box = document.createElement('div');
          box.className = 'step-box';
          box.style.borderColor = tea.color;
          box.textContent = step;
          stepsDiv.appendChild(box);
          if (idx < tea.process.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'step-arrow';
            arrow.style.color = tea.color;
            arrow.textContent = '→';
            stepsDiv.appendChild(arrow);
          }
        });

        row.appendChild(stepsDiv);
        flowContainer.appendChild(row);
      });
    }

    function refreshAll() {
      updateButtons();
      updateRadarChart();
      updateFlowChart();
    }

    function toggleTea(tea) {
      const index = selectedTeas.indexOf(tea);
      if (index > -1) {
        selectedTeas.splice(index, 1);
      } else {
        if (selectedTeas.length >= 2) {
          selectedTeas.shift();
        }
        selectedTeas.push(tea);
      }
      if (selectedTeas.length === 0) {
        selectedTeas.push(tea);
      }
      refreshAll();
    }

    teaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const teaName = btn.getAttribute('data-name');
        const tea = teaData.find(t => t.name === teaName);
        if (tea) toggleTea(tea);
      });
    });

    refreshAll();

    window.addEventListener('resize', () => {
      radarChart.resize();
    });
  })();
</script>
</body>
</html>
