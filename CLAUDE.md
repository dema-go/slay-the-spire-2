# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Slay the Spire-inspired web-based card battle game (杀戮尖塔2). Pure HTML/CSS/JS single-page application with no build system required.

## Running the Game

```bash
# Local server (recommended for full functionality)
python3 -m http.server 8080
# Open http://localhost:8080

# Or open index.html directly in browser
```

## Project Structure

```
slay-the-spire-2/
├── index.html      # Main HTML with screen divs (menu, character-select, map, battle, rest, shop, gameover)
├── css/style.css   # All styling using CSS custom properties (dark dungeon theme)
└── js/game.js      # Complete game logic in single Game object
```

## Architecture

### Game Object (js/game.js)

All game state and logic lives in the single `Game` object. Entry point is `Game.init()` called on DOMContentLoaded.

**Key state properties:**
- `state.screen` - Current screen identifier
- `state.character` - 'ironclad' or 'silent'
- `state.player` - Player stats: `hp`, `maxHp`, `block`, `strength`, `dexterity`, `vulnerable`, `weak`, `poison`, `armorPower`, `thornDamage`
- `state.deck/hand/drawPile/discardPile/exhaustPile` - Card pile management
- `state.energy/maxEnergy` - Energy system (3 per turn)
- `state.enemies` - Active enemies in battle
- `state.gold` - Currency
- `state.relics` - Equipped relics array
- `state.map` - Floor structure with `currentFloor` and `floors[][]`

### Screen Navigation

Screens are `<div>` elements with id `screen-{name}` and class `screen`. The `showScreen(screenId)` method removes `active` from all screens, then adds it to the target.

### Characters

- **Ironclad**: 80 HP, starter relic "燃烧之血" (heals 6 HP after combat)
- **Silent**: 70 HP, starter relic "蛇戒" (draws 3 extra cards at battle start)

### Card System

Cards are data objects with properties: `id`, `name`, `type` (attack/skill/power), `cost`, `damage`, `block`, `poison`, `vulnerable`, `weak`, `draw`, `discard`, `strength`, `strengthMult`, `strengthTemp`, `dexterity`, `armorPower`, `thornDamage`, `poisonMult`, `discardDamage`, `aoe`, `discardRandom`.

Card properties:
- `strengthMult` - Multiplies player's strength added to damage (e.g., Heavy Blade)
- `poisonMult` - Multiplies enemy's current poison (e.g., Catalyst)
- `aoe` - Damage applies to all enemies
- `armorPower` - Passive armor gained each turn end (e.g., Metallicize)
- `thornDamage` - Damage dealt to enemy when they attack (e.g., Caltrops)
- `strengthTemp` - Temporary strength for current turn only
- `discardRandom` - Discards a random card from hand
- `discardDamage` - Damage per card in discard pile (e.g., Grand Finish)

Two character-specific card sets exist in `Game.cards.ironclad` and `Game.cards.silent`.

### Combat Flow

1. `startBattle(enemyKey)` - Creates enemy instance with ascension scaling, shuffles deck, draws 5 cards (+3 for Silent)
2. `playCard(cardIndex)` - Validates energy, applies card effects (damage, block, poison, buffs), handles weak/vulnerable modifiers, animates card play
3. `endTurn()` - Processes enemy intents, applies thorns/poison damage to player, checks defeat, discards hand, draws new hand, increments turn
4. `checkDeadEnemies()` - Removes dead enemies, calls `endBattle()` when all defeated
5. `endBattle()` - Triggers relic effects, gives gold reward, advances map or shows victory

### Enemy AI

Enemies have predefined `intents` arrays that cycle via `intentIndex`. Intent types:
- `attack` - Deals damage equal to `value + strength`
- `defend` - Adds block to enemy
- `buff` - May add `strengthSelf` to enemy
- `debuff` - Applies `vulnerable` to player
- `steal_gold` - Steals gold from player
- `attack_buff` - Attacks while gaining block and strength

Enemy templates in `Game.enemies` include: slime, cultist, jaw_worm, looter, gremlin, elite_cultist, boss_slime, guardian.

### Map System

3-floor structure (3 nodes on floor 1, 4 on floor 2, 1 boss). Node types: battle, elite, rest, shop, event, boss.

### Status Effects

| Effect | Player | Enemy |
|--------|--------|-------|
| **Block** | Absorbs damage before HP | Same |
| **Poison** | Damage per turn (end of enemy turn) | Damage per turn (end of enemy turn) |
| **Vulnerable** | 50% more damage taken | 50% more damage taken |
| **Weak** | 25% less damage dealt | 25% less damage dealt |
| **Strength** | +damage per point | +damage per point |
| **Dexterity** | +block per point | N/A |

### Relic System

Relics stored in `state.relics[]` with `{ id, name, description, icon }`. Effects triggered in `endBattle()` or `startBattle()`.

### Ascension

`state.ascension` scales enemy HP by `1 + (ascension * 0.1)` modifier.

### Save System

`saveGame()` / `loadGame()` persist full state to localStorage key `slayTheSpire2`. Load is called on `init()` to restore session.
