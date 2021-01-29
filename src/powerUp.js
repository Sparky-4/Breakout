class PowerUp {
	
	constructor(x, y, type)
	{
		this.x = x;
		this.y = y;
		this.width = 16*SCALE_FACTOR_WIDTH;
		this.height = 16*SCALE_FACTOR_HEIGHT;
		this.type = type;
		this.dy = BALL_SPEED;
	}
	
	collides(target)
	{
		if(this.x > target.x + target.width || this.x + this.width < target.x)
			return false;
		else if(this.y > target.y + target.height || this.y + this.height < target.y)
			return false;

		return true;	
	}
	
	update()
	{
		this.y += this.dy;
	}
	
	render()
	{
		gFrames.powerUps[this.type].draw(this.x, this.y);
	}
}