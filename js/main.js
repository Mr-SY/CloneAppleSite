(()=> {
    let yOffset = 0; // window.pageYOffset 초깃 값 == 스크롤 정보
    let previousScrollHeight = 0;  // 현재 스크롤 위치 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
    let currentScene = 0;
        
    // 데이터 씬 담기
    const scenInfo = [
        
        {
            // 1번 씬
            type: 'sticky',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_0'),
            }
        },
        {
            // 2번 씬
            type: 'normal',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
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
            }
        },
        {
            // 4번 씬
            type: 'sticky',
            heightNum: 4, // 브라우저 높이 총 4배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll_section_3'),
            }
        },

    ];

    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i =0; i < scenInfo.length; i++){
            scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
            // console.log(scenInfo[i].scrollHeight);
            // console.log(scenInfo);
            // 높이 설정
            scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;

            let totalScrollHeight = 0;
            for (let i =0; i<scenInfo.length;i++){
                totalScrollHeight += scenInfo[i].scrollHeight;
                if(totalScrollHeight >= pageYOffset) {
                    currentScene = i;
                    break;
                }
            }
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }
    }

    function scrollLoop () {
        previousScrollHeight = 0;
        for (let i =0; i<currentScene; i++){
            previousScrollHeight += scenInfo[i].scrollHeight;
            // console.log(previousScrollHeight);
        }

        if(yOffset > previousScrollHeight + scenInfo[currentScene].scrollHeight){
            // console.log(previousScrollHeight);
            currentScene++;
            // console.log(currentScene);
            document.body.setAttribute('id', `show_scene_${currentScene}`);

        }

        if(yOffset < previousScrollHeight) {
            if(currentScene === 0 ) {
                return;
            }
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);

        }
            // console.log(previousScrollHeight);
        


        console.log(currentScene);
    }

    window.addEventListener('scroll', ()=> {
        yOffset = window.pageYOffset;
        scrollLoop();

    })
    window.addEventListener('load', setLayout);
    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    setLayout();


})();

