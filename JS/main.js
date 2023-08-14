class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 49;
    this.positionY = 0;
    this.playerSpaceShip = null;

    this.createDomElement();
  }
  
  createDomElement() {
    this.playerSpaceShip = document.createElement("div");

    this.playerSpaceShip.id = "Player-Spaceship";
    this.playerSpaceShip.style.width = this.width + "vw";
    this.playerSpaceShip.style.height = this.height + "vh";
    this.playerSpaceShip.style.left = this.positionX + "vw";
    this.playerSpaceShip.style.bottom = this.positionY + "vh";
    this.playerSpaceShip.style.backgroundImage = "url('Resources/SpaceShip-vanilla.png')";
    
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.playerSpaceShip);
  }
  moveLeft() {
    this.positionX--;
    this.playerSpaceShip.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;
    this.playerSpaceShip.style.left = this.positionX + "vw";
  }
  moveUp() {
    this.positionY++;
    this.playerSpaceShip.style.bottom = this.positionY + "vh";
  }
  moveDown() {
    this.positionY--;
    this.playerSpaceShip.style.bottom = this.positionY + "vh";
  }
}
class Enemy { 
  constructor(){
    this.positionX = 50;
    this.positionY = 100;
    this.width = 30
    this.height = 30
    this.domElement = null;

    this.createDomElement()
  }
  createDomElement(){
    this.enemySpaceShip = document.createElement("div");
    
    this.enemySpaceShip.className = "enemySpaceShip";
    this.enemySpaceShip.style.width = this.width + "vw";
    this.enemySpaceShip.style.height = this.height + "vh";
    this.enemySpaceShip.style.left = this.positionX + "vw";
    this.enemySpaceShip.style.bottom = this.positionY + "vh";
    this .enemySpaceShip.style.backgroundImage = "url('Resources/enemyShip.png')";
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.enemySpaceShip)
  }
  moveDown(){
    this.positionY -= 0.1;
    this.enemySpaceShip.style.bottom = this.positionY +"vh"
  }
}

const player = new Player()
const EnemyArr = []
 setInterval(() =>{
  const newEnemy = new Enemy();
  EnemyArr.push(newEnemy)
 }, 4000)

setInterval(() =>{ 
  EnemyArr.forEach(function (enemy) {
      enemy.moveDown();
      if (
          player.positionX < enemy.positionX + enemy.width &&
          player.positionX + player.width > enemy.positionX &&
          player.positionY < enemy.positionY + enemy.height &&
          player.positionY + player.height > enemy.positionY
       ) {
          // Collision detected!
           console.log("colision");
        }
      });
  }, 1);



document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowLeft") {
        player.moveLeft();
  } else if (e.key === "ArrowRight") {
        player.moveRight();
    }else if (e.key === "ArrowDown") {
        player.moveDown();
    }else if (e.key === "ArrowUp") {
        player.moveUp()
    }
});

;
