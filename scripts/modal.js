//모달창 생성
let modal = document.querySelector('#modal');
let closeBtn = document.querySelector('#closeBtn');

function showModal() {
    modal.style.display = "block";
}

closeBtn.addEventListener('click', ()=> {
    modal.style.display = "none";
  });

export {showModal}