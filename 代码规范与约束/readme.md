## 命名规范
- 路由：.vue文件、文件夹 使用横线连接 (kebab-case)
- 组件：所有的Component文件都是以大写开头 (PascalCase)
- js：.js文件都遵循横线连接 (kebab-case)

## ESLint
- .eslintrc.js 本地校验规则
- .eslintignore 忽略校验的文件
- vscode 保存自动格式化并eslint修复
- vscode settings.json 配置
```json
     // 启用eslint 格式化，禁用其他格式化器
    "eslint.format.enable": true,
    // 保存自动修复所有，
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }

```