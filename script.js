function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	// let i = 0;
	// if(i==0) {
	// 	setTimeout(classListToggle,300);
	// 	i++;
	// }
	// if(i==2) {
	// 	setTimeout(classListToggle, 0);
	// i-=2;
	// }
	document.getElementById("nav").classList.toggle("change");

	document.getElementById("menu-bg").classList.toggle("change-bg");
}
function classListToggle() {
	document.getElementById("nav").classList.toggle("change");
}