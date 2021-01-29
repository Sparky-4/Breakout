class BaseState{ 	
	constructor()
	{
		this.counter = 10;
	}
	enter(){this.counter = 10;}
	
	update()
	{
		if(keys && keys[13] && this.counter <= 0)
		{
			gStateMachine.change('start');
			gSounds.no_select.load();
			gSounds.no_select.play();
		}
		else
			this.counter--;
		this.render()
	}
	
	render()
	{
		ctx.font = gFonts.large;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('High Scores', WINDOW_WIDTH/2, WINDOW_HEIGHT/10);
		
		ctx.font = gFonts.medium;
		for(let i = 0; i < 10; i++)
		{
			if(i == 0)
				ctx.fillStyle = '#FFD700';
			else if (i==1)
				ctx.fillStyle = '#C0C0C0';
			else if (i==2)
				ctx.fillStyle = '#cd7f32';
			else
				ctx.fillStyle = 'white';
			ctx.textAlign = 'left';
			ctx.fillText(i+1+'. '+highScoreNames[i], WINDOW_WIDTH/5, WINDOW_HEIGHT/(4)+(i*16*SCALE_FACTOR_WIDTH));
			ctx.textAlign = 'right';
			ctx.fillText(highScores[i], WINDOW_WIDTH*4/5, WINDOW_HEIGHT/(4)+(i*16*SCALE_FACTOR_WIDTH));
		}
		
	}
}