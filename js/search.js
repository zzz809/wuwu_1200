// search.js
(function initCategoryFilter() {
    // 配置项
    const CONFIG = {
        selectors: {
            category: '.category',
            postItem: '.post-item'
        },
        classes: {
            active: 'active',
            hidden: 'hidden'
        },
        defaultCategory: 'all'
    };

    // 初始化函数
    function setupFilter() {
        // DOM元素缓存
        const categories = document.querySelectorAll(CONFIG.selectors.category);
        const posts = document.querySelectorAll(CONFIG.selectors.postItem);

        // 核心过滤函数
        const applyFilter = (selectedCategory) => {
            // 更新按钮状态
            categories.forEach(btn => 
                btn.classList.toggle(
                    CONFIG.classes.active, 
                    btn.dataset.category === selectedCategory
                )
            );

            // 过滤内容
            posts.forEach(post => {
                const isMatch = selectedCategory === CONFIG.defaultCategory || 
                              post.dataset.category === selectedCategory;
                post.classList.toggle(CONFIG.classes.hidden, !isMatch);
            });
        };

        // 事件绑定
        categories.forEach(btn => {
            btn.addEventListener('click', () => 
                applyFilter(btn.dataset.category)
            );
        });

        // 初始化默认状态
        applyFilter(CONFIG.defaultCategory);
    }

    // DOM加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFilter);
    } else {
        setupFilter();
    }
})();