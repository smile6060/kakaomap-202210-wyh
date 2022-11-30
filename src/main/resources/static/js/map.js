var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
};

var map = new kakao.maps.Map(container, options);
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/*=========================== MAP ===========================*/


class MapService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MapService();
        }
        return this.#instance;
    }

    load() {
        this.addSearchInputEvent();
        this.addAsideToggleButtonEvent();
        this.addMenuTabEvent();
    }

    addSearchInputEvent() {
        const searchInput = document.querySelector(".search-input");

        searchInput.onclick = () => {
            const searchRecent = document.querySelector(".search-recent");
            searchRecent.classList.toggle("invisible-recent");
        }

    }

    addAsideToggleButtonEvent() {
        const toggleButton = document.querySelector(".toggle-button");

        toggleButton.onclick = () => {
            const aside = document.querySelector("aside");
            aside.classList.toggle("invisible-aside");
            if(aside.classList.contains("invisible-aside")) {
                toggleButton.textContent = "▶";
            }else {
                toggleButton.textContent = "◀";
            }
        }
    }

    addMenuTabEvent() {
        const mainMenuTab = document.querySelectorAll(".mainmenutab");

        for(let i = 0; i < mainMenuTab.length; i++) {
            mainMenuTab[i].onclick = () => {
                for(let j = 0; j < mainMenuTab.length; j++) {
                    mainMenuTab[j].classList.remove("tab-selected");
                }
                mainMenuTab[i].classList.add("tab-selected");

                const searchBody = document.querySelectorAll(".search-body");
                for(let j = 0; j < searchBody.length; j++) {
                    searchBody[j].classList.add("invisible-body");
                }
                searchBody[i].classList.remove("invisible-body");
            }
        }
    }

}

window.onload = () => {
    MapService.getInstance().load();
}