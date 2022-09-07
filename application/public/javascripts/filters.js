const filtersOpen = document.querySelector('.filters__header');
const checklist = document.querySelector('.checklist__container');

filtersOpen.addEventListener('click', function() {
    checklist.classList.toggle('hide');
});

// Listen for filter changes and submit filters
const filtersForm = document.querySelector('#filters-form')
const sortSelect = document.querySelector('[name="sortBy"]')
const getCheckboxes = function(name) {
    return document.querySelectorAll(`input[name=${name}]`) 
}

sortSelect.addEventListener('input',  function() {
    filtersForm.submit()
});

getCheckboxes('brand').forEach(box => {
    box.addEventListener('change', function() {
        filtersForm.submit()
    });
});

getCheckboxes('capacity').forEach(box => {
    box.addEventListener('change', function() {
        filtersForm.submit()
    });
});
