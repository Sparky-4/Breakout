class PaddleSelectState{
	constructor(){}
	enter(params)
	{	
		this.currentPaddle = 1;
		this.counter = 10;
	}
	
	update()
	{
		if(keys && keys[37] && this.counter <= 0)
		{
			if(this.currentPaddle == 0)
			{
				gSounds.no_select.load();
				gSounds.no_select.play();
			}
			else
			{				
				this.currentPaddle -= 1;
				gSounds.select.load();
				gSounds.select.play();
			}
			this.counter = 10;
		}
		
		if(keys && keys[39] && this.counter <= 0)
		{
			if(this.currentPaddle == 3)
			{
				gSounds.no_select.load();
				gSounds.no_select.play();
			}
			else
			{				
				this.currentPaddle += 1;
				gSounds.select.load();
				gSounds.select.play();
			}
			this.counter = 10;
		}
		this.counter--;
		
		if(keys && keys[13] && this.counter <= 0)
		{
			gSounds.confirm.load();
			gSounds.confirm.play();
			if(inv)
			{
				gStateMachine.change('serve', {
					paddle: new Paddle(this.currentPaddle),
					bricks: levelMaker.createMap(999999999),
					health: 100,
					score: 0,
					level: 999999999,
				})
			}				
			else
			{
				gStateMachine.change('serve', {
					paddle: new Paddle(this.currentPaddle),
					bricks: levelMaker.createMap(1),
					health: 3,
					score: 0,
					level: 1,
				})
			}
		}
		
		this.render();
	}
	
	render()
	{
		ctx.font = gFonts.large;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Choose Your Paddle', WINDOW_WIDTH/2, WINDOW_HEIGHT/4);
		ctx.font = gFonts.medium;
		ctx.fillStyle = 'white';
		ctx.fillText('Press Enter To Continue', WINDOW_WIDTH/2, WINDOW_HEIGHT/3);
		
		gFrames.paddles[1 + 4*this.currentPaddle].draw(WINDOW_WIDTH/2 - 32*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT*2/3-8*SCALE_FACTOR_HEIGHT);
		if(this.currentPaddle > 0)
			gFrames.arrows[0].draw(WINDOW_WIDTH/5-12*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT*2/3-12*SCALE_FACTOR_HEIGHT);
		if(this.currentPaddle < 3)
			gFrames.arrows[1].draw(WINDOW_WIDTH*4/5-12*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT*2/3-12*SCALE_FACTOR_HEIGHT);
	}
}