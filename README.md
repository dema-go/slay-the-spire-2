# Slay the Spire 2 - Web Edition

一个参考《杀戮尖塔》(Slay the Spire 2) 的网页版卡牌对战游戏。

## 游戏特性

### 角色系统
- **铁甲战士 (Ironclad)**: 80HP，起始遗物"燃烧之血"
  - 力量叠加、护甲坦克风格
  - 卡牌包括：打击、防御、重击、顺劈、愤怒、大屠杀等

- **静默猎人 (Silent)**: 70HP，起始遗物"蛇戒"
  - 毒药、敏捷风格
  - 卡牌包括：毒刺、致命毒药、催化剂、暗杀等

### 地图系统
- 3层地图结构
- 节点类型：战斗、精英、休息、商店、事件、Boss
- 路线选择机制

### 战斗系统
- 能量系统：每回合3点能量
- 抽牌机制：每回合抽5张牌
- 护甲(防御)、中毒、易伤、虚弱状态
- 敌人意图显示
- 敌人AI行为模式

### 遗物系统
- 被动效果
- 战斗结束触发

## 技术栈

- HTML5 + CSS3 + JavaScript
- 纯前端单页应用
- LocalStorage 存档

## 运行方式

```bash
# 本地启动服务
cd slay-the-spire-2
python3 -m http.server 8080

# 浏览器打开
open http://localhost:8080
```

## 项目结构

```
slay-the-spire-2/
├── index.html      # 主页面
├── css/
│   └── style.css   # 样式文件
└── js/
    └── game.js     # 游戏逻辑
```

## 游戏截图

（待添加）

## License

MIT
