import Character from "./Character";

export default class Team {
  constructor () {
    this.classUser = [
      class Bowman extends Character {
          constructor(level) {
            super();
            this.level = level;
            this.attack = 25;
            this.defence = 25;
            this.health = 50;
            this.type = 'bowman';
            this.distance = 2;
            this.attackRange = 2;
            this.party = 'user'
          }
      },  
      class Swordsman extends Character {
          constructor(level) {
            super();
            this.level = level;
            this.attack = 40;
            this.defence = 10;
            this.health = 50;
            this.type = 'swordsman';
            this.distance = 4;
            this.attackRange = 1;
            this.party = 'user'
          }  
      },
      class Magician extends Character {
        constructor(level) {
            super();
            this.level = level;
            this.attack = 15;
            this.defence = 40;
            this.health = 50;
            this.type = 'magician';
            this.distance = 1;
            this.attackRange = 4;
            this.party = 'user'
          }
      }]
     
      this.classEnemy = [
        class Vampire extends Character {
          constructor(level) {
            super();
            this.level = level;
            this.attack = 25;
            this.defence = 25;
            this.health = 50;
            this.type = 'vampire';
            this.distance = 2;
            this.attackRange = 2;
            this.party = 'enemy'
          }
        },  
        class Daemon extends Character {
            constructor(level) {
              super();
              this.level = level;
              this.attack = 15;
              this.defence = 40;
              this.health = 50;
              this.type = 'daemon';
              this.distance = 1;
              this.attackRange = 4;
              this.party = 'enemy'
            }  
        },
        class Undead extends Character {
          constructor(level) {
              super();
              this.level = level;
              this.attack = 40;
              this.defence = 10;
              this.health = 50;
              this.type = 'undead';
              this.distance = 4;
              this.attackRange = 1;
              this.party = 'enemy'
            }
        }];
    }
}

