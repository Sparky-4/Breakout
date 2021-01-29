class Paddle{
	
	constructor(skin)
	{
		this.x = VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH / 2 - 32*SCALE_FACTOR_WIDTH;
		this.y = VIRTUAL_HEIGHT*SCALE_FACTOR_HEIGHT - 32*SCALE_FACTOR_HEIGHT;
		this.dx = 0;
		this.width = 64*SCALE_FACTOR_WIDTH;
		this.height = 16*SCALE_FACTOR_HEIGHT;
		this.skin = skin;
		this.size = 1;
		
	}
	
	resize()
	{
		if(this.size == 0)
		{
			this.x = this.x + this.width/4;
			this.width = 32*SCALE_FACTOR_WIDTH;
		}
		else if(this.size == 1)
		{
			if(this.width == 32*SCALE_FACTOR_WIDTH)
				this.x = this.x - this.width/2;
			else if(this.width == 96*SCALE_FACTOR_WIDTH)
				this.x = this.x + 16*SCALE_FACTOR_WIDTH;
			else if(this.width == 128*SCALE_FACTOR_WIDTH)
				this.x = this.x + 32*SCALE_FACTOR_WIDTH;
			this.width = 64*SCALE_FACTOR_WIDTH;
		}
		else if(this.size == 2)
		{
			if(this.width == 64*SCALE_FACTOR_WIDTH)
				this.x = this.x - this.width/4;
			else 
				this.x = this.x +16*SCALE_FACTOR_WIDTH;
			this.width = 96*SCALE_FACTOR_WIDTH;
		}
		else if(this.size == 3)
		{
			this.x = this.x - this.width/8;
			this.width = 128*SCALE_FACTOR_WIDTH;
		}
	}
	
	update()
	{
		if(keys && keys[37])
			this.dx = -PADDLE_SPEED;
		else if (keys && keys[39])
			this.dx = PADDLE_SPEED;
		else 
			this.dx = 0;
		
		this.x += this.dx;
		if(this.x <= 0)
			this.x = 0;
		else if(this.x >= VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH - this.width)
			this.x = VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH - this.width;
		
	}
	
	render()
	{
		gFrames.paddles[this.size + 4*(this.skin)].draw(this.x, this.y);
	}
}