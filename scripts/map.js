
import {showModal} from './modal.js';
import {api,path} from './api.js';

const kh_university = new kakao.maps.LatLng(37.596808212906474, 127.05321637587708)
const map_form =  document.querySelector('#map_search_form').addEventListener("submit",searchByKeyword);;
var markers = [];
var infowindow = new kakao.maps.InfoWindow({zIndex:1});
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: kh_university, // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };  
var map = new kakao.maps.Map(mapContainer, mapOption); 
const ps = new kakao.maps.services.Places(map); 

//GET으로 전체 댓글 받아오기
getReviewdPlaceList();
 //저장된 장소 객체 kakao API에서 받아오기


async function getReviewdPlaceList(){
    const reviewPlaceNmSet = await getAllReviewedPlaceNm();  
    return await getReviewPlaceDataSet(reviewPlaceNmSet);
}

async function getAllReviewedPlaceNm() {
    let reviewsData = await api.get(path.REVIEWS.url);
    //placeNm 배열로 가져오기 (중복허용 x)
    let reviewPlaceNmSet = new Set();
    reviewsData.forEach((reviewData) => {
        reviewPlaceNmSet.add(reviewData.place_name);
    });
    return reviewPlaceNmSet;
}

//가게 이름으로 객체 검색해서 카카오맵에서 정보 가져오기
async function getReviewPlaceDataSet(reviewPlaceNmSet) {
    Array.from(reviewPlaceNmSet).forEach((reviewPlaceNm) => {
        ps.keywordSearch(reviewPlaceNm,placeSearchKeyWordCB,
            {
                category_group_code : 'FD6',
                location : kh_university,
                radius: 1000
            });
    });
} 

//정보 marker로 표시하기


//2. 검색창 검색
function searchByKeyword(e) {
    e.preventDefault();
    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch( keyword, placesSearchKeyWordCB, 
        {
            category_group_code : 'FD6',
            location : kh_university,
            radius: 1000
        }); 
}

function placeSearchKeyWordCB(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        //marker 생성
        let placePosition = new kakao.maps.LatLng(result[0].y, result[0].x);
        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        let imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        let resultMarker = makeMarker(placePosition,markerImage);

        kakao.maps.event.addListener(resultMarker, 'click', ()=> {
            showModal(result[0]);
          });

        kakao.maps.event.addListener(resultMarker, 'mouseover', function() {
            displayInfowindow(resultMarker, result[0].place_name);
        });

        kakao.maps.event.addListener(resultMarker, 'mouseout', function() {
            infowindow.close();
        });
    }
}

function placesSearchKeyWordCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('map_search'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {
        let placeItem = places[i];
        var placePosition = new kakao.maps.LatLng(Number(places[i].y), Number(places[i].x)),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        bounds.extend(placePosition);

        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', ()=> {
                showModal(placeItem);
              });

            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function makeMarker(position,markerImage){
    var marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
        map: map
    });
    //console.log(marker);
    return marker;

}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = makeMarker(position,markerImage);
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
 function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}
