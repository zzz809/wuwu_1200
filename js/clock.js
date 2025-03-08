// 实时时钟逻辑
// 修改updateClock函数
function updateClock() {
  const now = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  const date = now.toISOString().split('T')[0].replace(/-/g, '/'); // 更符合中文习惯
  const time = now.toTimeString().substr(0,8);
  const weekDay = weekDays[now.getDay()];

  document.getElementById('realtime-clock').textContent = 
    `${date} ${time} ${weekDay}`;
}

// 初始化后立即执行一次
updateClock();
  
  // 初始更新
  updateClock();
  // 每秒刷新
  setInterval(updateClock, 1000);