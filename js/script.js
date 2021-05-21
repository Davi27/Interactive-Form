/***********Get Elements***********/

let form = document.querySelector('form');

let nameField = document.getElementById("name");

let emailField = document.getElementById("email");

let selectJobField = document.getElementById("title");
let otherJobField = document.getElementById("other-job-role");

let designTShirt = document.getElementById("design");
let colorTShirt = document.getElementById("color");
let designTShirtA = document.querySelectorAll("[data-theme='js puns']");
let designTShirtB = document.querySelectorAll("[data-theme='heart js']");

let allActivities = document.getElementById("activities");
let activitiesInput = document.querySelectorAll('#activities [type= "checkbox"]');
let priceActivities = document.getElementById("activities-cost");

let selectPayment = document.getElementById('payment');
let defaultChoicePayment = selectPayment.children[1];

let cardPayment = document.getElementById('credit-card');
let paypalPayment = document.getElementById('paypal');
let bitcoinPayment = document.getElementById('bitcoin');

let ccNum = document.getElementById('cc-num');
let ccZip = document.getElementById('zip');
let cvV = document.getElementById('cvv');



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
let totalCost = 0;

allActivities.addEventListener('change', e => {
    (e.target.checked) ? totalCost += parseInt(e.target.dataset.cost) : totalCost -= parseInt(e.target.dataset.cost);
    priceActivities.innerHTML = `Total: $${totalCost}`;
})


/***********Payment Info***********/
defaultChoicePayment.setAttribute('selected', 'selected');
paypalPayment.style.display = 'none';
bitcoinPayment.style.display = 'none';

selectPayment.addEventListener('change', e => {
    if(selectPayment.value === 'paypal') {
        paypalPayment.style.display = 'block';       
        cardPayment.style.display = 'none';
        bitcoinPayment.style.display = 'none';
    }
    else if(selectPayment.value === 'bitcoin') {
        bitcoinPayment.style.display = 'block';
        cardPayment.style.display = 'none';
        paypalPayment.style.display = 'none';
    }
    else if(selectPayment.value === 'credit-card') {
        cardPayment.style.display = 'block';
        bitcoinPayment.style.display = 'none';
        paypalPayment.style.display = 'none';
    }
})


/***********Submit Form***********/
form.addEventListener('submit', e => {
    let countErrors = 0;

    if(!validateName(nameField.value)) {
        countErrors++;
    } 
    if(!validateEmail(emailField.value)) {
        countErrors++;
    } 
    if(!validateActivities()) {
        countErrors++;
    } 
    if(selectPayment.value === 'credit-card') {
        if(!validateCard()) {
            countErrors++;
        }
    } 

    if(countErrors > 0) {
        e.preventDefault();
    }
})


function validateName(name) {
    let space = /\s/g;
    if(name.replace(space, '') === '') {
        invalidInput(nameField);
        return false;
    } else {
        validInput(nameField);
        return true;
    }
}

function validateEmail(email) {
    if(/^\w+@\w+.com$/.test(email)) {
        validInput(emailField);
        return true;
    } else {
        invalidInput(emailField);
        return false;
    }
}

function validateActivities() {
    return (totalCost > 0) ? true : false;
}

function validateCard() {
    let countErrors = 0;

    if(/^\d{13,16}$/.test(ccNum.value)) {
        validInput(ccNum);
    } else {
        invalidInput(ccNum);
        countErrors++;
    }
    if(/^\d{5}$/.test(ccZip.value)) {
        validInput(ccZip);
    } else {
        invalidInput(ccZip);
        countErrors++;
    }
    if(/^\d{3}$/.test(cvV.value)) {
        validInput(cvV);
    } else {
        invalidInput(cvV);
        countErrors++;
    }
    return (countErrors > 0) ? false : true;
}


/***********Accessibility***********/
// Focus and Blur
for(let i = 0; i < activitiesInput.length; i++) {
    let actual = activitiesInput[i];

    actual.addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus');
    })
    actual.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus');
    })
}

// Display Errors

function invalidInput(element) {
    let target = element.parentElement;
    target.classList.remove('valid');
    target.classList.add('not-valid');
    target.lastElementChild.style.display = 'block';
}
function validInput(element) {
    let target = element.parentElement;
    target.classList.remove('not-valid');
    target.classList.add('valid');
    target.lastElementChild.style.display = 'none';
}