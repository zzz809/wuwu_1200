class PDFViewer {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            pdfUrl: config.pdfUrl || '/default.pdf',
            scale: config.scale || 1.3,
            defaultPage: config.defaultPage || 1,
            workerSrc: config.workerSrc || './js/pdf.worker.js'
        };
        
        this.currentPage = 1;
        this.pdfDoc = null;
        this.init();
    }

    init() {
        // 初始化容器结构
        this.container.className = 'pdf-viewer-container';
        this.container.innerHTML = `
            <div class="pdf-viewer-toolbar">
                <button class="pdf-viewer-button" data-action="prev">上一页</button>
                <span class="pdf-page-info">
                    第 <span data-page="current">1</span> 页 / 共 <span data-page="total">0</span> 页
                </span>
                <button class="pdf-viewer-button" data-action="next">下一页</button>
            </div>
            <div class="pdf-canvas-wrapper">
                <div class="pdf-loading">正在加载PDF文档...</div>
            </div>
        `;

        // 配置PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = this.config.workerSrc;
        
        // 绑定事件
        this.container.addEventListener('click', this.handleButtonClick.bind(this));
        
        // 加载PDF
        this.loadPDF();
    }

    async loadPDF() {
        try {
            const loadingTask = pdfjsLib.getDocument(this.config.pdfUrl);
            this.pdfDoc = await loadingTask.promise;
            
            this.updatePageInfo();
            this.renderPage(this.config.defaultPage);
            this.container.querySelector('.pdf-loading').remove();
        } catch (err) {
            console.error('PDF加载失败:', err);
            this.showError('无法加载PDF文档');
        }
    }

    async renderPage(pageNum) {
        if (!this.pdfDoc || pageNum < 1 || pageNum > this.pdfDoc.numPages) return;

        try {
            this.currentPage = pageNum;
            const page = await this.pdfDoc.getPage(pageNum);
            const canvasWrapper = this.container.querySelector('.pdf-canvas-wrapper');
            
            // 创建画布
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-canvas';
            const viewport = page.getViewport({ scale: this.config.scale });
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            // 清空容器并渲染
            canvasWrapper.innerHTML = '';
            canvasWrapper.appendChild(canvas);
            
            await page.render({
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            }).promise;
            
            this.updatePageInfo();
        } catch (err) {
            console.error('页面渲染失败:', err);
            this.showError('页面渲染失败');
        }
    }

    updatePageInfo() {
        if (!this.pdfDoc) return;
        
        this.container.querySelector('[data-page="current"]').textContent = this.currentPage;
        this.container.querySelector('[data-page="total"]').textContent = this.pdfDoc.numPages;
    }

    handleButtonClick(e) {
        const action = e.target.dataset.action;
        if (!action) return;

        switch(action) {
            case 'prev':
                if (this.currentPage > 1) this.renderPage(--this.currentPage);
                break;
            case 'next':
                if (this.currentPage < this.pdfDoc.numPages) this.renderPage(++this.currentPage);
                break;
        }
    }

    showError(msg) {
        const errorEl = document.createElement('div');
        errorEl.className = 'pdf-loading';
        errorEl.textContent = msg;
        this.container.querySelector('.pdf-canvas-wrapper').appendChild(errorEl);
    }
}