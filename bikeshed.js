let bikes = [];
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
        li.appendChild(document.createTextNode(`Cykel: ${bike.bikeName} Antal gear: ${bike.bikeGear} `));

        const span = document.createElement('span');
        span.appendChild(document.createTextNode(`X`));
        span.classList.add('remove');

        span.addEventListener('click', () => {
            const newBikes = [];

            li.remove();

            for(let i = 0; i < bikes.length; i++){
                if(bikes[i].bikeName !== bike.bikeName){
                    newBikes.push(bikes[i])
                }
            }
            bikes = newBikes;
        });

        li.appendChild(span);

        bikeList.appendChild(li);

    });
}

if(bikeForm){

    bikeForm.addEventListener('submit', addBike);

} else {

    console.log(`The ID of bikeForm doesn't exist.`);

}