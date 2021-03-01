//START OF DATABASE SECTION

class DataBase {
    items = [];
    changelog = [];

    constructor() {
        this.items = [];
        this.changelog = [];

        let db = localStorage.getItem("database");
        db = db ? JSON.parse(db) : [];

        let updatedItems = localStorage.getItem("updatedItems");
        updatedItems = updatedItems ? JSON.parse(updatedItems) : [];

        for(let i = 0; i < db.length; i++) {
            let bike = db[i];
            this.add(bike.name, bike.gear, bike.type, bike.price, bike.date, bike.lastModified);
        }

        for(let i = 0; i < updatedItems.length; i++) {
            let bike = updatedItems[i];
            this.changelog.push(bike);
        }
    }

    add(name, gear, type, price, date, lastModified) {

        this.items.push({
            id: this.items.length,
            name: name,
            gear: parseInt(gear),
            type: type,
            price: parseFloat(price),
            date: new Date(date),
            lastModified: lastModified ? lastModified : new Date()
        });

        this.updateLocalStorage();
    }
    
    modify(oldBike, newBike) {

        newBike.lastModified = new Date();
        newBike.price = parseFloat(newBike.price);
        newBike.gear = parseInt(newBike.gear);
        let index = this.items.indexOf(oldBike);

        if(index === -1) {
            console.log('Bike id was not found');
            return
        }

        this.changelog.push(newBike);
        this.items[index] = newBike;
        this.updateLocalStorage();
        this.updateLocalStorageChangelog();

    }

    get getItems() {
        return this.items;
    }

    get getChangelog() {
        return this.changelog;
    }


    sort(func) {
        return this.items.sort(func)
    }

    remove(id) {
        this.items = this.items.filter(b => b.id !== id);
        this.changelog = this.changelog.filter(b => b.id !== id);
        this.updateLocalStorage();
    }

    get getItems() {
        return this.items;
    }

    updateLocalStorage() {
        localStorage.setItem("database", JSON.stringify(this.items));

    }

    updateLocalStorageChangelog() {
        localStorage.setItem("updatedItems", JSON.stringify(this.changelog));
    }
}

//END OF DATABASE SECTION

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
const changelogList = document.createElement('ul');

let database = new DataBase();
updateBikes(); //Initialize first update if database had items from local storage

function addBike(e){

    e.preventDefault();

    if(!bikeName.value || !bikePrice.value){

        formErrMsg.innerHTML = 'Udfyld venligst begge felter';

    }
    else {

        formErrMsg.innerHTML = '';

        const date = new Date();

        database.add(bikeName.value, bikeGear.value, bikeType.value, bikePrice.value, date)

        bikeName.value = '';
        bikePrice.value = '';
        bikeName.focus();

        updateBikes();

    }
}

