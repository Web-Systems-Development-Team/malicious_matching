$.fn.highscore_table = function() { //basic plug in structure
	$(this).load_highscores(); //don't know if there's an implicit this or not
};

$.fn.highscore_table.clear_highscores = function() {
	localStorage.removeItem("highscores");
	this.highscores = null;
	return this;
};

$.fn.highscore_table.load_highscores = function() {
	var str = localStorage.getItem("highscores");
	var hs = JSON.parse(str);
	this.highscores = hs;
	$(this).highscore_table.draw_highscores();
	return this;
};

$.fn.highscore_table.save_highscores = function() {
	localStorage.setItem("highscores", JSON.stringify(this.highscores));
	return this;
};

$.fn.highscore_table.draw_highscores = function() {
	if(this.highscores) {
		// var songs = data.playlist.songs;
		// for(var i=0; i<songs.length; ++i) {
		var text = "<tr><td>Name</td><td>Score</td></tr>";
		var scores = this.highscores.scores;
		for(var i=0; i<scores.length; ++i) {
			text +="<tr><td>"+scores[i].name+"</td><td>"+scores[i].score+"</td></tr>"
		}
		$(this).html(text);
	} else {
		$(this).html("No high scores. Play some!!");
	}
	return this;
};

$.fn.highscore_table.add_highscore = function(name, score) {
	var reccord = { "name":name, "score":score};
	if(this.highscores) {
		this.highscores.scores.push(reccord);
		this.highscores.scores.sort(function(a, b) {
			return b.score - a.score;
		});
		// trim down to 10 elements
		while(this.highscores.scores.length > 10)
			this.highscores.scores.pop();
	} else {
		this.highscores = new Object();
		this.highscores.scores = [reccord];
	}
	$(this).highscore_table.draw_highscores();
	$(this).highscore_table.save_highscores();
	return this;
};