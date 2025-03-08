// 搜索功能（支持页面内容搜索）
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const posts = document.querySelectorAll('.post-item');
  let timeout;

  // 防抖搜索（300ms延迟）
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const term = e.target.value.trim().toLowerCase();
      posts.forEach(post => {
        const text = post.textContent.toLowerCase();
        post.style.display = text.includes(term) ? 'block' : 'none';
      });
    }, 300);
  });

  // 回车键优化
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstMatch = document.querySelector('.post-item[style*="block"]');
      firstMatch?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 在main.js中添加字体加载检测
  if (sessionStorage.fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded');
  } else {
    Promise.all([
      document.fonts.load('1em TitleFont'),
      document.fonts.load('1em ContentFont')
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
      sessionStorage.fontsLoaded = true;
    });
  }

  document.fonts.load('1em MyFangSong').then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
  
  // 字体加载失败处理
  document.fonts.onloadingdone = (e) => {
    if (!e.fontfaces.some(f => f.family === 'MyFangSong')) {
      console.warn('自定义字体加载失败，使用备用字体');
    }
  };



});