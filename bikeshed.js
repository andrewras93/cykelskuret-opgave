let bikes = [];
const bikeForm = document.getElementById('bikeForm');
const bikeName = document.getElementById('bikeName');
const bikeList = document.getElementById('bikeList');
const formErrMsg = document.getElementById('formErrMsg');
const bikeGear = document.getElementById('bikeGear');
const bikeType = document.getElementById('bikeType');
const bikePrice = document.getElementById('bikePrice');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
const options = { style: 'currency', currency: 'DKK' };
const numberFormat = new Intl.NumberFormat('da-DA', options);

const sortBtn = document.getElementById('sortBtn');
const listSort = document.getElementById('listSort');

function addBike(e){

    e.preventDefault();

    if(!bikeName.value || !bikePrice.value){

        formErrMsg.innerHTML = 'Udfyld venligst begge felter';

    } else {

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const date = new Date();

        const bike = {
            bikeID: bikes.length,
            bikeName: bikeName.value,
            bikeGear: bikeGear.value,
            bikeType: bikeType.value,
            bikePrice: numberFormat.format(bikePrice.value),
            date: date
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        /*if(bikes.find(element => element.bikeName === bikeName.value)){
            bikeNameError.innerHTML = 'Cyklen findes allerede';
            return
        }*/

        bikes.push(bike);

        formErrMsg.innerHTML = '';
        bikeName.value = '';
        bikeName.focus();
        bikePrice.value = '';

        updateBikes();

    }

}

function updateBikes(){

    bikeList.innerHTML = '';

    bikes.forEach(function (bike){

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`Cykel: ID: ${bike.bikeID}, Navn: ${bike.bikeName}, Antal gear: ${bike.bikeGear}, Type: ${bike.bikeType}, Pris: ${bike.bikePrice}, Dato: ${bike.date.toLocaleDateString(undefined, dateFormat)} `));

        const span = document.createElement('span');
        span.appendChild(document.createTextNode(`X`));
        span.classList.add('remove');

        span.addEventListener('click', () => {

            li.remove();

            bikes = bikes.filter(b => b.bikeID !== bike.bikeID)

        });

        li.appendChild(span);

        bikeList.appendChild(li);

    });
}

sortBtn.addEventListener('click', function (){

    if(listSort.value === 'Name'){
        sortName();
        updateBikes();
    }
    else if(listSort.value === 'Type'){
        sortType();
        updateBikes();
    }
    else if(listSort.value === 'Gear'){
        sortGear();
        updateBikes();
    }
    else if (listSort.value === 'Price'){
        sortPrice();
        updateBikes();
    }
    else if (listSort.value === 'Date'){
        sortDate();
        updateBikes();
    }

})

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function sortGear(){
    bikes.sort(function (bike1, bike2) {
        return bike1.bikeGear - bike2.bikeGear;
    });
}

function sortPrice(){
    bikes.sort(function (bike1, bike2) {
        return bike1.bikePrice - bike2.bikePrice;
    });
}

function sortName(){
    bikes.sort(function(a, b) {
        let nameA = a.bikeName.toUpperCase(); // ignore upper and lowercase
        let nameB = b.bikeName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
}

function sortType(){
    bikes.sort(function(a, b) {
        let nameA = a.bikeType.toUpperCase(); // ignore upper and lowercase
        let nameB = b.bikeType.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
}

function  sortDate(){
    bikes.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    });
}

if(bikeForm){

    bikeForm.addEventListener('submit', addBike);

} else {

    console.log(`The ID of bikeForm doesn't exist.`);

}