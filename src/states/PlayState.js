class PlayState{
	
	constructor()
	{
		this.paused = false;
		this.cooldown = 10;
		this.isHit = false;
		this.oneUp = 500;
		this.isOneUp = false;
		this.color = "#67ffff";
		this.powerUpsList = [];
		this.currentPowerUps = [];
		this.sizeCounter = 0;
	}
	
	enter(params)
	{
		this.paddle = params.paddle;
		this.bricks = params.bricks;
		this.health = params.health;
		this.score = params.score;
		this.ball = params.ball;
		this.level = params.level;
		console.log(this.ball);
		this.cooldown = 10;
		currentBallSpeed = BALL_SPEED;
		this.powerUpsList = [];
		this.currentPowerUps = [];
		this.sizeCounter = 0;
	}
	
	checkVictory()
	{
		for(let i = 0; i < this.bricks.length; i++)
			if(this.bricks[i].inPlay)
				return false;
		return true;
	}
	
	tryPowerUp()
	{
		if(Math.floor(Math.random()*100) == 0)
			this.powerUpsList.push(new PowerUp(this.ball.x, this.ball.y, (Math.floor(Math.random()*2)+6)))
	}
	
	update()
	{
		if(keys && keys[82])
			location.reload();
		if (this.paused)
		{
			if(keys && keys[32] && this.cooldown <= 0)
			{
				this.paused = false;
				gSounds.pause.play();
				this.cooldown = 10;
			}
			else
			{
				this.cooldown--;
				return;
			}
				
		}
		else if(keys && keys[32] && this.cooldown <= 0)
		{
			this.paused = true;
			gSounds.pause.play();
			this.cooldown = 10;
			return;
		}
		
		if(this.sizeCounter > 0)
			this.sizeCounter--;
		else if(this.paddle.size != 1)
		{
			this.paddle.size = 1;
			this.paddle.resize();
			for(let i = 0; i < this.currentPowerUps.length; i++)
			{
				if(this.currentPowerUps[i].type == 6 || this.currentPowerUps[i].type == 7)
					this.currentPowerUps.splice(i, i+1)
			}
			
		}
		
		if(this.sizeCounter <=120 && this.sizeCounter > 0 &&
			this.sizeCounter%20 == 0 && this.paddle.size != 1)
		{
			gSounds.no_select.load();
			gSounds.no_select.play();
		}
			
		
		this.cooldown--;
		this.paddle.update();
		this.ball.update();
		this.powerUpsList.forEach(powerUp => powerUp.update());
		
		for(let i = 0; i < this.powerUpsList.length; i++)
		{
			if(this.powerUpsList[i].collides(this.paddle))
			{
				let isCancelled = false;
				
				if(this.powerUpsList[i].type == 6)
				{
					if(this.paddle.size > 0)
					{
						this.paddle.size--;
						this.paddle.resize();
					}
					this.sizeCounter = 480;
					gSounds.hurt.load();
					gSounds.hurt.play();
					for(let j = 0; j < this.currentPowerUps.length; j++)
					{
						if(this.currentPowerUps[j].type == 7)
						{
							this.currentPowerUps.splice(j, j+1);
							isCancelled = true;
						}
					}
				}
				else if(this.powerUpsList[i].type == 7)
				{					
					if(this.paddle.size < 3)
					{
						this.paddle.size++;
						this.paddle.resize();
					}
					this.sizeCounter = 480;
					gSounds.confirm.load();
					gSounds.confirm.play();
					for(let j = 0; j < this.currentPowerUps.length; j++)
					{
						if(this.currentPowerUps[j].type == 6)
						{
							this.currentPowerUps.splice(j, j+1);
							isCancelled = true;
						}
					}
				}
				for(let j = 0; j < this.currentPowerUps.length; j++)
					if(this.currentPowerUps[j].type == this.powerUpsList[i].type)
						isCancelled = true;
				if(!isCancelled)
					this.currentPowerUps.push(this.powerUpsList[i]);
				this.powerUpsList.splice(i, i+1);
			}
		}
		
		if(this.ball.collides(this.paddle) && this.ball.dy > 0)
		{
			this.ball.dy *= -1;
			
			if(this.ball.x < this.paddle.x && this.ball.dx > 0 && this.paddle.dx == 0)
				this.ball.dx *= -1;
			else if(this.ball.x + this.ball.width > this.paddle.x + this.paddle.width && this.ball.dx < 0 && this.paddle.dx == 0)
				this.ball.dx *= -1;
			else if(this.ball.x + this.ball.width < this.paddle.x + (this.paddle.width/2) && this.paddle.dx < 0)
				this.ball.dx = -BALL_SPEED * ((this.paddle.x + this.paddle.width/2 - (this.ball.x + this.ball.width))/(this.paddle.width/2));
			
			else if(this.ball.x + this.ball.width > this.paddle.x + (this.paddle.width/2) && this.paddle.dx > 0)
				this.ball.dx = -BALL_SPEED * ((this.paddle.x + this.paddle.width/2 - this.ball.x)/(this.paddle.width/2));
			currentBallSpeed *= 1.02;
			this.ball.setSpeed(this.ball.dx, this.ball.dy);
			gSounds.paddle_hit.play();
		}
		
		for(let i = 0; i < this.bricks.length; i++)
		{
			if(!this.isHit)
			{	
				if(this.bricks[i].inPlay && this.ball.collides(this.bricks[i]))
				{ 
					this.tryPowerUp();
					this.score += ((this.bricks[i].color + 1) * 10) + (this.bricks[i].tier * 25);
					this.bricks[i].hit();
					
					this.isHit = true;
					if(this.ball.x + 2*SCALE_FACTOR_WIDTH < this.bricks[i].x && this.ball.dx > 0)
					{
						this.ball.dx = -this.ball.dx;
						this.ball.x = this.bricks[i].x - this.ball.width;
						console.log('left')
					}
					else if(this.ball.x + 6*SCALE_FACTOR_WIDTH > this.bricks[i].x + this.bricks[i].width && this.ball.dx < 0)
					{
						this.ball.dx = -this.ball.dx;
						this.ball.x = this.bricks[i].x + this.bricks[i].width;
						console.log('right')
					}
					else if(this.ball.y < this.bricks[i].y)
					{
						this.ball.dy = -this.ball.dy;
						this.ball.y = this.bricks[i].y - this.ball.height;
						console.log('top')
					}
					else 
					{
						this.ball.dy = -this.ball.dy;
						this.ball.y = this.bricks[i].y + this.bricks[i].height;
						console.log('bottom')
					}
					
				}
			}
		}
		this.isHit = false;
		
		if(this.score >= this.oneUp)
		{
			this.oneUp *= 2;
			this.isOneUp = true;
			this.health++;
			gSounds.recover.load();
			gSounds.recover.play();
			
			setTimeout(function(){gStateMachine.current.isOneUp = false; }, 1000);
			for(let i = 0; i < 10; i++)
				setTimeout(function(){
					gStateMachine.current.color == 'white' ? gStateMachine.current.color = '#67ffff' : gStateMachine.current.color = 'white'; 
				}, i*100);
		}
		
		if(this.checkVictory())
		{
			this.isOneUp = false;
			this.paddle.size = 1;
			this.paddle.resize();
			gSounds.victory.load();
			gSounds.victory.play();
			
			gStateMachine.change('victory', {
					paddle: this.paddle,
					health: this.health,
					score: this.score,
					ball: this.ball,
					level: this.level,
			});
		}
		
		if(inv)
			this.score = 0;
		if(this.ball.y >= WINDOW_HEIGHT)
		{
			this.isOneUp = false;
			this.paddle.size = 1;
			this.paddle.resize();
			this.health--;
			gSounds.hurt.play();
			if(this.health == 0)
			{
				this.oneUp = 500;
				gSounds.music.pause();
				for(let i = 0; i < 10; i++)
				{
					if(highScores[i] < this.score)
					{
						gSounds.high_score.load();
						gSounds.high_score.play();
						gStateMachine.change('enter', this.score);
						return;
					}
						
				}
				gStateMachine.change('game_over', {
					score: this.score
				});
			}
				
			else
				gStateMachine.change('serve', {
					paddle: this.paddle,
					bricks: this.bricks,
					health: this.health,
					score: this.score,
					level: this.level,
				});
		}
		
		if(keys && keys[27])
			window.close();
		

	}
	
	render()
	{
		for(let i = 0; i < this.bricks.length; i++)
			this.bricks[i].render();
		for(let i = 0; i < this.bricks.length; i++)
			this.bricks[i].pSystem.updateParticles();
		for(let i = 0; i < this.powerUpsList.length; i++)
			this.powerUpsList[i].render();
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
		renderPowerUps(this.currentPowerUps);
		if(this.paused)
		{
			ctx.font = gFonts.large;
			ctx.fillStyle = 'green';
			ctx.textAlign = 'center';
			ctx.fillText("PAUSED", VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH / 2,VIRTUAL_HEIGHT*SCALE_FACTOR_HEIGHT / 2);
		}
		
		if(this.isOneUp)
		{
			ctx.font = gFonts.large;
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillStyle = this.color;
			ctx.fillText("Life Increased!", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
			gFrames.powerUps[2].draw(WINDOW_WIDTH / 2 - 10*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT *2/3 - 10*SCALE_FACTOR_HEIGHT, 20, 20);
		}
	}
}