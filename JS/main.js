class Player {
  constructor() {
    this.width = 6;
    this.height = 4.5;
    this.positionX = 49 - this.width / 2;
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
    this.playerSpaceShip.style.backgroundImage =
      "url('Resources/SpaceShip-vanilla.png')";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.playerSpaceShip);
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.playerSpaceShip.style.left = this.positionX + "vw";
    }
  }
  moveRight() {
    if (this.positionX < 94) {
      this.positionX++;
      this.playerSpaceShip.style.left = this.positionX + "vw";
    }
  }
  moveUp() {
    if (this.positionY < 95) {
      this.positionY++;
      this.playerSpaceShip.style.bottom = this.positionY + "vh";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.playerSpaceShip.style.bottom = this.positionY + "vh";
    }
  }

  shoot() {
    const projectile = new PlayerProjectiles();
    projectileArr.push(projectile);
  }
}

class PlayerProjectiles {
  constructor() {
    this.width = 3;
    this.height = 4.4;
    this.positionX = player.positionX;
    this.positionY = player.positionY;
    this.projectileElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.projectileElement = document.createElement("div");

    this.projectileElement.className = "player-projectiles";
    this.projectileElement.style.width = this.width + "vw";
    this.projectileElement.style.height = this.height + "vh";
    this.projectileElement.style.left = this.positionX + "vw";
    this.projectileElement.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.projectileElement);
  }
  moveUp() {
    this.positionY += 0.1;
    this.projectileElement.style.bottom = this.positionY + "vh";
  }
}

class Enemy {
  constructor() {
    this.width = 6;
    this.height = 4;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = 100;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.enemySpaceShip = document.createElement("div");

    this.enemySpaceShip.className = "enemySpaceShip";
    this.enemySpaceShip.style.width = this.width + "vw";
    this.enemySpaceShip.style.height = this.height + "vh";
    this.enemySpaceShip.style.left = this.positionX + "vw";
    this.enemySpaceShip.style.bottom = this.positionY + "vh";
    this.enemySpaceShip.style.backgroundImage =
      "url('Resources/enemyShip.png')";
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.enemySpaceShip);
  }
  moveDown() {
    this.positionY -= 0.1;
    this.enemySpaceShip.style.bottom = this.positionY + "vh";
  }
}

class Score {
  constructor() {
    this.points = 0;
    this.positionX = 80;
    this.positionY = 90;
    this.width = 10;
    this.height = 5;
    this.scoreElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.scoreElement = document.createElement("div");

    this.scoreElement.className = "player-score";
    this.scoreElement.style.width = this.width + "vw";
    this.scoreElement.style.height = this.height + "vh";
    this.scoreElement.style.left = this.positionX + "vw";
    this.scoreElement.style.bottom = this.positionY + "vh";
    this.scoreElement.textContent = "Score: " + this.points;
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.scoreElement);
  }
  updateScore(value) {
    this.points += value;
    this.scoreElement.textContent = "Score: " + this.points;
  }
}

const playerScore = new Score();
const player = new Player();
const projectileArr = [];
const EnemyArr = [];
setInterval(() => {
  if (playerScore.points < 0) {
    location.href = "./GameOver.html";
  }
}, 10);
setInterval(() => {
  projectileArr.forEach(function (projectile, ind) {
    projectile.moveUp();
    if (projectile.positionY > 100 - projectile.height) {
      projectile.projectileElement.remove();
      projectileArr.shift();
    }
    EnemyArr.forEach(function (enemy, i) {
      if (
        projectile.positionX < enemy.positionX + enemy.width &&
        projectile.positionX + projectile.width > enemy.positionX &&
        projectile.positionY < enemy.positionY + enemy.height &&
        projectile.positionY + projectile.height > enemy.positionY
      ) {
        enemy.enemySpaceShip.remove();
        EnemyArr.splice(i, 1);
        projectile.projectileElement.remove();
        projectileArr.splice(ind, 1);
        playerScore.updateScore(5);
      }
    });
  });
}, 1);

setInterval(() => {
  const newEnemy = new Enemy();
  EnemyArr.push(newEnemy);
}, 900);

setInterval(() => {
  EnemyArr.forEach(function (enemy) {
    enemy.moveDown();

    if (enemy.positionY < 0 - enemy.height) {
      enemy.enemySpaceShip.remove();
      EnemyArr.shift();
      playerScore.updateScore(-10);
    }
    if (
      player.positionX < enemy.positionX + enemy.width &&
      player.positionX + player.width > enemy.positionX &&
      player.positionY < enemy.positionY + enemy.height &&
      player.positionY + player.height > enemy.positionY
    ) {
      location.href = "./GameOver.html";
    }
  });
}, 10);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.moveLeft();
  } else if (e.key === "ArrowRight") {
    player.moveRight();
  } else if (e.key === "ArrowDown") {
    player.moveDown();
  } else if (e.key === "ArrowUp") {
    player.moveUp();
  } else if (e.key === " ") {
    player.shoot();
    const laserSound = document.getElementById("laser");
    laserSound.play();
    laserSound.volume = 0.1;
  
  }
});