function updateBikes() {

    bikeList.innerHTML = '';

    database.getItems.forEach(function (bike) {

        if ( filters.length === 0 || filters.includes(bike.type)) {

            const li = document.createElement('li'); 
            const span = document.createElement('span');
            const span2 = document.createElement('span');
            const changelog = document.createElement('span');

            changelog.appendChild(document.createTextNode(' Changelog'));
            changelog.style.cssText = 'cursor: pointer; color: orange';

            li.appendChild(document.createTextNode(`Cykel: ID: ${bike.id}, Navn: ${bike.name}, Antal gear: ${bike.gear}, Type: ${bike.type}, Pris: ${numberFormat.format(bike.price)}, Dato: ${bike.date.toLocaleDateString()}`));
            li.appendChild(span);
            li.appendChild(span2);
            li.appendChild(changelog);

            span.appendChild(document.createTextNode(` X`));
            span.classList.add('remove');
            
            span2.appendChild(document.createTextNode(` Modify`));
            span2.classList.add('modify');

            bikeList.appendChild(li);

            span.addEventListener('click', () => {

                li.remove();
                database.remove(bike.id);

            });
            let idVal = bike.id;
            span2.addEventListener('click', () => {

                const modal = document.getElementById('modal');
                const div = document.createElement('div');
                const h3 = document.createElement('h3');
                const nameInput = document.createElement('input');
                const priceInput = document.createElement('input');
                const gearSelect = document.createElement('select');
                const typeSelect = document.createElement('select');
                const span = document.createElement('span');
                const btn = document.createElement('button');
                const modalErrMsg = document.createElement('span');
                let nameVal = bike.name;
                let priceVal = bike.price;
                let gearVal = bike.gear;
                let typeVal = bike.type;
                let selectOption;

                nameInput.setAttribute('type', 'text');
                priceInput.setAttribute('type', 'number');
                priceInput.setAttribute('step', '.01');

                modal.innerHTML = '';

                h3.appendChild(document.createTextNode('Modify'));
                span.appendChild(document.createTextNode('X'));
                btn.appendChild(document.createTextNode('Gem'));

                span.classList.add('remove');
                div.classList.add('modalContent');

                for (let i = 0; i < bikeType.length; i++) {
                    selectOption = document.createElement('option');

                    selectOption.appendChild(document.createTextNode(`${bikeType.options[i].value}`));

                    typeSelect.appendChild(selectOption);
                }

                for (let i = 0; i < bikeGear.length; i++) {
                    selectOption = document.createElement('option');

                    selectOption.appendChild(document.createTextNode(`${bikeGear.options[i].value}`));

                    gearSelect.appendChild(selectOption);
                }

                modal.appendChild(div);
                div.appendChild(h3);
                div.appendChild(nameInput).value = nameVal;
                div.appendChild(priceInput).value = priceVal;
                div.appendChild(gearSelect).value = gearVal;
                div.appendChild(typeSelect).value = typeVal;
                div.appendChild(btn);
                div.appendChild(span);
                div.appendChild(modalErrMsg);

                modal.style.display = 'block';

                span.onclick = function(event) {
                    modal.style.display = 'none';
                }

                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                }

                btn.onclick = function () {

                    if (idVal === bike.id) {

                        if (!nameInput.value || !priceInput.value) {

                            modalErrMsg.innerHTML = 'Udfyld venligst både Navn og Pris';

                        } else {
                            let newBike = {
                                id: idVal,
                                name: nameInput.value,
                                gear: gearSelect.value,
                                type: typeSelect.value,
                                price: priceInput.value,
                                date: bike.date
                            }

                            database.modify(bike, newBike);

                            updateBikes();
                            modal.style.display = 'none';
                        }
                    } else {
                        return 'ID does not match.'
                    }

                }

            });

            changelog.onclick = function () {

                const changelogModal = document.getElementById('modal');
                const div = document.createElement('div');
                const h3 = document.createElement('h3');
                const close = document.createElement('span');

                changelogModal.innerHTML = '';
                changelogList.innerHTML = '';

                h3.appendChild(document.createTextNode('Changelog'));
                close.appendChild(document.createTextNode('Close'));
                close.style.cssText = 'font-size: 12px; color: red; cursor: pointer';

                changelogModal.appendChild(div);

                div.classList.add('modalContent');
                div.appendChild(h3);

                changelogModal.style.display = 'block';

                database.getChangelog.forEach(function (bike) {

                    if (bike.id === idVal) {

                        const li = document.createElement('li');
                        const arrow = document.createElement('span');

                        arrow.setAttribute('class', 'arrow');
                        arrow.appendChild(document.createTextNode(' →'));

                        li.style.cssText = 'list-style-type: none';
                        li.appendChild(document.createTextNode(`${bike.name},
                        ${bike.gear} gear, ${bike.type}, ${numberFormat.format(bike.price)} ændret: ${bike.date.toLocaleString()}`));

                        li.appendChild(arrow);

                        changelogList.appendChild(li);

                    }

                });
                div.appendChild(changelogList);
                div.appendChild(close);

                close.onclick = function(event) {
                    changelogModal.style.display = 'none';
                }

                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                }

            }

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
    database.sort(function (bike1, bike2) {
        return bike1.gear - bike2.gear;
    });
}

function sortPrice(){
    database.sort(function (bike1, bike2) {
        return bike1.price - bike2.price;
    });
}

function sortName(){
    database.sort(function(a, b) {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
    database.sort(function(a, b) {
        let nameA = a.type.toUpperCase(); // ignore upper and lowercase
        let nameB = b.type.toUpperCase(); // ignore upper and lowercase
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
    database.sort(function(a,b){
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