//variable and constant...........................................................................................
let  direction={x:0 , y:0};
// initial declaration
const foodSound= new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
//constant variable coz only use this sounds for once
let speed=5;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x: 13 , y: 15}
    //first a sanke head
];
food={x:6 , y:7};

//game loop dia screen again again prt hoi


//FUNCTIONSS...........................................................................................................

function main(ctime){
    window.requestAnimationFrame(main);
    //main func will prt repeatedly
    //ctime=current time       lastpainttime=last scr paint
    //console.log(ctime)
    if((ctime -lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();//help to runthe game
}


function isCollide(snake){
    //bump with self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
        
    }
    //bump into wall
    if(snake[0].x<=0||snake[0].x>=18||snake[0].y<=0||snake[0].y>=18)
    {
        return true;
    }

}


function gameEngine(){
    musicSound.play();
    //update snake array
//collision.........................
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction={x:0 , y:0};
        alert("Game Over,press any to play again!!!!");
        //new start
        snakeArr=[{x: 13 , y: 15}]
        musicSound.play();
        score=0;
    }
// If you have eaten the food, increment the score and regenerate the food..............
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)//when coordinate of snake and food same
    {
        foodSound.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("High Score: ",JSON.stringify(highscoreval));
            highscorebox.innerHTML="High Score: "+highscoreval;
        }
        scorebox.innerHTML="Score : "+score;

        snakeArr.unshift({x:snakeArr[0].x + direction.x, y:snakeArr[0].y + direction.y});//eating add
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //move the snake
    for (let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};//without refecing r jono {... }  new obj

    }
    snakeArr[0].x +=direction.x;
    snakeArr[0].y +=direction.y;


    //rneder snake and foood
    //display snake..................
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);//add hote hote cholche
    })

    // Display the food............
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}




//logic...........................................................................................................

let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    highscore=localStorage.setItem("highscore",JSON.stringify(highscoreval));

}
else{
    highscoreval=JSON.parse(highscore);
    highscorebox.innerHTML="High Score: ",highscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction={x:0,y:1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x=0;
            direction.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x=0;
            direction.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x=-1;
            direction.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");;
            direction.x=1;
            direction.y=0;
            break;
        default:
            break;
    }
});
