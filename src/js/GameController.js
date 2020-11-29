import generateTeam from './generators';
import Team from './Team';
import GamePlay from './GamePlay';
import GameState from './GameState';
import cursors from './cursors';
import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.theme = themes.prairie;
  }
  
  deleleActiveChar() {
    if(this.gameState.activeChar) {
      this.gamePlay.deselectCell(this.gameState.activeChar);
      this.gameState.activeChar = null;
    }
  }

  redrawTeam(userCharacterCount, enemyCharacterCount, survivingTeam) {
    const teamEnemy = generateTeam(new Team().classEnemy, this.gameState.level, enemyCharacterCount);
    const teamUser = generateTeam(new Team().classUser, this.gameState.level, userCharacterCount, survivingTeam);
    this.gameState.team = [...teamEnemy, ...teamUser];
    this.gamePlay.redrawPositions(this.gameState.team); 
  }

  addListener() {
    this.gamePlay.addCellEnterListener(index => this.onCellEnter(index));
    this.gamePlay.addCellLeaveListener(index => this.onCellLeave(index));
    this.gamePlay.addCellClickListener(index => this.onCellClick(index));  
  }

  init() {
    this.gamePlay.drawUi(this.theme);
    this.addListener();
    this.redrawTeam(1, 1);
    
    this.gamePlay.addNewGameListener(() => {
      // this.deleleActiveChar();
      // this.gameState.level = 1;
      // this.redrawTeam(1, 1);
      // this.addListener();
      window.location.reload();

    });  
    
    this.gamePlay.addSaveGameListener(() => {
      this.gameState.theme = this.theme;
      this.stateService.save(this.gameState);
      alert('Игра сохранена');
    })
  
    this.gamePlay.addLoadGameListener(() => {
      this.deleleActiveChar();
      this.gameState = this.stateService.load();
      this.gamePlay.drawUi(this.gameState.theme);
      this.gamePlay.redrawPositions(this.gameState.team); 
      alert('Игра загружена');
    });
  }

  findChar(index) {
    const characterObj = this.gameState.team.find(item => item.position === index);
    if(characterObj) return characterObj;
  }

  tooltip(char) {
    let resultString = '';
    const teg = (strings, ...expressions) => {
      expressions.forEach((expression, i) => {
        resultString += `${strings[i]} ${expression}`
      })
    }
    teg`🎖${char.character.level} ⚔${char.character.attack.toFixed(1)} 🛡${char.character.defence.toFixed(1)} ❤${char.character.health.toFixed(1)}`;
    
    return resultString;
  }

  getHorizontalLine(distance, index) {
    const arrHorizontalSells = [];
    const firstNumber = Math.floor(index / 8) * 8;
    const lastNumber =  firstNumber + 7;
    for (let i = index - distance; i < index + distance + 1; i++) {
      if(i <= lastNumber && i >= firstNumber && i != index) arrHorizontalSells.push(i);
    }

    return arrHorizontalSells;
  }

  getVerticalLine(distance, index) {
    const arrVerticalSells = [];
    let lowerLimit = null;
    for(let i = index; i >= 0 ; i = i - 8) lowerLimit = i;
    let upperLimit = lowerLimit + 56;
    
    for(let i = index - (distance * 8); i < index + distance * 8 + 1; i = i + 8 ) {
      if(i <= upperLimit && i >= lowerLimit && i != index) arrVerticalSells.push(i);
    }

    return arrVerticalSells;
  }

  getDiagonalRL(distance, index) {
    const arrRL = [];
    let lowerLimitRL = null;
    let upperLimitRL = null;
    for(let i = index; i > -1 && (i + 1) % 8 != 0; i = i - 7) lowerLimitRL = i - 7;
    if(lowerLimitRL < 0) lowerLimitRL += 7;  
    if(lowerLimitRL == null) lowerLimitRL = index;   
    
    for(let i = lowerLimitRL; i < 64 && i % 8 != 0; i = i + 7) upperLimitRL = i + 7;
    if(upperLimitRL >= 63) upperLimitRL -= 7;  

    for(let i = index - (distance * 7); i < index + distance * 7 + 1; i = i + 7 ) {
      if(i <= upperLimitRL && i >= lowerLimitRL && i != index) arrRL.push(i);
    } 
    
    return arrRL;
  }

  getDiagonalLR(distance, index) {
    const arrLR = [];
    let lowerLimitLR = null;
    let upperLimitLR = null;
    for(let i = index; i > -1 && i % 8 != 0; i -= 9) lowerLimitLR = i - 9;
    if(lowerLimitLR < 0) lowerLimitLR += 9;
    if(lowerLimitLR == null) lowerLimitLR = index;
  
    for(let i = lowerLimitLR; i < 64 && (i + 1) % 8 != 0; i += 9) upperLimitLR = i + 9;
    if(upperLimitLR >= 63) upperLimitLR -= 9;

    for(let i = index - (distance * 9); i < index + distance * 9 + 1; i = i + 9 ) {
      if(i <= upperLimitLR && i >= lowerLimitLR && i != index) arrLR.push(i);
    }    
    
    return arrLR;
  }  

  getArealSell(index) {
    let distance = null;
      
    this.gameState.team.find(item => {
      if(item.position === index) distance = item.character.distance;
    });
    
    const horizont = this.getHorizontalLine(distance, index);
    const vertical = this.getVerticalLine(distance, index);
    const lr = this.getDiagonalLR(distance, index);
    const rl = this.getDiagonalRL(distance, index);
    const arr = [...horizont, ...vertical, ...lr, ...rl];
    this.gameState.move = ([...new Set(arr)]);       
  }

  getArealUnderAttack(position, attackRange) {
    const arrVerticalSells = [];
    for (let i = position - (attackRange * 8); i < position +attackRange * 8 + 1; i = i + 8 ) {
      if(i <= 63 && i >= 0) arrVerticalSells.push(i);
    } 
    
    const arealUnderAttack = [];
    const getHorizontalRange = (item) => {
      const firstNumber = Math.floor(item / 8) * 8;
      const lastNumber =  firstNumber + 7;
      for (let i = item - attackRange; i < item + attackRange + 1; i++) {
        if(i <= lastNumber && i >= firstNumber) arealUnderAttack.push(i);
      }  
    }
    arrVerticalSells.forEach(item => getHorizontalRange(item));

    return arealUnderAttack;
  }

  deleteChar(position) {
    const index = this.gameState.team.findIndex(item => item.position === position);
    this.gameState.team.splice(index, 1);
  }

  getSellUnderAttack(index) {
    if(this.gameState.userObj) {
      
      return  this.getArealUnderAttack(this.gameState.activeChar, this.gameState.userObj.character.attackRange).find(item => item == index);
    }
  }

  removeListener() {
    const cells = Array.from(this.gamePlay.boardEl.getElementsByClassName('cell'));
    cells.forEach(item => {
      item.removeEventListener('click', this.gamePlay.clickListener);
      item.removeEventListener('mouseenter', this.gamePlay.enterListener);
      item.removeEventListener('mouseleave', this.gamePlay.leaveListener);
    });
  }

  move(index, char) {
    if(!char) {
      this.gameState.player = 'enemy';
      if(this.gameState.activeChar) {
        this.gamePlay.deselectCell(this.gameState.activeChar);
        
        const callback = (item) => {
          if(item.position === this.gameState.activeChar) {
            this.gameState.activeChar = index;
            item.position = this.gameState.activeChar;
            this.getArealSell(this.gameState.activeChar);
            this.gamePlay.redrawPositions(this.gameState.team);
            this.gamePlay.selectCell(this.gameState.activeChar);
          }
        }
        
        const cellInAreal = this.gameState.move.find(item => item === index);
        if(cellInAreal) {
          this.gameState.team.find((item) => callback((item)));
        } else {
          this.gameState.activeChar = null;
          this.gameState.move = null;
          GamePlay.showError('Недопустимое действие');
        }
      } 
    }
  }

  userAttack(index, char) {
    if(char && char.character.party === 'enemy') this.gameState.enemyObj = char;
    
    let sellUnderAttack;
    if( this.gameState.enemyObj) {
      const arealUnderAttack = this.getArealUnderAttack(this.gameState.activeChar, this.gameState.userObj.character.attackRange);
      sellUnderAttack = arealUnderAttack.find(item => item === index);
    } 
    
    if(char && char.character.party == 'enemy' && sellUnderAttack) {
      const damage = +Math.max(this.gameState.userObj.character.attack - this.gameState.enemyObj.character.defence, this.gameState.userObj.character.attack * 0.1)
        .toFixed(1);
      this.gameState.enemyObj.character.health -= damage;
      this.gameState.damage = damage;
     
      if(this.gameState.enemyObj.character.health <= 0) this.deleteChar(index);
      this.gamePlay.deselectCell(index);
      this.gamePlay.redrawPositions(this.gameState.team); 
      this.gamePlay.showDamage(index, damage);
    
      this.gameState.player = 'enemy';
    }        
  }

  findUserSellToAttack(areal, position) {
    let horizont = this.getHorizontalLine(8, position);
    let vertical = this.getVerticalLine(8, position);
    let rl = this.getDiagonalRL(8, position);
    let lr = this.getDiagonalLR(8, position);
    
    const getTarget = (item) => {
      const unitedArr = [...item, ...areal].sort((a, b) => {return a - b});
      
      let newArr = [];
      unitedArr.forEach((item, index, array) => {
        if(item == array[index + 1]) newArr.push(item);
      });
      
      if(newArr.length) {
        newArr = [...newArr, position].sort((a, b) => {return a - b});
        if(newArr[newArr.length - 1] === position) return newArr[newArr.length - 2];
        if(newArr[0] === position) return newArr[1];
      }
    }
   
    horizont = getTarget(horizont);
    vertical = getTarget(vertical);
    rl = getTarget(rl);
    lr = getTarget(lr);

    const horizontIsCcupied = this.findChar(horizont);
    const verticalIsCcupied = this.findChar(vertical);
    const rlIsCcupied = this.findChar(rl);
    const lrIsCcupied = this.findChar(lr);
    
    if(horizont && !horizontIsCcupied) return {
      target: horizont,
      coefficient: 1
    };

    if(vertical && !verticalIsCcupied) return {
      target: vertical,
      coefficient: 8
    };

    if(rl && !rlIsCcupied) return {
      target: rl,
      coefficient: 7 
    };

    if(lr && !lrIsCcupied) return {
      target: lr,
      coefficient: 9
    };
  }

  getNextPosition(areal, position, distance) {
    const starPosition = position;
    let nextPosition = null;  
    const firstNumber = Math.floor(position / 8) * 8;
    const lastNumber =  firstNumber + 7;

    let userSell = this.findUserSellToAttack(areal, position);
    
    for(let i = position; !userSell &&  i >= firstNumber; i--) {
      userSell = this.findUserSellToAttack(areal, i);
      nextPosition = i;
    }

    if(!userSell) {
      for(let i = starPosition + 1; !userSell &&  i <= lastNumber; i++) {
        userSell = this.findUserSellToAttack(areal, i);
        nextPosition = i;
      }
    }
    
    const sellToMove = position - distance;
    const sellToMoveOppositeSide = position + distance;
    if(nextPosition < position && sellToMove <= nextPosition) return nextPosition;
    if(nextPosition < position && sellToMove > nextPosition) return sellToMove;
    if(nextPosition > position && sellToMoveOppositeSide < nextPosition) return nextPosition;
    if(nextPosition > position && sellToMoveOppositeSide >= nextPosition) return sellToMoveOppositeSide;
  
    return nextPosition;
  }

  moveEnemy(areal, enemyObj) {
    areal = [...new Set(areal)];
    let nextPosition = null;
    const userSellToAttack = this.findUserSellToAttack(areal, enemyObj.position);
    if(userSellToAttack) {
      const sellToMove = enemyObj.position - (enemyObj.character.distance * userSellToAttack.coefficient);
      const sellToMoveOppositeSide = enemyObj.position + (enemyObj.character.distance * userSellToAttack.coefficient);

      if(userSellToAttack.target <= enemyObj.position && userSellToAttack.target <= sellToMove) nextPosition = sellToMove; 
      if(userSellToAttack.target <= enemyObj.position && userSellToAttack.target > sellToMove) nextPosition = userSellToAttack.target; 
      if(userSellToAttack.target > enemyObj.position && userSellToAttack.target <= sellToMoveOppositeSide) nextPosition = userSellToAttack.target; 
      if(userSellToAttack.target > enemyObj.position && userSellToAttack.target > sellToMoveOppositeSide) nextPosition = sellToMoveOppositeSide; 
    }

    if(!userSellToAttack) nextPosition = this.getNextPosition(areal, enemyObj.position, enemyObj.character.distance);
 
    enemyObj.position = nextPosition;
    this.gamePlay.redrawPositions(this.gameState.team);

    if(this.gameState.damage) this.gamePlay.showDamage(this.gameState.enemyObj.position, this.gameState.damage);
  }

  enemyLogic() {
    this.gameState.player = 'user';
    let arrEnemy = [];
    
    const getRandomEnemy = () => {
      this.gameState.team.forEach(item => {
        if(item.character.party == 'enemy') arrEnemy.push(item);
      });

      return arrEnemy[Math.floor(Math.random() * arrEnemy.length)];
    }
    const randomEnemy = getRandomEnemy();

    let target = null;
    const getSellUnderAttack = (enemy) => {
      let unitedArr = [];
      const arealUnderAttack = this.getArealUnderAttack(enemy.position, enemy.character.attackRange);
    
      this.gameState.team.forEach(item => {
        if(item.character.party == 'user') unitedArr.push(item.position);
      });

      unitedArr = [...unitedArr, ...arealUnderAttack];
      unitedArr.sort((a, b) => {return a - b});
      target = unitedArr.find((item, index, array) => {
       if(item == array[index + 1]) return item;
      });
    
      return target;
    } 

    const attacker = arrEnemy.find(item => getSellUnderAttack(item));
    if(attacker && this.gameState.activeChar) {
      const targetObj = this.gameState.team.find(item => item.position == target);
      const damage = +Math.max(attacker.character.attack - targetObj.character.defence, attacker.character.attack * 0.1)
        .toFixed(1);
      targetObj.character.health -= damage;
    
      if(targetObj.character.health <= 0) {
        if(this.gameState.activeChar === target) {
          this.gamePlay.deselectCell(targetObj.position);
          this.gamePlay.deselectCell(attacker.position);
          this.gamePlay.setCursor(cursors.auto);
          this.gameState.move = null;
          this.gameState.activeChar = null;
        }
        
        this.deleteChar(targetObj.position);
        this.gamePlay.redrawPositions(this.gameState.team);
      }
      
      this.gamePlay.showDamage(targetObj.position, damage);  
    } 

    this.gameState.team.forEach(item => {
      if(item.character.party === 'user') this.gameState.userTeam.push(item);
    });

    this.gameState.userTeam.forEach(item => { 
      const areal = this.getArealUnderAttack(item.position, randomEnemy.character.attackRange);
      this.gameState.arealAttack.push(...areal);
    });
 
    
    if(!attacker && this.gameState.activeChar) this.moveEnemy(this.gameState.arealAttack, randomEnemy);
    
    this.gameState.userTeam = [];
    this.gameState.arealAttack = [];
  }

  getNextLevel() {
    if(this.gameState.level === 2) this.theme = themes.desert;
    if(this.gameState.level === 3) this.theme = themes.arctic;
    if(this.gameState.level === 4) this.theme = themes.mountain;

    this.gamePlay.deselectCell(this.gameState.activeChar);
    this.gameState.move = null;
    this.gameState.activeChar = null;
    this.gameState.survivingTeam = this.gameState.team;
    
    this.gamePlay.drawUi(this.theme);
    
    this.gameState.survivingTeam.forEach(item => this.gameState.points += item.character.health);
    
    const calculateQuantityCharacters = () => {
      if (this.gameState.level == 2) return 3; 
      if (this.gameState.level == 3) return 5;
      if (this.gameState.level == 4) return 7;
    }
    const quantityEnemyCharacters = calculateQuantityCharacters();
    const quantityUserCharacters = quantityEnemyCharacters - this.gameState.survivingTeam.length;
    this.redrawTeam(quantityUserCharacters, quantityEnemyCharacters, this.gameState.survivingTeam)
  }

  playOrFinish() {
    const winer = this.getWinner();
    if(winer === 'enemy') {
      this.removeListener(); 
      this.gameState.game = 'end';  
    }
        
    if(winer === 'user') {
      this.gameState.level += 1;
      if(this.gameState.level > 1) this.getNextLevel();
      
      if(this.gameState.level > 4) {
        this.gameState.game = 'end';
        this.removeListener();
        this.gamePlay.deselectCell(this.gameState.activeChar);
      }
    }
  }

  getWinner() {
    const findUserChar = this.gameState.team.find(item => item.character.party === 'user');
    const findEnemyChar = this.gameState.team.find(item => item.character.party === 'enemy');
    if(!findUserChar) return 'enemy';
    if(!findEnemyChar) return 'user';
  }

  getCursor(index, char, sellUnderAttack) {
    if(char && char.character.party == 'user') return cursors.pointer;
    
    if(!char && this.gameState.move) {   
      const cellInAreal = this.gameState.move.find(item => item === index);
      return (cellInAreal) ? cursors.pointer : cursors.notallowed;
    } 
    
    if(!char) return cursors.auto;
    
    if(char && char.character.party == 'enemy' && this.gameState.move) {
      return (sellUnderAttack) ? cursors.crosshair : cursors.notallowed; 
    }       
  } 

  getColorCell(index, char, sellUnderAttack) {
    if(!char && this.gameState.move) {   
      const cellInAreal = this.gameState.move.find(item => item === index);
      if(cellInAreal) return 'green';
    }

    if(char && char.character.party == 'enemy' && this.gameState.move) {
      
      if(sellUnderAttack) return 'red';  
    } 
    
    return null;
  }  

  onCellClick(index) {
    this.gameState.damage = null;
    this.gameState.enemyObj = null;
 
    const char = this.findChar(index);
    if(!this.gameState.activeChar && char && char.character.party == 'enemy' ) GamePlay.showError('Персонаж не из вашей команды');
    
    if(char && char.character.party == 'user') {
      if(this.gameState.activeChar) this.gamePlay.deselectCell(this.gameState.activeChar);
      this.gameState.activeChar = index;
      this.gameState.userObj = char;
      this.gamePlay.selectCell(this.gameState.activeChar);
      this.getArealSell(this.gameState.activeChar);
    }
   
    if(this.gameState.player === 'user') {
      this.playOrFinish();    
      this.move(index, char);
      this.userAttack(index, char); 
    } 
  
    if(this.gameState.player === 'enemy') {
      this.playOrFinish();
      if(this.gameState.game === 'play') this.enemyLogic();
    }      
  }
  
  onCellEnter(index) {
    const char = this.findChar(index);
    const sellUnderAttack = this.getSellUnderAttack(index);
    if(char) this.gamePlay.showCellTooltip(this.tooltip(char), index); 
    this.gamePlay.setCursor(this.getCursor(index, char, sellUnderAttack));
    this.gamePlay.selectCell(index,this.getColorCell(index, char, sellUnderAttack));  
  }
  
  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.deselectCell(index);
    if(this.gameState.activeChar) this.gamePlay.selectCell(this.gameState.activeChar);
  }
}

































