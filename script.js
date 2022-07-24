const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterSlider = document.querySelector(".slider input"),
chooseImageBtn = document.querySelector(".choose-img");
previewImage = document.querySelector(".preview img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const load = () => {
    let file = fileInput.files[0];
    if(!file) return;
    console.log(file);
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
    });
});

const updateSlider = () => {
    filterValue.innerText = `${filterSlider.value}%`;
}

filterSlider.addEventListener("input", updateSlider);
fileInput.addEventListener("change", load);
chooseImageBtn.addEventListener("click", () => fileInput.click());