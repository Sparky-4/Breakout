class GameOverState{
	constructor()
	{
		
	}
	
	enter(params)
	{
		this.score = params.score
	}
	
	update()
	{
		if(keys && keys[13])
			gStateMachine.change('start');
		if(keys && keys[27])
			window.close();
	}
	
	render()
	{
		ctx.font = gFonts.large;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('GAME OVER', WINDOW_WIDTH/2, WINDOW_HEIGHT/3);
		ctx.font = gFonts.medium;
		ctx.fillText('Final Score: ' + this.score, WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
		ctx.fillText('Press Enter!', WINDOW_WIDTH/2, WINDOW_HEIGHT*3/4);
		
	}
}