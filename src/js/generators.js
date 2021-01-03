import PositionedCharacter from './PositionedCharacter';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
const levelUp = (char) => {
  char.attack = Math.max(char.attack, char.attack * (1.8 - (1 - char.health / 100)));
  char.defence = Math.max(char.defence, char.defence * (1.8 - (1 - char.health / 100)));
  char.health += 80;
  if (char.health > 100) char.health = 100;
}

function* characterGenerator(allowedTypes, maxLevel) {
  if (maxLevel == 1) {
    allowedTypes.forEach((item, index) => {
      if (item.name == 'Magician') allowedTypes.splice(index, 1);
    });
  }

  const randomeType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const randomLevel = Math.ceil(Math.random() * maxLevel);
  const type = new randomeType(randomLevel);
  if (type.party === 'user' && type.level > 1) type.level -= 1;
  if (type.level > 1) for(let i = 0; i < type.level - 1; i++) levelUp(type);
  
  yield type;
}

export default function generateTeam(allowedTypes, maxLevel, characterCount, boardSize, survivingTeam) {
  if(maxLevel === 1) characterCount += 1;
  
  const boardSizeXY = boardSize.x * boardSize.y;
  let team = [];
  const userTeamPositions = [];
  const enemyTeamPositions = [];

  const getTeamPositions = () => {
    for (let i = 1; i <= boardSizeXY - 1; i++) {
      if(i % boardSize.y === 0 || (i - 1) % boardSize.y === 0) userTeamPositions.push(i);
      if((i - (boardSize.y - 1)) % boardSize.y === 0 || (i - (boardSize.y - 2)) % boardSize.y === 0) enemyTeamPositions.push(i);
    }
  }

  getTeamPositions();
 
  const getPlayerPosition = (palyer) => {
    const indexPosition = Math.floor(Math.random() * palyer.length);
    const randomePlayerPosition = palyer[indexPosition];
    palyer.splice(indexPosition, 1);
    
    return randomePlayerPosition;
  }
  
  const survivingTeamlogic = () => {
    survivingTeam.forEach(item => {
      item.position = getPlayerPosition(userTeamPositions);
      item.character.level += 1;
      levelUp(item.character);
    });
  }
  
  if(survivingTeam) {
    survivingTeamlogic();
    team = [...team, ...survivingTeam];
  }  

  for(let i = 0; i < characterCount; i++) {
    const getRandomChar = characterGenerator(allowedTypes, maxLevel).next().value;
   
    if(getRandomChar.party === 'user') {
      team.push(new PositionedCharacter(getRandomChar, getPlayerPosition(userTeamPositions)));
    } else {
      team.push(new PositionedCharacter(getRandomChar, getPlayerPosition(enemyTeamPositions)));
    }
  }

  characterGenerator(allowedTypes, maxLevel);

  return team;
}


