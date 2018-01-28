var h = document.querySelectorAll(".square").length;
var numSquares = h;
var colors = [];
var pickedColor;
var clickedColor;
var dummy;
var choose = '';// '' = hex , '1' = rgb()...

	var squares = document.querySelectorAll(".square");
	var resetButton = document.querySelector("#reset");

	init();

function init()
{
	//mode buttons....
	//pick();
	setSquares();
	reset();
}

// choose hex or rgb to copy...
document.querySelector("#rgb").addEventListener("click", function() {
	document.querySelector("#hex").classList.remove("selected");
	this.classList.add("selected");
	choose = "1";
});

document.querySelector("#hex").addEventListener("click", function() {
	document.querySelector("#rgb").classList.remove("selected");
	this.classList.add("selected");
	choose = "";
});


// add click listener to all the squares...	
function setSquares()
{
	for(var i = 0; i<squares.length; i++)
	{
		squares[i].addEventListener("click", function(){
		clickedColor = this.style.backgroundColor;
		changeAndCopy();
		});
	}
}

// reset everything...
function reset() 
{
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	document.querySelector("#hexDisplay").value = "";
	document.querySelector("#fakeInput").value = "";

	for(var i = 0; i<squares.length; i++)
	{
		if(colors[i])
		{
		squares[i].style.backgroundColor = colors[i];
		}
	}
	this.textContent = "New Colors";
	document.querySelector("#h1s").style.backgroundColor = "#505050";
	document.querySelector("#show").style.backgroundColor = "#505050";
}

// new colors button clicked...
resetButton.addEventListener("click", function() {
      reset();
});


// pick a random color among the generated colors...
function pickColor() 
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// to generate ramdom colors
function generateRandomColors(num) 
{
	var arr = [];
	for(var i = 0; i<num; i++)
	{
		arr.push(randomColor());
	}
	return arr;
}

// returns a random color as rgb(x, x, x);
function randomColor() 
{
	var r, g,b;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	var rgb = "rgb("+r+", "+g+", "+b+")";
	return rgb;
}

// rgb to hex
function parseColor(color) {
    var arr=[]; 
    color.replace(/[\d+\.]+/g, function(v) { arr.push(parseFloat(v)); });
    return {
        hex: "#" + arr.slice(0, 3).map(toHex).join(""),
        opacity: arr.length == 4 ? arr[3] : 1
    };
}
function toHex(int) {
    var hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// pick randomly clicked
document.querySelector("#random").addEventListener("click", function() {
	clickedColor = randomColor();
	changeAndCopy();
});

// after click change background of h1s and show
function changeAndCopy()
{
	document.querySelector("#fakeInput").value = clickedColor;
	 document.querySelector("#hexDisplay").value = parseColor(clickedColor).hex;
	 if(choose === "1")
	 {
	 dummy = document.querySelector("#fakeInput").select();
	 }
	 else 
	 {
	 	dummy = document.querySelector("#hexDisplay").select();
	 }
	document.execCommand('copy');
	document.querySelector("#show").style.backgroundColor = clickedColor;
	document.querySelector("#h1s").style.backgroundColor = clickedColor;
}