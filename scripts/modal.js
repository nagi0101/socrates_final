//모달창 생성
let modal = document.querySelector("#modal");
let closeBtn = document.querySelector("#closeBtn");

function clearTags() {
  keyElement.innerHTML = "";
}

function showModal() {
  modal.style.display = "block";
  clearTags();
  let contentInput = document.getElementById("content");
  contentInput.value = "";
  document.getElementById("khuong_3").checked = true;
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

export { showModal };
