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


document.addEventListener("DOMContentLoaded", () => {
    let options = [];
    const searchInput = document.getElementById("search");

    function makeOption() {
        const keyElement = document.getElementById("key");
        keyElement.innerHTML = "";
        options.forEach((op, index) => {
            const keyItem = document.createElement("div");
            keyItem.classList.add("key-item");

            const keyItemText = document.createElement("p");
            keyItemText.classList.add("key-item-text");
            keyItemText.textContent = op;
            keyItem.appendChild(keyItemText);

            const cross = document.createElement("span");
            cross.classList.add("cross");
            cross.setAttribute("data-id", index);
            cross.textContent = "X";
            keyItem.appendChild(cross);

            keyElement.appendChild(keyItem);
        });

        const crosses = document.querySelectorAll(".cross");
        crosses.forEach((cross) => {
            cross.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-id");
                options = options.filter((val, idx) => idx != index);
                makeOption();
            });
        });
    }

    searchInput.addEventListener("keyup", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === "Enter" && event.target.value.length > 0) {
            options.push(event.target.value);
            makeOption();
            event.target.value = "";
        }
    });
});
  
