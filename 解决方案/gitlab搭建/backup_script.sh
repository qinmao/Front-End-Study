# 自动备份脚本（backup_script.sh）

#!/bin/bash
docker exec -t gitlab gitlab-backup create  # 生成 tar 包到宿主机
cp /docker-volumes/gitlab/config/gitlab-secrets.json /backups/  # 包含加密密钥
find /backups -name "*.tar" -mtime +30 -delete