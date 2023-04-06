var fsMode = false; /* fullscreen status */

function fullscreen(){
    let elemento = document.querySelector("*");
    let fsButton = document.querySelector(".fullscreenButton");

    if(fsMode === false){
        elemento.requestFullscreen();
        fsButton.setAttribute("src", "./SVG/fullscreen-exit.svg");
        fsMode = true;
    }else{
        document.exitFullscreen();
        fsButton.setAttribute("src", "./SVG/arrows-fullscreen.svg");
        fsMode = false
    }
}


/* Add/Rem button style */
function onAddPlayer(){
    var button = document.querySelector(".addPlayer");
    button.setAttribute("src", "./SVG/person-fill-add.svg");
}
function leaveAddPlayer(){
    var button = document.querySelector(".addPlayer");
    button.setAttribute("src", "./SVG/person-add.svg");
}
function onRemPlayer(){
    var button = document.querySelector(".removePlayer");
    button.setAttribute("src", "./SVG/person-dash-fill.svg");
}
function leaveRemPlayer(){
    var button = document.querySelector(".removePlayer");
    button.setAttribute("src", "./SVG/person-dash.svg");
}
function onConfirmPlayer(){
    var button = document.querySelector(".confirmPlayer");
    button.setAttribute("src", "./SVG/check-circle-fill.svg");
}
function leaveConfirmPlayer(){
    var button = document.querySelector(".confirmPlayer");
    button.setAttribute("src", "./SVG/check-circle.svg");
}

/* Add/Remove player function */
var nOfPlayer = 2;
var player = new Array();

function addPlayer(){
    nOfPlayer++;
    let newElement = document.createElement("input");
    newElement.setAttribute("class", "playerName");
    newElement.setAttribute("placeholder", "Nome Giocatore " + nOfPlayer);
    newElement.setAttribute("name", "player" + nOfPlayer);
    newElement.setAttribute("type", "text");
    newElement.setAttribute("onchange", "checkSamePlayer(this)");
    let players = document.querySelector(".players");
    players.appendChild(newElement);
}
function removePlayer(){
    if(nOfPlayer>2){
        nOfPlayer--;
        let players = document.querySelector(".players");
        player.pop({"player": nOfPlayer, "life": lives});
        players.lastChild.remove();
    }else{
        notifier.show();
        notifier.text("Numero minimo di giocatori: 2");
    }        
}

//Add player to table of scores
function addPlayerToTable(player){
    let row = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdLife = document.createElement("td");
    let myTable = document.querySelector("#tablePlayer");
    
    //set attributes and content of new row
    row.setAttribute("name", player.player);
    row.setAttribute("onclick", "decreaseLife(this)");
    tdName.innerHTML = player.name;
    tdLife.innerHTML = player.life;
    tdLife.setAttribute("id", "lplayer" + player.player);

    //append new row to myTable
    row.appendChild(tdName);
    row.appendChild(tdLife);
    myTable.appendChild(row);
}

//function to check same name players
function checkSamePlayer(input){
    let allPlayersName = $(".players").children();
    let fsButton = document.querySelector(".fullscreenButton");
    let all = document.querySelector("*");
    let counter = 0;

    for (let index = 0; index < allPlayersName.length; index++)
        if(input.value === allPlayersName[index].value)                   
            counter++;
    if(counter > 1){
        input.value = "";
        notifier.show();
        notifier.text("Non possono esserci giocatori con lo stesso nome!");
    }
}

//function for life
function livesInput(inputElement){
    lives = inputElement.value;
}

//fuction for dice
var dice = ["NON ALLA FINE", "OVUNQUE", "NON ALL'INIZIO"];
function randDice(){
    let output = document.getElementById("dice");
    let randIndex = Math.trunc(Math.random()*3);
    output.innerHTML = dice[randIndex];
}

//function for random word
function randomWord(){
    let output = document.getElementById("word");
    let randIndex = Math.trunc(Math.random()*wordList.length);
    
    if(wordList[randIndex] !== "NULL"){
        output.innerHTML = wordList[randIndex];
        wordList[randIndex] = "NULL";
    }else
        randomWord();
}

