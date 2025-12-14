#!/bin/bash

# MongoDB数据导出手动执行脚本
# 每次手动执行时导出MongoDB中的用户数据为JSON格式

# 配置参数
MONGO_CONTAINER="sso-mongodb"
MONGO_DB="sso-system"
MONGO_COLLECTION="users"
OUTPUT_DIR="../exports/mongo_exports"
DATE_FORMAT=$(date +"%Y%m%d_%H%M%S")

# 创建输出目录
mkdir -p $OUTPUT_DIR

echo "开始导出MongoDB数据..."

# 使用Docker容器中的mongoexport导出数据
docker exec $MONGO_CONTAINER mongoexport --db=$MONGO_DB --collection=$MONGO_COLLECTION --jsonArray --pretty --out=/tmp/users_export.json

# 将导出的文件从容器复制到主机
if [ $? -eq 0 ]; then
  docker cp $MONGO_CONTAINER:/tmp/users_export.json "$OUTPUT_DIR/users_$DATE_FORMAT.json"
  
  echo "数据导出成功: $OUTPUT_DIR/users_$DATE_FORMAT.json"
  
  # 显示导出的文件内容大小
  FILE_SIZE=$(du -h "$OUTPUT_DIR/users_$DATE_FORMAT.json" | cut -f1)
  echo "导出文件大小: $FILE_SIZE"
  
  # 显示前几条记录作为预览
  echo "数据预览 (前10行):"
  head -n 10 "$OUTPUT_DIR/users_$DATE_FORMAT.json"
  
  # 清理容器内的临时文件
  docker exec $MONGO_CONTAINER rm /tmp/users_export.json
  
  echo "导出完成!"
else
  echo "数据导出失败，请检查MongoDB连接和权限"
  exit 1
fi