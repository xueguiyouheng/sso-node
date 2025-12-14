# 数据导出工具

这个目录包含了用于导出SSO系统中MySQL和MongoDB数据的工具和导出文件。

## 目录结构

```
data-export/
├── scripts/                 # 数据导出脚本
│   ├── export-mongo-data.sh # MongoDB数据导出脚本
│   └── export-mysql-data.sh # MySQL数据导出脚本
└── exports/                 # 导出的数据文件
    ├── mongo_exports/       # MongoDB导出的JSON文件
    └── mysql_exports/       # MySQL导出的JSON文件
```

## 使用方法

### MongoDB数据导出
```bash
cd scripts
./export-mongo-data.sh
```

导出的文件将保存在 `exports/mongo_exports/` 目录中，文件名包含时间戳。

### MySQL数据导出
```bash
cd scripts
./export-mysql-data.sh
```

导出的文件将保存在 `exports/mysql_exports/` 目录中，文件名包含时间戳。

## 注意事项

1. 运行脚本前请确保相应的Docker容器正在运行
2. 导出的JSON文件可用于数据分析和备份
3. 每次执行脚本都会创建新的导出文件，不会覆盖之前的导出