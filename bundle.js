!function(e){var t={};function a(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(i,s,function(t){return e[t]}.bind(null,s));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=1)}([function(e,t,a){},function(e,t,a){"use strict";a.r(t);a(0);function i(e,t){const a=t.x*t.y;return e===a-1?"bottom-right":e===a-t.y?"bottom-left":e===t.y-1?"top-right":0===e?"top-left":e%t.y?(e+1)%t.y?e>a-t.y?"bottom":e>t.y?"center":e>0?"top":void 0:"right":"left"}class s{constructor(){this.boardSize={x:7,y:12},this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[],this.clickListener=e=>this.onCellClick(e),this.enterListener=e=>this.onCellEnter(e),this.leaveListener=e=>this.onCellLeave(e)}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",e=>this.onNewGameClick(e)),this.saveGameEl.addEventListener("click",e=>this.onSaveGameClick(e)),this.loadGameEl.addEventListener("click",e=>this.onLoadGameClick(e)),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize.x*this.boardSize.y;e+=1){const t=document.createElement("div");t.classList.add("cell","map-tile","map-tile-"+i(e,this.boardSize)),t.addEventListener("mouseenter",this.enterListener),t.addEventListener("mouseleave",this.leaveListener),t.addEventListener("click",this.clickListener),this.boardEl.appendChild(t)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const a of e){const e=this.boardEl.children[a.position],i=document.createElement("div");i.classList.add("character",a.character.type);const s=document.createElement("div");s.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=a.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=a.character.health+"%",s.appendChild(r),i.appendChild(s),e.appendChild(i)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach(e=>e.call(null,t))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach(e=>e.call(null,t))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach(e=>e.call(null,t))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach(e=>e.call(null))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach(e=>e.call(null))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach(e=>e.call(null))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected","selected-"+t)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter(e=>e.startsWith("selected")))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise(a=>{const i=this.cells[e],s=document.createElement("span");s.textContent=t,s.classList.add("damage"),i.appendChild(s),s.addEventListener("animationend",()=>{i.removeChild(s),a()})})}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}class r{constructor(e,t="generic"){if(this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t,"Character"===new.target.name)throw new Error("not allowed create new Character")}}class l{constructor(e,t){if(!(e instanceof r))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}const h=e=>{e.attack=Math.max(e.attack,e.attack*(1.8-(1-e.health/100))),e.defence=Math.max(e.defence,e.defence*(1.8-(1-e.health/100))),e.health+=80,e.health>100&&(e.health=100)};function*n(e,t){1==t&&e.forEach((t,a)=>{"Magician"==t.name&&e.splice(a,1)});const a=new(0,e[Math.floor(Math.random()*e.length)])(Math.ceil(Math.random()*t));if("user"===a.party&&a.level>1&&(a.level-=1),a.level>1)for(let e=0;e<a.level-1;e++)h(a);yield a}function o(e,t,a,i,s){1===t&&(a+=1);const r=i.x*i.y;let o=[];const c=[],m=[];(()=>{for(let e=1;e<=r-1;e++)e%i.y!=0&&(e-1)%i.y!=0||c.push(e),(e-(i.y-1))%i.y!=0&&(e-(i.y-2))%i.y!=0||m.push(e)})();const d=e=>{const t=Math.floor(Math.random()*e.length),a=e[t];return e.splice(t,1),a};s&&(s.forEach(e=>{e.position=d(c),e.character.level+=1,h(e.character)}),o=[...o,...s]);for(let i=0;i<a;i++){const a=n(e,t).next().value;"user"===a.party?o.push(new l(a,d(c))):o.push(new l(a,d(m)))}return n(e,t),o}class c{constructor(){this.classUser=[class extends r{constructor(e){super(),this.level=e,this.attack=25,this.defence=25,this.health=50,this.type="bowman",this.distance=2,this.attackRange=2,this.party="user"}},class extends r{constructor(e){super(),this.level=e,this.attack=40,this.defence=10,this.health=50,this.type="swordsman",this.distance=4,this.attackRange=1,this.party="user"}},class extends r{constructor(e){super(),this.level=e,this.attack=15,this.defence=40,this.health=50,this.type="magician",this.distance=1,this.attackRange=4,this.party="user"}}],this.classEnemy=[class extends r{constructor(e){super(),this.level=e,this.attack=25,this.defence=25,this.health=50,this.type="vampire",this.distance=2,this.attackRange=2,this.party="enemy"}},class extends r{constructor(e){super(),this.level=e,this.attack=15,this.defence=40,this.health=50,this.type="daemon",this.distance=1,this.attackRange=4,this.party="enemy"}},class extends r{constructor(e){super(),this.level=e,this.attack=40,this.defence=10,this.health=50,this.type="undead",this.distance=4,this.attackRange=1,this.party="enemy"}}]}}class m{constructor(){this.player="user",this.move=null,this.activeChar=null,this.userObj=null,this.enemyObj=null,this.level=1,this.points=0,this.team=null,this.survivingTeam=null,this.game="play",this.theme="prairie",this.damage=null,this.userTeam=[],this.arealAttack=[]}}var d={auto:"auto",pointer:"pointer",crosshair:"crosshair",notallowed:"not-allowed"};var g={prairie:"prairie",desert:"desert",arctic:"arctic",mountain:"mountain"};const y=new s;y.bindToDOM(document.querySelector("#game-container"));const u=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage);new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.gameState=new m,this.theme=g.prairie}deleleActiveChar(){this.gameState.activeChar&&(this.gamePlay.deselectCell(this.gameState.activeChar),this.gameState.activeChar=null)}redrawTeam(e,t,a){const i=o((new c).classEnemy,this.gameState.level,t,this.gamePlay.boardSize),s=o((new c).classUser,this.gameState.level,e,this.gamePlay.boardSize,a);this.gameState.team=[...i,...s],this.gamePlay.redrawPositions(this.gameState.team)}addListener(){this.gamePlay.addCellEnterListener(e=>this.onCellEnter(e)),this.gamePlay.addCellLeaveListener(e=>this.onCellLeave(e)),this.gamePlay.addCellClickListener(e=>this.onCellClick(e))}init(){this.gamePlay.drawUi(this.theme),this.addListener(),this.redrawTeam(1,1),this.gamePlay.addNewGameListener(()=>{window.location.reload()}),this.gamePlay.addSaveGameListener(()=>{this.gameState.theme=this.theme,this.stateService.save(this.gameState),alert("Игра сохранена")}),this.gamePlay.addLoadGameListener(()=>{this.deleleActiveChar(),this.gameState=this.stateService.load(),this.gamePlay.drawUi(this.gameState.theme),this.gamePlay.redrawPositions(this.gameState.team),alert("Игра загружена")})}findChar(e){const t=this.gameState.team.find(t=>t.position===e);if(t)return t}tooltip(e){let t="";return((e,...a)=>{a.forEach((a,i)=>{t+=`${e[i]} ${a}`})})`🎖${e.character.level} ⚔${e.character.attack.toFixed(1)} 🛡${e.character.defence.toFixed(1)} ❤${e.character.health.toFixed(1)}`,t}getHorizontalLine(e,t){const a=[],i=Math.floor(t/this.gamePlay.boardSize.y)*this.gamePlay.boardSize.y,s=i+(this.gamePlay.boardSize.y-1);for(let r=t-e;r<t+e+1;r++)r<=s&&r>=i&&r!=t&&a.push(r);return a}getVerticalLine(e,t){const a=[];let i=null;for(let e=t;e>=0;e-=this.gamePlay.boardSize.y)i=e;let s=i+this.gamePlay.boardSize.y*(this.gamePlay.boardSize.x-1);for(let r=t-e*this.gamePlay.boardSize.y;r<t+e*this.gamePlay.boardSize.y+1;r+=this.gamePlay.boardSize.y)r<=s&&r>=i&&r!=t&&a.push(r);return a}getDiagonalRL(e,t){const a=[];let i=null,s=null;const r=this.gamePlay.boardSize.y*this.gamePlay.boardSize.x;for(let e=t;e>-1&&(e+1)%this.gamePlay.boardSize.y!=0;e-=this.gamePlay.boardSize.y-1)i=e-(this.gamePlay.boardSize.y-1);i<0&&(i+=this.gamePlay.boardSize.y-1),null==i&&(i=t);for(let e=i;e<r&&e%this.gamePlay.boardSize.y!=0;e+=this.gamePlay.boardSize.y-1)s=e+(this.gamePlay.boardSize.y-1);s>=r-1&&(s-=this.gamePlay.boardSize.y-1);for(let r=t-e*(this.gamePlay.boardSize.y-1);r<t+e*(this.gamePlay.boardSize.y-1)+1;r+=this.gamePlay.boardSize.y-1)r<=s&&r>=i&&r!=t&&a.push(r);return a}getDiagonalLR(e,t){const a=this.gamePlay.boardSize.y*this.gamePlay.boardSize.x,i=[];let s=null,r=null;for(let e=t;e>-1&&e%this.gamePlay.boardSize.y!=0;e-=this.gamePlay.boardSize.y+1)s=e-(this.gamePlay.boardSize.y+1);s<0&&(s+=this.gamePlay.boardSize.y+1),null==s&&(s=t);for(let e=s;e<a&&(e+1)%this.gamePlay.boardSize.y!=0;e+=this.gamePlay.boardSize.y+1)r=e+(this.gamePlay.boardSize.y+1);r>=a-1&&(r-=this.gamePlay.boardSize.y+1);for(let a=t-e*(this.gamePlay.boardSize.y+1);a<t+e*(this.gamePlay.boardSize.y+1)+1;a+=this.gamePlay.boardSize.y+1)a<=r&&a>=s&&a!=t&&i.push(a);return i}getArealSell(e){let t=null;this.gameState.team.find(a=>{a.position===e&&(t=a.character.distance)});const a=[...this.getHorizontalLine(t,e),...this.getVerticalLine(t,e),...this.getDiagonalLR(t,e),...this.getDiagonalRL(t,e)];this.gameState.move=[...new Set(a)]}getArealUnderAttack(e,t){const a=this.gamePlay.boardSize.y*this.gamePlay.boardSize.x,i=[];for(let s=e-t*this.gamePlay.boardSize.y;s<e+t*this.gamePlay.boardSize.y+1;s+=this.gamePlay.boardSize.y)s<=a-1&&s>=0&&i.push(s);const s=[],r=e=>{const a=Math.floor(e/this.gamePlay.boardSize.y)*this.gamePlay.boardSize.y,i=a+(this.gamePlay.boardSize.y-1);for(let r=e-t;r<e+t+1;r++)r<=i&&r>=a&&s.push(r)};return i.forEach(e=>r(e)),s}deleteChar(e){const t=this.gameState.team.findIndex(t=>t.position===e);this.gameState.team.splice(t,1)}getSellUnderAttack(e){if(this.gameState.userObj)return this.getArealUnderAttack(this.gameState.activeChar,this.gameState.userObj.character.attackRange).find(t=>t==e)}removeListener(){Array.from(this.gamePlay.boardEl.getElementsByClassName("cell")).forEach(e=>{e.removeEventListener("click",this.gamePlay.clickListener),e.removeEventListener("mouseenter",this.gamePlay.enterListener),e.removeEventListener("mouseleave",this.gamePlay.leaveListener)})}move(e,t){if(!t&&(this.gameState.player="enemy",this.gameState.activeChar)){this.gamePlay.deselectCell(this.gameState.activeChar);const t=t=>{t.position===this.gameState.activeChar&&(this.gameState.activeChar=e,t.position=this.gameState.activeChar,this.getArealSell(this.gameState.activeChar),this.gamePlay.redrawPositions(this.gameState.team),this.gamePlay.selectCell(this.gameState.activeChar))};this.gameState.move.find(t=>t===e)?this.gameState.team.find(e=>t(e)):(this.gameState.activeChar=null,this.gameState.move=null,s.showError("Недопустимое действие"))}}userAttack(e,t){let a;if(t&&"enemy"===t.character.party&&(this.gameState.enemyObj=t),this.gameState.enemyObj&&this.gameState.userObj){a=this.getArealUnderAttack(this.gameState.activeChar,this.gameState.userObj.character.attackRange).find(t=>t===e)}if(t&&"enemy"==t.character.party&&a){const t=+Math.max(this.gameState.userObj.character.attack-this.gameState.enemyObj.character.defence,.1*this.gameState.userObj.character.attack).toFixed(1);this.gameState.enemyObj.character.health-=t,this.gameState.damage=t,this.gameState.enemyObj.character.health<=0&&this.deleteChar(e),this.gamePlay.deselectCell(e),this.gamePlay.redrawPositions(this.gameState.team),this.gamePlay.showDamage(e,t),this.gameState.player="enemy"}}findUserSellToAttack(e,t){let a=this.getHorizontalLine(this.gamePlay.boardSize.y,t),i=this.getVerticalLine(this.gamePlay.boardSize.x,t),s=this.getDiagonalRL(this.gamePlay.boardSize.y,t),r=this.getDiagonalLR(this.gamePlay.boardSize.y,t);const l=a=>{const i=[...a,...e].sort((e,t)=>e-t);let s=[];if(i.forEach((e,t,a)=>{e==a[t+1]&&s.push(e)}),s.length){if(s=[...s,t].sort((e,t)=>e-t),s[s.length-1]===t)return s[s.length-2];if(s[0]===t)return s[1]}};a=l(a),i=l(i),s=l(s),r=l(r);const h=this.findChar(a),n=this.findChar(i),o=this.findChar(s),c=this.findChar(r);return a&&!h?{target:a,coefficient:1}:i&&!n?{target:i,coefficient:this.gamePlay.boardSize.y}:s&&!o?{target:s,coefficient:this.gamePlay.boardSize.y-1}:r&&!c?{target:r,coefficient:this.gamePlay.boardSize.y+1}:void 0}getNextPosition(e,t,a){const i=t;let s=null;const r=Math.floor(t/this.gamePlay.boardSize.y)*this.gamePlay.boardSize.y,l=r+(this.gamePlay.boardSize.y-1);let h=this.findUserSellToAttack(e,t);for(let a=t;!h&&a>=r;a--)h=this.findUserSellToAttack(e,a),s=a;if(!h)for(let t=i+1;!h&&t<=l;t++)h=this.findUserSellToAttack(e,t),s=t;const n=t-a,o=t+a;return s<t&&n<=s?s:s<t&&n>s?n:s>t&&o<s?s:s>t&&o>=s?o:s}moveEnemy(e,t){e=[...new Set(e)];let a=null;const i=this.findUserSellToAttack(e,t.position);if(i){const e=t.position-t.character.distance*i.coefficient,s=t.position+t.character.distance*i.coefficient;i.target<=t.position&&i.target<=e&&(a=e),i.target<=t.position&&i.target>e&&(a=i.target),i.target>t.position&&i.target<=s&&(a=i.target),i.target>t.position&&i.target>s&&(a=s)}i||(a=this.getNextPosition(e,t.position,t.character.distance)),t.position=a,this.gamePlay.redrawPositions(this.gameState.team),this.gameState.damage&&this.gamePlay.showDamage(this.gameState.enemyObj.position,this.gameState.damage)}enemyLogic(){this.gameState.player="user";let e=[];const t=(()=>(this.gameState.team.forEach(t=>{"enemy"==t.character.party&&e.push(t)}),e[Math.floor(Math.random()*e.length)]))();let a=null;const i=e=>{let t=[];const i=this.getArealUnderAttack(e.position,e.character.attackRange);return this.gameState.team.forEach(e=>{"user"==e.character.party&&t.push(e.position)}),t=[...t,...i],t.sort((e,t)=>e-t),a=t.find((e,t,a)=>{if(e==a[t+1])return e}),a},s=e.find(e=>i(e));if(s&&this.gameState.activeChar){const e=this.gameState.team.find(e=>e.position==a),t=+Math.max(s.character.attack-e.character.defence,.1*s.character.attack).toFixed(1);e.character.health-=t,e.character.health<=0&&(this.gameState.activeChar===a&&(this.gamePlay.deselectCell(e.position),this.gamePlay.deselectCell(s.position),this.gamePlay.setCursor(d.auto),this.gameState.move=null,this.gameState.activeChar=null),this.deleteChar(e.position),this.gamePlay.redrawPositions(this.gameState.team)),this.gamePlay.showDamage(e.position,t)}this.gameState.team.forEach(e=>{"user"===e.character.party&&this.gameState.userTeam.push(e)}),this.gameState.userTeam.forEach(e=>{const a=this.getArealUnderAttack(e.position,t.character.attackRange);this.gameState.arealAttack.push(...a)}),!s&&this.gameState.activeChar&&this.moveEnemy(this.gameState.arealAttack,t),this.gameState.userTeam=[],this.gameState.arealAttack=[]}getNextLevel(){2===this.gameState.level&&(this.theme=g.desert),3===this.gameState.level&&(this.theme=g.arctic),4===this.gameState.level&&(this.theme=g.mountain),this.gamePlay.deselectCell(this.gameState.activeChar),this.gameState.move=null,this.gameState.activeChar=null,this.gameState.survivingTeam=this.gameState.team,this.gamePlay.drawUi(this.theme),this.gameState.survivingTeam.forEach(e=>this.gameState.points+=e.character.health);const e=(()=>2==this.gameState.level?3:3==this.gameState.level?5:4==this.gameState.level?7:void 0)(),t=e-this.gameState.survivingTeam.length;this.redrawTeam(t,e,this.gameState.survivingTeam)}playOrFinish(){const e=this.getWinner();"enemy"===e&&(this.removeListener(),this.gameState.game="end"),"user"===e&&(this.gameState.level+=1,this.gameState.level>1&&this.getNextLevel(),this.gameState.level>4&&(this.gameState.game="end",this.removeListener(),this.gamePlay.deselectCell(this.gameState.activeChar)))}getWinner(){const e=this.gameState.team.find(e=>"user"===e.character.party),t=this.gameState.team.find(e=>"enemy"===e.character.party);return e?t?void 0:"user":"enemy"}getCursor(e,t,a){if(t&&"user"==t.character.party)return d.pointer;if(!t&&this.gameState.move){return this.gameState.move.find(t=>t===e)?d.pointer:d.notallowed}return t?t&&"enemy"==t.character.party&&this.gameState.move?a?d.crosshair:d.notallowed:void 0:d.auto}getColorCell(e,t,a){if(!t&&this.gameState.move){if(this.gameState.move.find(t=>t===e))return"green"}return t&&"enemy"==t.character.party&&this.gameState.move&&a?"red":null}onCellClick(e){this.gameState.damage=null,this.gameState.enemyObj=null;const t=this.findChar(e);!this.gameState.activeChar&&t&&"enemy"==t.character.party&&s.showError("Персонаж не из вашей команды"),t&&"user"==t.character.party&&(this.gameState.activeChar&&this.gamePlay.deselectCell(this.gameState.activeChar),this.gameState.activeChar=e,this.gameState.userObj=t,this.gamePlay.selectCell(this.gameState.activeChar),this.getArealSell(this.gameState.activeChar)),"user"===this.gameState.player&&(this.playOrFinish(),this.move(e,t),this.userAttack(e,t)),"enemy"===this.gameState.player&&(this.playOrFinish(),"play"===this.gameState.game&&this.enemyLogic())}onCellEnter(e){const t=this.findChar(e),a=this.getSellUnderAttack(e);t&&this.gamePlay.showCellTooltip(this.tooltip(t),e),this.gamePlay.setCursor(this.getCursor(e,t,a)),this.gamePlay.selectCell(e,this.getColorCell(e,t,a))}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.gamePlay.deselectCell(e),this.gameState.activeChar&&this.gamePlay.selectCell(this.gameState.activeChar)}}(y,u).init()}]);