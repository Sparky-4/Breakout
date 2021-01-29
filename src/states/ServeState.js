class ServeState {
	constructor()
	{
		
	}
	
	enter(params)
	{
		this.paddle = params.paddle;
		this.bricks = params.bricks;
		this.health = params.health;
		this.score = params.score;
		this.level = params.level;
		
		currentBallSpeed = BALL_SPEED;
		this.ball = new Ball(Math.floor(Math.random()*7));
		this.ball.dx = Math.floor(Math.random()*BALL_SPEED - BALL_SPEED / 2);
		this.ball.setSpeed(this.ball.dx, 0);
		console.log(this.ball)
	}
	
	update()
	{
		this.paddle.update();
		this.ball.x = this.paddle.x + this.paddle.width/2 - this.ball.width/2;
		this.ball.y = this.paddle.y - this.ball.height;
		
		if(keys && keys[32])
		{
			gStateMachine.change('play', {
				paddle: this.paddle,
				bricks: this.bricks,
				health: this.health,
				score: this.score,
				ball: this.ball,
				level: this.level,
			});
		}
		if(keys && keys[82])
			location.reload();
	}
	
	render()
	{
		for(let i = 0; i < this.bricks.length; i++)
			this.bricks[i].render();
		this.paddle.render();
		this.ball.render();
		if(inv)
		{
			ctx.textAlign = 'left';
			ctx.font = gFonts.small;
			ctx.fillStyle = 'white';
			ctx.fillText('Cheater', WINDOW_WIDTH - 60*SCALE_FACTOR_WIDTH, 10*SCALE_FACTOR_HEIGHT);
		}
		else
			renderScore(this.score);
		renderHealth(this.health);
		
		ctx.font = gFonts.medium;
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Press Space To Serve', WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
		ctx.font = gFonts.large;
		ctx.fillText('Level ' + this.level, WINDOW_WIDTH/2, WINDOW_HEIGHT/2 - 33*SCALE_FACTOR_WIDTH);
	}
}