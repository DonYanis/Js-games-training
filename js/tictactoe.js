const xogrid=document.querySelector('.grid2');

for(let i=0;i<9;i++){
    let tmp=document.createElement('div')
    xogrid.appendChild(tmp)
}

const winner_element=document.querySelector('#winner')
const start_bt=document.querySelector('.new_game_btn')
const square=document.querySelectorAll('.grid2 div')
const winner=document.getElementById('winner')
var pl1,pl2,player,random_pos,x;


xo_init();


for(let i=0;i<square.length;i++)
    { 
        square[i].addEventListener('click',function()
            {
                
            if(!square[i].classList.contains('player1')&& !square[i].classList.contains('player2'))
                {
                    if(player===1 && x<9 && !xowin(pl1) && !xowin(pl2))
                        {
                        square[i].classList.add('player1')
                        pl1[i]=true;
                        player=2;
                        x++;   
                        } 
                    
                    if(player===2 && x<9 && !xowin(pl1) && !xowin(pl2))
                        {
                        do {
                            random_pos=attack()
                            if(random_pos===undefined || square[random_pos].classList.contains('player1')){
                                random_pos=defence()
                                if(random_pos===undefined || square[random_pos].classList.contains('player2') ){
                                    random_pos=Math.floor(Math.random()*9)
                                }
                            }
                        } while(square[random_pos].classList.contains('player1')||square[random_pos].classList.contains('player2'))

                            square[random_pos].classList.add('player2');
                            pl2[random_pos]=true;
                            player=1;
                            x++;                              
                        }
                }
                final_win()   
            })
    }
            
function xo_init() {
    pl1=[false,false,false,false,false,false,false,false,false],
    pl2=[false,false,false,false,false,false,false,false,false],
    x=0,
    player=1;
    winner.innerText=''
}

function new_game() {
    xo_init()
    for(let i=0; i<9; i++){
        square[i].classList.remove('player1')
        square[i].classList.remove('player2')
    }
}

function xowin(tab) {
    if(
        (tab[0]&&tab[1]&&tab[2])||
        (tab[3]&&tab[4]&&tab[5])||
        (tab[6]&&tab[7]&&tab[8])||
        (tab[0]&&tab[3]&&tab[6])||
        (tab[1]&&tab[4]&&tab[7])||
        (tab[2]&&tab[5]&&tab[8])||
        (tab[0]&&tab[4]&&tab[8])||
        (tab[2]&&tab[4]&&tab[6])
    )
    return true;
    else 
    return false;
}

function final_win(){
    if(xowin(pl1)){ 
        winner.innerText='Blue Wins'
        winner.style.color='blue'
    }
        else if (xowin(pl2)) {
            winner.innerText='Yellow Wins'
            winner.style.color='yellow'
        }
            else if(x>=9){
                winner.innerText='Draw'
                winner.style.color='red'
            }

}

function generate_pos(a,b,c,tab){
    if(tab[a]===true && tab[b]===true){
        return c}
        else if(tab[a]===true && tab[c]===true){
            return b}
            else if(tab[c]===true && tab[b]===true){
                return a}
}

function defence(){
    let target=generate_pos(0,1,2,pl1)
    if(target===undefined || square[target].classList.contains('player2') ){
        target=generate_pos(3,4,5,pl1) 
        if(target===undefined || square[target].classList.contains('player2') ){
            target=generate_pos(6,7,8,pl1)
            if(target===undefined || square[target].classList.contains('player2') ){
                target=generate_pos(0,3,6,pl1)
                if(target===undefined || square[target].classList.contains('player2') ){
                    target=generate_pos(1,4,7,pl1)
                    if(target===undefined || square[target].classList.contains('player2') ){
                        target=generate_pos(2,5,8,pl1)
                        if(target===undefined || square[target].classList.contains('player2') ){
                            target=generate_pos(0,4,8,pl1)
                            if(target===undefined || square[target].classList.contains('player2') ){
                                target=generate_pos(2,4,6,pl1)
    }   }   }   }   }   }   }
    return target
}

function attack(){
    let target=generate_pos(0,1,2,pl2)
    if(target===undefined || square[target].classList.contains('player1') ){
        target=generate_pos(3,4,5,pl2) 
        if(target===undefined || square[target].classList.contains('player1') ){
            target=generate_pos(6,7,8,pl2)
            if(target===undefined || square[target].classList.contains('player1') ){
                target=generate_pos(0,3,6,pl2)
                if(target===undefined || square[target].classList.contains('player1') ){
                    target=generate_pos(1,4,7,pl2)
                    if(target===undefined || square[target].classList.contains('player1') ){
                        target=generate_pos(2,5,8,pl2)
                        if(target===undefined || square[target].classList.contains('player1') ){
                            target=generate_pos(0,4,8,pl2)
                            if(target===undefined || square[target].classList.contains('player1') ){
                                target=generate_pos(2,4,6,pl2)
    }   }   }   }   }   }   }
    return target
}

start_bt.addEventListener('click',new_game)