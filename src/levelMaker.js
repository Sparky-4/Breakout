class LevelMaker {
	constructor(){}
	
	createMap(level)
	{
		let bricks = [];
		let numRows = Math.floor(Math.random()*3 +2);
		let numCols = Math.floor(Math.random()*4 +7);
		numCols = (numCols%2 == 0) ? numCols + 1 : numCols;
		
		let highestTier = Math.min(3, Math.floor(level/4));
		let highestColor = Math.min(4, Math.abs(level-1));
		let lowestColor = Math.min(4, Math.floor(level/3));
		
		for(let y = 0; y < numRows; y++)
		{
			let skipPattern = (Math.random() < .5) ? true : false;
			let alternatePattern = (Math.random() < .5) ? true : false;
			
			let altColor1 =  Math.round(Math.random()*(highestColor-lowestColor)+lowestColor);
			let altColor2 = Math.round(Math.random()*(highestColor-lowestColor)+lowestColor);
			let altTier1 = Math.round(Math.random()*highestTier);
			let altTier2 = Math.round(Math.random()*highestTier);
			
			let skipFlag = (Math.random() < .5) ? true : false;
			let altFlag = (Math.random() < .5) ? true : false;
			
			for(let x = 0; x < numCols; x++)
			{	
				if (skipPattern)
				{
					if(!skipFlag)
					{
						let b = new Brick(x*32*SCALE_FACTOR_WIDTH
							+(8*SCALE_FACTOR_WIDTH)
							+(13 - numCols)*16*SCALE_FACTOR_WIDTH, 
							(y+1)*16*SCALE_FACTOR_HEIGHT);
							
						if(alternatePattern && altFlag)
						{
							b.color = altColor1;
							b.tier = altTier1;
						}
						else
						{
							b.color = altColor2;
							b.tier = altTier2;	
						}
						bricks.push(b);
						altFlag = !altFlag;
					}
					skipFlag = !skipFlag;
				}
				else 
				{
					let b = new Brick(x*32*SCALE_FACTOR_WIDTH
							+(8*SCALE_FACTOR_WIDTH)
							+(13 - numCols)*16*SCALE_FACTOR_WIDTH, 
							(y+1)*16*SCALE_FACTOR_HEIGHT);
							
						if(alternatePattern && altFlag)
						{
							b.color = altColor1;
							b.tier = altTier1;
						}
						else
						{
							b.color = altColor2;
							b.tier = altTier2;	
						}
						bricks.push(b);
						altFlag = !altFlag;
				}

			}
		}
		return bricks;
	}
}