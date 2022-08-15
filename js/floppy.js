const obj=document.querySelector('.object')
const pairs=document.querySelectorAll('.pair')
const top_bars=document.querySelectorAll('.top_bar')
const bars=document.querySelectorAll('.bar')
const start=document.querySelector('.new_game_btn')
const pause=document.querySelector('.pause_game_btn')
const score=document.querySelector('.score')
const hscore=document.querySelector('.highscore')


var bar_rect=[] ,obj_rect

let pos=[0,0,0,0]
let limit=[-100,-250,-400,-550]
let new_pos=[499,350,200,50]

let x=200
let interval=0
let intervaltime=10
let interval2=0
let result=0
let max_result=0
let p=false

document.addEventListener('keydown',(e) =>{  //disable scrolling with arrows

    if([37,38,39,40].indexOf(e.keyCode >-1)){
    e.preventDefault();
    }
} ,false)

new_game()

function move(){
    if(p)
        return

    if(x<480){
        obj.style.top=(x+'px')
        x++       
    }  
}

function jump(){
    if(x>=30)
        x-=30
}

if(x>=480)
    clearInterval(interval)


window.addEventListener('keyup',function(e){
    if(e.keyCode==32 || e.keyCode==38){
        jump()
        p=false
    }
})

window.addEventListener('click',function(){
    jump() 
})

hscore.innerHTML=0

function new_game(){
    result=0
    x=200
    for (let i = 0; i< pairs.length; i++) {
        top_bars[i].style.height=(Math.floor(Math.random()*400)+100)+'px'
        pos[i]=0
    }
    score.innerHTML=result
    p=false
    clearInterval(interval)
    clearInterval(interval2)
    interval=window.setInterval(move,intervaltime)
    interval2=window.setInterval(game,15)
}

function move_bars(){
    for (let i = 0; i< pairs.length; i++) {
        if(pos[i]<500){
        pairs[i].style.transform='translateX('+pos[i]+'px)'
        pos[i]--
        }

        if(pos[i]<=limit[i]){
            pos[i]=new_pos[i]
            top_bars[i].style.height=(Math.floor(Math.random()*400)+100)+'px'
            result++        
        }
    }
}

function getCoordinates(){
    obj_rect=obj.getBoundingClientRect()
    for (let i=0; i<bars.length; i++) {
        bar_rect[i]=bars[i].getBoundingClientRect()
    }
}

function collapse(rect1 , rect2){
    if(
        (rect1.x<rect2.x+rect2.width) &&
        (rect1.x+rect1.width>rect2.x) &&
        (rect1.y<rect2.y+rect2.height) &&
        (rect1.y+rect1.height>rect2.y) 
    )
        return true
    else
        return false     
}


function game(){

    if(p){
        return
    }
    move_bars()
    getCoordinates()

    score.innerHTML=result
    if(max_result<result){
        max_result=result
        hscore.innerHTML=max_result
    }

    for (let i=0; i<bars.length; i++) {
        if(collapse(obj_rect,bar_rect[i])){
                clearInterval(interval2)
                clearInterval(interval)
        }
    }

    
    }

    




start.addEventListener('click',new_game)
window.addEventListener('keyup',function(e){
    if(e.keyCode==13)
            new_game()
    })
pause.addEventListener('click',function(){
    p=true
})
window.addEventListener('keyup',function(e){
    if(e.key=='p' || e.key=='P')
            p=true
    })