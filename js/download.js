document.addEventListener('DOMContentLoaded', () => {
    // 为所有文件项绑定点击事件
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', function() {
            const downloadUrl = this.dataset.href;
            startDownload(downloadUrl, this);
        });
    });
});

function startDownload(url, element) {
    // 创建临时下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 添加点击反馈
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}