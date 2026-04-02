// Slay the Spire 2 - Complete Game Logic

const Game = {
  state: {
    screen: 'menu',
    character: null,
    player: null,
    deck: [],
    hand: [],
    drawPile: [],
    discardPile: [],
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
    map: { currentFloor: 0, floors: [] }
  },

  cards: {
    ironclad: [
      { id: 'strike', name: '打击', type: 'attack', cost: 1, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'defend', name: '防御', type: 'skill', cost: 1, block: 5, description: '获得5点护甲', rarity: 'common' },
      { id: 'bash', name: '重击', type: 'attack', cost: 2, damage: 8, vulnerable: 2, description: '造成8点伤害，易伤2回合', rarity: 'common' },
      { id: 'cleave', name: '顺劈', type: 'attack', cost: 1, damage: 8, aoe: true, description: '对所有敌人造成8点伤害', rarity: 'common' },
      { id: 'iron_wave', name: '铁波', type: 'attack', cost: 1, damage: 5, block: 5, description: '造成5点伤害，获得5点护甲', rarity: 'common' },
      { id: 'anger', name: '愤怒', type: 'attack', cost: 0, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'body_slash', name: '肉体打击', type: 'attack', cost: 1, damage: 8, weak: 1, description: '造成8点伤害，敌人虚弱1回合', rarity: 'uncommon' },
      { id: 'burning_pact', name: '燃烧契约', type: 'skill', cost: 1, draw: 2, discard: 1, description: '抽2张牌，弃1张', rarity: 'uncommon' },
      { id: 'carnage', name: '大屠杀', type: 'attack', cost: 2, damage: 20, description: '造成20点伤害', rarity: 'uncommon' },
      { id: 'clothesline', name: '晾衣绳', type: 'attack', cost: 2, damage: 12, weak: 2, description: '造成12点伤害，敌人虚弱2回合', rarity: 'uncommon' },
      { id: 'front_fist', name: '重拳', type: 'attack', cost: 2, damage: 14, description: '造成14点伤害', rarity: 'uncommon' },
      { id: 'heavy_blade', name: '重刃', type: 'attack', cost: 2, damage: 14, strengthMult: 2, description: '造成14点伤害，力量x2加成', rarity: 'rare' },
      { id: 'inflame', name: '激怒', type: 'power', cost: 1, strength: 2, description: '获得2力量(永久)', rarity: 'uncommon' },
      { id: 'metallicize', name: '金属化', type: 'power', cost: 1, armorPower: 3, description: '回合结束获得3点护甲', rarity: 'uncommon' },
      { id: 'thunderclap', name: '雷鸣', type: 'attack', cost: 1, damage: 4, weak: 1, vulnerable: 1, aoe: true, description: '对所有敌人造成4点伤害', rarity: 'common' },
      { id: 'uppercut', name: '上勾拳', type: 'attack', cost: 2, damage: 13, weak: 1, vulnerable: 1, description: '造成13点伤害，易伤虚弱各1回合', rarity: 'uncommon' },
      { id: 'spot_weakness', name: '发现弱点', type: 'skill', cost: 1, strengthTemp: 3, description: '获得3力量(本回合)', rarity: 'common' },
      { id: 'true_grit', name: '真勇气', type: 'skill', cost: 1, block: 7, discardRandom: 1, description: '获得7点护甲，随机弃牌', rarity: 'common' },
      { id: 'warcry', name: '战吼', type: 'skill', cost: 0, draw: 1, description: '抽1张牌', rarity: 'common' }
    ],
    silent: [
      { id: 'strike_s', name: '打击', type: 'attack', cost: 1, damage: 6, description: '造成6点伤害', rarity: 'common' },
      { id: 'defend_s', name: '防御', type: 'skill', cost: 1, block: 5, description: '获得5点护甲', rarity: 'common' },
      { id: 'dagger_throw', name: '飞刀投掷', type: 'attack', cost: 1, damage: 8, draw: 1, description: '造成8点伤害，抽1张', rarity: 'common' },
      { id: 'dagger_spray', name: '飞刀', type: 'attack', cost: 1, damage: 4, aoe: true, description: '对所有敌人造成4点伤害', rarity: 'common' },
      { id: 'dash', name: '冲刺', type: 'attack', cost: 2, damage: 10, block: 10, description: '造成10点伤害，获得10点护甲', rarity: 'common' },
      { id: 'deflect', name: '偏转', type: 'skill', cost: 1, block: 8, description: '获得8点护甲', rarity: 'common' },
      { id: 'survivor', name: '幸存者', type: 'skill', cost: 1, block: 8, description: '获得8点护甲', rarity: 'common' },
      { id: 'poison_stab', name: '毒刺', type: 'attack', cost: 1, damage: 5, poison: 3, description: '造成5点伤害，中毒3回合', rarity: 'common' },
      { id: 'deadly_poison', name: '致命毒药', type: 'skill', cost: 1, poison: 5, description: '中毒5回合', rarity: 'common' },
      { id: 'cobra_poison', name: '眼镜蛇毒', type: 'attack', cost: 2, damage: 6, poison: 6, description: '造成6点伤害，中毒6回合', rarity: 'uncommon' },
      { id: 'catalyst', name: '催化剂', type: 'skill', cost: 1, poisonMult: 2, description: '敌人中毒量x2', rarity: 'rare' },
      { id: 'caltrops', name: '铁蒺藜', type: 'power', cost: 1, thornDamage: 3, description: '敌人攻击时受3点伤害', rarity: 'uncommon' },
      { id: 'footwork', name: '身手矫健', type: 'power', cost: 1, dexterity: 2, description: '获得2点敏捷', rarity: 'uncommon' },
      { id: 'backstab', name: '背刺', type: 'attack', cost: 0, damage: 10, description: '造成10点伤害', rarity: 'common' },
      { id: 'escape', name: '逃脱', type: 'skill', cost: 1, block: 12, draw: 1, description: '获得12点护甲，抽1张', rarity: 'common' },
      { id: 'cloak_dagger', name: '斗篷匕首', type: 'attack', cost: 1, damage: 6, weak: 2, description: '造成6点伤害，敌人虚弱2回合', rarity: 'uncommon' },
      { id: 'assassinate', name: '暗杀', type: 'attack', cost: 4, damage: 30, description: '造成30点伤害', rarity: 'rare' },
      { id: 'grand_finish', name: '华丽终结', type: 'attack', cost: 2, discardDamage: 8, description: '每弃牌1张造成8点伤害', rarity: 'rare' },
      { id: 'blur', name: '模糊', type: 'skill', cost: 1, block: 8, armorNext: 2, description: '获得8点护甲，下回合护甲翻倍', rarity: 'uncommon' },
      { id: 'well_laided', name: '埋藏', type: 'skill', cost: 0, draw: 2, discard: 1, description: '抽2张牌，弃1张', rarity: 'common' }
    ]
  },

  enemies: {
    slime: { name: '史莱姆', icon: '🟢', maxHp: 25, intents: [{ type: 'attack', value: 6 }, { type: 'attack', value: 8 }, { type: 'defend', value: 5 }] },
    cultist: { name: '邪教徒', icon: '🧙', maxHp: 50, intents: [{ type: 'attack', value: 6 }, { type: 'buff', value: 3, strengthSelf: true }, { type: 'attack', value: 12 }] },
    jaw_worm: { name: '颚虫', icon: '🐛', maxHp: 45, intents: [{ type: 'attack', value: 12 }, { type: 'defend', value: 6 }, { type: 'attack_buff', value: 8, strengthSelf: 2 }] },
    looter: { name: '掠夺者', icon: '🗡️', maxHp: 55, intents: [{ type: 'attack', value: 10 }, { type: 'steal_gold', value: 15 }, { type: 'attack', value: 15 }] },
    gremlin: { name: '小妖精', icon: '👺', maxHp: 12, intents: [{ type: 'attack', value: 5 }, { type: 'attack', value: 7 }, { type: 'defend', value: 3 }] },
    elite_cultist: { name: '邪教精英', icon: '🧙‍♂️', maxHp: 80, intents: [{ type: 'attack', value: 12 }, { type: 'buff', value: 4, strengthSelf: true }, { type: 'attack', value: 18 }] },
    boss_slime: { name: '大史莱姆', icon: '🔴', maxHp: 150, intents: [{ type: 'attack', value: 35 }, { type: 'debuff', vulnerable: 2 }, { type: 'attack', value: 20 }, { type: 'defend', value: 30 }] },
    guardian: { name: '守护者', icon: '🛡️', maxHp: 240, intents: [{ type: 'attack', value: 32 }, { type: 'defend', value: 20 }, { type: 'attack', value: 15 }] }
  },

  init() {
    this.loadGame();
    this.showScreen('menu');
  },

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('screen-' + screenId);
    if (screen) {
      screen.classList.add('active');
      this.state.screen = screenId;
    }
    this.updateUI();
  },

  selectCharacter(charId) {
    this.state.character = charId;
    this.initRun();
    this.showScreen('map');
  },

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
      poison: 0
    };

    this.state.deck = this.getStarterDeck(char);
    this.state.drawPile = [...this.state.deck];
    this.state.discardPile = [];
    this.state.hand = [];
    this.state.energy = 3;
    this.state.maxEnergy = 3;
    this.state.turn = 1;
    this.state.gold = 80;
    this.state.victory = false;
    this.state.defeat = false;
    this.state.relics = [];
    this.state.potions = [];

    if (char === 'ironclad') {
      this.state.relics.push({ id: 'burning_blood', name: '燃烧之血', description: '战斗结束回复6HP', icon: '🩸' });
    } else {
      this.state.relics.push({ id: 'ring_of_snake', name: '蛇戒', description: '战斗开始抽3张', icon: '🐍' });
    }

    this.generateMap();
  },

  getStarterDeck(char) {
    if (char === 'ironclad') {
      return [
        { ...this.cards.ironclad[0] }, { ...this.cards.ironclad[0] }, { ...this.cards.ironclad[0] }, { ...this.cards.ironclad[0] },
        { ...this.cards.ironclad[1] }, { ...this.cards.ironclad[1] }, { ...this.cards.ironclad[1] }, { ...this.cards.ironclad[1] },
        { ...this.cards.ironclad[2] }
      ];
    } else {
      return [
        { ...this.cards.silent[0] }, { ...this.cards.silent[0] }, { ...this.cards.silent[0] }, { ...this.cards.silent[0] },
        { ...this.cards.silent[1] }, { ...this.cards.silent[1] }, { ...this.cards.silent[1] }, { ...this.cards.silent[1] },
        { ...this.cards.silent[7] }, { ...this.cards.silent[4] }
      ];
    }
  },

  generateMap() {
    const floors = [];
    floors.push([
      { type: 'battle', enemy: 'slime', visited: false },
      { type: 'battle', enemy: 'gremlin', visited: false },
      { type: 'rest', visited: false }
    ]);
    floors.push([
      { type: 'battle', enemy: 'cultist', visited: false },
      { type: 'elite', enemy: 'elite_cultist', visited: false },
      { type: 'shop', visited: false },
      { type: 'rest', visited: false }
    ]);
    floors.push([
      { type: 'boss', enemy: 'boss_slime', visited: false }
    ]);
    this.state.map.floors = floors;
    this.state.map.currentFloor = 0;
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

  startBattle(enemyKey) {
    const template = this.enemies[enemyKey];
    const ascMod = 1 + (this.state.ascension * 0.1);
    
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
      currentIntent: template.intents[0]
    }];

    this.state.energy = this.state.maxEnergy;
    this.state.player.block = 0;
    this.state.hand = [];
    this.state.drawPile = [...this.shuffle([...this.state.deck])];
    this.state.discardPile = [];

    if (this.state.character === 'silent') {
      this.drawCards(3);
    } else {
      this.drawCards(5);
    }

    this.showScreen('battle');
  },

  drawCards(count) {
    for (let i = 0; i < count; i++) {
      if (this.state.drawPile.length === 0) {
        if (this.state.discardPile.length === 0) break;
        this.state.drawPile = this.shuffle([...this.state.discardPile]);
        this.state.discardPile = [];
      }
      if (this.state.drawPile.length > 0) {
        this.state.hand.push(this.state.drawPile.pop());
      }
    }
    this.renderBattle();
  },

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  playCard(cardIndex) {
    const card = this.state.hand[cardIndex];
    if (!card || this.state.energy < card.cost) return;
    
    this.state.energy -= card.cost;
    let damage = card.damage || 0;
    
    if (card.strengthMult) {
      damage += this.state.player.strength * card.strengthMult;
    } else if (card.strength || card.strengthTemp) {
      damage += card.strength || card.strengthTemp;
    }
    
    if (this.state.player.weak > 0 && damage > 0) {
      damage = Math.floor(damage * 0.75);
    }

    if (damage > 0) {
      if (card.aoe) {
        this.state.enemies.forEach(e => this.dealDamage(e, damage));
      } else {
        this.dealDamage(this.state.enemies[0], damage);
      }
    }

    if (card.block) {
      this.state.player.block += card.block + this.state.player.dexterity;
    }

    if (card.poison) {
      const target = this.state.enemies[0];
      if (target) target.poison += card.poison;
    }

    if (card.vulnerable) {
      this.state.enemies.forEach(e => e.vulnerable = card.vulnerable);
    }
    if (card.weak) {
      this.state.enemies.forEach(e => e.weak = card.weak);
    }
    if (card.strength && !card.strengthTemp) {
      this.state.player.strength += card.strength;
    }
    if (card.dexterity) {
      this.state.player.dexterity += card.dexterity;
    }
    if (card.armorPower) {
      this.state.player.armorPower = (this.state.player.armorPower || 0) + card.armorPower;
    }
    if (card.thornDamage) {
      this.state.player.thornDamage = (this.state.player.thornDamage || 0) + card.thornDamage;
    }
    if (card.draw) {
      this.drawCards(card.draw);
    }
    if (card.discard) {
      for (let i = 0; i < card.discard; i++) {
        if (this.state.hand.length > 0) {
          this.state.discardPile.push(this.state.hand.pop());
        }
      }
    }
    if (card.discardRandom) {
      if (this.state.hand.length > 0) {
        const idx = Math.floor(Math.random() * this.state.hand.length);
        this.state.discardPile.push(this.state.hand.splice(idx, 1)[0]);
      }
    }
    if (card.discardDamage) {
      let dd = card.discardDamage * this.state.discardPile.length;
      if (dd > 0) {
        this.state.enemies.forEach(e => this.dealDamage(e, dd));
      }
    }

    this.state.discardPile.push(this.state.hand.splice(cardIndex, 1)[0]);
    
    this.checkDeadEnemies();
    this.updateUI();
    this.renderBattle();
  },

  dealDamage(enemy, damage) {
    if (!enemy || enemy.hp <= 0) return;
    
    let finalDmg = damage;
    if (enemy.vulnerable > 0) finalDmg = Math.floor(finalDmg * 1.5);
    
    if (enemy.block > 0) {
      const blockUsed = Math.min(enemy.block, finalDmg);
      enemy.block -= blockUsed;
      finalDmg -= blockUsed;
    }
    
    enemy.hp -= finalDmg;
    this.showDamageNumber(enemy, finalDmg);
    
    if (enemy.hp <= 0) enemy.hp = 0;
  },

  showDamageNumber(enemy, amount) {
    const enemyEl = document.querySelector('.enemy-card');
    if (!enemyEl) return;
    
    const popup = document.createElement('div');
    popup.className = 'damage-popup';
    popup.textContent = '-' + amount;
    enemyEl.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  },

  checkDeadEnemies() {
    this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
    
    if (this.state.enemies.length === 0) {
      setTimeout(() => this.endBattle(), 500);
    }
  },

  endBattle() {
    this.state.relics.forEach(r => {
      if (r.id === 'burning_blood') {
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + 6);
      }
    });

    this.state.gold += 15 + Math.floor(Math.random() * 20);
    
    this.state.discardPile.push(...this.state.hand, ...this.state.drawPile);
    this.state.hand = [];
    this.state.drawPile = [];

    if (this.state.map.currentFloor < 2) {
      this.state.map.currentFloor++;
      this.showScreen('map');
    } else {
      this.state.victory = true;
      this.showScreen('gameover');
    }
    
    this.updateUI();
  },

  endTurn() {
    this.state.enemies.forEach(enemy => {
      const intent = enemy.currentIntent;
      if (!intent) return;

      switch (intent.type) {
        case 'attack':
          let dmg = intent.value + enemy.strength;
          if (this.state.player.weak > 0) dmg = Math.floor(dmg * 0.75);
          if (this.state.player.vulnerable > 0) dmg = Math.floor(dmg * 1.5);
          
          if (this.state.player.block > 0) {
            const b = Math.min(this.state.player.block, dmg);
            this.state.player.block -= b;
            dmg -= b;
          }
          this.state.player.hp -= dmg;
          break;
        case 'defend':
          enemy.block += intent.value;
          break;
        case 'buff':
          if (intent.strengthSelf) enemy.strength += intent.value;
          break;
        case 'debuff':
          if (intent.vulnerable) this.state.player.vulnerable = intent.vulnerable;
          break;
        case 'steal_gold':
          this.state.gold = Math.max(0, this.state.gold - (intent.value || 10));
          break;
        case 'attack_buff':
          enemy.block += 6;
          enemy.strength += (intent.strengthSelf || 0);
          let ad = intent.value;
          if (this.state.player.block > 0) {
            const b = Math.min(this.state.player.block, ad);
            this.state.player.block -= b;
            ad -= b;
          }
          this.state.player.hp -= ad;
          break;
      }
    });

    if (this.state.player.poison > 0) {
      this.state.player.hp -= this.state.player.poison;
      this.state.player.poison--;
    }

    if (this.state.player.armorPower) {
      this.state.player.block += this.state.player.armorPower;
    }

    if (this.state.player.hp <= 0) {
      this.state.defeat = true;
      this.showScreen('gameover');
      return;
    }

    this.state.turn++;
    this.state.energy = this.state.maxEnergy;
    this.state.player.block = 0;
    
    if (this.state.player.vulnerable > 0) this.state.player.vulnerable--;
    if (this.state.player.weak > 0) this.state.player.weak--;
    
    this.state.discardPile.push(...this.state.hand);
    this.state.hand = [];
    this.state.drawPile = [...this.shuffle([...this.state.discardPile])];
    this.state.discardPile = [];
    
    this.drawCards(5);
    this.updateUI();
    this.renderBattle();
  },

  showRestScreen() {
    this.showScreen('rest');
    const content = document.querySelector('.rest-content');
    if (content) {
      content.innerHTML = `
        <h2>休息站点</h2>
        <div class="rest-icon">⛺</div>
        <p>恢复30%最大生命值</p>
        <button class="btn btn-primary btn-rest" onclick="Game.rest()">休息</button>
        <button class="btn btn-secondary" onclick="Game.showScreen('map')">继续前进</button>
      `;
    }
  },

  rest() {
    const healAmount = Math.floor(this.state.player.maxHp * 0.3);
    this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + healAmount);
    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  showShopScreen() {
    this.showScreen('shop');
    this.renderShop();
  },

  renderShop() {
    const container = document.getElementById('shop-cards');
    if (!container) return;
    
    const cardOptions = this.state.character === 'ironclad' ? 
      this.cards.ironclad.filter(c => c.rarity === 'uncommon' || c.rarity === 'rare') :
      this.cards.silent.filter(c => c.rarity === 'uncommon' || c.rarity === 'rare');
    
    container.innerHTML = '';
    
    const buyableCards = this.shuffle([...cardOptions]).slice(0, 3);
    buyableCards.forEach((card, i) => {
      const price = card.rarity === 'rare' ? 150 : 75;
      container.innerHTML += `
        <div class="shop-card">
          <div class="shop-card-icon">${card.type === 'attack' ? '⚔️' : card.type === 'skill' ? '🛡️' : '✨'}</div>
          <div class="shop-card-name">${card.name}</div>
          <div class="shop-card-desc">${card.description}</div>
          <div class="shop-card-price">💰 ${price}</div>
          <button class="btn btn-primary" onclick="Game.buyCard(${i}, ${price})">购买</button>
        </div>
      `;
    });
    container.dataset['cards'] = JSON.stringify(buyableCards);
  },

  buyCard(index, price) {
    if (this.state.gold < price) return;
    const container = document.getElementById('shop-cards');
    const cards = JSON.parse(container.dataset['cards'] || '[]');
    const card = cards[index];
    if (!card) return;
    
    this.state.gold -= price;
    this.state.deck.push({ ...card });
    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  showEventScreen() {
    this.state.gold += 20 + Math.floor(Math.random() * 30);
    this.state.map.currentFloor++;
    this.showScreen('map');
    this.updateUI();
  },

  renderMap() {
    const container = document.getElementById('map-nodes');
    if (!container) return;
    
    const floor = this.state.map.floors[this.state.map.currentFloor];
    if (!floor) return;
    
    const icons = { battle: '⚔️', elite: '👹', shop: '🏪', rest: '⛺', event: '❓', boss: '💀' };
    
    container.innerHTML = floor.map((node, i) => {
      const icon = icons[node.type] || '⚔️';
      const cls = node.visited ? 'locked' : '';
      return `<div class="map-node ${node.type} ${cls}" onclick="Game.selectNode(${i})">${icon}</div>`;
    }).join('');
    
    const positions = [
      [{top: '50%', left: '20%'}, {top: '50%', left: '50%'}, {top: '50%', left: '80%'}],
      [{top: '30%', left: '15%'}, {top: '30%', left: '38%'}, {top: '30%', left: '62%'}, {top: '30%', left: '85%'}],
      [{top: '50%', left: '50%'}]
    ];
    
    const floorPos = positions[this.state.map.currentFloor] || positions[0];
    container.querySelectorAll('.map-node').forEach((node, i) => {
      if (floorPos[i]) {
        node.style.top = floorPos[i].top;
        node.style.left = floorPos[i].left;
        node.style.transform = 'translate(-50%, -50%)';
        node.style.position = 'absolute';
      }
    });
  },

  renderBattle() {
    const container = document.getElementById('battle-arena');
    if (!container) return;
    
    let html = '<div class="enemy-area">';
    this.state.enemies.forEach(enemy => {
      const intentIcon = enemy.currentIntent?.type === 'attack' ? '⚔️' : 
                         enemy.currentIntent?.type === 'defend' ? '🛡️' : 
                         enemy.currentIntent?.type === 'buff' ? '⬆️' : '❓';
      const intentVal = enemy.currentIntent?.value || '';
      
      html += `
        <div class="enemy-card">
          <div class="enemy-icon">${enemy.icon}</div>
          <div class="enemy-name">${enemy.name}</div>
          <div class="enemy-hp-bar">
            <div class="hp-fill" style="width: ${(enemy.hp / enemy.maxHp) * 100}%"></div>
          </div>
          <div class="enemy-hp-text">${enemy.hp}/${enemy.maxHp}</div>
          ${enemy.block > 0 ? `<div class="enemy-block">🛡️${enemy.block}</div>` : ''}
          <div class="enemy-intent">${intentIcon} ${intentVal}</div>
          <div class="debuffs">
            ${enemy.poison > 0 ? `<span class="debuff poison">☠️${enemy.poison}</span>` : ''}
            ${enemy.vulnerable > 0 ? `<span class="debuff vulnerable">易${enemy.vulnerable}</span>` : ''}
            ${enemy.weak > 0 ? `<span class="debuff weak">弱${enemy.weak}</span>` : ''}
          </div>
        </div>
      `;
    });
    html += '</div>';
    
    const charIcon = this.state.character === 'ironclad' ? '🗡️' : '🗡️';
    const playerHpPercent = (this.state.player.hp / this.state.player.maxHp) * 100;
    
    html += `
      <div class="player-area">
        <div class="player-stats">
          <div class="player-avatar">${charIcon}</div>
          <div class="player-hp-text">${this.state.player.hp}/${this.state.player.maxHp}</div>
          <div class="player-hp-bar">
            <div class="player-hp-fill" style="width: ${playerHpPercent}%"></div>
          </div>
          ${this.state.player.block > 0 ? `<div class="armor-display">🛡️ ${this.state.player.block}</div>` : ''}
        </div>
        <div class="energy-display">
          ${Array(this.state.energy).fill('<div class="energy-orb"></div>').join('')}
          <span>/${this.state.maxEnergy}</span>
        </div>
        <div class="relics-display">
          ${this.state.relics.map(r => r.icon).join('')}
        </div>
        <div class="player-debuffs">
          ${this.state.player.vulnerable > 0 ? `<span class="debuff vulnerable">易伤${this.state.player.vulnerable}</span>` : ''}
          ${this.state.player.weak > 0 ? `<span class="debuff weak">虚弱${this.state.player.weak}</span>` : ''}
          ${this.state.player.strength > 0 ? `<span style="color:#e63946">💪${this.state.player.strength}</span>` : ''}
        </div>
      </div>
      <div class="hand-area">
        ${this.state.hand.map((card, i) => `
          <div class="card ${card.type}" onclick="Game.playCard(${i})">
            <div class="card-cost">${card.cost}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-type">${card.type === 'attack' ? '攻击' : card.type === 'skill' ? '技能' : '能力'}</div>
            <div class="card-description">${card.description}</div>
            <div class="card-rarity ${card.rarity}">${card.rarity === 'common' ? '普通' : card.rarity === 'uncommon' ? '优秀' : '稀有'}</div>
          </div>
        `).join('')}
      </div>
    `;
    
    container.innerHTML = html;
  },

  updateUI() {
    const hpEl = document.getElementById('player-hp');
    const goldEl = document.getElementById('player-gold');
    
    if (hpEl && this.state.player) {
      hpEl.textContent = `${this.state.player.hp}/${this.state.player.maxHp}`;
    }
    if (goldEl) {
      goldEl.textContent = this.state.gold;
    }

    if (this.state.screen === 'battle') {
      this.renderBattle();
    } else if (this.state.screen === 'map') {
      this.renderMap();
    }

    if (this.state.screen === 'gameover') {
      const title = document.querySelector('.gameover-title');
      if (title) {
        if (this.state.victory) {
          title.textContent = '🎉 胜利! 🎉';
          title.classList.add('gameover-victory');
        } else {
          title.textContent = '💀 失败 💀';
        }
      }
    }
  },

  saveGame() {
    localStorage.setItem('slayTheSpire2', JSON.stringify(this.state));
  },

  loadGame() {
    const saved = localStorage.getItem('slayTheSpire2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.character && parsed.player) {
          this.state = parsed;
        }
      } catch (e) {}
    }
  },

  showSettings() {
    alert('设置功能开发中...');
  }
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
