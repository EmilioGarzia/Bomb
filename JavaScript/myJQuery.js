var lives = 1;
var notifier = $(".notifier");



$(document).ready(()=>{
    initializeWordlist();
    $(".overlayInstruction").hide();
    $(".gameScene").hide();
    $("#bombSVG").hide();
    $(".minimize").hide();
    $(".notifier").hide();

    $(".confirmPlayer").click(()=>{
        //Array Players Creation
        var allPlayersName = $(".players").children();

        let check = true;

        for(let index = 0; index < allPlayersName.length; index++) {
            if(allPlayersName[index].value !== ""){
                player.push({
                    "player": index+1,
                    "life": lives,
                    "name": allPlayersName[index].value
                })

                //function for add the row to the table of scores
                addPlayerToTable(player[index]);
            }else
                check = false;
        }

        if(check === true){
            //Show all box of game scene
            $(".formPlayer").slideUp(600, ()=>{
                $("#bombSVG").slideDown(800);
                $(".minimize").slideDown(800);
                $(".notifier").hide();
            });
        }else{
            notifier.text("Tutti i giocatori devono avere un nome!");
            notifier.show();
            check = true;
        }

        //After bomb click
        $("#bombSVG").click(()=>{
            if(notifier.text() === "PARTITA FINITA!")
                location.reload();
            notifier.hide();
            $(".minimize").slideUp(600);
            $("#bombSVG").slideUp(600, ()=>{
                $(".gameScene").slideDown(800,()=>{
                    startRound();
                });
            })
        })
    })
})


/* SHOW/HIDE OVERALY */
$("#showOverlayButton").click(()=>{
    $("#logo").css("opacity","0");
    $(".overlayInstruction").fadeIn(300);
})

$(".overlayInstruction").click(()=>{
    $(".overlayInstruction").fadeOut(300);
    $("#logo").css("opacity","1");
})