document.addEventListener('DOMContentLoaded', function() {
    // 获取所有切换按钮
    const sectionButtons = document.querySelectorAll('.profile-section__btn');
    
    // 切换功能实现
    function switchSection(selectedSection) {
        // 移除所有激活状态
        sectionButtons.forEach(btn => 
            btn.classList.remove('profile-section__btn--active'));
        
        // 隐藏所有内容
        document.querySelectorAll('.profile-section__content')
            .forEach(content => content.classList.remove('profile-section__content--active'));
        
        // 激活当前选中的
        const targetContent = document.getElementById(`profile-${selectedSection}`);
        if(targetContent) {
            targetContent.classList.add('profile-section__content--active');
            event.target.classList.add('profile-section__btn--active');
        }
    }

    // 绑定按钮点击事件
    sectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionName = this.dataset.section;
            switchSection(sectionName);
        });
    });
});