/*
    Document   : game.js

    Author     : Reichert, Tobias, OFR
                 Rothe, Martin, OFR
    History:
    2015-02-23  TR  Create Document
*/

// Canvas vorbereiten
canvas = document.getElementById('game_engine');
ctx = canvas.getContext('2d');

// Listener hinzufügen
canvas.addEventListener("mousedown", mousedownSpielfeld, false);
document.addEventListener('keydown', keydownSpielfeld);

// Variablen vorbereiten
var spielfeld = new createSpielfeld();
var active = true;
var level = null;
var moorhuhn = [];

/* Dinge für das Spiel (allgemein) */

function openGame(a){
    // Level wird festgesetzt
    level = a;
    // localStorage wird eingelesen
    loadGame();
    // Spiel wird gestartet
    startGame();
}

function startGame(){
    timeTimer = setInterval(function(){
        timeSpielfeld();
    }, 1000);

    moveTimer = setInterval(function(){
        moveMoorhuhn();
        drawMoorhuhn();
    }, 10);

    moorhuhnTimer = setInterval(function(){
        addMoorhuhn();
    }, 1000);

    active=true;
}

function loadGame(){

    // Spielzeit wird geladen
    spielfeld.time = parseInt(window.localStorage.getItem("GameTime"));
    if(isNaN(spielfeld.time)){
        spielfeld.time = 60;
    }
    document.getElementById('time').innerHTML = spielfeld.time;

    // Punktestand wird geladen
    spielfeld.score = parseInt(window.localStorage.getItem("GameScore"));
    if(isNaN(spielfeld.score)){
        spielfeld.score = 0;
    }
    document.getElementById('score').innerHTML = spielfeld.score;

    // Munition wird geladen
    spielfeld.ammo = parseInt(window.localStorage.getItem("GameAmmo"));
    if(isNaN(spielfeld.ammo)){
        spielfeld.ammo = 10;
    }
    document.getElementById('ammo').innerHTML = spielfeld.ammo;

    // Moorhühner werden geladen

    var i=0;
    var found = 1;

    while(found===1){
        if((window.localStorage.getItem("Moorhuhn"+i)===null)){
            found=0;
        }else{
            addMoorhuhn();
            moorhuhn[i].src = document.getElementById("moorhuhn");
            moorhuhn[i].y = parseInt(window.localStorage.getItem("Moorhuhn"+i+".y"));
            moorhuhn[i].x = parseInt(window.localStorage.getItem("Moorhuhn"+i+".x"));
            moorhuhn[i].hit = window.localStorage.getItem("Moorhuhn"+i+".hit");
            moorhuhn[i].speed = window.localStorage.getItem("Moorhuhn"+i+".speed");
            moorhuhn[i].scale = window.localStorage.getItem("Moorhuhn"+i+".scale");
        }

        i++;
    }

}

function stopGame(){
    window.clearInterval(timeTimer);
    window.clearInterval(moveTimer);
    window.clearInterval(moorhuhnTimer);
    active=false;
}

function saveGame(){

    window.localStorage.setItem("GameTime", spielfeld.time);
    window.localStorage.setItem("GameScore", spielfeld.score);
    window.localStorage.setItem("GameAmmo", spielfeld.ammo);

    for(i=0;i<moorhuhn.length;i++){
        window.localStorage.setItem("Moorhuhn"+i, "Moorhuhn"+i);
        window.localStorage.setItem("Moorhuhn"+i+".y", moorhuhn[i].y);
        window.localStorage.setItem("Moorhuhn"+i+".x", moorhuhn[i].x);
        window.localStorage.setItem("Moorhuhn"+i+".hit", moorhuhn[i].hit);
        window.localStorage.setItem("Moorhuhn"+i+".speed", moorhuhn[i].speed);
        window.localStorage.setItem("Moorhuhn"+i+".scale", moorhuhn[i].scale);
   }

}

function closeGame(){
    // logalStorage wird geschrieben
    saveGame();
    // localStorage leeren
    if(spielfeld.time===0){
        window.localStorage.clear();
    }
}


/* Dinge für das Spielfeld */

function createSpielfeld(){

    this.time = null;
    this.score = null;
    this.ammo = null;

}

function timeSpielfeld(){
    spielfeld.time --;
    document.getElementById('time').innerHTML = spielfeld.time;

    if(spielfeld.time===0){
        stopGame();
        closeGame();
    }

}

function keydownSpielfeld(e){
    if(spielfeld.time > 0){
        // Munition mit Strg nachladen
        if (e.keyCode === 17){
            spielfeld.ammo = 10;
            document.getElementById('ammo').innerHTML = spielfeld.ammo;
        }

        // Spiel mit Leertaste unterbrechen
        else if (e.keyCode === 32) {
            if(active===true){
                stopGame();
            }else{
                startGame();
            }
        }
    }
}

function mousedownSpielfeld(e){

    // Prüfen, ob Munition vorhanden ist
    if(spielfeld.ammo > 0){

        mouseX = e.pageX - document.getElementById('game_engine').offsetLeft;
        mouseY = e.pageY - document.getElementById('game_engine').offsetTop;

        if(spielfeld.time > 0){

            spielfeld.ammo += -1;
            document.getElementById('ammo').innerHTML = spielfeld.ammo;

            // Prüfen, ob Moorhuhn getroffen
            for(i=0;i<moorhuhn.length;i++){

                if(mouseX > moorhuhn[i].x
                        && mouseX < (moorhuhn[i].x + (70 * moorhuhn[i].scale))
                        && mouseY > moorhuhn[i].y
                        && mouseY < (moorhuhn[i].y + (50 * moorhuhn[i].scale))){


                    if(moorhuhn[i].hit === false){

                        // Punkte werden vergeben
                        if(moorhuhn[i].scale <= 0.6){
                            spielfeld.score += 15;
                            document.getElementById('score').innerHTML = spielfeld.score;
                        }else{
                            if(moorhuhn[i].scale <= 0.8){
                                spielfeld.score += 10;
                                document.getElementById('score').innerHTML = spielfeld.score;
                            }
                            else if(moorhuhn[i].scale > 0.8){
                                spielfeld.score += 5;
                                document.getElementById('score').innerHTML = spielfeld.score;
                            }
                        }
                    }

                    // Trefferstatus wird gesetzt
                    moorhuhn[i].hit = true;
                }
            }
        }
    }
}

/* Dinge für die Moorhühner */

function createMoorhuhn(){
    var min = 0;
    var max = 600;

    this.src = document.getElementById("moorhuhn");
    this.y = Math.floor(Math.random() * (max - min)) + min;
    this.x = 1024;
    this.hit = false;
    this.speed = (parseInt(level) * 2) + 0.5;

    if(level===3){
        this.scale = 0.5;
    }else{
        this.scale = 0.5 + (Math.random() * 0.5);
    }
}

function addMoorhuhn(){
    moorhuhn.push(new createMoorhuhn());
}

function moveMoorhuhn(){
    ctx.clearRect(0,0,1024,768);

    for(i=0;i<moorhuhn.length;i++){
        if(moorhuhn[i].hit === true){
            moorhuhn[i].y += +1;
            if(moorhuhn[i].y > 768){
                window.localStorage.removeItem(moorhuhn[i]);
            }
        }
        else{
            moorhuhn[i].x += - moorhuhn[i].speed;
        }
    }
}

function drawMoorhuhn(){
    for(i=0;i<moorhuhn.length;i++){
        ctx.drawImage(moorhuhn[i].src, moorhuhn[i].x, moorhuhn[i].y, 70 * moorhuhn[i].scale, 50 * moorhuhn[i].scale);
    }
}
