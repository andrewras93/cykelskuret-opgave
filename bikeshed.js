const bikes = [];
const bikeForm = document.getElementById('bikeForm');
const bikeName = document.getElementById('bikeName');
const bikeList = document.getElementById('bikeList');
const bikeNameError = document.getElementById('bikeNameError');
const bikeGear = document.getElementById('bikeGear');

function addBike(e){

    e.preventDefault();

    if(!bikeName.value){

        bikeNameError.innerHTML = 'Udfyld venligst navn på cyklen';

    } else {

        const bike = {
            bikeName: bikeName.value,
            bikeGear: bikeGear.value
        }

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
        li.appendChild(document.createTextNode(`Cykel: ${bike.bikeName} Antal gear: ${bike.bikeGear}`));

        bikeList.appendChild(li);

    });
}

if(bikeForm){

    bikeForm.addEventListener('submit', addBike);

} else {

    console.log(`The ID of bikeForm doesn't exist.`);

}