window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    // let frames = 0;
    // let myObstacles = [];
    

    let backImg = new Image();
    backImg.src = 'https://www.codeandweb.com/blog/2018/06/25/how-to-create-sprite-sheets-and-animations-for-easeljs-createjs/stage-1.png';
    

      

    class Player {
        constructor(health, strength, x, y) {
            this.health = health;
            this.strength = strength;
            this.x = x;
            this.y = y;
            this.speedX = x;
            this.speedY = y;
        }
        attack(){
            return this.strength;
        };
        receiveDamage(damage){
           this.health = this.health - damage;
        }
        update (ctx) {
            let playerImg = new Image();
            playerImg.src = 'images/player/Idle__000.png'
            ctx.drawImage(playerImg, this.x, this.y, 70, 100);
        }  
        newPos() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    
    class Zombie {
        constructor(health, strength, x, y) {
            this.health = health;
            this.strength = strength;
            this.x = x;
            this.y = y;
            this.speedX = 1;
            this.speedY = 0;
        }
        attack(){
            return this.strength;
        };
        receiveDamage(damage){
           this.health = this.health - damage;
        }
        update (ctx) {
            let zombieImg = new Image();
            zombieImg.src = 'images/zombies/male/Idle (1).png';
            ctx.drawImage(zombieImg, this.x, this.y, 70, 100);
        }
        newPos() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    
    
    
    // class Obstacle {
    //     constructor(health, width, height, color, x, y){
    //       this.width = width;
    //       this.height = height;
    //       this.color = color;
    //       this.x = x;
    //       this.y = y;
    //       this.health = health;
    //     }
    //     newPos() {
    //         this.x += this.speedX;
    //         this.y += this.speedY;
    //     }
    //     receiveDamage(damage){
    //         this.health = this.health - damage;
    //     }
    //     update () {
    
    //     }
    // }

   

    let player = new Player(100, 70, 200, 310);
    let zombie = new Zombie(40, 50, 100, 310);

    

    document.onkeydown = function(e) {
        switch (e.keyCode) {
          // case 38: // up arrow
          //   player.speedY -= 1;
          //   break;
          // case 40: // down arrow
          //   player.speedY += 1;
          //   break;
          case 65: // left arrow
            player.speedX -= 1;
            break;
          case 68: // right arrow
            player.speedX += 1;
            break;
        }
    };
      
    document.onkeyup = function(e) {
        player.speedX = 0;
        player.speedY = 0;
    };


    function bite() {
    if(zombie.x + 10 == player.x - 10){
        player.health -= zombie.strength
        console.log(player.health)
    } 
    else {
        console.log("nao")
    }
    }


    function gameOver () {
        if(player.health <= 0) {
            window.cancelAnimationFrame();
            console.log("You are dead")
        }
    }


    function draw(){
        ctx.clearRect(0, 0, 950, 548);
        ctx.drawImage(backImg, 0, 0, 950, 548);
        player.update(ctx);
        zombie.update(ctx);
    }
    
    

    function updateGameFrame(){
        player.newPos();
        zombie.newPos();
        draw();
        // updateObstacles();
        bite();
        gameOver();
        window.requestAnimationFrame(updateGameFrame);
    }
    
    
    function startGame(){ 
        
        window.requestAnimationFrame(updateGameFrame);
    }
    
    
};

