# 定义起始和结束编号
start_num = 1011
end_num = 1020

# 读取原始文件
with open('viewer_1003.html', 'r', encoding='utf-8') as f:
    original_content = f.read()

# 批量生成文件
for num in range(start_num, end_num + 1):
    # 替换内容中的数字
    new_content = original_content.replace('viewer_1003.mjs', f'viewer_{num}.mjs')
    
    # 生成新文件名
    new_filename = f'viewer_{num}.html'
    
    # 写入新文件
    with open(new_filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'已生成文件：{new_filename}')