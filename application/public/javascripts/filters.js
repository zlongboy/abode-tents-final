(function mobileFilter() {
    const filtersOpen = document.querySelector('.filters__header');
    const checklist = document.querySelector('.checklist__container');

    filtersOpen.addEventListener('click', function() {
        checklist.classList.toggle('hide');
    });
})();


(function checkFilters() {
    const filtersForm = document.querySelector('#filters-form')
    const sortSelect = document.querySelector('[name="sortBy"]')
    const getCheckboxes = function(name) {
        return document.querySelectorAll(`input[name=${name}]`) 
    }
    
    sortSelect.addEventListener('input',  function() {
        filtersForm.submit()
    });
    
    // HOW CHECK EACH FILTER STATE ON CHANGE
    // getCheckboxes(brand).forEach(box => {
    //     box.addEventListener('change', function() {
    //         const checkboxState = Array.from(getCheckboxes(brand))
    //         const selected = checkboxState.filter(e => e.checked).map(e => e.value)
    //         console.log(selected) // THIS IS VALUE TO PASS
    //     });
    // });

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
})();