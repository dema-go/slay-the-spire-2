// Slay the Spire II - Complete Game Logic
const Game = {
  state: {
    screen: 'menu',
    character: null,
    player: null,
    deck: [],
    hand: [],
    drawPile: [],
    discardPile: [],
    exhaustPile: [],
    energy: 3,
    maxEnergy: 3,
    turn: 1,
    enemies: [],
    gold: 0,
    relics: [],
    potions: [],
    ascension: 0,
    victory: false,
    defeat: false,
    map: { currentFloor: 0, floors: [] },
    combatLog: [],
    targetEnemy: null,
    selectedCardIndex: null,
    pendingCardTarget: false
  },

  // ===== CARD LIBRARY =====
  cards: {
    ironclad: [
      { id: 'strike', name: '打击', type: 'attack', cost: 1, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'defend', name: '防御', type: 'skill', cost: 1, block: 5, description: '获得5点护甲', rarity: 'common' },
      { id: 'bash', name: '重击', type: 'attack', cost: 2, damage: 10, vulnerable: 2, description: '造成10点伤害，易伤2回合', rarity: 'common' },
      { id: 'cleave', name: '顺劈', type: 'attack', cost: 1, damage: 8, aoe: true, description: '对所有敌人造成8点伤害', rarity: 'common' },
      { id: 'iron_wave', name: '铁波', type: 'attack', cost: 1, damage: 5, block: 5, description: '造成5点伤害，获得5点护甲', rarity: 'common' },
      { id: 'anger', name: '愤怒', type: 'attack', cost: 0, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'body_slash', name: '肉体打击', type: 'attack', cost: 1, damage: 8, weak: 1, description: '造成8点伤害，敌人虚弱1回合', rarity: 'uncommon' },
      { id: 'burning_pact', name: '燃烧契约', type: 'skill', cost: 1, draw: 2, discard: 1, description: '抽2张牌，弃1张', rarity: 'uncommon' },
      { id: 'carnage', name: '大屠杀', type: 'attack', cost: 2, damage: 22, description: '造成22点伤害', rarity: 'uncommon' },
      { id: 'clothesline', name: '晾衣绳', type: 'attack', cost: 2, damage: 12, weak: 2, description: '造成12点伤害，敌人虚弱2回合', rarity: 'uncommon' },
      { id: 'front_fist', name: '重拳', type: 'attack', cost: 2, damage: 14, description: '造成14点伤害', rarity: 'uncommon' },
      { id: 'heavy_blade', name: '重刃', type: 'attack', cost: 2, damage: 14, strengthMult: 2, description: '造成14+力量×2伤害', rarity: 'rare' },
      { id: 'inflame', name: '激怒', type: 'power', cost: 1, strength: 2, description: '永久获得2力量', rarity: 'uncommon' },
      { id: 'metallicize', name: '金属化', type: 'power', cost: 1, armorPower: 3, description: '回合结束获得3护甲', rarity: 'uncommon' },
      { id: 'thunderclap', name: '雷鸣', type: 'attack', cost: 1, damage: 4, weak: 1, vulnerable: 1, aoe: true, description: '对所有敌人造成4点伤害，易伤虚弱各1', rarity: 'common' },
      { id: 'uppercut', name: '上勾拳', type: 'attack', cost: 2, damage: 13, weak: 1, vulnerable: 1, description: '造成13点伤害，易伤虚弱各1', rarity: 'uncommon' },
      { id: 'spot_weakness', name: '发现弱点', type: 'skill', cost: 1, strengthTemp: 3, description: '本回合获得3力量', rarity: 'common' },
      { id: 'true_grit', name: '真勇气', type: 'skill', cost: 1, block: 7, discardRandom: 1, description: '获得7护甲，随机弃1张', rarity: 'common' },
      { id: 'warcry', name: '战吼', type: 'skill', cost: 0, draw: 1, description: '抽1张牌', rarity: 'common' },
      { id: 'bloodletting', name: '放血', type: 'skill', cost: 0, damageSelf: 3, strengthTemp: 1, description: '失去3HP，本回合获得1力量', rarity: 'uncommon' },
      { id: 'burning_emerge', name: '燃烧登场', type: 'attack', cost: 1, damage: 6, description: '造成6点伤害，抽1张', rarity: 'common' },
      { id: 'challenge', name: '挑战', type: 'skill', cost: 1, vulnerable: 2, description: '敌人易伤2回合', rarity: 'uncommon' },
      { id: 'disarm', name: '缴械', type: 'skill', cost: 1, weak: 2, description: '敌人虚弱2回合', rarity: 'uncommon' },
      { id: 'entinel', name: '哨兵', type: 'attack', cost: 1, damage: 8, draw: 1, block: 8, description: '造成8点伤害，获得8护甲，抽1张', rarity: 'rare' },
      { id: 'demon_form', name: '恶魔形态', type: 'power', cost: 3, strength: 2, description: '每回合开始获得2力量', rarity: 'rare' },
      { id: 'flame_barrier', name: '火焰屏障', type: 'skill', cost: 2, block: 12, thornDamage: 4, description: '获得12护甲，受攻击时反伤4', rarity: 'uncommon' },
      { id: 'flex', name: '发力', type: 'skill', cost: 0, strengthTemp: 2, description: '本回合获得2力量', rarity: 'common' },
      { id: 'havoc', name: '浩劫', type: 'skill', cost: 1, discardRandom: 99, description: '弃掉所有手牌', rarity: 'uncommon' },
      { id: 'headbutt', name: '头槌', type: 'attack', cost: 1, damage: 9, description: '造成9点伤害', rarity: 'common' },
      { id: 'heem', name: '血池', type: 'skill', cost: 0, block: 5, description: '获得5护甲', rarity: 'common' }
    ],
    silent: [
      { id: 'strike_s', name: '打击', type: 'attack', cost: 1, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'defend_s', name: '防御', type: 'skill', cost: 1, block: 5, description: '获得5点护甲', rarity: 'common' },
      { id: 'dagger_throw', name: '飞刀投掷', type: 'attack', cost: 1, damage: 8, draw: 1, description: '造成8点伤害，抽1张', rarity: 'common' },
      { id: 'dagger_spray', name: '飞刀', type: 'attack', cost: 1, damage: 4, aoe: true, description: '对所有敌人造成4点伤害', rarity: 'common' },
      { id: 'dash', name: '冲刺', type: 'attack', cost: 2, damage: 10, block: 10, description: '造成10点伤害，获得10护甲', rarity: 'common' },
      { id: 'deflect', name: '偏转', type: 'skill', cost: 1, block: 8, description: '获得8点护甲', rarity: 'common' },
      { id: 'survivor', name: '幸存者', type: 'skill', cost: 1, block: 8, description: '获得8点护甲', rarity: 'common' },
      { id: 'poison_stab', name: '毒刺', type: 'attack', cost: 1, damage: 5, poison: 3, description: '造成5点伤害，中毒3回合', rarity: 'common' },
      { id: 'deadly_poison', name: '致命毒药', type: 'skill', cost: 1, poison: 5, description: '中毒5回合', rarity: 'common' },
      { id: 'cobra_poison', name: '眼镜蛇毒', type: 'attack', cost: 2, damage: 6, poison: 6, description: '造成6点伤害，中毒6回合', rarity: 'uncommon' },
      { id: 'catalyst', name: '催化剂', type: 'skill', cost: 1, poisonMult: 2, description: '敌人中毒量×2', rarity: 'rare' },
      { id: 'caltrops', name: '铁蒺藜', type: 'power', cost: 1, thornDamage: 3, description: '敌人攻击时受3伤害', rarity: 'uncommon' },
      { id: 'footwork', name: '身手矫健', type: 'power', cost: 1, dexterity: 2, description: '永久获得2敏捷', rarity: 'uncommon' },
      { id: 'backstab', name: '背刺', type: 'attack', cost: 0, damage: 10, description: '造成10点伤害', rarity: 'common' },
      { id: 'escape', name: '逃脱', type: 'skill', cost: 1, block: 12, draw: 1, description: '获得12护甲，抽1张', rarity: 'common' },
      { id: 'cloak_dagger', name: '斗篷匕首', type: 'attack', cost: 1, damage: 6, weak: 2, description: '造成6点伤害，敌人虚弱2回合', rarity: 'uncommon' },
      { id: 'assassinate', name: '暗杀', type: 'attack', cost: 4, damage: 30, description: '造成30点伤害', rarity: 'rare' },
      { id: 'grand_finish', name: '华丽终结', type: 'attack', cost: 2, discardDamage: 8, description: '每弃牌造成8伤害', rarity: 'rare' },
      { id: 'blur', name: '模糊', type: 'skill', cost: 1, block: 8, armorNext: 8, description: '获得8护甲', rarity: 'uncommon' },
      { id: 'well_laided', name: '埋藏', type: 'skill', cost: 0, draw: 2, discard: 1, description: '抽2张牌，弃1张', rarity: 'common' },
      { id: 'acrobatic', name: '杂技', type: 'skill', cost: 0, draw: 1, description: '抽1张牌', rarity: 'common' },
      { id: 'a_thousand_cuts', name: '千刀万剐', type: 'power', cost: 2, damagePerTurn: 2, description: '每回合开始对所有敌人造成2伤害', rarity: 'rare' },
      { id: 'bouncing_flask', name: '弹跳试剂', type: 'skill', cost: 2, poison: 3, aoe: true, description: '所有敌人中毒3回合', rarity: 'uncommon' },
      { id: 'chop', name: '砍击', type: 'attack', cost: 1, damage: 12, description: '造成12点伤害', rarity: 'common' },
      { id: 'cold_end', name: '寒冷终结', type: 'attack', cost: 1, damage: 6, weak: 2, description: '造成6点伤害，敌人虚弱2', rarity: 'uncommon' },
      { id: 'crippling_poison', name: '致残毒药', type: 'skill', cost: 1, poison: 4, vulnerable: 1, description: '敌人中毒4回合，易伤1', rarity: 'uncommon' },
      { id: 'deadly_poison2', name: '致命毒药+', type: 'skill', cost: 1, poison: 8, description: '中毒8回合', rarity: 'common' },
      { id: 'distraction', name: '分心', type: 'skill', cost: 0, poison: 3, description: '中毒3回合', rarity: 'common' },
      { id: 'envenom', name: '毒液', type: 'power', cost: 2, poisonOnAttack: 2, description: '攻击时使敌人中毒2回合', rarity: 'rare' }
    ]
  },

  // ===== ENEMIES =====
  enemies: {
    slime: { name: '史莱姆', icon: '🟢', maxHp: 30, intents: [{ type: 'attack', value: 6 }, { type: 'attack', value: 8 }, { type: 'defend', value: 5 }] },
    cultist: { name: '邪教徒', icon: '🧙', maxHp: 52, intents: [{ type: 'attack', value: 6 }, { type: 'buff', value: 3, strengthSelf: true }, { type: 'attack', value: 12 }] },
    jaw_worm: { name: '颚虫', icon: '🐛', maxHp: 46, intents: [{ type: 'attack', value: 12 }, { type: 'defend', value: 6 }, { type: 'attack_buff', value: 8, strengthSelf: 2 }] },
    looter: { name: '掠夺者', icon: '🗡️', maxHp: 56, intents: [{ type: 'attack', value: 10 }, { type: 'steal_gold', value: 15 }, { type: 'attack', value: 15 }] },
    gremlin: { name: '小妖精', icon: '👺', maxHp: 14, intents: [{ type: 'attack', value: 5 }, { type: 'attack', value: 7 }, { type: 'defend', value: 3 }] },
    fat_gremlin: { name: '肥妖精', icon: '👹', maxHp: 24, intents: [{ type: 'attack', value: 8 }, { type: 'defend', value: 5 }] },
    blue_slaver: { name: '蓝奴', icon: '🗡️', maxHp: 48, intents: [{ type: 'attack', value: 11 }, { type: 'defend', value: 6 }, { type: 'attack', value: 7 }] },
    red_slaver: { name: '红奴', icon: '🗡️', maxHp: 46, intents: [{ type: 'attack', value: 13 }, { type: 'debuff', weak: 1 }, { type: 'attack', value: 8 }] },
    elite_cultist: { name: '邪教精英', icon: '🧙‍♂️', maxHp: 82, intents: [{ type: 'attack', value: 12 }, { type: 'buff', value: 4, strengthSelf: true }, { type: 'attack', value: 18 }] },
    boss_slime: { name: '大史莱姆', icon: '🔴', maxHp: 160, intents: [{ type: 'attack', value: 35 }, { type: 'debuff', vulnerable: 2 }, { type: 'attack', value: 20 }, { type: 'defend', value: 30 }] },
    guardian: { name: '守护者', icon: '🛡️', maxHp: 250, intents: [{ type: 'attack', value: 32 }, { type: 'defend', value: 20 }, { type: 'attack', value: 15 }] },
    hexaghost: { name: '六鬼魂', icon: '👻', maxHp: 200, intents: [{ type: 'attack', value: 6, aoe: true }, { type: 'buff', value: 5, strengthSelf: true }, { type: 'attack', value: 20 }, { type: 'debuff', vulnerable: 2 }] }
  },

  // ===== EVENTS =====
  events: [
    {
      id: 'golden_idol',
      name: '黄金偶像',
      icon: '🗿',
      description: '你发现了一座闪闪发光的黄金偶像。它散发着古老而神秘的气息。',
      choices: [
        { text: '拿走偶像 💰', effect: 'gold', value: 50, result: '你拿走了黄金偶像，获得了50金币！' },
        { text: '无视离开', effect: 'none', result: '你决定不碰它，继续前进。' }
      ]
    },
    {
      id: 'BONFIRE',
      name: '篝火',
      icon: '🔥',
      description: '一堆温暖的篝火在黑暗中燃烧。旁边的石头上刻着古老的符文。',
      choices: [
        { text: '休息并恢复 💚', effect: 'heal', value: 20, result: '你在篝火旁休息了一会儿，恢复了20点生命值。' },
        { text: '献祭生命换取力量 💀', effect: 'sacrifice', value: 15, result: '你割伤自己献祭了15点生命，获得了未知的力量...' },
        { text: '离开', effect: 'none', result: '你离开篝火，继续踏上旅途。' }
      ]
    },
    {
      id: 'mysterious_sphere',
      name: '神秘球体',
      icon: '🔮',
      description: '一个发光的球体悬浮在空中，散发着诡异的能量。',
      choices: [
        { text: '触摸球体 ⚡', effect: 'strength', value: 2, result: '一股力量涌入你的身体，你获得了2点力量！' },
        { text: '摧毁它 💥', effect: 'damage', value: 15, result: '球体爆炸，你受到了15点伤害！' },
        { text: '离开', effect: 'none', result: '你决定不去碰它。' }
      ]
    }
  ],

  // ===== RELICS =====
  allRelics: {
    burning_blood: { id: 'burning_blood', name: '燃烧之血', description: '战斗结束回复6HP', icon: '🩸', effect: 'endBattle_heal' },
    ring_of_snake: { id: 'ring_of_snake', name: '蛇戒', description: '战斗开始抽3张', icon: '🐍', effect: 'startBattle_draw' },
    pen_nib: { id: 'pen_nib', name: '笔尖', description: '攻击伤害+50%', icon: '✒️', effect: 'damage_boost' },
    ancient_tea: { id: 'ancient_tea', name: '古茗', description: '战斗开始满能量', icon: '🍵', effect: 'startBattle_energy' },
    odd_mushroom: { id: 'odd_mushroom', name: '奇异蘑菇', description: '受到攻击时25%恐惧', icon: '🍄', effect: 'thorn' },
    bronze_scale: { id: 'bronze_scale', name: '青铜鳞片', description: '回合结束获得3护甲', icon: '🐍', effect: 'armorPower' },
    happy_flower: { id: 'happy_flower', name: '快乐花', description: '每7回合回复5HP', icon: '🌸', effect: 'heal_per_turn' }
  },

  // ===== INIT =====
  init() {
    this.loadGame();
    this.showScreen('menu');
  },

  // ===== LOG =====
  addLog(msg) {
    this.state.combatLog.push(msg);
    if (this.state.combatLog.length > 8) this.state.combatLog.shift();
    this.renderCombatLog();
  },

  renderCombatLog() {
    const logEl = document.getElementById('combat-log');
    if (!logEl) return;
    logEl.innerHTML = this.state.combatLog.map(m => `<div class="log-entry">${m}</div>`).join('');
    logEl.scrollTop = logEl.scrollHeight;
  },

  // ===== SCREENS =====
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('screen-' + screenId);
    if (screen) {
      screen.classList.add('active');
      this.state.screen = screenId;
    }
    if (screenId === 'map') {
      this.renderMap();
      this.updateUI();
    }
  },

  loadAndResume() {
    this.loadGame();
    if (this.state.character && this.state.player) {
      this.showScreen('map');
    } else {
      this.showScreen('character-select');
    }
  },

  // ===== CHARACTER SELECT =====
  selectCharacter(charId) {
    this.state.character = charId;
    this.initRun();
    this.showScreen('map');
  },

  // ===== INIT RUN =====
  initRun() {
    const char = this.state.character;
    const hp = char === 'ironclad' ? 80 : 70;

    this.state.player = {
      maxHp: hp,
      hp: hp,
      block: 0,
      strength: 0,
      dexterity: 0,
      vulnerable: 0,
      weak: 0,
      poison: 0,
      armorPower: 0,
      thornDamage: 0,
      poisonOnAttack: 0,
      damagePerTurn: 0
    };

    this.state.deck = this.getStarterDeck(char);
    this.state.drawPile = [...this.state.deck];
    this.state.discardPile = [];
    this.state.exhaustPile = [];
    this.state.hand = [];
    this.state.energy = 3;
    this.state.maxEnergy = 3;
    this.state.turn = 1;
    this.state.gold = 80;
    this.state.victory = false;
    this.state.defeat = false;
    this.state.relics = [];
    this.state.potions = [];
    this.state.combatLog = [];
    this.state.targetEnemy = null;
    this.state.selectedCardIndex = null;
    this.state.pendingCardTarget = false;

    if (char === 'ironclad') {
      this.state.relics.push({ ...this.allRelics.burning_blood });
    } else {
      this.state.relics.push({ ...this.allRelics.ring_of_snake });
    }

    this.generateMap();
  },

  getStarterDeck(char) {
    if (char === 'ironclad') {
      return [
        this.makeCard('strike'), this.makeCard('strike'), this.makeCard('strike'), this.makeCard('strike'),
        this.makeCard('defend'), this.makeCard('defend'), this.makeCard('defend'), this.makeCard('defend'),
        this.makeCard('bash')
      ];
    } else {
      return [
        this.makeCard('strike_s'), this.makeCard('strike_s'), this.makeCard('strike_s'), this.makeCard('strike_s'),
        this.makeCard('defend_s'), this.makeCard('defend_s'), this.makeCard('defend_s'), this.makeCard('defend_s'),
        this.makeCard('poison_stab'), this.makeCard('dash')
      ];
    }
  },

  makeCard(id) {
    const allCards = [...this.cards.ironclad, ...this.cards.silent];
    const card = allCards.find(c => c.id === id);
    if (!card) return null;
    return { ...card, uid: Date.now() + Math.random() };
  },

  // ===== MAP =====
  generateMap() {
    const floors = [];
    floors.push([
      { type: 'battle', enemy: 'slime', visited: false, x: 20, y: 60 },
      { type: 'battle', enemy: 'gremlin', visited: false, x: 50, y: 60 },
      { type: 'rest', visited: false, x: 80, y: 60 }
    ]);
    floors.push([
      { type: 'battle', enemy: 'cultist', visited: false, x: 12, y: 30 },
      { type: 'elite', enemy: 'elite_cultist', visited: false, x: 38, y: 30 },
      { type: 'shop', visited: false, x: 62, y: 30 },
      { type: 'rest', visited: false, x: 88, y: 30 }
    ]);
    floors.push([
      { type: 'boss', enemy: 'boss_slime', visited: false, x: 50, y: 50 }
    ]);
    this.state.map.floors = floors;
    this.state.map.currentFloor = 0;
  },

  renderMap() {
    const container = document.getElementById('map-nodes');
    const svg = document.getElementById('map-svg');
    if (!container) return;

    const floor = this.state.map.floors[this.state.map.currentFloor];
    if (!floor) return;

    const icons = {
      battle: '⚔️', elite: '👹', shop: '🏪', rest: '🔥',
      event: '❓', boss: '💀', treasure: '💰'
    };

    container.innerHTML = floor.map((node, i) => {
      const icon = icons[node.type] || '⚔️';
      const cls = node.visited ? 'visited' : '';
      return `<div class="map-node ${node.type} ${cls}" data-index="${i}" onclick="Game.selectNode(${i})">${icon}</div>`;
    }).join('');

    // Position nodes
    container.querySelectorAll('.map-node').forEach((node, i) => {
      const n = floor[i];
      if (n) {
        node.style.top = n.y + '%';
        node.style.left = n.x + '%';
        node.style.transform = 'translate(-50%, -50%)';
        node.style.position = 'absolute';
      }
    });

    // Draw SVG lines
    if (svg) {
      svg.innerHTML = '';
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('preserveAspectRatio', 'none');
      for (let f = 0; f < this.state.map.floors.length - 1; f++) {
        const fromFloor = this.state.map.floors[f];
        const toFloor = this.state.map.floors[f + 1];
        fromFloor.forEach(fromNode => {
          toFloor.forEach(toNode => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.x + '%');
            line.setAttribute('y1', fromNode.y + '%');
            line.setAttribute('x2', toNode.x + '%');
            line.setAttribute('y2', toNode.y + '%');
            line.setAttribute('stroke', 'rgba(120,120,160,0.15)');
            line.setAttribute('stroke-width', '0.5');
            svg.appendChild(line);
          });
        });
      }
    }
  },

  selectNode(nodeIndex) {
    const floor = this.state.map.floors[this.state.map.currentFloor];
    const node = floor[nodeIndex];
    if (!node || node.visited) return;

    node.visited = true;

    switch (node.type) {
      case 'battle':
      case 'elite':
      case 'boss':
        this.startBattle(node.enemy);
        break;
      case 'rest':
        this.showRestScreen();
        break;
      case 'shop':
        this.showShopScreen();
        break;
      case 'event':
        this.showEventScreen();
        break;
    }
  },

  // ===== BATTLE =====
  startBattle(enemyKey) {
    const template = this.enemies[enemyKey];
    if (!template) return;

    const ascMod = 1 + (this.state.ascension * 0.1);
    const intent = template.intents[0];

    this.state.enemies = [{
      ...template,
      hp: Math.floor(template.maxHp * ascMod),
      maxHp: Math.floor(template.maxHp * ascMod),
      block: 0,
      strength: 0,
      vulnerable: 0,
      weak: 0,
      poison: 0,
      intentIndex: 0,
      currentIntent: intent
    }];

    this.state.energy = this.state.maxEnergy;
    this.state.player.block = 0;
    this.state.player.armorPower = 0;
    this.state.player.thornDamage = 0;
    this.state.hand = [];
    this.state.drawPile = [...this.shuffle([...this.state.deck])];
    this.state.discardPile = [];
    this.state.exhaustPile = [];
    this.state.combatLog = [];
    this.state.turn = 1;
    this.state.targetEnemy = null;
    this.state.selectedCardIndex = null;
    this.state.pendingCardTarget = false;

    // Ancient tea: full energy at battle start
    const hasAncientTea = this.state.relics.some(r => r.id === 'ancient_tea');
    if (hasAncientTea) {
      this.state.energy = this.state.maxEnergy;
      this.addLog('🍵 古茗生效，能量全满');
    }

    // Ring of snake: draw 3 extra
    const hasRingOfSnake = this.state.relics.some(r => r.id === 'ring_of_snake');
    this.drawCards(5);
    if (hasRingOfSnake) {
      this.drawCards(3);
      this.addLog('🐍 蛇戒生效，抽3张牌');
    }

    // Bronze scale: armorPower
    const hasBronzeScale = this.state.relics.some(r => r.id === 'bronze_scale');
    if (hasBronzeScale) {
      this.state.player.armorPower = 3;
    }

    this.addLog(`⚔️ 遭遇 ${template.name}！`);
    this.showScreen('battle');
    this.renderBattle();
  },

  drawCards(count) {
    for (let i = 0; i < count; i++) {
      if (this.state.drawPile.length === 0) {
        if (this.state.discardPile.length === 0) break;
        this.state.drawPile = this.shuffle([...this.state.discardPile]);
        this.state.discardPile = [];
        this.addLog('🔄 洗牌');
      }
      if (this.state.drawPile.length > 0) {
        this.state.hand.push(this.state.drawPile.pop());
      }
    }
  },

  shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  playCard(cardIndex) {
    const card = this.state.hand[cardIndex];
    if (!card) return;
    if (this.state.energy < card.cost) {
      this.addLog('⚠️ 能量不足！');
      return;
    }

    // Check if card needs targeting
    const needsTarget = card.aoe !== true && (card.damage > 0 || card.poison > 0 || card.weak > 0 || card.vulnerable > 0);
    if (needsTarget && this.state.enemies.length > 1) {
      this.state.pendingCardTarget = true;
      this.state.selectedCardIndex = cardIndex;
      this.renderBattle();
      return;
    }

    this.executeCard(cardIndex);
  },

  executeCard(cardIndex, targetEnemy) {
    const card = this.state.hand[cardIndex];
    if (!card) return;
    if (this.state.energy < card.cost) {
      this.addLog('⚠️ 能量不足！');
      this.state.pendingCardTarget = false;
      this.state.selectedCardIndex = null;
      return;
    }

    this.state.energy -= card.cost;
    this.addLog(`🎴 ${card.name} (${card.cost}能量)`);

    let damage = card.damage || 0;

    // Strength multiplier (Heavy Blade)
    if (card.strengthMult) {
      damage += this.state.player.strength * card.strengthMult;
    } else if (card.strength || card.strengthTemp) {
      damage += card.strength || card.strengthTemp;
    }

    // Weak debuff on player reduces damage dealt
    if (this.state.player.weak > 0 && damage > 0) {
      damage = Math.floor(damage * 0.75);
    }

    // Target resolution
    let targets = [];
    if (card.aoe) {
      targets = [...this.state.enemies];
    } else if (targetEnemy) {
      targets = [targetEnemy];
    } else {
      targets = [this.state.enemies[0]].filter(Boolean);
    }

    // Apply damage
    if (damage > 0) {
      targets.forEach(enemy => {
        if (!enemy || enemy.hp <= 0) return;

        // Pen nib: +50% damage
        const hasPenNib = this.state.relics.some(r => r.id === 'pen_nib');
        let finalDmg = hasPenNib ? Math.floor(damage * 1.5) : damage;

        // Vulnerable on enemy
        if (enemy.vulnerable > 0) {
          finalDmg = Math.floor(finalDmg * 1.5);
        }

        this.dealDamage(enemy, finalDmg);
      });
    }

    // Block
    if (card.block) {
      const blockGain = card.block + this.state.player.dexterity;
      this.state.player.block += blockGain;
      this.addLog(`🛡️ 获得${blockGain}护甲`);
    }

    // Poison
    if (card.poison) {
      targets.forEach(enemy => {
        if (!enemy || enemy.hp <= 0) return;
        // Catalyst poison multiply
        let p = card.poison;
        if (card.poisonMult && enemy.poison > 0) {
          p = enemy.poison * card.poisonMult;
        }
        enemy.poison += p;
        this.addLog(`☠️ ${enemy.name}中毒+${p}`);
      });
    }

    // Vulnerable
    if (card.vulnerable) {
      targets.forEach(enemy => {
        if (!enemy || enemy.hp <= 0) return;
        enemy.vulnerable = card.vulnerable;
        this.addLog(`😱 ${enemy.name}易伤${card.vulnerable}`);
      });
    }

    // Weak
    if (card.weak) {
      targets.forEach(enemy => {
        if (!enemy || enemy.hp <= 0) return;
        enemy.weak = card.weak;
        this.addLog(`💫 ${enemy.name}虚弱${card.weak}`);
      });
    }

    // Strength (permanent)
    if (card.strength && !card.strengthTemp) {
      this.state.player.strength += card.strength;
      this.addLog(`💪 力量+${card.strength}`);
    }

    // Dexterity
    if (card.dexterity) {
      this.state.player.dexterity += card.dexterity;
      this.addLog(`🏃 敏捷+${card.dexterity}`);
    }

    // Armor power (e.g. Metallicize)
    if (card.armorPower) {
      this.state.player.armorPower += card.armorPower;
      this.addLog(`🛡️ 金属化: 每回合+${card.armorPower}护甲`);
    }

    // Thorn damage
    if (card.thornDamage) {
      this.state.player.thornDamage += card.thornDamage;
      this.addLog(`🌵 荆棘: 攻击者受${card.thornDamage}伤害`);
    }

    // Poison on attack (Envenom)
    if (card.poisonOnAttack) {
      this.state.player.poisonOnAttack += card.poisonOnAttack;
      this.addLog(`☠️ 每击中毒+${card.poisonOnAttack}`);
    }

    // Damage per turn (A Thousand Cuts)
    if (card.damagePerTurn) {
      this.state.player.damagePerTurn += card.damagePerTurn;
      this.addLog(`⚔️ 千刀万剐: 每回合对敌+${card.damagePerTurn}`);
    }

    // Draw
    if (card.draw) {
      this.drawCards(card.draw);
      this.addLog(`📤 抽${card.draw}张`);
    }

    // Discard
    if (card.discard) {
      for (let i = 0; i < card.discard; i++) {
        if (this.state.hand.length > 1) {
          const disc = this.state.hand.pop();
          this.state.discardPile.push(disc);
          this.addLog(`🗑️ 弃${disc.name}`);
        }
      }
    }

    // Discard random
    if (card.discardRandom) {
      if (this.state.hand.length > 1) {
        const idx = Math.floor(Math.random() * this.state.hand.length);
        const disc = this.state.hand.splice(idx, 1)[0];
        this.state.discardPile.push(disc);
        this.addLog(`🗑️ 随机弃${disc.name}`);
      }
    }

    // Discard damage (Grand Finish)
    if (card.discardDamage) {
      const count = this.state.discardPile.length;
      if (count > 0) {
        const dd = card.discardDamage * count;
        targets.forEach(enemy => {
          if (!enemy || enemy.hp <= 0) return;
          this.dealDamage(enemy, dd);
        });
        this.addLog(`💣 弃牌造成${dd}伤害 (${count}张)`);
      }
    }

    // Damage self (Bloodletting)
    if (card.damageSelf) {
      this.state.player.hp -= card.damageSelf;
      this.addLog(`💔 失去${card.damageSelf}HP`);
    }

    // Exhaust
    if (card.exhaust) {
      this.state.exhaustPile.push(...this.state.hand.splice(cardIndex, 1));
      this.addLog(`💨 ${card.name}消耗`);
      this.state.pendingCardTarget = false;
      this.state.selectedCardIndex = null;
      this.checkDeadEnemies();
      this.renderBattle();
      return;
    }

    // Animate
    const cardEl = document.querySelector(`.hand-area .card[data-index="${cardIndex}"]`);
    if (cardEl) {
      cardEl.classList.add('card-played');
    }

    setTimeout(() => {
      this.state.discardPile.push(this.state.hand.splice(cardIndex, 1)[0]);
      this.state.pendingCardTarget = false;
      this.state.selectedCardIndex = null;
      this.checkDeadEnemies();
      this.updateUI();
      this.renderBattle();
    }, 300);
  },

  dealDamage(enemy, damage) {
    if (!enemy || enemy.hp <= 0) return;

    let finalDmg = damage;
    let blocked = 0;

    if (enemy.block > 0) {
      blocked = Math.min(enemy.block, finalDmg);
      enemy.block -= blocked;
      finalDmg -= blocked;
    }

    enemy.hp -= finalDmg;

    if (blocked > 0) {
      this.addLog(`🛡️ ${enemy.name}护甲抵消${blocked}`);
    }
    if (finalDmg > 0) {
      this.addLog(`⚔️ ${enemy.name}受到${finalDmg}伤害`);
      this.showDamageNumber(enemy, finalDmg, 'damage');
      this.shakeEnemy(enemy);
    }

    if (enemy.hp <= 0) enemy.hp = 0;
  },

  showDamageNumber(enemy, amount, type) {
    const enemyEl = document.getElementById(`enemy-${enemy.name}`);
    if (!enemyEl) return;

    const popup = document.createElement('div');
    popup.className = `damage-popup ${type}`;
    popup.textContent = amount > 0 ? `-${amount}` : '0';
    popup.style.left = '50%';
    popup.style.top = '30%';
    popup.style.transform = 'translateX(-50%)';
    enemyEl.appendChild(popup);
    setTimeout(() => popup.remove(), 900);
  },

  shakeEnemy(enemy) {
    const enemyEl = document.getElementById(`enemy-${enemy.name}`);
    if (enemyEl) {
      enemyEl.classList.add('shake');
      setTimeout(() => enemyEl.classList.remove('shake'), 400);
    }
  },

  checkDeadEnemies() {
    this.state.enemies = this.state.enemies.filter(e => e.hp > 0);

    if (this.state.enemies.length === 0) {
      this.addLog(`✅ ${this.enemies[Object.keys(this.enemies).find(k => this.enemies[k].name === this.state.enemies[0]?.name)]?.name || '敌人'}被击败！`);
      setTimeout(() => this.endBattle(), 800);
    }
  },

  // ===== END BATTLE =====
  endBattle() {
    // Relic: burning blood heal
    const hasBurningBlood = this.state.relics.some(r => r.id === 'burning_blood');
    if (hasBurningBlood) {
      const heal = 6;
      this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + heal);
      this.addLog(`🩸 燃烧之血回复${heal}HP`);
    }

    // Gold reward
    const baseGold = 15 + Math.floor(Math.random() * 20);
    this.state.gold += baseGold;
    this.addLog(`💰 获得${baseGold}金币`);

    // Combine all piles
    this.state.discardPile.push(...this.state.hand, ...this.state.drawPile);
    this.state.hand = [];
    this.state.drawPile = [];

    if (this.state.map.currentFloor < 2) {
      this.state.map.currentFloor++;
      this.addLog(`🗺️ 进入第${this.state.map.currentFloor + 1}层`);
      setTimeout(() => {
        this.showScreen('map');
        this.showCardReward();
      }, 1000);
    } else {
      this.state.victory = true;
      this.addLog(`🏆 胜利！`);
      setTimeout(() => this.showScreen('gameover'), 1000);
    }

    this.updateUI();
  },

  showCardReward() {
    const pool = this.state.character === 'ironclad' ? [...this.cards.ironclad] : [...this.cards.silent];
    const rewards = this.shuffle(pool).slice(0, 3);

    const container = document.getElementById('reward-cards');
    if (!container) return;

    container.innerHTML = rewards.map((card, i) => `
      <div class="reward-card ${card.type}" onclick="Game.selectReward(${i})" data-index="${i}">
        <div class="card-cost">${card.cost}</div>
        <div class="card-icon">${this.getCardIcon(card.type)}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-type">${this.getCardTypeName(card.type)}</div>
        <div class="card-description">${card.description}</div>
        <div class="card-rarity ${card.rarity}">${this.getRarityName(card.rarity)}</div>
      </div>
    `).join('');

    container.dataset['cards'] = JSON.stringify(rewards);

    // Store in state for selection
    this.state.currentRewardCards = rewards;
    this.showScreen('card-reward');
  },

  selectReward(index) {
    const card = this.state.currentRewardCards?.[index];
    if (card) {
      this.state.deck.push({ ...card, uid: Date.now() + Math.random() });
      this.addLog(`🃏 获得新卡: ${card.name}`);
    }
    this.skipReward();
  },

  skipReward() {
    this.state.currentRewardCards = null;
    this.showScreen('map');
  },

  // ===== END TURN =====
  endTurn() {
    if (this.state.screen !== 'battle') return;

    this.addLog(`🔄 结束回合`);

    // Process enemy intents
    this.state.enemies.forEach(enemy => {
      const intent = enemy.currentIntent;
      if (!intent) return;

      switch (intent.type) {
        case 'attack': {
          let dmg = intent.value + enemy.strength;
          if (this.state.player.weak > 0) dmg = Math.floor(dmg * 0.75);
          if (this.state.player.vulnerable > 0) dmg = Math.floor(dmg * 1.5);

          let blocked = 0;
          if (this.state.player.block > 0) {
            blocked = Math.min(this.state.player.block, dmg);
            this.state.player.block -= blocked;
            dmg -= blocked;
          }
          if (dmg > 0) {
            this.state.player.hp -= dmg;
            this.addLog(`⚔️ ${enemy.name}攻击，造成${dmg}伤害`);
          }
          break;
        }
        case 'defend':
          enemy.block += intent.value;
          this.addLog(`🛡️ ${enemy.name}获得${intent.value}护甲`);
          break;
        case 'buff':
          if (intent.strengthSelf) {
            enemy.strength += intent.value;
            this.addLog(`⬆️ ${enemy.name}力量+${intent.value}`);
          }
          break;
        case 'debuff':
          if (intent.vulnerable) {
            this.state.player.vulnerable = intent.vulnerable;
            this.addLog(`😱 你被易伤${intent.vulnerable}回合`);
          }
          break;
        case 'steal_gold': {
          const stolen = Math.min(this.state.gold, intent.value || 10);
          this.state.gold -= stolen;
          this.addLog(`💸 ${enemy.name}偷走${stolen}金币`);
          break;
        }
        case 'attack_buff': {
          enemy.block += 6;
          enemy.strength += (intent.strengthSelf || 0);
          let ad = intent.value;
          let b = 0;
          if (this.state.player.block > 0) {
            b = Math.min(this.state.player.block, ad);
            this.state.player.block -= b;
            ad -= b;
          }
          if (ad > 0) {
            this.state.player.hp -= ad;
            this.addLog(`⚔️ ${enemy.name}攻击，造成${ad}伤害`);
          }
          break;
        }
      }

      // Thorns damage to enemy when they attack
      if (this.state.player.thornDamage > 0 && intent.type === 'attack') {
        enemy.hp -= this.state.player.thornDamage;
        this.addLog(`🌵 ${enemy.name}受到铁蒺藜${this.state.player.thornDamage}伤害`);
        if (enemy.hp <= 0) enemy.hp = 0;
      }
    });

    // Thorns from flasks / caltrops
    if (this.state.player.thornDamage > 0) {
      // already handled above during attack
    }

    // Poison damage to player
    if (this.state.player.poison > 0) {
      this.state.player.hp -= this.state.player.poison;
      this.addLog(`☠️ 中毒受到${this.state.player.poison}伤害`);
      this.state.player.poison--;
    }

    // Check defeat
    if (this.state.player.hp <= 0) {
      this.state.defeat = true;
      this.state.player.hp = 0;
      this.addLog(`💀 失败...`);
      setTimeout(() => this.showScreen('gameover'), 1000);
      return;
    }

    // Remove dead enemies
    this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
    if (this.state.enemies.length === 0) {
      setTimeout(() => this.endBattle(), 500);
      return;
    }

    // Advance enemy intents
    this.state.enemies.forEach(enemy => {
      enemy.intentIndex = (enemy.intentIndex + 1) % enemy.intents.length;
      enemy.currentIntent = enemy.intents[enemy.intentIndex];
    });

    // Armor power (Metallicize)
    if (this.state.player.armorPower > 0) {
      this.state.player.block += this.state.player.armorPower;
      this.addLog(`🛡️ 金属化+${this.state.player.armorPower}护甲`);
    }

    // Happy flower heal every 7 turns
    const hasHappyFlower = this.state.relics.some(r => r.id === 'happy_flower');
    if (hasHappyFlower && this.state.turn > 0 && this.state.turn % 7 === 0) {
      this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + 5);
      this.addLog(`🌸 快乐花回复5HP`);
    }

    // Damage per turn (A Thousand Cuts)
    if (this.state.player.damagePerTurn > 0) {
      this.state.enemies.forEach(enemy => {
        enemy.hp -= this.state.player.damagePerTurn;
        this.addLog(`⚔️ 千刀万剐对${enemy.name}造成${this.state.player.damagePerTurn}伤害`);
        if (enemy.hp <= 0) enemy.hp = 0;
      });
      this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
      if (this.state.enemies.length === 0) {
        setTimeout(() => this.endBattle(), 500);
        return;
      }
    }

    // Discard hand, reshuffle
    this.state.turn++;
    this.state.energy = this.state.maxEnergy;
    this.state.player.block = 0;

    if (this.state.player.vulnerable > 0) this.state.player.vulnerable--;
    if (this.state.player.weak > 0) this.state.player.weak--;

    // Temp strength consumed at end of turn
    // (already handled — strengthTemp was added in playCard)

    this.addLog(`🎴 第${this.state.turn}回合`);

    this.state.discardPile.push(...this.state.hand);
    this.state.hand = [];
    this.state.drawPile = [...this.shuffle([...this.state.discardPile])];
    this.state.discardPile = [];

    this.drawCards(5);
    this.updateUI();
    this.renderBattle();
  },

  // ===== REST =====
  showRestScreen() {
    this.showScreen('rest');
    const healInfo = document.getElementById('rest-heal-info');
    if (healInfo) {
      const healAmount = Math.floor(this.state.player.maxHp * 0.3);
      healInfo.textContent = `恢复${healAmount}点生命值 (${healAmount}/${this.state.player.maxHp})`;
    }
  },

  rest() {
    const healAmount = Math.floor(this.state.player.maxHp * 0.3);
    this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + healAmount);
    this.addLog(`💚 休息恢复${healAmount}HP`);
    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  // ===== SHOP =====
  showShopScreen() {
    this.showScreen('shop');
    this.renderShop();
  },

  renderShop() {
    const container = document.getElementById('shop-cards');
    if (!container) return;

    const goldEl = document.getElementById('shop-gold');
    if (goldEl) goldEl.textContent = this.state.gold;

    const pool = this.state.character === 'ironclad' ?
      this.cards.ironclad.filter(c => c.rarity === 'uncommon' || c.rarity === 'rare') :
      this.cards.silent.filter(c => c.rarity === 'uncommon' || c.rarity === 'rare');

    const shopItems = this.shuffle([...pool]).slice(0, 3);
    container.innerHTML = shopItems.map((card, i) => {
      const price = card.rarity === 'rare' ? 150 : 75;
      return `
        <div class="shop-card" onclick="Game.buyCard(${i}, ${price})">
          <div class="shop-card-icon">${this.getCardIcon(card.type)}</div>
          <div class="shop-card-name">${card.name}</div>
          <div class="shop-card-desc">${card.description}</div>
          <div class="shop-card-price">💰 ${price}</div>
          <button class="btn btn-primary" ${this.state.gold < price ? 'disabled style="opacity:0.4"' : ''}>购买</button>
        </div>
      `;
    }).join('');

    container.dataset['cards'] = JSON.stringify(shopItems);
  },

  buyCard(index, price) {
    if (this.state.gold < price) return;
    const container = document.getElementById('shop-cards');
    const cards = JSON.parse(container.dataset['cards'] || '[]');
    const card = cards[index];
    if (!card) return;

    this.state.gold -= price;
    this.state.deck.push({ ...card, uid: Date.now() + Math.random() });
    this.addLog(`🃏 购买: ${card.name}`);
    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  // ===== EVENTS =====
  showEventScreen() {
    const event = this.events[Math.floor(Math.random() * this.events.length)];
    const container = document.getElementById('event-content');
    if (!container) return;

    container.innerHTML = `
      <div class="event-icon">${event.icon}</div>
      <h2>${event.name}</h2>
      <p class="event-desc">${event.description}</p>
      <div class="event-choices">
        ${event.choices.map((c, i) => `
          <button class="btn btn-secondary" onclick="Game.selectEvent(${i})" style="width:100%">${c.text}</button>
        `).join('')}
      </div>
    `;

    container.dataset['event'] = JSON.stringify(event);
    this.showScreen('event');
  },

  selectEvent(choiceIndex) {
    const container = document.getElementById('event-content');
    const event = JSON.parse(container.dataset['event'] || '{}');
    const choice = event.choices?.[choiceIndex];
    if (!choice) {
      this.state.map.currentFloor++;
      this.showScreen('map');
      return;
    }

    switch (choice.effect) {
      case 'gold':
        this.state.gold += choice.value;
        this.addLog(`💰 ${choice.result}`);
        break;
      case 'heal':
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + choice.value);
        this.addLog(`💚 ${choice.result}`);
        break;
      case 'strength':
        this.state.player.strength += choice.value;
        this.addLog(`💪 ${choice.result}`);
        break;
      case 'damage':
        this.state.player.hp -= choice.value;
        this.addLog(`💔 ${choice.result}`);
        break;
      case 'sacrifice':
        this.state.player.hp -= choice.value;
        this.state.player.strength += 2;
        this.addLog(`💀 ${choice.result}`);
        break;
      default:
        this.addLog(choice.result);
    }

    if (this.state.player.hp <= 0) {
      this.state.defeat = true;
      this.state.player.hp = 0;
      setTimeout(() => this.showScreen('gameover'), 1000);
      return;
    }

    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  // ===== RENDER BATTLE =====
  renderBattle() {
    const arena = document.getElementById('battle-arena');
    const handArea = document.getElementById('hand-area');
    const playerArea = document.getElementById('player-area');
    const turnEl = document.getElementById('turn-counter');
    const deckInfo = document.getElementById('deck-info');

    if (turnEl) turnEl.textContent = this.state.turn;
    if (deckInfo) deckInfo.textContent = `抽${this.state.drawPile.length} 弃${this.state.discardPile.length}`;

    // Enemy area
    let html = '<div class="enemy-area">';
    this.state.enemies.forEach(enemy => {
      const intent = enemy.currentIntent;
      const intentClass = intent?.type || 'attack';
      const intentIcon = intent?.type === 'attack' ? '⚔️' :
                         intent?.type === 'defend' ? '🛡️' :
                         intent?.type === 'buff' ? '⬆️' :
                         intent?.type === 'debuff' ? '👁️' :
                         intent?.type === 'steal_gold' ? '💰' : '❓';
      const intentVal = intent?.type === 'steal_gold' ? `💰${intent?.value || ''}` : (intent?.value || '');
      const targetable = this.state.pendingCardTarget ? 'targetable' : '';

      html += `
        <div class="enemy-card ${targetable}" id="enemy-${enemy.name}" ${this.state.pendingCardTarget ? `onclick="Game.selectTarget('${enemy.name}')"` : ''}>
          <div class="enemy-intent ${intentClass}">${intentIcon} ${intentVal}</div>
          <div class="enemy-icon">${enemy.icon}</div>
          <div class="enemy-name">${enemy.name}</div>
          <div class="enemy-hp-bar"><div class="hp-fill" style="width:${Math.max(0,(enemy.hp/enemy.maxHp)*100)}%"></div></div>
          <div class="enemy-hp-text">${Math.max(0,enemy.hp)}/${enemy.maxHp}</div>
          ${enemy.block > 0 ? `<div class="enemy-block">🛡️${enemy.block}</div>` : ''}
          <div class="debuffs">
            ${enemy.poison > 0 ? `<span class="debuff poison">☠️${enemy.poison}</span>` : ''}
            ${enemy.vulnerable > 0 ? `<span class="debuff vulnerable">易${enemy.vulnerable}</span>` : ''}
            ${enemy.weak > 0 ? `<span class="debuff weak">弱${enemy.weak}</span>` : ''}
          </div>
        </div>
      `;
    });
    html += '</div>';

    // Combat log
    html += `<div class="combat-log" id="combat-log"></div>`;

    if (arena) arena.innerHTML = html;

    // Player area
    const charIcon = this.state.character === 'ironclad' ? '🗡️' : '🗡️';
    const hpPercent = Math.max(0, (this.state.player.hp / this.state.player.maxHp) * 100);

    let playerHtml = `
      <div class="player-stats">
        <div class="player-portrait ${this.state.character}">${charIcon}</div>
        <div class="player-info-battle">
          <div class="player-hp-bar"><div class="player-hp-fill" style="width:${hpPercent}%"></div></div>
          <div class="player-hp-text">${Math.max(0, this.state.player.hp)}/${this.state.player.maxHp}</div>
        </div>
        ${this.state.player.block > 0 ? `<div class="armor-display">🛡️ ${this.state.player.block}</div>` : ''}
      </div>
      <div class="energy-display">
        ${Array(this.state.energy).fill('<div class="energy-orb"></div>').join('')}
        <span style="margin-left:4px;color:var(--text-secondary)">${this.state.energy}/${this.state.maxEnergy}</span>
      </div>
      <div class="relics-bar" title="${this.state.relics.map(r => r.name+': '+r.description).join(', ')}">
        ${this.state.relics.map(r => r.icon).join('')}
      </div>
      <div class="player-buffs">
        ${this.state.player.vulnerable > 0 ? `<span class="debuff vulnerable">易伤${this.state.player.vulnerable}</span>` : ''}
        ${this.state.player.weak > 0 ? `<span class="debuff weak">虚弱${this.state.player.weak}</span>` : ''}
        ${this.state.player.strength > 0 ? `<span class="buff strength">💪${this.state.player.strength}</span>` : ''}
        ${this.state.player.dexterity > 0 ? `<span class="buff dexterity">🏃${this.state.player.dexterity}</span>` : ''}
        ${this.state.player.armorPower > 0 ? `<span class="buff" style="background:rgba(176,190,197,0.25);color:#b0bec5">🛡️${this.state.player.armorPower}</span>` : ''}
      </div>
    `;

    if (playerArea) playerArea.innerHTML = playerHtml;

    // Hand area
    let handHtml = this.state.hand.map((card, i) => {
      const unplayable = this.state.energy < card.cost ? 'card-unplayable' : '';
      const selected = this.state.selectedCardIndex === i ? 'selected' : '';
      return `
        <div class="card ${card.type} ${unplayable} ${selected}" data-index="${i}"
             onclick="Game.playCard(${i})">
          <div class="card-cost">${card.cost}</div>
          <div class="card-name">${card.name}</div>
          <div class="card-type">${this.getCardTypeName(card.type)}</div>
          <div class="card-icon">${this.getCardIcon(card.type)}</div>
          <div class="card-description">${card.description}</div>
          <div class="card-rarity ${card.rarity}">${this.getRarityName(card.rarity)}</div>
        </div>
      `;
    }).join('');

    if (handArea) handArea.innerHTML = handHtml;

    this.renderCombatLog();
  },

  selectTarget(enemyName) {
    if (!this.state.pendingCardTarget || this.state.selectedCardIndex === null) return;
    const enemy = this.state.enemies.find(e => e.name === enemyName);
    if (!enemy) return;
    this.executeCard(this.state.selectedCardIndex, enemy);
  },

  // ===== HELPERS =====
  getCardIcon(type) {
    return type === 'attack' ? '⚔️' : type === 'skill' ? '🛡️' : '✨';
  },

  getCardTypeName(type) {
    return type === 'attack' ? '攻击' : type === 'skill' ? '技能' : '能力';
  },

  getRarityName(rarity) {
    return rarity === 'common' ? '普通' : rarity === 'uncommon' ? '优秀' : '稀有';
  },

  // ===== UPDATE UI =====
  updateUI() {
    const hpEl = document.getElementById('player-hp');
    const goldEl = document.getElementById('player-gold');
    const floorEl = document.getElementById('floor-num');
    const relicsEl = document.getElementById('map-relics');

    if (hpEl && this.state.player) hpEl.textContent = `${Math.max(0, this.state.player.hp)}/${this.state.player.maxHp}`;
    if (goldEl) goldEl.textContent = this.state.gold;
    if (floorEl) floorEl.textContent = this.state.map.currentFloor + 1;
    if (relicsEl) relicsEl.innerHTML = this.state.relics.map(r => `<span title="${r.name}: ${r.description}">${r.icon}</span>`).join('');

    if (this.state.screen === 'map') this.renderMap();
    if (this.state.screen === 'battle') this.renderBattle();

    if (this.state.screen === 'gameover') {
      const title = document.getElementById('gameover-title');
      const stats = document.getElementById('gameover-stats');
      if (title) {
        if (this.state.victory) {
          title.textContent = '🏆 胜利 🏆';
          title.classList.add('victory');
        } else {
          title.textContent = '💀 失败 💀';
          title.classList.remove('victory');
        }
      }
      if (stats && this.state.player) {
        stats.innerHTML = `
          <p>角色: ${this.state.character === 'ironclad' ? '铁甲战士' : '静默猎人'}</p>
          <p>存活回合: ${this.state.turn}</p>
          <p>剩余生命: ${Math.max(0, this.state.player.hp)}/${this.state.player.maxHp}</p>
          <p>金币: ${this.state.gold}</p>
          <p>牌组: ${this.state.deck.length}张</p>
        `;
      }
    }
  },

  // ===== SAVE/LOAD =====
  saveGame() {
    try {
      localStorage.setItem('slayTheSpire2', JSON.stringify(this.state));
    } catch (e) { /* ignore */ }
  },

  loadGame() {
    const saved = localStorage.getItem('slayTheSpire2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.character && parsed.player) {
          this.state = parsed;
        }
      } catch (e) { /* ignore */ }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
