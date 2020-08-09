const outCircle = document.querySelector('.circle.big');
const inCircle = document.querySelector('.circle.small');
function isNegative (number) {
	return (number < 0) ? true : false;
}
outCircle.addEventListener('mousemove', e => {
	if (e.target != e.currentTarget)
		return;
	let x,y,angle;
	[x,y] = [(e.layerX-240),(e.layerY-240)];
	angle = (Math.atan(Math.abs(y)/Math.abs(x)) * 180) / 3.14;
	if (isNegative(y)){
		if (isNegative(x))
			angle += 180;
		else
			angle = 360 - angle;
	}
	else{
		if (isNegative(x))
			angle = 180 - angle;
	}
	console.log(angle);
	outCircle.style.transform = `translate3d(0,0,0) rotate(${angle}deg)`;
});