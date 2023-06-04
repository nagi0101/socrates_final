const searchInput = document.getElementById("search");
const keyElement = document.getElementById("key_container");

function makeOption(text) {
    const keyItem = document.createElement("span");
    keyItem.classList.add("key-item");

    const keyItemText = document.createElement("p");
    keyItemText.classList.add("key-item-text");
    keyItemText.textContent = text;
    keyItem.appendChild(keyItemText);

    const cross = document.createElement("span");
    cross.classList.add("cross");
    cross.textContent = "X";
    cross.addEventListener("click", (event) => {
        keyElement.removeChild(keyItem);
    })
    keyItem.appendChild(cross);

    keyElement.appendChild(keyItem);
}

searchInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "Enter" && event.target.value.length > 0) {
        makeOption(event.target.value);
        event.target.value = "";
    }
});
