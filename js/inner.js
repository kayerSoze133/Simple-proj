function scroll(counter){
	const vh = window.innerHeight;
	window.scrollTo(0,vh*counter);
}
function setOffsetWheel (e) {
	if (e.deltaY > 0 && offset_counter < offset_max)
		offset_counter+=1;
	else if (e.deltaY < 0 && offset_counter > 0)
		offset_counter-=1;
	else
		return;
	scroll(offset_counter);
}
function setOffsetKeys (e) {
	console.log(e.keyCode);
	if (e.keyCode == 40 && offset_counter < offset_max)
		offset_counter+=1;
	else if (e.keyCode == 38 && offset_counter > 0)
		offset_counter-=1;
	else
		return;
	scroll(offset_counter);
}

// touch movement
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

    if ( Math.abs( yDiff ) > Math.abs( xDiff ) ) {/*most significant*/
        if ( yDiff > 0 ) {/* up swipe */ 
	    	if (offset_counter < offset_max)
	    		offset_counter++;
	    } 
		else {/* down swipe */
        	if (offset_counter > 0)
        		offset_counter--;
        }
        scroll(offset_counter);
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

let xDown = null;
let yDown = null;
let offset_counter = 0;
const offset_max = 3;
window.addEventListener('wheel',setOffsetWheel);
window.addEventListener('keyup',setOffsetKeys);
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);