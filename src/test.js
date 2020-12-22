import {calcTileType} from './js/utils';
import Character from './js/Character';
import Team from './js/Team';
import GameController from './js/GameController';
import GamePlay from './js/GamePlay';
import GameStateService from './js/GameStateService';

const gameController = new GameController(new GamePlay());
const charUser = {
    character: {
        attack: 25,
        defence: 25,
        distance: 2,
        health: 50,
        level: 1,
        party: 'user',
        type: 'bowman'
    },
    position: 38 
}

const charEnemy = {
    character: {
        attack: 25,
        defence: 25,
        distance: 2,
        health: 50,
        level: 1,
        party: 'enemy',
        type: 'undead'
    },
    position: 25 
}

gameController.gameState.team = [charUser, charEnemy];
gameController.gameState.move = [1, 2, 3, 4, 25];


test ('drawingBoard', () => {
    expect(calcTileType(83)).toBe('bottom-right');
    expect(calcTileType(72)).toBe('bottom-left');
    expect(calcTileType(11)).toBe('top-right');
    expect(calcTileType(0)).toBe('top-left');
    expect(calcTileType(12)).toBe('left');
    expect(calcTileType(23)).toBe('right');
    expect(calcTileType(80)).toBe('bottom');
    expect(calcTileType(14)).toBe('center');
    expect(calcTileType(1)).toBe('top');
});

test ('forbidСreatedNewCharacter', () => {
    const createNewCharacter = () => new Character();
    const Bowman = new Team().classUser[0];

    expect(createNewCharacter).toThrow('not allowed create new Character');
    expect(new Bowman().attack).toBe(25);
});

test ('tooltip', () => expect(new GameController().tooltip(charUser)).toBe('🎖 1 ⚔ 25.0 🛡 25.0 ❤ 50.0'));

test ('findChar', () => {
    expect(gameController.findChar(38)).toEqual(charUser);
    expect(gameController.findChar(39)).toBeUndefined();
})

test ('cursor', () => {
    expect(gameController.getCursor(38, charUser)).toBe('pointer');
    expect(gameController.getCursor(7)).toBe('not-allowed');
    expect(gameController.getCursor(1)).toBe('pointer');
    expect(gameController.getCursor(25, charEnemy, 25)).toBe('crosshair');
    expect(gameController.getCursor(25, charEnemy)).toBe('not-allowed');
});

test ('colorCell', () => {
    expect(gameController.getColorCell(25, charEnemy, 25)).toBe('red');
});


test ('load', () => {
    const fn = () => {
        return new GameStateService().load();
    }

    expect(fn).toThrow('Invalid state');
});