//function start round
var enabledTable = false;
function startRound(){
    randDice();         //function for random dice
    randomWord();       //function for random word
    document.getElementById("explosion").pause();
    document.getElementById("explosion").load();
    document.getElementById("bombSound").play();
    enabledTable = false;
    $("caption").text("VITE RIMANENTI");
    $(".wordContainer").slideDown(300);
    $(".scores").slideDown(300);
    //start timer
    casual = Math.floor(Math.random() * (100000 - 15000 + 1) + 15000)
    setTimeout(endRound,casual);
    
}
//function after expolosion
function endRound(){
    document.getElementById("bombSound").pause();
    document.getElementById("bombSound").load();
    document.getElementById("explosion").play();
    $(".wordContainer").slideUp(200);
    $("caption").text("CHI HA PERSO QUESTO ROUND?");
    enabledTable = true;
}

function decreaseLife(row){
    let looser = row.getAttributeNode("name").value;

    if(enabledTable === true){
        player.forEach(element => {
            if(element.player == looser){
                element.life--;
                $("#lplayer" + element.player).text(element.life);
                if(element.life === 0){
                    row.remove();
                    notifier.show();
                    notifier.text(element.name + " è stato eliminato dal gioco!");
                    nOfPlayer--;
                }
            }
        });

        if(nOfPlayer === 1){
            notifier.show();
            notifier.text("PARTITA FINITA!");
        }

        $(".scores").slideUp(300, ()=>{
            $("#bombSVG").slideDown(500);
        });
    }
}

/* WORD LIST */
var wordList = new Array();
function initializeWordlist(){
    wordList = [
        "ATT", "EST",
        "SUI", "LAT",
        "MEG", "EE",
        "IRI", "TAN",
        "STI", "DUA",
        "EDI", "SLA",
        "INF", "NIO",
        "OS", "PER",
        "NG", "GHO",
        "FAN", "LUC",
        "VU", "HIN",
        "SS", "GRA",
        "USA", "DEL",
        "ANT", "BAR",
        "DO", "BB",
        "RES", "ZU",
        "GEL", "NEO",
        "MP", "ID",
        "ARCI", "ISA",
        "QUI", "LL",
        "AZI", "CHI",
        "SPU", "UO",
        "TOR", "EMB",
        "OO", "PAR",
        "GIU", "BIO",
        "ILL", "SEI",
        "OTT", "ELI",
        "RTO", "PRO",
        "PA", "LEO",
        "NO", "ETE",
        "VE", "CQ",
        "RG", "PRE",
        "RET", "ILO",
        "TRI", "SIA",
        "ERE", "BI",
        "NC", "CHE",
        "DAI", "BL",
        "NU", "OCA",
        "INT", "BE",
        "FR", "MET",
        "EVO", "PIA",
        "TU", "ITT",
        "GO", "MENO",
        "ODO", "AU",
        "NSA", "VIE",
        "MAL", "IU",
        "IPO", "TAV",
        "FLU", "RAI",
        "ORO", "CES",
        "MM", "FIO",
        "IPE", "CAN",
        "NAV", "ES",
        "IST", "DA",
        "FON", "VAN",
        "SCA", "TEM",
        "ROS", "LIA",
        "DR", "CIO",
        "MIS", "GA",
        "ZIE", "ITA",
        "AIO", "SO",
        "CON", "ELE",
        "AME", "COR",
        "OE", "MIA",
        "CAI", "OV",
        "NNO", "REC",
        "AL", "SCI",
        "ESS", "FU",
        "OPI", "CAV",
        "IO", "PN",
        "IVO", "CARE",
        "BRA", "INA",
        "CCA", "ORA",
        "SCH", "ZA",
        "BOI", "RAD",
        "INZ", "LAI",
        "POL", "ZZO",
        "TT", "ONI",
        "GIA", "RZI",
        "IM", "AMP",
        "MO", "RIO",
        "DIT", "CO",
        "GU", "HA",
        "UN", "LIR",
        "FIN", "OB",
        "STA", "PPO",
        "MINI", "UL",
        "UTT", "MAS",
        "AS", "AE",
        "TAL", "PU",
        "SM", "NOI",
        "LO", "MON",
        "SCR", "RU",
        "SAR", "IE",
        "ZIO", "MAT",
        "CRO", "GLI",
        "TIR", "ZO",
        "OF", "GH",
        "UC", "ND",
        "LOG", "NER",
        "OI", "DIRE",
        "PED", "EO",
        "FE", "ECC",
        "VIO", "TON",
        "QUA", "VAL",
        "BU", "ING",
        "SAI", "BOT",
        "HE", "ERO",
        "NZ", "TRA",
        "AP", "STR",
        "END", "IGA",
    ]
}
