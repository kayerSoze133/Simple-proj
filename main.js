const outCircle = document.querySelector('.circle.big');
const inCircle = document.querySelector('.circle.small.logo');
const mid = outCircle.clientWidth/2;

const carousal = document.querySelector('.carousal');
const textCarousal = document.querySelector('.carousal-text');
const items = Array.from(carousal.children);
let counter = 0;

const nav_btn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

let xDown = null;
let yDown = null;


function toggleStyleProperty(element,property,val,newVal){
	const cur = getComputedStyle(element).getPropertyValue(property);
	console.log(cur,val,newVal);
	(cur == newVal) ? element.style.setProperty(property,val) : element.style.setProperty(property,newVal);
}
function isNegative (number) {return (number < 0) ? true : false;}

function toggleNav (e) {
	// for navigation
	toggleStyleProperty(document.documentElement,'--page-color','#ebebeb','black');
	toggleStyleProperty(document.documentElement,'--text-color','black','#ebebeb');
	toggleStyleProperty(outCircle.parentElement,'visibility','visible','hidden');
	navigation.classList.toggle('navigation-on');

	(this.textContent == 'Menu') ? this.textContent = 'Close' : this.textContent = 'Menu';
}

function adjustAngle (x,y,angle) {
	// to adjust angle according the quadrant
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
	// rotate the circle accooring to the mouse position
	if (e.target != e.currentTarget)
		return;

	let x,y;
	[x,y] = [e.layerX-mid,e.layerY-mid];

	angle = Math.abs(Math.atan(y/x));
	angle = (angle*180) / 3.14;
	angle = Math.round(angle);
	angle = adjustAngle(x,y,angle);

	// console.log(angle);
	outCircle.style.transform = `translate3d(0,0,0) rotate(${angle}deg)`;
}

function slide (counter) {
	// slide the images (colors) accoring to the counter
	for (let i=0;i<items.length;i++)
		(i == counter) ? items[i].classList.add('selected') : items[i].classList.remove('selected');
	slideTextItems(counter);
}
function slideTextItems (counter) {
	// slide the text accoring to the counter
	if (counter == 0)
		textCarousal.style.transform = `translateY(${35}%)`;
	else if (counter == 1)
		textCarousal.style.transform = `translateY(${0})`;
	else if (counter == 2)
		textCarousal.style.transform = `translateY(-${35}%)`;
}
function moveCarousalWithKeys (e) {
	// adjust the counter based on UP/DOWN arrow keys pressed
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
}
function hide (e) {
	// when mouse pointer on the smaller circle, hide the bigger circle.
	console.log('hide now');
	outCircle.classList.toggle('hide'); 
}
function moveCarousalWithWheel(e){
	if (e.deltaY < 0){
		if (counter > 0)
			counter -= 1;
	}
	else if (e.deltaY > 0){
		if (counter < 2)
			counter += 1;
	}
	console.log(counter);
	slide(counter);

}

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}; 

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        /* left swipe */ 
        } else {
        /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
        	console.log('up swipe');
        	if (counter < 2)
        		counter++;
        } else { 
        	console.log('down swipe');
        	if (counter > 0)
        		counter--;
        }
        slide(counter);                                                
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

nav_btn.addEventListener('click',toggleNav);

outCircle.addEventListener('mousemove',rotate);
inCircle.addEventListener('mouseover',hide);
inCircle.addEventListener('mouseout',hide);

window.addEventListener('keyup',moveCarousalWithKeys);
window.addEventListener('wheel',moveCarousalWithWheel);

navigation.addEventListener('touchstart', handleTouchStart, false);        
navigation.addEventListener('touchmove', handleTouchMove, false);