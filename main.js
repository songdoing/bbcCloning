(() => {
    const actions = {
        birdFlies(key) {
            if(key) {
                document.querySelector('.bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('.bird').style.transform = `translateX(-100%)`;
            }            
        }
    }
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화(visible붙은)된 .graphic-item을 담기
    // IntersectionObserver 생성자를 부르고, 콜백함수가 안에 들어가고, 매개변수는 2개
    let ioIndex;
    const io = new IntersectionObserver((entries, observer) => {
        // console.log(entries);
        ioIndex = entries[0].target.dataset.index * 1;
    });

    for(let i=0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        //stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
		currentItem.classList.add('visible');
		if (action) {
            actions[action](true);
            // console.log("true");
		}
	}

	function inactivate(action) {
		currentItem.classList.remove('visible');
		if (action) {
            actions[action](false);
            // console.log("false");
		}
	}
    
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // for(let i =0; i< stepElems.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue; //step에 값이 없으면 다음 for문을 돌아라
            boundingRect = step.getBoundingClientRect();
            //DOMRect의 위치 객체가 나옴
            // console.log(boundingRect);

            if(boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8 ) {

                    inactivate(currentItem.dataset.action);
                    currentItem =graphicElems[step.dataset.index];
                    activate(currentItem.dataset.action);
                } 
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0,0), 100);
    });

    activate();
})();