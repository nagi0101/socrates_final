import { api, path } from './api.js';

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
  showReview(place.id);
  clearTags();
  let contentInput = document.getElementById("content");
  contentInput.value = "";
  document.getElementById("khuong_3").checked = true;
}

async function showReview(placeId) {
  const reviewContainer = modal.querySelector(".comments_list");
  reviewContainer.innerHTML = "";

  const reviewsData = await api.get(path.REVIEWS.PARAM("place_id", placeId).url);
  reviewsData.forEach((reviewData) => {
    const reviewElement = createReviewElement(reviewData);
    reviewContainer.appendChild(reviewElement);
  })
}

function createReviewElement(reviewData) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("comments_wrapper");

  const contentElement = document.createElement("div");
  contentElement.classList.add("comments_text");
  contentElement.innerText = reviewData.content;
  reviewElement.appendChild(contentElement);

  const ratingElement = document.createElement("div");
  ratingElement.classList.add("comments_rating");
  for (let i = 0; i < reviewData.rate; ++i) {
    const img = document.createElement("img");
    img.src = "./images/khuong.png";
    ratingElement.appendChild(img);
  }
  reviewElement.appendChild(ratingElement);

  if (reviewData.tags.length > 0) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("comments_tag");
    reviewData.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tags");
      tagElement.innerText = tag.name;
      tagsContainer.appendChild(tagElement);
    })
    reviewElement.appendChild(tagsContainer);
  }

  return reviewElement;
}

closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

form.addEventListener('submit', async (event) => {
  let rawTagList = Array.from(document.querySelectorAll('.key-item-text'));
  let tagList = getTagList(rawTagList);
  let place_id = document.querySelector('.space_id').innerHTML;
  let place_name = document.querySelector('.comments_title').innerHTML;
  let content = document.querySelector('#content').value;
  let radioButtons = document.getElementsByName('rating');
  let selectedValue = getRadioValue(radioButtons);
  
  const response = await api.post(path.REVIEWS.url, {
    content: content,
    place_id: place_id,
    place_name : place_name,
    rate: selectedValue,
    tags: tagList
  });
  const reviewContainer = modal.querySelector(".comments_list");
  const newReviewElement = createReviewElement(response);
  reviewContainer.appendChild(newReviewElement);
});

function getTagList(tags) {
  let tagList = [];
  tags.forEach((tag) => {
    tagList.push({ name: tag.innerText });
  })
  return tagList;
}

function getRadioValue(radioButtons) {
  let selectedValue = '1';
  Array.from(radioButtons).forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
    }
  });
  return selectedValue;
}

export { showModal }