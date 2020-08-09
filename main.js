const outCircle = document.querySelector('.circle.big');
const inCircle = document.querySelector('.circle.small');
outCircle.addEventListener('mousemove', e => {
	let x,y;
    x,y = [e.layerX,e.layerY];
    console.log(x,y);
});