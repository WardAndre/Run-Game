window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
      
    };

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let myZombies = []
    let frames = 0;
    let gameOver = false;
    let myObstacles = [];
    
    let backImg = new Image();
    backImg.src = 'https://www.codeandweb.com/blog/2018/06/25/how-to-create-sprite-sheets-and-animations-for-easeljs-createjs/stage-1.png';


 

    class Player {
        constructor(x, y) {
            // this.health = health;
            // this.strength = strength;
            this.x = x;
            this.y = y;
            this.speedX = x;
            this.speedY = y;
        }
        // attack(){
        //     return this.strength;
        // };
        // receiveDamage(damage){
        //    this.health = this.health - damage;
        // }
        update () {
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
        constructor(x, y) {
            // this.health = health;
            // this.strength = strength;
            this.x = x;
            this.y = y;
            this.speedX = 5;
            // this.speedY = 0;
        }
        // attack(){
        //     return this.strength;
        // };
        // receiveDamage(damage){
        //    this.health = this.health - damage;
        // }
        update (ctx) {
            let zombieImg = new Image();
            zombieImg.src = 'images/zombies/male/Idle (1).png';
            ctx.drawImage(zombieImg, this.x, this.y, 70, 100);
        }
        newPos() {
            if (frames % 50 === 0){
                this.x += this.speedX;
            }
        }
    }
    

    
    class Obstacle {
        constructor(width, height, color, x, y){
          this.width = width;
          this.height = height;
          this.color = color;
          this.x = x;
          this.y = y;
        }
        update(ctx){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        newPos() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }



    function updateObstacles() {

        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x += -1;
            myObstacles[i].update(ctx);
        }
        if (frames % 500 === 0) {
          let y = 375     
          let minHeight = 10;
          let maxHeight = 10;
          let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
          myObstacles.push(new Obstacle(50, 10, "black", 1000, y)); //width, height, color, x, y
        }
    } 
   

    let player = new Player(300, 310);
    let zombie = new Zombie(100, 310);
    

   

    document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 87: // up arrow
            player.speedY -= 1;
            break;
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


    function crash() {
        let playerX = player.x;
        let playerY = player.y;
        let playerXW = player.x + 70;
        let playerYH = player.y + 100;
        for (let i = 0; i < myObstacles.length; i++) {
          let obstacleX = myObstacles[i].x;
          let obstacleY = myObstacles[i].y;
          let obstacleXW = myObstacles[i].x + 50;
          let obstacleYH = myObstacles[i].y + 10;
          if (playerXW > obstacleX && playerX < obstacleXW && playerYH > obstacleY && playerY < obstacleYH) {
            //   myObstacles[i].x = 0;
            //   myObstacles[i].y = 0;
            player.speedX = 0;
            }
        }
    }

    function bite() {
    if(zombie.x + 5 === player.x +5){
        // player.health -= zombie.strength
        // console.log(player.health)
    // } 
    // if(player.health <= 0) {
        gameOver = true;
    }
    }


    function draw(){
        ctx.clearRect(0, 0, 950, 548);
        ctx.drawImage(backImg, 0, 0, 950, 548);
        player.update(ctx);
        if (frames % 500 === 0) {
           myZombies.push(new Zombie(0, 310));
        }
    }


    function moveZombie () {
        myZombies.forEach(zombie => {
            zombie.newPos()
            zombie.update(ctx)
        })
    }
    
    

    function updateGameFrame(){
        if (gameOver) {
            window.cancelAnimationFrame(updateGameFrame);
        } else {
            draw();
            crash();
            player.newPos();
            updateObstacles();
            moveZombie();
            bite();
            window.requestAnimationFrame(updateGameFrame);
            frames += 1
         }
    }
    
    
    
    function startGame(){ 
        
        window.requestAnimationFrame(updateGameFrame);
    }
    
    
};