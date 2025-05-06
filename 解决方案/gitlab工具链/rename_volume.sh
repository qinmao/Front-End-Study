# chmod +x rename_volume.sh
# ./rename_volume.sh

#!/bin/bash

# 定义旧数据卷和新数据卷的名称 
old_volume_name="gitlab_gitlab_data" # gitlab_gitlab_config、gitlab_gitlab_data
new_volume_name="gitlab_data"        # gitlab_config、gitlab_data

# 创建新的数据卷
docker volume create $new_volume_name

# 迁移数据
docker run --rm -v $old_volume_name:/source -v $new_volume_name:/target alpine sh -c 'cd /source && tar czf - . | tar xzf - -C /target'

# 验证数据迁移
echo "验证新数据卷中的内容："
docker run --rm -v $new_volume_name:/target alpine ls -l /target

# 确认是否删除旧数据卷
read -p "数据迁移成功，是否删除旧数据卷 $old_volume_name？(y/n): " confirm
if [ "$confirm" = "y" ]; then
    docker volume rm $old_volume_name
    echo "旧数据卷 $old_volume_name 已删除。"
else
    echo "旧数据卷 $old_volume_name 未删除。"
fi