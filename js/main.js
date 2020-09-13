(()=> {
    let yOffset = 0; // window.pageYOffset 초깃 값 == 스크롤 정보
    let previousScrollHeight = 0;  // 현재 스크롤 위치 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
    let currentScene = 0;
    let enterNewScene = false;
        
    // 데이터 씬 담기
    const scenInfo = [
        
        {
            // 1번 씬
            type: 'sticky',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_0'),
                messageA: document.querySelector('#scroll_section_0 .main_message.a'),
                messageB: document.querySelector('#scroll_section_0 .main_message.b'),
                messageC: document.querySelector('#scroll_section_0 .main_message.c'),
                messageD: document.querySelector('#scroll_section_0 .main_message.d'),
                canvas: document.querySelector('#video_canvas_0'),
                context: document.querySelector('#video_canvas_0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0,299],
                canvas_opacity: [1,0, {start: 0.9, end:1}],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            },
        },
        {
            // 2번 씬
            type: 'normal',
            // heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_1'),
            }
        },
        {
            // 3번 씬
            type: 'sticky',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_2'),
                messageA: document.querySelector('#scroll_section_2 .a'),
                messageB: document.querySelector('#scroll_section_2 .b'),
                messageC: document.querySelector('#scroll_section_2 .c'),
                pinB: document.querySelector('#scroll_section_2 .b .pin'),
                pinC: document.querySelector('#scroll_section_2 .c .pin'),
                canvas: document.querySelector('#video_canvas_1'),
                context: document.querySelector('#video_canvas_1').getContext('2d'),
                videoImages: [],
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0,959],
                canvas_opacity_in: [0,1, {start: 0, end:0.1}],
                canvas_opacity_out: [1,0, {start: 0.95, end:1}],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            // 4번 씬
            type: 'sticky',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_3'),
                canvasCaption: document.querySelector('.canvas-caption'),
            },
            values: {

            },
        },

    ];

    function setCanvasImages(){
        let imgElement;
        for(let i=0; i< scenInfo[0].values.videoImageCount; i++){
            imgElement = new Image();
            // imaElement = document.createElement('img');
            imgElement.src = `./video/001/IMG_${6726 + i}.JPG`;
            scenInfo[0].objs.videoImages.push(imgElement);
        }
        // console.log(scenInfo[0].objs.videoImage);
        let imgElement2;
        for(let i=0; i< scenInfo[2].values.videoImageCount; i++){
            imgElement2 = new Image();
            // imaElement = document.createElement('img');
            imgElement2.src = `./video/002/IMG_${7027 + i}.JPG`;
            scenInfo[2].objs.videoImages.push(imgElement2);
        }
    }
    setCanvasImages();

    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i =0; i < scenInfo.length; i++){
            if(scenInfo[i].type === 'sticky'){
                scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
                
            }else if(scenInfo[i].type === 'normal') {
                scenInfo[i].scrollHeight = scenInfo[i].objs.container.offsetHeight
            }
            scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;
            
            // console.log(scenInfo[i].scrollHeight);
            // console.log(scenInfo);
            // 높이 설정
            
        }
            let totalScrollHeight = 0;
            for (let i =0; i<scenInfo.length;i++){
                totalScrollHeight += scenInfo[i].scrollHeight;
                if(totalScrollHeight >= pageYOffset) {
                    currentScene = i;
                    break;
                }
            }
            document.body.setAttribute('id', `show_scene_${currentScene}`);

            const heightRatio = window.innerHeight / 1080;
            scenInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
            scenInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        
    }

    function calcValues (val, currentYOffset) {
        let rv;
        // console.log("scrollHeight:" , scenInfo[currentScene].scrollHeight);
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        // console.log(val);
        // 분기 처리: 배열에 start와 end 의 유무
        if(val.length === 3){
            // start end 사이 애니메이션 실행
            const partScrollStart = val[2].start * scrollHeight;
            const partScrollEnd = val[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (val[1] - val[0]) + val[0];
            }else if(currentYOffset < partScrollStart){
                rv = val[0];
            }else if(currentYOffset > partScrollEnd){
                rv = val[1];
            }
        }else{
            rv =  scrollRatio * (val[1]- val[0]) + val[0];
        }
        
        // console.log(scrollRatio);
        return rv;
    }

    function playAnimation () {

        const values = scenInfo[currentScene].values;
        const objs = scenInfo[currentScene].objs;
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        const currentYOffset = yOffset - previousScrollHeight;
        const scrollRatio = (yOffset - previousScrollHeight) / scrollHeight;
        // console.log(currentYOffset);
        // console.log(currentScene);
        switch (currentScene){
            case 0:
                // // let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
                // // let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                // // let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
                // // let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
                // if( scrollRatio <= 0.22){
                //     //in
                //     objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                //     objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                // }else {
                //     // out
                //     objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                //     objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                // }
                
                // // let messageA_opacity_0 = values.messageA_opacity[0];
                // // let messageA_opacity_1 = values.messageA_opacity[1];
                // // console.log(calcValues(values.messageA_opacity, currentYOffset));
                // // console.log(messageA_opacity_in);
                // break;

                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence],0,0);
                objs.canvas.style.opacity = calcValues( values.canvas_opacity, currentYOffset );
                console.log(sequence);
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
            case 1:
                break;
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2],0,0);

                if(scrollRatio <= 0.5){
                    objs.canvas.style.opacity = calcValues (values.canvas_opacity_in, currentYOffset);
                } else{
                    objs.canvas.style.opacity = calcValues (values.canvas_opacity_out, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;
            case 3:
                break;
        }
    }

    function scrollLoop () {
        enterNewScene = false;
        previousScrollHeight = 0;
        for (let i =0; i<currentScene; i++){
            previousScrollHeight += scenInfo[i].scrollHeight;
            // console.log(previousScrollHeight);
        }

        if(yOffset > previousScrollHeight + scenInfo[currentScene].scrollHeight){
            enterNewScene = true;
            // console.log(previousScrollHeight);
            currentScene++;
            // console.log(currentScene);
            document.body.setAttribute('id', `show_scene_${currentScene}`);

        }

        if(yOffset < previousScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0 ) {
                return;
            }
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);

        }
            // console.log(previousScrollHeight);

        if(enterNewScene) return;

        playAnimation (); 
        
        // console.log(currentScene);
    }

    window.addEventListener('scroll', ()=> {
        yOffset = window.pageYOffset;
        scrollLoop();

    })
    window.addEventListener('load', ()=>{
        setLayout();
        scenInfo[0].objs.context.drawImage(scenInfo[0].objs.videoImages[0],0,0);
    });
    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    setLayout();


})();

