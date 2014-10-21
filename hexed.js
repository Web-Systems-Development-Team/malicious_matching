(function($){

    $.fn.hexed = function(arg) {
        if(!(arg instanceof String)) {
            var settings = arg;
            difficulty = settings.difficulty;
            turns = settings.turns;
            init();
        } else {
            var action = arg;
            if(action == "name of a command") {
                ;; //do that command 
            } else {
                $.error('Action '+ action +' does not exist on jQuery.hexed');
            }
        }
        return this;
    }

    function init() {
        make_sliders();
        var count=0;
        $("#gen").click(function() { // need time
            start = new Date().getMilliseconds();
            var c=document.getElementById("goalCanvas");
            var ctx=c.getContext("2d");
            ctx.beginPath();
            ctx.arc(100,75,50,0,2*Math.PI);
            ctx.fillStyle=randomColor();
            ctx.fill();
            count=count+1;
            if(count==document.getElementById('turns').value){
                alert("You lose");
            }
        });
        $("#answer").click(function() {
            end = new Date().getMilliseconds();
        $("#score").text("Score: " + calculate_score());
            $("#score").html(calculate_score());
        });
    }

    theColor=[];                       
    function randomColor(){ //determine random rgb
        var r=Math.floor((Math.random() * 255)); //range of 0-255
        var g=Math.floor((Math.random() * 255));
        var b=Math.floor((Math.random() * 255));
        theColor=[r,g,b];
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    //Draws the player's color choice from the sliders next to the original color
    function playerColor() {
        //alert("playerColoe");
        var c=document.getElementById("playerCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.fillStyle = "#" + $("#red_slider").slider("value").toString(16) +
    	$("#green_slider").slider("value").toString(16) +
    	$("#blue_slider").slider("value").toString(16);
        ctx.fill();
    }

    function make_sliders() {
        $("#red_slider").slider({ min: 0, max: 255, slide: function(event, ui) {
    	$("#red_slider_number").val(ui.value);
    	$("#slider").find(".ui-slider-handle").text(ui.value);
    	playerColor();
        }});
        $("#green_slider").slider({ min: 0, max: 255, slide: function(event, ui) {
    	$("#green_slider_number").val(ui.value);
    	playerColor();
        }});
        $("#blue_slider").slider({ min: 0, max: 255, slide: function(event, ui) {
    	$("#blue_slider_number").val(ui.value);
    	playerColor();
        }});
    }

    //determine the percent difference between the actual and
    //expected r, g, b variables
    function percent_off() {
        return ((theColor[0] - $("#red_slider").slider("value"))/255 +
                (theColor[1] - $("#green_slider").slider("value"))/255 +
                (theColor[2] - $("#blue_slider").slider("value"))/255) * 100 / 3;
        /* division by 765 because it would otherwise be divided by 255 and 
           then by 3 to take the average */
    }

    // determine score
    // ((15 – difficulty – percent_off) / (15 – difficulty)) * (15000 – milliseconds_taken)
    function calculate_score() {
        var weighted_diff = 15 - difficulty;
        var score = (weighted_diff - percent_off()) / (weighted_diff * (end-start));
        return percent_off() + "% off";
    }
}( jQuery ));