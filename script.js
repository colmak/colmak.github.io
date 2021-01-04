function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");

	document.getElementById("menu-bg").classList.toggle("change-bg");
}
function fizzBuzz () {
	for(i=1; i<=100; i++) {
		if (i%3==0 && i%5==0) console.log("fizzbuzz");
		else if(i%5==0) console.log("buzz");
		else if(i%3==0) console.log("fizz");
		else  console.log(i);
	}
}
fizzBuzz();