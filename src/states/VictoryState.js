class VictoryState{
	constructor(){}
	
	enter(params)
	{
		this.level = params.level;
		this.score = params.score;
		this.paddle = params.paddle;
		this.health = params.health;
		this.ball = params.ball;
	}
	
	update()
	{
		this.paddle.update();
		this.ball.x = this.paddle.x + this.paddle.width/2 - this.ball.width/2;
		this.ball.y = this.paddle.y - this.ball.height;
		
		if(keys && keys[13])
		{
			if(inv)
			{
				gStateMachine.change('serve', {
					level: this.level,
					paddle: this.paddle,
					bricks: levelMaker.createMap(this.level),
					health: this.health,
					score: 0,
				});

			}
			else
			{
				gStateMachine.change('serve', {
					level: this.level + 1,
					paddle: this.paddle,
					bricks: levelMaker.createMap(this.level+1),
					health: this.health,
					score: this.score,
				});
			}
		}
		if(keys && keys[82])
			location.reload();
	}
	
	render()
	{
		this.paddle.render();
		this.ball.render();
		
		renderScore(this.score);
		renderHealth(this.health);
	
		ctx.font = gFonts.large;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Level '+this.level+' complete', WINDOW_WIDTH/2, WINDOW_HEIGHT/3);
		
		ctx.font = gFonts.medium;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Press Enter To Continue', WINDOW_WIDTH/2, WINDOW_HEIGHT*2/3);
	}
}