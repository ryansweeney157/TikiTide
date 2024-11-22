
function updateMenuDisplay() {
    const checkboxes = document.querySelectorAll('.dietary-checkbox:checked');
    const selectedOptions = Array.from(checkboxes).map(checkbox => checkbox.value);
    const menuItems = document.querySelectorAll('.menu-item');

    if(selectedOptions.length === 0) {
        menuItems.forEach(item => {
            item.classList.remove('highlight', 'dull')
            
        });
        return;
    }

    menuItems.forEach(item => {
        const itemClasses = Array.from(item.classList);
        const matches = selectedOptions.every(option => itemClasses.includes(option));
        if (matches) {
            item.classList.add('highlight');
            item.classList.remove('dull');
        } else {
            item.classList.remove('highlight');
            item.classList.add('dull')
        }
    });

}

document.querySelectorAll('.dietary-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateMenuDisplay);
});

document.getElementById("clear-preferences").addEventListener("click", function() {
    document.querySelectorAll('.dietary-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateMenuDisplay();
})
