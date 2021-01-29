class StartState{ 
	constructor()
	{
		this.highlighted = 1;
		this.cooldown = 0;
		this.counter = 10;
	}
	
	enter(params){
		this.counter = 10;
		if(gSounds.music.paused)
			gSounds.music.load();
		gSounds.music.play();
	}
	
	update()
	{
		if(((keys && keys[38]) || (keys && keys[40])) && this.cooldown <= 0)
		{
			if(this.highlighted == 1)
				this.highlighted = 2;
			else
				this.highlighted = 1;
			gSounds.paddle_hit.play();
			this.cooldown = 10;
		}
		if(keys && keys[13] && this.counter <= 0)
		{
			if(this.highlighted == 1)
				gStateMachine.change('select', {});
			else 
				gStateMachine.change('scores');
			gSounds.confirm.play();
			gSounds.music.play();
		}
		this.cooldown--;
		this.counter--;
		if(keys && keys[27])
			window.close();
		if(keys && keys[82])
			location.reload();
	}
	
	render()
	{
		ctx.font = gFonts.large;
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText("BREAKOUT", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH, VIRTUAL_HEIGHT/3*SCALE_FACTOR_HEIGHT);
		
		ctx.font = gFonts.medium;
		
		if(this.highlighted == 1)
			ctx.fillStyle = '#67ffff';
		ctx.fillText("START", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH, VIRTUAL_HEIGHT*SCALE_FACTOR_HEIGHT - 70*SCALE_FACTOR_HEIGHT);
		ctx.fillStyle = 'white';
		
		if(this.highlighted == 2)
			ctx.fillStyle = '#67ffff';
		ctx.fillText("HIGH SCORES", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH, VIRTUAL_HEIGHT*SCALE_FACTOR_HEIGHT - 50*SCALE_FACTOR_HEIGHT);
	}
}