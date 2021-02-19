import 'database';

let bikes = [];
let filters = [];
const bikeForm = document.getElementById('bikeForm');
const bikeName = document.getElementById('bikeName');
const bikeList = document.getElementById('bikeList');
const formErrMsg = document.getElementById('formErrMsg');
const bikeGear = document.getElementById('bikeGear');
const bikeType = document.getElementById('bikeType');
const bikePrice = document.getElementById('bikePrice');
const options = { style: 'currency', currency: 'DKK' };
const numberFormat = new Intl.NumberFormat('da-DA', options);
const sortBtn = document.getElementById('sortBtn');
const listSort = document.getElementById('listSort');
const filterBtn = document.getElementById('filterBtn');
const mountainBike = document.getElementById('mountainBike');
const cityBike = document.getElementById('cityBike');
const tandemBike = document.getElementById('tandemBike');

function addBike(e){
// Hvad der skal ske når vi trykker 'Tilføj Cykel'.

    e.preventDefault();

    if(!bikeName.value || !bikePrice.value){
    // Hvis bikeName ikke har en værdi eller bikePrice ikke har en værdi, skal følgende ske:

        formErrMsg.innerHTML = 'Udfyld venligst begge felter';

    }

    else {
     // Ellers skal følgende ske:

        formErrMsg.innerHTML = '';

        const date = new Date();
        // Tager dato og tid, på det tidspunkt der blev trykket på 'Tilføj Cykel'.

        const bike = {
        // Vores cykel objekt.

            bikeID: bikes.length, // Tager længden på vores bikes array, som er tom fra start dvs. id'et på vores første cykel vil være '0'.
            bikeName: bikeName.value,
            bikeGear: bikeGear.value,
            bikeType: bikeType.value,
            bikePrice: bikePrice.value,
            date: date
        }

        bikes.push(bike); // Indsætter vores bike objekt, med alle dets værdier, til sidst i vores bikes array.
        // Vi har altså nu tilføjet en cykel til vores bikes array.

        bikeName.value = ''; // Vi ryder det der står i input feltet til bikeName, så man er klar til evt. at indtaste navnet på en ny cykel.
        bikePrice.value = ''; // Det samme gøres for feltet til bikePrice, så man kan indtaste en ny pris.
        bikeName.focus(); // Sætter bikeName inputtet i fokus, så man ikke skal klikke på det igen, for at indtaste cykel navn.

        updateBikes(); // Kalder/kører en funktion ved navn updateBikes.

    }

}

function updateBikes() {

    bikeList.innerHTML = '';

    bikes.forEach(function (bike){
    // Tager og 'kigger' igennem vores bikes array. For hvert element (bike) vi har i vores array, skal følgende kode køres, på det pågældende element.

        if( filters.length === 0 || filters.includes(bike.bikeType)){
        // Hvis længden på vores filter array er lig med 0, hvilket vil sige det er tomt (hvilket det er fra start af),
        // eller hvis det inkluderer en type af cykel, skal følgende ske:

            const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' }; // Formaterer vores date variabel, så vi kan udskrive det pænt med år, måned og dag angivet som tal.
            const li = document.createElement('li'); // For hvert element i vores bikes array skabes der et '<li></li>' tag.
            const span = document.createElement('span'); // Udover vores '<li>' tag, bliver der også tilføjet et '<span></span>' tag for hvert element.

            li.appendChild(document.createTextNode(`Cykel: ID: ${bike.bikeID}, Navn: ${bike.bikeName}, Antal gear: ${bike.bikeGear}, Type: ${bike.bikeType}, Pris: ${numberFormat.format(bike.bikePrice)}, Dato: ${bike.date.toLocaleDateString(undefined, dateFormat)} `));
            // Vi tilføjer en 'TextNode' til vores '<li>' tag, hvor vi skriver værdierne for hvert element (de enkelte cyklers værdier, som vi har fået fra vores input felter (bortset fra date)).
            li.appendChild(span); // Tilføjer også 'span' til vores 'li'.

            span.appendChild(document.createTextNode(`X`)); // Vi tilføjer endnu engang en 'TextNode', denne gang til vores '<span>', hvor vi skriver et simpelt kryds.
            span.classList.add('remove'); // Tilføjer en klasse til vores '<span>'.

            bikeList.appendChild(li); // Udskriver vores cykler til 'dokumentet', ved at tilføje dem til vores bikeList '<ul>'.

            span.addEventListener('click', () => {
            // For hvert element tilføjes en 'EventListener'. Hvis elementets 'span' klikkes på, skal følgende ske:

                li.remove(); // Det pågælende elements 'li' og dens indhold fjernes (inkluderer også 'span'), men kun fra selve 'dokumentet' og ikke fra vores array.

                bikes = bikes.filter(b => b.bikeID !== bike.bikeID)
                // Vi filtrerer igennem vores bikes array og laver et nyt array, med de cykler hvor id'et ikke matcher det der er blevet klikket på.
                // Dvs. det tager et element (b) ud, kigger på det elements id og holder det oppe imod det 'originale' id, matches de ikke, bliver det element (b) sat i det nye array.
                // Hvis det skulle skrives primitivt:
                /*let newBikes = [];

                for (let i = 0; i < bikes.length; i++){
                    if (bikes[i].bikeID !== bike.bikeID){
                        newBikes.push(bikes[i]);
                    }
                }

                bikes = newBikes;*/

            });

        }

    });
}

filterBtn.addEventListener('click', function (){

    filters = [];

    if(mountainBike.checked){
        filters.push(mountainBike.value);
    }
    if (cityBike.checked){
        filters.push(cityBike.value);
    }
    if (tandemBike.checked){
        filters.push(tandemBike.value);
    }

    updateBikes();

});

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

});

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

/* KILDER:

Number format: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
Array find: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
Array sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

 */