(() => {
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화(visible붙은)된 .graphic-item을 담기

    for(let i=0; i < stepElems.length; i++) {
        //stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate() {
        currentItem.classList.add('visible');
    }

    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for(let i =0; i< stepElems.length; i++) {
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            //DOMRect의 위치 객체가 나옴
            console.log(boundingRect);

            if(boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8 ) {

                    inactivate();
                    currentItem =graphicElems[step.dataset.index];
                    activate();
                } 
        }
    });
    activate();
})();