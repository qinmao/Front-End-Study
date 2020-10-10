# mysql
## mysql语法规范
1. 不区分⼤⼩写，但建议关键字⼤写，表名、列名⼩写
2. 每条命令最好⽤英⽂分号结尾
3. 每条命令根据需要，可以进⾏缩进或换⾏
4. 注释
– 单⾏注释：#注释⽂字
– 单⾏注释：-- 注释⽂字 ，注意， 这⾥需要加空格
– 多⾏注释：/* 注释⽂字 */

## MySQL的数据类型
* 整数类型：bit、bool、tinyint、smallint、mediumint、int、bigint
* 浮点数类型：float、double、decimal
* 字符串类型：char、varchar、tinyblob、blob、mediumblob、longblob、tinytext、text、mediumtext、longtext
* ⽇期类型：Date、DateTime、TimeStamp、Time、Year
* 其他数据类型：暂不介绍，⽤的⽐较少。

## 数据类型选择的⼀些建议
* 选⼩不选⼤：⼀般情况下选择可以正确存储数据的最⼩数据类型，越⼩的数据类型通常更快，占⽤磁盘，内存和CPU缓存更⼩。
* 简单就好：简单的数据类型的操作通常需要更少的CPU周期，例如：整型⽐字符操作代价要⼩得多，因为字符集和校对规则(排序规则)使字符⽐整型⽐较更加复杂。
* 尽量避免NULL：尽量制定列为NOT	NULL，除⾮真的需要NULL类型的值，有NULL的列值会使得索引、索引统计和值⽐较更加复杂。
* 浮点类型的建议统⼀选择decimal
* 记录时间的建议使⽤int或者bigint类型，将时间转换为时间戳格式，如将时间转换为秒、毫秒，进⾏存储，⽅便⾛索引

## MySQL管理员常⽤的⼀些命令