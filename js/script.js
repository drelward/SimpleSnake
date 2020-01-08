let score=0;
(function(){
  let field=document.createElement('div');
  field.classList.add('field');
  document.body.appendChild(field);

  let x=1,y=10;

  for(let i=1;i<101;i++){
    let excel=document.createElement('div');
    excel.classList.add('excel');
    field.appendChild(excel);
    if(x>10){
      x=1;
      y--;
    }
    excel.setAttribute('posX',x);
    excel.setAttribute('posY',y);
    x++;

  }
}())

function getCoord(){
  let coord=Math.round(Math.random()*10);
  if(coord<1){
    coord=1;
  }
  
  return coord;

}

function createSnake(){
  let posY=getCoord(),
  posX=getCoord();


    if(posX<3){
      posX=3;
    }

  let firstBody=document.querySelector('[posX="'+ posX + '"][posY="'+ posY + '"]'),
  secondBody=document.querySelector('[posX="'+ (posX-1) + '"][posY="'+ posY + '"]'),
  thirdBody=document.querySelector('[posX="'+ (posX-2) + '"][posY="'+ posY + '"]');
  let snake=[firstBody,secondBody,thirdBody];



  for(let i=0;i<snake.length;i++){
    snake[i].classList.add('snakeBody')
  }

  return snake;
}

let target;

function createTarget(){
  let posY=getCoord(),
  posX=getCoord();



  target=document.querySelector('[posX="'+ posX + '"][posY="'+ posY + '"]');
  
  while(target.classList.contains('snakeBody')){
    posY=getCoord();
    posX=getCoord();
  
  
    target=document.querySelector('[posX="'+ posX + '"][posY="'+ posY + '"]');
  }
  
  target.classList.add('target');



}
let snakeBody= createSnake();

createTarget();

let direction='right';

function move(){
  let headCoords=[snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];

  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
  snakeBody.pop();
  if(direction=='right'){
      if(headCoords[0]<10){
      let snakeHead=document.querySelector('[posX="'+ (+headCoords[0]+1) + '"][posY="'+ headCoords[1] + '"]');
      snakeBody.unshift(snakeHead);
      }else{
        let snakeHead=document.querySelector('[posX="1"][posY="'+ headCoords[1] + '"]');
        snakeBody.unshift(snakeHead);
      }
  }else if(direction=='left'){
    if(headCoords[0]>1){
      let snakeHead=document.querySelector('[posX="'+ (+headCoords[0]-1) + '"][posY="'+ headCoords[1] + '"]');
      snakeBody.unshift(snakeHead);
      }else{
        let snakeHead=document.querySelector('[posX="10"][posY="'+ headCoords[1] + '"]');
        snakeBody.unshift(snakeHead);
      }
  }else if(direction=='up'){
    if(headCoords[1]<10){
      let snakeHead=document.querySelector('[posX="'+ headCoords[0] + '"][posY="'+ (+headCoords[1]+1) + '"]');
      snakeBody.unshift(snakeHead);
      }else{
        let snakeHead=document.querySelector('[posX="'+ headCoords[0] + '"][posY="1"]');
        snakeBody.unshift(snakeHead);
      }
  }else if(direction=='down'){
    if(headCoords[1]>1){
      let snakeHead=document.querySelector('[posX="'+ headCoords[0] + '"][posY="'+ (+headCoords[1]-1) + '"]');
      snakeBody.unshift(snakeHead);
      }else{
        let snakeHead=document.querySelector('[posX="'+ headCoords[0] + '"][posY="10"]');
        snakeBody.unshift(snakeHead);
      }
  }

  let targetCoords=[target.getAttribute('posX'),target.getAttribute('posY')];

  if(headCoords[0]==targetCoords[0] && headCoords[1]==targetCoords[1]){
    score+=1;
    target.classList.remove('target');
    let previous=[snakeBody[snakeBody.length-1].getAttribute('posX'),snakeBody[snakeBody.length-1].getAttribute('posY')];
    let add=document.querySelector('[posX="'+ previous[0] + '"][posY="'+ previous[1] + '"]');
    snakeBody.push(add)
    
    createTarget();
  }

  if(snakeBody[0].classList.contains('snakeBody')){
    clearInterval(interval);
    let field=document.getElementsByClassName('field')[0];

    let loseScreen=document.createElement('div');
    loseScreen.classList.add('lose');
    loseScreen.textContent=`You lose. Score: ${score}.`;

    score=0;

    let reset=document.createElement('div');
    reset.classList.add('reset');
    reset.textContent=`Try again`;
    loseScreen.appendChild(reset);

    field.appendChild(loseScreen);

    reset.onclick=function(){
      window.location.reload();
    }
  }


  for(let i=0;i<snakeBody.length;i++){
    snakeBody[i].classList.add('snakeBody')
  }


}

let interval=setInterval(move,150)


window.addEventListener('keydown',function(e){
  if(e.keyCode=='37' && direction!='right'){
    direction='left'
  }else if(e.keyCode=='38' && direction!='down'){
    direction='up'
  }else if(e.keyCode=='39' && direction!='left'){
    direction='right'
  }else if(e.keyCode=='40' && direction!='up'){
    direction='down'
  }
})

