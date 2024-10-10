// script.js

/**
 * Creates a searchable input field.
 * @param {HTMLElement} container - The container to add the search field to.
 * @param {Object} options - Configuration options for the search field.
 * @param {Array} [options.items] - The list of items to search through (optional).
 * @param {string} [options.url] - The URL to fetch items from (optional).
 * @param {string} [options.inputName='selectedItem'] - The name attribute for the hidden input (optional).
 * @returns {Object} - An object with methods to interact with the search field.
 */
function createSearchField(container, { items = [], url = null, inputName = 'selectedItem' }) {
    // Variables to store the selected item, loading state, and error state
    let selectedItem = null;
    let isLoading = false;
    let error = null;
  
    // Create the elements
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
  
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search Product';
  
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.classList.add('clear-button');
    clearButton.textContent = 'Clear';
  
    const searchResults = document.createElement('div');
    searchResults.classList.add('product-search-results');
  
    // Hidden input to store the selected item's ID
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = inputName;
  
    // Append elements to the container
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchResults);
    searchContainer.appendChild(hiddenInput);
    container.appendChild(searchContainer);
  
    // Function to filter and show search results
    async function showSearchResults() {
      const searchTerm = searchInput.value.toLowerCase();
      let filteredItems = items;
  
      // Reset loading and error states
      isLoading = true;
      error = null;
      updateLoadingState();
  
      // If a URL is provided, fetch items from the server
      if (url) {
        try {
          const response = await fetch(`${url}?query=${encodeURIComponent(searchTerm)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          filteredItems = await response.json();
        } catch (err) {
          console.error('Fetch error:', err);
          error = err;
        } finally {
          isLoading = false;
          updateLoadingState();
        }
      } else {
        // Filter the local items if no URL is provided
        filteredItems = items.filter(item =>
          item.name.toLowerCase().includes(searchTerm)
        );
        isLoading = false;
        updateLoadingState();
      }
  
      searchResults.innerHTML = '';
  
      if (filteredItems.length > 0) {
        searchResults.style.display = 'block';
        filteredItems.forEach(item => {
          const listItem = document.createElement('div');
          listItem.classList.add('list-item');
          listItem.textContent = item.name;
          listItem.dataset.itemId = item.id;
  
          // Click event to select the item
          listItem.addEventListener('click', function() {
            searchInput.value = this.textContent;
            searchInput.setAttribute('readonly', true); // Make input read-only and greyed out
            clearButton.style.display = 'inline'; // Show the clear button
            searchResults.style.display = 'none'; // Hide the search results
  
            // Set the selected item details
            selectedItem = {
              id: this.dataset.itemId,
              name: this.textContent
            };
  
            // Update the hidden input value with the selected item's ID
            hiddenInput.value = selectedItem.id;
  
            console.log("Selected Item:", selectedItem); // Log the selected item details
          });
  
          searchResults.appendChild(listItem);
        });
      } else {
        searchResults.style.display = 'none';
      }
    }
  
    // Function to update the loading state (can be used for showing loading indicators)
    function updateLoadingState() {
      if (isLoading) {
        searchInput.classList.add('loading');
      } else {
        searchInput.classList.remove('loading');
      }
      if (error) {
        console.error("Current Error:", error);
      }
    }
  
    // Event listener to open search results when input is clicked
    searchInput.addEventListener('click', showSearchResults);
  
    // Event listener for the search input
    searchInput.addEventListener('input', showSearchResults);
  
    // Event listener for the clear button
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      searchInput.removeAttribute('readonly'); // Make input editable again
      clearButton.style.display = 'none'; // Hide the clear button
      searchResults.style.display = 'none'; // Hide the search results
      selectedItem = null; // Clear the selected item
      hiddenInput.value = ''; // Clear the hidden input value
      console.log("Selected Item Cleared:", selectedItem); // Log the cleared state
    });
  
    // Hide the search results if clicked outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.search-container')) {
        searchResults.style.display = 'none';
      }
    });
  
    // Return an object to interact with the search field
    return {
      getSelectedItem: () => selectedItem,
      isLoading: () => isLoading,
      getError: () => error
    };
  }
  