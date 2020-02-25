class game{
    constructor(){
        // this.canvas = document.createElement('canvas');
        this.canvas = document.querySelector(".canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.height = 400;
        this.canvas.width = 400;
        // document.body.appendChild(this.canvas);
        // this.context.clearRect(0, 0, 400,400);    
        this.snake = new snake(this);
        this.food = new food(this);  
        this.modeGame = 1;
        
        this.loop();
    }
    loop(){
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 100);
    }
    update(){
        this.snake.update();
        if(this.snake.eat(this.food.x,this.food.y)){
            this.food.update();
        }
    }
    draw(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.snake.draw();
        this.food.draw();
    }
}
class food{
	constructor(game) {
		this.game = game;
		this.x = 0;
		this.y = 0;
		this.grid = 20;
		this.update();
	}

	update() {
		this.x = (Math.floor(Math.random()* 20))*this.grid;
		this.y = (Math.floor(Math.random()* 20))*this.grid;
	}

	draw() {
		this.game.context.fillStyle = 'red';
		this.game.context.fillRect(this.x, this.y, this.grid, this.grid);
	}
}
class snake{
	constructor(game) {
		this.game = game;
		this.x = 0;
		this.y = 0;
		this.grid = 20;
		this.dx = this.grid;
		this.dy = 0;
		this.cell = [];
		this.maxCells = 1;
        this.modeGame = game.modeGame;
        console.log(this.modeGame);
	}

	update() {
		if(!this.checkGameOver()){
			this.x += this.dx;
            this.y += this.dy;
            
            if(this.x >= this.game.canvas.width){
                this.x = 0;
            }
    
            else if(this.x < 0){
                this.x = this.game.canvas.width;
            }
    
            if(this.y >= this.game.canvas.height){
                this.y = 0;
            }
    
            else if(this.y < 0){
                this.y = this.game.canvas.height;
            }
    
            this.cell.unshift({x: this.x, y: this.y});
            if(this.cell.length > this.maxCells){
                this.cell.pop();
            }
		}

		
		this.catchHandle();
		
	}

	draw() {
		for(let i = 0; i < this.cell.length; i++){
			this.game.context.fillStyle = 'white';
			this.game.context.fillRect(this.cell[i].x, this.cell[i].y, this.grid, this.grid);
		}

		if(this.checkGameOver()) {
            this.game.context.font = '30px Arial';
			this.game.context.fillText("Game Over", 120, 200);
		}
	}

	catchHandle() {
		document.addEventListener('keydown', (e) => {
			if(e.which == 37 && this.dx == 0){
				this.dx = -this.grid;
				this.dy = 0;
			}

			else if(e.which == 38 && this.dy == 0){
				this.dx = 0;
				this.dy = -this.grid;
			}

			else if(e.which == 39 && this.dx == 0){
				this.dx = this.grid;
				this.dy = 0;
			}

			else if(e.which == 40 && this.dy == 0){
				this.dx = 0;
				this.dy = this.grid;
			}
		});
	}

	eat(x, y) {
		if(this.x == x && this.y == y){
			this.maxCells++;
			return true;
		}
		return false;
	} 

    checkGameOver(){ 
        // console.log(this.modeGame)
        for(let i = 1; i < this.cell.length; i++){
            if(this.x == this.cell[i].x && this.y == this.cell[i].y){
                return true;
            }
        }
        if(this.modeGame == 2){
            if(this.x == this.game.canvas.width || this.x == 0 || this.y == -this.game.canvas.height || this.y == 0){
                return true;
            }
        }
        return false;
    }
}

let g = new game();
console.log(g.modeGame);

document.querySelector(".mode1").addEventListener("click", () => {
    // g = null;
    let n = new game();
    n.modeGame = 1;
    console.log(this.modeGame);
});
document.querySelector(".mode2").addEventListener("click", () => {
    let n = new game();
    n.modeGame = 2;
    console.log(this.modeGame);
});

