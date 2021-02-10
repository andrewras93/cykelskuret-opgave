let bikes = [];
const bikeForm = document.getElementById('bikeForm');
const bikeName = document.getElementById('bikeName');
const bikeList = document.getElementById('bikeList');
const bikeNameError = document.getElementById('bikeNameError');
const bikeGear = document.getElementById('bikeGear');
const bikeType = document.getElementById('bikeType');
const sortBtn = document.getElementById('sortBtn');
const listSort = document.getElementById('listSort');

function addBike(e){

    e.preventDefault();

    if(!bikeName.value){

        bikeNameError.innerHTML = 'Udfyld venligst navn på cyklen';

    } else {

        const bike = {
            bikeID: bikes.length,
            bikeName: bikeName.value,
            bikeGear: bikeGear.value,
            bikeType: bikeType.value
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        /*if(bikes.find(element => element.bikeName === bikeName.value)){
            bikeNameError.innerHTML = 'Cyklen findes allerede';
            return
        }*/

        bikes.push(bike);

        bikeNameError.innerHTML = '';
        bikeName.value = '';
        bikeName.focus();

        updateBikes();

    }

}

function updateBikes(){

    bikeList.innerHTML = '';

    bikes.forEach(function (bike){

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`Cykel: ID: ${bike.bikeID}, Navn: ${bike.bikeName}, Antal gear: ${bike.bikeGear}, Type: ${bike.bikeType} `));

        const span = document.createElement('span');
        span.appendChild(document.createTextNode(`X`));
        span.classList.add('remove');

        span.addEventListener('click', () => {
            //let newBikes = [];
            li.remove();

            bikes = bikes.filter(b => b.bikeID !== bike.bikeID)
            /*for(let i = 0; i < bikes.length; i++){
                if(bikes[i].bikeID !== bike.bikeID){
                    newBikes.push(bikes[i]);
                }
            }

            bikes = newBikes;*/

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

})

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function sortGear(){
    bikes.sort(function (bike1, bike2) {
        return bike1.bikeGear - bike2.bikeGear;
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

if(bikeForm){

    bikeForm.addEventListener('submit', addBike);

} else {

    console.log(`The ID of bikeForm doesn't exist.`);

}