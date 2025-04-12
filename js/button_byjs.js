// JavaScript部分
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const policyCards = document.querySelectorAll('.policy-card');
  
    // 初始化按钮状态
    document.querySelector('[data-category="all"]').classList.add('active');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // 更新按钮状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        // 筛选卡片
        policyCards.forEach(card => {
          const title = card.querySelector('h3').textContent;
          const matchAll = category === 'all';
          const matchCategory = title.includes(category);
          
          card.classList.toggle('hidden', !(matchAll || matchCategory));
        });
      });
    });
  });