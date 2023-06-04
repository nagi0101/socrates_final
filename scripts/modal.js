//모달창 생성
let modal = document.querySelector('#modal');
let closeBtn = document.querySelector('#closeBtn');

closeBtn.addEventListener('click', ()=> {
    modal.style.display = "none";
  });
