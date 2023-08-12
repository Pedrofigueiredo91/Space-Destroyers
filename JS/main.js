class Player { 
    constructor(){ 
        this.positionX = 50; 
        this.postionY = 0;
        this.width = 45;
        this.height = 39;
        this.playerSpaceShip = null;
        
        this.createDomElement();
    }
    createDomElement(){
        this.playerSpaceShip = document.createElement("div");

        this.playerSpaceShip.id = "Player-Spaceship";
        this.playerSpaceShip.style.width = this.width +"vw"
        this.playerSpaceShip.style.height = this.height + "vh";
        this.playerSpaceShip.style.left = this.positionX + "vw";
        this.playerSpaceShip.style.bottom = this.positionY+"vw";
        this.playerSpaceShip.style.backgroundImage = "url('Resources/SpaceShip.png')"
        
        
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.playerSpaceShip);
        console.log(this.playerSpaceShip)
    }
    moveLeft(){
        this.positionX--;
        this.playerSpaceShip.style.left = this.positionX
    }
    moveRight(){
        this.positionX++;
        this.playerSpaceShip.style,left = this.positionX
    }


}



document.addEventListener("mousemove", e => {
 console.log(e)
})

const player1 = new Player();