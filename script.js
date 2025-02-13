// DOM Elements
const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const sectorSelect = document.getElementById('sector');
const cellSelect = document.getElementById('cell');

// Global variable for JSON data
let locationData = {};

// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        locationData = data;
        populateProvinces(); // Populate provinces after data loads
    })
    .catch(error => console.error('Error loading data:', error));

// Populate provinces
function populateProvinces() {
    provinceSelect.innerHTML = '<option value="">Select Province</option>';
    Object.keys(locationData).forEach(province => {
        let option = document.createElement("option");
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });
}

// Populate districts based on selected province
function populateDistricts(province) {
    districtSelect.innerHTML = '<option value="">Select District</option>';
    sectorSelect.innerHTML = '<option value="">Select Sector</option>';
    cellSelect.innerHTML = '<option value="">Select Cell</option>';
    sectorSelect.disabled = true;
    cellSelect.disabled = true;

    if (province && locationData[province]) {
        const districts = Object.keys(locationData[province]);
        districts.forEach(district => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
        districtSelect.disabled = false;
    } else {
        districtSelect.disabled = true;
    }
}

// Populate sectors based on selected district
function populateSectors(province, district) {
    sectorSelect.innerHTML = '<option value="">Select Sector</option>';
    cellSelect.innerHTML = '<option value="">Select Cell</option>';
    cellSelect.disabled = true;

    if (province && district && locationData[province][district]) {
        const sectors = Object.keys(locationData[province][district]);
        sectors.forEach(sector => {
            let option = document.createElement("option");
            option.value = sector;
            option.textContent = sector;
            sectorSelect.appendChild(option);
        });
        sectorSelect.disabled = false;
    } else {
        sectorSelect.disabled = true;
    }
}

// Populate cells based on selected sector
function populateCells(province, district, sector) {
    cellSelect.innerHTML = '<option value="">Select Cell</option>';

    if (province && district && sector && locationData[province][district][sector]) {
        const cells = locationData[province][district][sector];
        cells.forEach(cell => {
            let option = document.createElement("option");
            option.value = cell;
            option.textContent = cell;
            cellSelect.appendChild(option);
        });
        cellSelect.disabled = false;
    } else {
        cellSelect.disabled = true;
    }
}

// Event Listeners
provinceSelect.addEventListener('change', function () {
    populateDistricts(this.value);
});

districtSelect.addEventListener('change', function () {
    populateSectors(provinceSelect.value, this.value);
});

sectorSelect.addEventListener('change', function () {
    populateCells(provinceSelect.value, districtSelect.value, this.value);
});
