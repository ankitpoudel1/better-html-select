# better-html-select
A better select for html


A reusable JavaScript function to create a searchable input field that can be used in HTML forms. The input field allows users to search and select an item from a list, with the selected item's ID being submitted as part of the form.

## Features

- Supports both local data and server-based searches.
- Tracks the loading state and errors during server-based searches.
- Integrates seamlessly into HTML forms, with the selected item submitted as a form field.
- Provides options to customize the hidden input's name attribute for form submissions.
- Includes a "Clear" button to reset the input.

## Usage

1. **Include the Files**:
   - Add `script.js` to your project for the JavaScript logic.
   - Optionally, include `style.css` for the search field styling.

2. **Basic Setup in HTML**:
   - Add the following structure to your HTML file:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Form with Search Field</title>
     <link rel="stylesheet" href="style.css">
   </head>
   <body>
     <form action="/submit" method="POST">
       <div id="searchFieldContainer"></div>
       <button type="submit">Submit</button>
     </form>

     <script src="script.js"></script>
     <script>
       document.addEventListener('DOMContentLoaded', () => {
         const container = document.getElementById('searchFieldContainer');
         createSearchField(container, {
           items: [
             { id: 1, name: 'Apple' },
             { id: 2, name: 'Banana' },
             { id: 3, name: 'Orange' },
             { id: 4, name: 'Grape' },
             { id: 5, name: 'Pineapple' }
           ],
           inputName: 'productId' // The hidden input name for form submission
         });
       });
     </script>
   </body>
   </html>

3 . **Configuration Options:**

  - items: An array of objects to search through. Each object should have an id and name property.
  - url: A URL to fetch items from. The search term is appended as a query parameter (optional).
  - inputName: The name attribute for the hidden input that stores the selected item's ID (default is 'selectedItem').

4. **Server-Based Search Example:**

- To use a server-based search, provide a URL:
javascript
Copy code
createSearchField(container, {
  url: 'https://example.com/api/items',
  inputName: 'productId'
});
- The function will make a GET request to the specified URL with the query parameter ?query=SEARCH_TERM.

5. **Accessing the Selected Item, Loading State, and Error State: **

- The function returns an object with the following methods:
  - getSelectedItem(): Returns the currently selected item.
  - isLoading(): Returns true if data is being loaded from the server.
  - getError(): Returns the current error (if any) encountered during the fetch.

6. **Styling:**

- The style.css file provides basic styles for the search field. You can customize the styles as needed.

##Example Form Submission
When a form is submitted, the selected item's ID will be included as a POST parameter:

```plaintext
Copy code
POST /submit
Content-Type: application/x-www-form-urlencoded

productId=1
```
## Notes
  - If using a server-based search, ensure your server endpoint supports filtering based on the query parameter ?query=SEARCH_TERM.
  - If the search results are not displaying, make sure the items or url parameter is correctly set and that the server is returning data in the expected format (array of objects with id and name).

