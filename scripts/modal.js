import {api,path} from './api.js';

//모달창 생성
let modal = document.querySelector('#modal');
let closeBtn = document.querySelector('#closeBtn');
let submitBtn = document.querySelector('#submit');
let form = document.querySelector('.modal_input');

function clearTags() {
  keyElement.innerHTML = "";
}

function showModal(place) {
  modal.style.display = "block";
  document.querySelector('.comments_title').innerHTML = place.place_name;
  document.querySelector('.space_id').innerHTML = place.id;
  clearTags();
  let contentInput = document.getElementById("content");
  contentInput.value = "";
  document.getElementById("khuong_3").checked = true;
}

closeBtn.addEventListener('click', ()=> {
    modal.style.display = "none";
  });



form.addEventListener('submit', (event) => {
  let rawTagList = Array.from(document.querySelectorAll('.key-item-text'));
  let tagList = getTagList(rawTagList);
  let place_id = document.querySelector('.space_id').innerHTML;
  let content = document.querySelector('#content').value;
  let radioButtons = document.getElementsByName('rating'); 
  let selectedValue = getRadioValue(radioButtons);

  console.log("태그: "+tagList.innerHTML, "장소id : "+place_id, "댓글 내용 : "+content, "점수 : "+selectedValue);

     //    /place_id=456 path
     //tags[{name:'이름'},{name:'이름2}]

  // api.post(path.REVIEWS.url, {
  //   "tags" : tagList,
  //   "place_id" : place_id,
  //   "content" : content,
  //   "rate" : selectedValue
  // });
});

function getTagList(tags){
  let tagList = [];
  tags.forEach((tag) => {
    tagList.push({name: tag.innerText});
  })
  return tagList;
}

function getRadioValue(radioButtons){
  let selectedValue = '1';
  Array.from(radioButtons).forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
    }
  });
  return selectedValue;
}

export {showModal}