$(document).ready(() => {
  let options = [];
  let backspaceCount = 0;
  $('#search').keyup((event) => {
    if(event.originalEvent.key === 'Enter' && event.target.value.length > 0){
    options.push(event.target.value);
      makeOption();
      event.target.value = '';
    }else if(event.originalEvent.key === 'Backspace' && event.target.value.length === 0){
    backspaceCount++; 
      if(backspaceCount > 1){
      options.pop();
      makeOption();
      backspaceCount = 0;
    }
    }else{
      backspaceCount = 0;
    }
  })
  
  function makeOption(){
    let opt = options.map((op, index) => {
      return   `
  <div class="key-item"><p class="key-item-text" >${op}</p>
<span class="cross" data-id="${index}">X</span>
      </div>
  `
      ;
    });
    opt = opt.join('');
    $('#key').html(opt);
    $('.cross').click((event) => {
      options = options.filter((val, index) => index != event.target.dataset.id);
      makeOption();
    })
  }
});

/* ====이상 태그 관련 JS==== */


document.addEventListener('DOMContentLoaded', () => {
    let options = [];
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && event.target.value.length > 0) {
        options.push(event.target.value);
        makeOption();
        event.target.value = '';
      }
    });
  
    function makeOption() {
      const keyElement = document.getElementById('key');
      keyElement.innerHTML = '';
      options.forEach((op, index) => {
        const keyItem = document.createElement('div');
        keyItem.classList.add('key-item');
  
        const keyItemText = document.createElement('p');
        keyItemText.classList.add('key-item-text');
        keyItemText.textContent = op;
        keyItem.appendChild(keyItemText);
  
        const cross = document.createElement('span');
        cross.classList.add('cross');
        cross.setAttribute('data-id', index);
        cross.textContent = 'X';
        keyItem.appendChild(cross);
  
        keyElement.appendChild(keyItem);
      });
  
      const crosses = document.querySelectorAll('.cross');
      crosses.forEach((cross) => {
        cross.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-id');
          options = options.filter((val, idx) => idx != index);
          makeOption();
        });
      });
    }
  });

  $(document).ready(() => {
  let options = [];
  let backspaceCount = 0;
  $('#search').keyup((event) => {
    if(event.originalEvent.key === 'Enter' && event.target.value.length > 0){
    options.push(event.target.value);
      makeOption();
      event.target.value = '';
    }else if(event.originalEvent.key === 'Backspace' && event.target.value.length === 0){
    backspaceCount++; 
      if(backspaceCount > 1){
      options.pop();
      makeOption();
      backspaceCount = 0;
    }
    }else{
      backspaceCount = 0;
    }
  })
  
  function makeOption(){
    let opt = options.map((op, index) => {
      return   `
  <div class="key-item"><p class="key-item-text" >${op}</p>
<span class="cross" data-id="${index}">X</span>
      </div>
  `
      ;
    });
    opt = opt.join('');
    $('#key').html(opt);
    $('.cross').click((event) => {
      options = options.filter((val, index) => index != event.target.dataset.id);
      makeOption();
    })
  }
});
  