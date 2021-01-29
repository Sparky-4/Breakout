class Brick{
	
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.width = 32 * SCALE_FACTOR_WIDTH;
		this.height = 16 * SCALE_FACTOR_HEIGHT;
		this.inPlay = true;
		this.pSystem = new ParticleSystem(gTextures.particle, 64, this.x + this.width/2, this.y + this.height/2)
	}
	
	hit()
	{	
		if(this.color == 0)
			this.rgb = [99,155,255];
		else if(this.color == 1)
			this.rgb = [106,190,27];
		else if(this.color == 2)
			this.rgb = [217,87,99];
		else if(this.color == 3)
			this.rgb = [215,123,186];
		else if(this.color == 4)
			this.rgb = [251,242,54];

		this.pSystem.setLifetime(.5, .7);
		this.pSystem.setAcceleration(-SCALE_FACTOR_WIDTH/450, SCALE_FACTOR_WIDTH/450, SCALE_FACTOR_WIDTH/450, SCALE_FACTOR_WIDTH/90);
		this.pSystem.setAreaSpread(30*SCALE_FACTOR_WIDTH, 20*SCALE_FACTOR_HEIGHT);
		this.pSystem.setColor(this.rgb);
		this.pSystem.createParticles(64);
		
		if(this.tier > 0)
		{
			this.tier -= 1;
			gSounds.brick_hit2.load();
			gSounds.brick_hit2.play();
		}
			
		else
		{
			if(this.color == 0)
			{
				this.inPlay = false;
				gSounds.score.load();
				gSounds.score.play();
			}
				
			else
			{
				this.color -= 1;
				gSounds.brick_hit2.load();
				gSounds.brick_hit2.play();
			}
		}
	}
	
	render()
	{
		if(this.inPlay)
		{
			gFrames.bricks[this.color*4 + this.tier].draw(this.x, this.y);
		}
		
	}
}