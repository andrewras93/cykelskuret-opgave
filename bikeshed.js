const bikes = [];
const bikeForm = document.getElementById('bikeForm');
const bikeName = document.getElementById('bikeName');
const bikeList = document.getElementById('bikeList');

function addBike(e){

    e.preventDefault();

    const bike = {
        bikeName: bikeName.value
    }

    bikes.push(bike);

    updateBikes();
}

function updateBikes(){

    bikeList.innerHTML = '';

    bikes.forEach(function (bike){
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${bike.bikeName}`));

        bikeList.appendChild(li);
    });
}

bikeForm.addEventListener('submit', addBike);