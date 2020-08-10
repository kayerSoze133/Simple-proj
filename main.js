const outCircle = document.querySelector('.circle.big');
const inCircle = document.querySelector('.circle.small');
const carousal = document.querySelector('.carousal');
const textCarousal = document.querySelector('.carousal-text');
const items = Array.from(carousal.children);

const mid = outCircle.clientWidth/2;


function isNegative (number) {return (number < 0) ? true : false;}

function adjustAngle (x,y,angle) {
	if (isNegative(y)){
		if (isNegative(x))
			angle = 180 + angle;
		else
			angle = 360 - angle;
	}
	else{
		if (isNegative(x))
			angle = 180 - angle;
	}
	return angle;
}

function rotate(e) {
	if (e.target != e.currentTarget)
		return;

	let x,y;
	[x,y] = [e.layerX-mid,e.layerY-mid];

	angle = Math.abs(Math.atan(y/x));
	angle = (angle*180) / 3.14;
	angle = Math.round(angle);
	angle = adjustAngle(x,y,angle);

	console.log(angle);
	outCircle.style.transform = `translate3d(0,0,0) rotate(${angle}deg)`;
}

function slide (counter) {
	for (let i=0;i<items.length;i++)
		(i == counter) ? items[i].classList.add('selected') : items[i].classList.remove('selected');
	slideTextItems(counter);
}

function slideTextItems (counter) {
	if (counter == 0)
		textCarousal.style.transform = `translateY(${35}%)`;
	else if (counter == 1)
		textCarousal.style.transform = `translateY(${0})`;
	else if (counter == 2)
		textCarousal.style.transform = `translateY(-${35}%)`;
}

let counter = 0;

window.addEventListener('keyup',e => {
	if (e.keyCode === 38){
		if (counter > 0)
			counter -= 1;
	}
	else if (e.keyCode === 40){
		if (counter < 2)
			counter += 1;
	}
	console.log(counter);
	slide(counter);
});

outCircle.addEventListener('mousemove',rotate);
// inCircle.addEventListener('mouseover', e => outCircle.classList.toggle('hide'));
// inCircle.addEventListener('mouseout', e => outCircle.classList.toggle('hide'));
