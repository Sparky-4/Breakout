// Generating quads given an atlas and a width and height for the tile by adding
// a quad in an array for each quad in the atlas
function GenerateQuads(atlas, tileWidth, tileHeight, vWidth, vHeight)
{
	let sheetWidth = atlas.width;
	let sheetHeight = atlas.height;
	
	let sheetCounter = 0;
	let spriteSheet = [];
	
	for(let y = 0; y < sheetHeight; y+=tileHeight)
	{
		for(let x = 0; x < sheetWidth; x+= tileWidth)
		{
			spriteSheet[sheetCounter] = new Quad(x, y,
			tileWidth, tileHeight, atlas, vWidth, vHeight);
			sheetCounter++;
		}
	}
	return spriteSheet;
}

// Getting the quads for all paddles from the smallest size to largest size
function GenerateQuadsPaddles(atlas)
{
	let x = 0;
	let y = 385;
	
	let counter = 0;
	let quads = [];
	
	for(let i = 0; i < 4; i++)
	{
		//smallest
		quads[counter] = new Quad(x, y, 192, 96, atlas, 32, 16);
		counter++;
		
		//medium
		quads[counter] = new Quad(x + 192, y, 384, 96, atlas, 64, 16);
		counter++;
		
		//large
		quads[counter] = new Quad(x + 576, y, 576, 96, atlas, 96, 16);
		counter++;
		
		//huge
		quads[counter] = new Quad(x, y + 96, 768, 96, atlas, 128, 16);
		counter++;
		
		//prepare x and y for next itiration
		x = 0;
		y += 192;
		
	}
	
	return quads;
	
}

// Getting the quads for all balls from the sprite sheet
function GenerateQuadsBalls(atlas)
{
	let x = 576;
	let y = 288;
	
	let counter = 0;
	let quads = [];
	
	for(let i = 0; i < 4; i++)
	{
		quads[counter] = new Quad(x, y, 48, 48, atlas, 8, 8)
		x += 48;
		counter++
	}
	
	x = 576;
	y = 336;
	
	for(let i = 0; i < 3; i++)
	{
		quads[counter] = new Quad(x, y, 48, 48, atlas, 8, 8)
		x += 48;
		counter++
	}
	
	return quads;
	
}

// Getting the quads for all bricks by using the GenerateQuads function and 
// slicing and returning the first 21 quads
function GenerateQuadsBricks(atlas)
{
	return GenerateQuads(atlas, 192, 96, 32, 16).slice(0, 20);
}

// Getting the quads for all power-ups by using the GenerateQuads function and 
// slicing and returning the quads from index 144 to 154
function GenerateQuadsPowerUps(atlas)
{
	return GenerateQuads(atlas, 96, 96, 16, 16).slice(144, 154);
}
