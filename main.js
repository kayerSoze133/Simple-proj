const outCircle = document.querySelector('.circle.big');
const inCircle = document.querySelector('.circle.small');
const mid = outCircle.clientWidth/2;

function isNegative (number) {
	return (number < 0) ? true : false;
}

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
outCircle.addEventListener('mousemove', e => {
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
});

inCircle.addEventListener('mouseover', e => outCircle.classList.toggle('hide'));
inCircle.addEventListener('mouseout', e => outCircle.classList.toggle('hide'));