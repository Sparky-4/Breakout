class Ball{
	
	constructor(skin)
	{
		this.skin = skin;
		this.width = 8*SCALE_FACTOR_WIDTH;
		this.height = 8*SCALE_FACTOR_HEIGHT;
		this.dy = 0;
		this.dx = 0;
		this.x = VIRTUAL_WIDTH * SCALE_FACTOR_WIDTH / 2 - this.width/2;
		this.y = VIRTUAL_HEIGHT * SCALE_FACTOR_HEIGHT / 2 - this.height/2;
	}
	
	collides(target)
	{
		if(this.x > target.x + target.width || this.x + this.width < target.x)
			return false;
		else if(this.y > target.y + target.height || this.y + this.height < target.y)
			return false;
		
		return true;
	}
	
	reset()
	{
		this.x = VIRTUAL_WIDTH * SCALE_FACTOR_WIDTH / 2 - this.width/2;
		this.y = VIRTUAL_HEIGHT * SCALE_FACTOR_HEIGHT / 2 - this.height/2;
		this.dx = 0;
		this.dy = 0;
	}
	
	setSpeed(dx, dy)
	{
		this.dy = Math.sqrt(currentBallSpeed*currentBallSpeed - dx*dx);
		if(dy < 0)
			this.dy *= -1;
		this.dx = dx;
	}
	
	update()
	{
		this.x += this.dx;
		this.y += this.dy;
		
		if(this.x <= 0)
		{
			this.x = 0;
			this.dx *= -1;
			gSounds.wall_hit.play();
		}
		
		if(this.x >= VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH - this.width)
		{
			this.x = VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH - this.width;
			this.dx *= -1;
			gSounds.wall_hit.play();
		}
		
		if(this.y <= 0)
		{
			this.y = 0;
			this.dy *= -1;
			gSounds.wall_hit.play();
		}
		
	}
	
	render()
	{
		gFrames.balls[this.skin].draw(this.x, this.y);
	}
}