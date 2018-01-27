var e = 3, h = 6;
var numSquares = h;
var colors = [];
var pickedColor;

	var squares = document.querySelectorAll(".square");
	var messageDisplay = document.querySelector("#message");
	var resetButton = document.querySelector("#reset");
	var modeBtns = document.querySelectorAll(".mode");

	init();

function init()
{
	//mode buttons....
	setModeBtns();
	setSquares();
	reset();
}

function setModeBtns() 
{
	for(var i = 0; i < modeBtns.length; i++)
	{
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numSquares = e: numSquares = h;
			reset();
		});
	}
}
	
function setSquares()
{
	for(var i = 0; i<squares.length; i++)
	{
		squares[i].addEventListener("click", function(){
			 clickedColor = this.style.backgroundColor;
			if(pickedColor === clickedColor)
			{
				messageDisplay.textContent = "CORRECT!";
				changeColors(clickedColor);
				document.querySelector("h1").style.backgroundColor = pickedColor;
				// console.log("change h1s backgroundColor");
				resetButton.textContent = "Play Again?";
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}

function reset() 
{
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	document.querySelector("#rgbDisplay").textContent = pickedColor;

	for(var i = 0; i<squares.length; i++)
	{
		if(colors[i])
		{
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];
		}
		else squares[i].style.display = "none";
	}

	this.textContent = "New Colors";
	messageDisplay.textContent = "";
	document.querySelector("h1").style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
      reset();
});




function changeColors(color) 
{
	// body...
	for(var i = 0; i<squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() 
{
	// body...
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) 
{
	// body...
	var arr = [];
	for(var i = 0; i<num; i++)
	{
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() 
{
	// body...
	var r, g,b;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	var rgb = "rgb("+r+", "+g+", "+b+")";
	return rgb;
}
