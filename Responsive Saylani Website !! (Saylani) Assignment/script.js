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

function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
          }
          
          // Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
            if (!event.target.matches('.btn-1')) {
              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
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