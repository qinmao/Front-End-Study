## 命名规范
- 路由：.vue文件、文件夹 使用横线连接 (kebab-case)
- 组件：所有的Component文件都是以大写开头 (PascalCase)
- js：.js文件都遵循横线连接 (kebab-case)

## ESLint
- .eslintrc.js 本地校验规则
- .eslintignore 忽略校验的文件
- vscode 保存自动格式化并eslint 修复(需要安装Vetur,ESLint)
- vscode settings.json 配置
```json
  "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false, // 不使用分号
            "singleQuote": true // 使用单引号
        }
    },
    // 保存自动格式化，
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }

```