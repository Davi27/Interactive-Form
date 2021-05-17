/***********Get Elements***********/

let nameField = document.getElementById("name");

let selectJobField = document.getElementById("title");
let otherJobField = document.getElementById("other-job-role");

let designTShirt = document.getElementById("design");
let colorTShirt = document.getElementById("color");
let designTShirtA = document.querySelectorAll("[data-theme='js puns']");
let designTShirtB = document.querySelectorAll("[data-theme='heart js']");


/***********Name Fields***********/

nameField.focus();


/***********Job Fields***********/
otherJobField.style.display = 'none';
selectJobField.addEventListener('change', e => {
    if(selectJobField.value === 'other') {
        otherJobField.style.display = 'block';
    } else {
        otherJobField.style.display = 'none';
    }
})


/***********T-Shirt Fields***********/
colorTShirt.setAttribute('disabled', 'disabled');

designTShirt.addEventListener('change', () => {
    colorTShirt.removeAttribute('disabled');
    designTShirt.value === "js puns" ? hideWrongColors(designTShirtB, designTShirtA) :  hideWrongColors(designTShirtA, designTShirtB);
})

function hideWrongColors(add, remove) {
    for(let i = 0; i < add.length; i++) {
        add[i].setAttribute('hidden', 'hidden');
        remove[0].setAttribute('selected', 'selected');
        remove[i].removeAttribute('hidden');
    }
}

/***********Activities***********/