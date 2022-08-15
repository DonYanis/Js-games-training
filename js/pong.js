const ball=document.querySelector('.ball')
const cpu=document.querySelector('.cpu-bar')
const player=document.querySelector('.player-bar')
const board=document.querySelector('.game-board')
const score=document.querySelector('.game-score')
const maxScoreDiv=document.querySelector('.max-score')
const reset=document.querySelector('.reset-score')

const boardHeight=parseFloat(window.getComputedStyle(board).getPropertyValue('height').replace('px',''))
const boardWidth=parseFloat(window.getComputedStyle(board).getPropertyValue('width').replace('px',''))
const barHeight=parseFloat(window.getComputedStyle(player).getPropertyValue('height').replace('px',''))
const barWidth=parseFloat(window.getComputedStyle(player).getPropertyValue('width').replace('px',''))
const ballWidth=parseFloat(window.getComputedStyle(ball).getPropertyValue('width').replace('px',''))

let speed=20, step=20
let ballSpeed1=2.5, ballSpeed2=5
let ballSpeedX, ballSpeedY
let ballVelY=1, ballVelX=1
let collisions=0
let acc=0
let playerScore=0, cpuScore=0

//get max score from localStorage
let maxScore= JSON.parse(localStorage.getItem("pongMaxScore")) || {'cpu':0,'player':0,'diff':0}
maxScoreDiv.innerHTML=`MAX Score : ${maxScore.cpu} - ${maxScore.player}`

//move player's bar
document.addEventListener("keydown", (e)=>{
    let top=window.getComputedStyle(player).getPropertyValue('top').replace('px','')
    let cpuTop=window.getComputedStyle(cpu).getPropertyValue('top').replace('px','')
    top=parseFloat(top)
    cpuTop=parseFloat(cpuTop)

    if(e.keyCode===38){ //up
        if(top>0){
            top-=step
            player.style.setProperty('top',`${top}px`)
        }
    }
    else if(e.keyCode===40){ //down
        if(top<(boardHeight-barHeight)){
            top+=step
            player.style.setProperty('top',`${top}px`)
        }
    }
})
                
function startgame(){
    ballSpeedX=ballSpeed1
    ballSpeedY=ballSpeed2
    ballVelY=1
    ballVelX=1
    speed=20
    collisions=0
    acc=0
    ball.style.setProperty('top',`${boardHeight/2}px`)
    ball.style.setProperty('left',`${boardWidth/2}px`)
    score.innerHTML=`${cpuScore} : ${playerScore}`
    if (maxScore.diff< playerScore-cpuScore){
        maxScore.player=playerScore
        maxScore.cpu=cpuScore
        maxScore.diff=playerScore-cpuScore
       localStorage.setItem("pongMaxScore",JSON.stringify(maxScore))
       maxScoreDiv.innerHTML=`MAX Score : ${cpuScore} - ${playerScore}`
    }
}

function play(){
    let ballTop=parseFloat(window.getComputedStyle(ball).getPropertyValue('top').replace('px',''))
    let ballLeft=parseFloat(window.getComputedStyle(ball).getPropertyValue('left').replace('px',''))
    let cputop=parseFloat(window.getComputedStyle(cpu).getPropertyValue('top').replace('px',''))
    let playertop=parseFloat(window.getComputedStyle(player).getPropertyValue('top').replace('px',''))
    
    //collisions up down
    if(ballTop<0 || ballTop>boardHeight-ballWidth){
        ballVelY*=-1
    }
    
    //collisions with bars
    if( ballTop>=playertop-ballWidth/2 &&
        ballTop+ballWidth/2 <= playertop+barHeight &&
        ballLeft>=boardWidth-barWidth-20 )
    { 
        if(ballTop<=playertop+barHeight/4 || ballTop>=playertop+3*barHeight/4){
            ballSpeedY=ballSpeed2+acc
            ballSpeedX=ballSpeed1+acc
        }else{
            ballSpeedY=ballSpeed1+acc
            ballSpeedX=ballSpeed2+acc
        }
        if(ballTop<=playertop+barHeight/2 ){
            ballVelY=-1
        }else{
            ballVelY=1
        }
        ballVelX*=-1
        collisions++
    }
    
    if( ballTop>=cputop-ballWidth/2 &&
        ballTop+ballWidth/2 <= cputop+barHeight &&
        ballLeft<=barWidth)
    {
            if(ballTop<=cputop+barHeight/4 || ballTop>=cputop+3*barHeight/4){
                ballSpeedY=ballSpeed2+acc
                ballSpeedX=ballSpeed1+acc
            }else{
                ballSpeedY=ballSpeed1+acc
                ballSpeedX=ballSpeed2+acc
            }
            if(ballTop<=cputop+barHeight/2){
                ballVelY=-1
            }else{
                ballVelY=1
            }
            ballVelX*=-1
    }
        
    ballTop+=ballVelY*ballSpeedY
    ballLeft+=ballVelX*ballSpeedX
    
    //scoring points
    if(ballLeft<=0){
        playerScore++
        startgame()
        return
    }else if(ballLeft>boardWidth-barWidth-5){
        cpuScore++
        startgame()
        return
    }
        
    //cpu moves
    if(cputop+barHeight/2 > ballTop && cputop>0){
        cputop-=4
        cpu.style.setProperty('top',`${cputop}px`)
    }else if(cputop+barHeight/2 < ballTop && (cputop<(boardHeight-barHeight))){
        cputop+=4
        cpu.style.setProperty('top',`${cputop}px`)
    }
    
    
    ball.style.setProperty('top',`${ballTop}px`)
    ball.style.setProperty('left',`${ballLeft}px`)
    
    //ball acceleration
    if(collisions>3 && acc <1){
        acc+=1
    }else if (collisions>6 && acc<2){
        acc+=1
    }
}

startgame()
setInterval(play,speed)

reset.addEventListener("click", ()=>{
    cpuScore=0
    playerScore=0
    startgame()
})