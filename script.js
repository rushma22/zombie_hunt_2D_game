
var runs = new Audio("run.mp3");
var jumps = new Audio("slide.mp3");
var theme = new Audio("theme.mp3");
var attacks = new Audio("eat.mp3");
var deads = new Audio("dead.mp3");


var main = document.getElementById("main");
var man = document.getElementById("man");

function key(event){
    theme.play();
    theme.loop=true;

   if(event.which==13){
        game();
       if(rungame==0){
        eggg = egg();
        eggmove = setInterval(move,100);
        rungame = setInterval(run,100);
        runs.play();       
        walkgame = setInterval(walk,100);
        scoregame = setInterval(score,100);
        backgame = setInterval(back,100);
       }
    }

    if(event.which==32){
        if(jumpgame==0){
        clearInterval(rungame);
        runs.pause();
        jumpgame= setInterval(jump,100);
        jumps.play();
        rungame=-1
        }
        
    }
}

var eid=0;
var e=1000;
var eggg=0;

function egg (){
    
    for (var y=0;y<100;y++){
        var egg = document.createElement("img");
        egg.src ="egg.png";
        egg.className="f";
        egg.style.marginLeft=e+"px";

        if(y<=3){
            e=e+500;
        }

        if(y>=4){
            e=e+300;
        }
        egg.id="egg"+y;
        main.appendChild(egg);
       
    }
}

var eggmove = 0;

function move(){
    for(var y=0; y<100; y++){
        var z = getComputedStyle(document.getElementById("egg"+y));
        var w = parseInt(z.marginLeft)-20;
        document.getElementById("egg"+y).style.marginLeft = w + "px";
        
        if(w>=300 & w<=350){
            
           
            if(margintop > 365){
                document.getElementById("zombie").classList.add('z');
                clearInterval(rungame);
                runs.pause();
                clearInterval(jumpgame);
                jumpgame= -1
                clearInterval(eggmove);
                clearInterval(backgame);
                clearInterval(scoregame);
                deadgame=setInterval(dead,100);
                theme.pause();
                deads.play();
                attacks.play();
                attacks.loop=true;
            }
        }
       
    }
}

function game(){
    main.style.visibility="visible";
}

var r=1
var rungame=0
function run(){
    r=r+1;
    if(r==9){
        r=1
    }

    man.src="Run ("+r+").png";
}

var w=1
var walkgame=0
function walk(){
    w=w+1
    if(w==11){
        w=1
    }
    document.getElementById("zombie").src="Walk ("+w+").png"
}

var j=1
var jumpgame = 0
var margintop = 400

function jump(){
    
    if(j<=5){
        margintop -= 50;
    }

    if(j>=6){
        margintop += 50;
    }

    man.style.marginTop = margintop+"px";

    j=j+1;

    if(j==11){
        j=1;
        clearInterval(jumpgame);
        rungame=0
        rungame = setInterval(run,100);
        runs.play();
        jumpgame=0;

        if(eid==0){
            eid=egg();
        }

        if(eggmove==0){
            eggmove=setInterval(move,100) ;
        }

        if(backgame==0){
            backgame=setInterval(back,100) ;
        }

        if(scoregame==0){
            scoregame=setInterval(score,100) ;
        }


    }
    man.src="Jump ("+j+").png"
}


var s=0
var scoregame = 0
function score (){
    s=s+10

    document.getElementById("score").innerHTML=s
}

var b=0
var backgame=0
function back(){
    b=b-20
    main.style.backgroundPositionX=b+"px";
}

var deadgame= 0;
var d=1;

function dead(){
    d=d+1;
    if(d==11){
        d=10;
        document.getElementById("zombie").classList.add('z');
        man.style.marginTop="425px";
        clearInterval(deadgame);
        attackgame=setInterval(attack,500);
        
    }
    man.src="Dead ("+d+").png";
}

function reload(){
    location.reload();
}

var attackgame=0
var a=1
function attack (){
    a=a+1
    if (a==9){
        a=1;

        clearInterval(attackgame);
        document.getElementById("end").style.visibility="visible";
        attacks.pause();
        theme.play();
        document.getElementById("endscore").innerHTML=s;
    }
    document.getElementById("zombie").src="Attack ("+a+").png";
   
}
