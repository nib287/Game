export default class GameState {
  constructor() {
    this.player = 'user';
    this.move = null;
    this.activeChar = null;
    this.userObj = null;
    this.enemyObj = null;
    this.level = 1;
    this.points = 0;
    this.team = null;
    this.survivingTeam = null;
    this.game = 'play';
    this.theme = 'prairie';
    this.damage = null;
    this.userTeam = [];
    this.arealAttack = [];
  }
}