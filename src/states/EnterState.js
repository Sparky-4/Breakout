class EnterState{
	constructor(){}
	enter(score){
		this.name = [65,65,65];
		this.selected = 0;
		this.score = score;
		this.counter = 10;
	}
	
	getNameString()
	{
		return String.fromCharCode(this.name[0])
				+ String.fromCharCode(this.name[1])
				+ String.fromCharCode(this.name[2])
	}
	
	update()
	{
		if(keys && keys[40] && this.counter <= 0)
		{
			gSounds.select.load();
			gSounds.select.play();
			this.name[this.selected]++;
			if(this.name[this.selected] > 90)
				this.name[this.selected] = 65;
			this.counter = 10;
		}
		else if(keys && keys[38]&& this.counter <= 0)
		{
			gSounds.select.load();
			gSounds.select.play();
			this.name[this.selected]--;
			if(this.name[this.selected] < 65)
				this.name[this.selected] = 90;
			this.counter = 10;
		}
			
		if(keys && keys[37] && this.counter <= 0)
		{
			if(this.selected == 0)
				this.selected = 2;
			else
				this.selected--;
			this.counter = 10;
		}
		
		if(keys && keys[39] && this.counter <= 0)
		{
			if(this.selected == 2)
				this.selected = 0;
			else
				this.selected++;
			this.counter = 10;
		}
		this.counter--;
		if(keys && keys[13] && this.counter <= 0)
		{
			gSounds.confirm.load();
			gSounds.confirm.play();
			gStateMachine.change('scores');
			for(let i = 0; i < 10; i++)
			{
				if(highScores[i] < this.score)
				{
					highScores.splice(i, 0, this.score);
					highScoreNames.splice(i, 0, this.getNameString());
					for(let i = 0; i < 10; i++)
					{
						localStorage.setItem("Breakout"+i, highScores[i]);
						localStorage.setItem("BreakoutName"+i, highScoreNames[i]);
					}
					return;
				}
			}
		}
		
		this.render();
	}
	
	render()
	{
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = gFonts.large;
		ctx.fillText('New High Score!', WINDOW_WIDTH/2, WINDOW_HEIGHT/8);
		ctx.font = gFonts.medium;
		ctx.fillText(this.score, WINDOW_WIDTH/2, WINDOW_HEIGHT/4);
		ctx.fillText("Press Enter To Continue", WINDOW_WIDTH/2, WINDOW_HEIGHT*4/5);
		
		ctx.font = gFonts.large;
		if(this.selected == 0)
			ctx.fillStyle = '#67ffff';
		ctx.fillText(String.fromCharCode(this.name[0]), WINDOW_WIDTH/2-33*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT/2);
		ctx.fillStyle = 'white';
		
		if(this.selected == 1)
			ctx.fillStyle = '#67ffff';
		ctx.fillText(String.fromCharCode(this.name[1]), WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
		ctx.fillStyle = 'white';
		
		if(this.selected == 2)
			ctx.fillStyle = '#67ffff';
		ctx.fillText(String.fromCharCode(this.name[2]), WINDOW_WIDTH/2+33*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT/2);
		ctx.fillStyle = 'white';
	}
}