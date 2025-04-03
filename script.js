const toggleBtn = document.querySelector('.toggle_btn');
        const toggleBtnIcon = document.querySelector('.toggle_btn svg');
        const dropdown_menu = document.querySelector('.dropdown_menu');

        toggleBtn.onclick = function (event) {
            if (!dropdown_menu || !toggleBtnIcon) {
                console.error('null pointer reference: cannot toggle menu');
                return;
            }

            try {
                // Toggle the open class on the dropdown menu
                dropdown_menu.classList.toggle('open');

                // Change the icon to an X when the menu is open
                const isOpen = dropdown_menu.classList.contains('open');
                toggleBtnIcon.className = isOpen 
                    ? 'fa-solid fa-xmark' 
                    : 'fa-solid fa-bars';
            } catch (err) {
                console.error('error toggling menu:', err);
            }
        }
        /*
        // Get the toggle button and dropdown menu elements
    const toggleBtn = document.querySelector('.toggle_btn');
    const dropdown_menu = document.querySelector('.dropdown_menu');
    
    // Add an event listener to the toggle button
    toggleBtn.addEventListener('click', function(event) {
        // Toggle the open class on the dropdown menu
        dropdown_menu.classList.toggle('open');
        
        // Change the icon to an X when the menu is open
        const isOpen = dropdown_menu.classList.contains('open');
        toggleBtnIcon.className = isOpen 
            ? 'fa-solid fa-xmark' 
            : 'fa-solid fa-bars';
    });
    */