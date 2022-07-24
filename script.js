const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterSlider = document.querySelector(".slider input"),
resetFilterBtn = document.querySelector('.reset-filters')
chooseImageBtn = document.querySelector(".choose-img");
saveImageBtn = document.querySelector('.save-img');
previewImage = document.querySelector(".preview img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", bllur = "0", contrast = "100";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () => {
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${bllur/10}px) contrast(${contrast}%)`;
}

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

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if(option.id === "blur") {
            filterSlider.max = "100";
            filterSlider.value = bllur;
            filterValue.innerText = `${bllur}%`;
        } else if(option.id === "contrast") {
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateSlider = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "blur") {
        bllur = filterSlider.value;
    } else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }

    applyFilter();
}

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0"; bllur = "0"; contrast = "100";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${bllur/10}px) contrast(${contrast}%)`;
    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

    console.log('hm')
}

filterSlider.addEventListener("input", updateSlider);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", load);
chooseImageBtn.addEventListener("click", () => fileInput.click());