'use strict'

// Deklaration der Variablen für die Funktion des Hauptmenüs

var anleitung = document.getElementById("anleitungButton");
var buttonsDiv = document.getElementById("buttonsDiv");
var anleitungsDiv = document.getElementById("spielanleitungDiv");
var zuruckButton = document.getElementById("zuruckAnleitungButton");

// Funktion zum Verschwinden lassen des Hauptmenüs und Anzeigen des Divs mit der Spielanleitung

var hidemenu = function () {
    anleitungsDiv.classList.toggle("hidden");
    buttonsDiv.classList.toggle("hidden");
};

// Eventlistener für den Button "Spielanleitung" und den "Zurück" Button auf dem Spielanleitungs DIV
    anleitung.addEventListener("click",hidemenu);
    zuruckButton.addEventListener("click",hidemenu);

// Funktion bei Klick auf "Spiel starten" um Menü auszublenden, damit ein neues Spiel gestartet werden kann.

    var playGame = document.getElementById("spielstarten");
    var menu = document.getElementById("menu");
    var onlymenubutton = document.getElementById("onlymenubuttondiv");

    var hidemenufornewgame = function (){
        menu.classList.toggle("hidden");
        onlymenubutton.classList.toggle("hidden");
    }

    playGame.addEventListener("click", hidemenufornewgame);

// Funktion des OnlyMenüButtons, damit das große Menü wieder angezeigt wird

    var onlymenu = document.getElementById("onlymenu");

    var showmenu = function () {
        menu.classList.toggle("hidden");
        onlymenubutton.classList.toggle("hidden");
    }

// Aktionlistener für den kleinen Menübutton oben links, wenn das Hauptmenü ausgeblendet ist
// Auf "Click" wird der Menü Button ausgeblendet und das Hauptmenü eingeblendet

    onlymenu.addEventListener("click", hidemenufornewgame);



// Funktion zum Verschwinden lassen des Hauptmenüs und Anzeigen des Divs mit der Spieleinstellungen

    var spieleinstellungenButton = document.getElementById("einstellungen");
    var spieleinstellungenDiv = document.getElementById("spieleinestellungen");
    var zuruckButtonEinstellungen = document.getElementById("zuruckEinstellungenButton");

var hidemenusettings = function () {
    spieleinstellungenDiv.classList.toggle("hidden");
    buttonsDiv.classList.toggle("hidden");
};

// Eventlistener für den Button "Spielanleitung" und den "Zurück" Button auf dem Spielanleitungs DIV
    spieleinstellungenButton.addEventListener("click",hidemenusettings);
    zuruckButtonEinstellungen.addEventListener("click",hidemenusettings);
