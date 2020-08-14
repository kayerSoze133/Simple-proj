function isNegative (number) {return (number < 0) ? true : false;}

function toggleProperty(element,property,val,newVal){
	const cur = getComputedStyle(element).getPropertyValue(property);
	(cur == newVal) ? element.style.setProperty(property,val) : element.style.setProperty(property,newVal);
}

function toggleNav(e) {
	toggleProperty(document.querySelector('.homepage'),'display','block','none');
	navigation.classList.toggle('navigation-on');

	let btnText = this.textContent.toLowerCase();
	(btnText == 'open') ? btnText = 'Close' : btnText = 'Open';
	this.textContent = btnText;
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
	[x,y] = [e.layerX,e.layerY];

	angle = Math.abs(Math.atan(y/x));
	angle = (angle*180) / 3.14;
	angle = Math.round(angle);
	angle = adjustAngle(x,y,angle);

	const opacity = (Math.abs(y)+Math.abs(x))/400;

	// console.log(angle);
	circle.style.transform = `translate3d(-50%,-50%,0) rotate(${angle}deg)`;
	circle.style.opacity = `${opacity}`;
}
function slideTextWithWheel(e) {
	if (e.deltaY > 0){
		if (counter < 2)
			counter++;
	}
	else{
		if (counter > 0)
			counter--;
	}
	slideImages(counter);
	imageTexts.style.transform = `translateY(-${counter*33}%)`;
}
function slideTextWithKeys(e) {
	if (e.keyCode == 37){
		// left
		if (counter < 2)
			counter++;
	}
	else if (e.keyCode == 39){
		// right
		if (counter > 0)
			counter--;
	}
	console.log(counter);
	slideImages(counter);
	imageTexts.style.transform = `translateX(calc(-${counter*40}%))`;
}
function slideImages(counter) {
	// slide the images (colors) accoring to the counter
	for (let i=0;i<images.children.length;i++)
		(i == counter) ? images.children[i].classList.add('selected-image') : images.children[i].classList.remove('selected-image');
}

let xDown = null;
let yDown = null;

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
        if ( xDiff > 0 ) {/* left swipe */ 
	    	if (counter < 2)
	    		counter++;
	    } 
		else {/* right swipe */
        	console.log('right swipe');
        	if (counter > 0)
        		counter--;
        }
        slideImages(counter);                     
        imageTexts.style.transform = `translateX(calc(-${counter*40}%))`;
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};