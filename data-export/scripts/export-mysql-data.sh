#!/bin/bash

# MySQL数据导出手动执行脚本
# 每次手动执行时导出MySQL中的会话数据为JSON格式

# 配置参数
MYSQL_CONTAINER="sso-mysql"
MYSQL_DB="sso_system"
MYSQL_USER="root"
MYSQL_PASSWORD="rootpassword"
TABLE_NAME="sessions"
OUTPUT_DIR="../exports/mysql_exports"
DATE_FORMAT=$(date +"%Y%m%d_%H%M%S")

# 创建输出目录
mkdir -p $OUTPUT_DIR

echo "开始导出MySQL数据..."

# 使用Docker容器中的mysql命令以批处理模式导出数据
docker exec $MYSQL_CONTAINER mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -B -e "
SELECT session_id, expires, data, FROM_UNIXTIME(expires) 
FROM $TABLE_NAME;
" > "$OUTPUT_DIR/sessions_$DATE_FORMAT.tsv"

if [ $? -eq 0 ]; then
  echo "TSV数据导出成功: $OUTPUT_DIR/sessions_$DATE_FORMAT.tsv"
  
  # 使用Python将TSV转换为JSON
  python3 << EOF
import json
import datetime

tsv_file = "$OUTPUT_DIR/sessions_$DATE_FORMAT.tsv"
json_file = "$OUTPUT_DIR/sessions_$DATE_FORMAT.json"

# 读取TSV并转换为JSON
data = []
with open(tsv_file, 'r') as f:
    lines = f.readlines()
    # 跳过标题行
    headers = lines[0].strip().split('\t')
    for line in lines[1:]:
        if line.strip():
            values = line.strip().split('\t')
            item = {}
            for i, header in enumerate(headers):
                value = values[i] if i < len(values) else ""
                if header == "expires":
                    item["expiresTimestamp"] = value
                    # 尝试解析时间戳
                    try:
                        timestamp = int(value)
                        item["expiresDate"] = datetime.datetime.fromtimestamp(timestamp).isoformat()
                    except:
                        item["expiresDate"] = "Invalid timestamp"
                elif header == "session_id":
                    item["sessionId"] = value
                elif header == "data":
                    item["sessionData"] = value
                else:
                    item[header] = value
            data.append(item)

# 写入JSON文件
with open(json_file, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("JSON数据导出成功: $OUTPUT_DIR/sessions_$DATE_FORMAT.json")
EOF

  if [ $? -eq 0 ]; then
    # 显示导出的文件内容大小
    FILE_SIZE=$(du -h "$OUTPUT_DIR/sessions_$DATE_FORMAT.json" | cut -f1)
    echo "导出文件大小: $FILE_SIZE"
    
    # 显示前几条记录作为预览
    echo "数据预览 (前10条记录):"
    head -n 20 "$OUTPUT_DIR/sessions_$DATE_FORMAT.json"
    
    # 清理TSV文件
    rm "$OUTPUT_DIR/sessions_$DATE_FORMAT.tsv"
    
    echo "导出完成!"
  else
    echo "JSON转换失败"
    # 清理TSV文件
    rm -f "$OUTPUT_DIR/sessions_$DATE_FORMAT.tsv"
    exit 1
  fi
else
  echo "数据导出失败，请检查MySQL连接和权限"
  exit 1
fi