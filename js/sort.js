// 新增排序功能脚本
document.addEventListener('DOMContentLoaded', () => {
    // 初始化排序
    sortPosts('desc');
    
    // 绑定按钮事件
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有激活状态
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            // 设置当前按钮激活
            this.classList.add('active');
            // 执行排序
            sortPosts(this.dataset.order);
        });
    });
});

function sortPosts(order) {
    const postList = document.querySelector('.post-list');
    const posts = Array.from(postList.children);
    
    // 排序逻辑
    posts.sort((a, b) => {
        const dateA = new Date(a.querySelector('.post-date').textContent);
        const dateB = new Date(b.querySelector('.post-date').textContent);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // 添加过渡效果
    postList.style.opacity = '0';
    postList.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        // 清空列表
        while (postList.firstChild) {
            postList.removeChild(postList.firstChild);
        }
        
        // 重新插入排序后的文章
        posts.forEach(post => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            post.style.transition = 'all 0.4s ease';
            postList.appendChild(post);
        });

        // 触发重绘
        void postList.offsetWidth;
        postList.style.opacity = '1';
        
        // 执行入场动画
        posts.forEach((post, index) => {
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 300);
}