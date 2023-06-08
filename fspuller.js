const fs = require('fs');
const path = require('path');

  console.log(path);

// function searchInMappedDrives(searchQuery) {
  //   // Retrieve list of mapped drives (using the methods described earlier)
  //   const mappedDrives = getMappedDrives();

//   const searchResults = [];

//   mappedDrives.forEach((drive) => {
//     const drivePath = drive.path;
//     console.log(drive);

//     // Recursively search for files within the mapped drive
//     searchFiles(drivePath, searchQuery, searchResults);
//   });

//   // Display the search results in the Electron application's user interface
//   displaySearchResults(searchResults);
// }

// function searchFiles(directory, searchQuery, searchResults) {
//   const files = fs.readdirSync(directory);
//   files.forEach((file) => {
//     const filePath = path.join(directory, file);
//     const fileStat = fs.statSync(filePath);

//     if (fileStat.isDirectory()) {
//       // Recurse into subdirectories
//       searchFiles(filePath, searchQuery, searchResults);
//     } else {
//       // Perform search matching on file names or other criteria
//       if (file.includes(searchQuery)) {
//         searchResults.push(filePath);
//       }
//     }
//   });
// }

// function displaySearchResults(searchResults) {
//   // Render the search results in the Electron application's user interface
//   searchResults.forEach((result) => {
//     // Create HTML elements to represent each search result and display them to the user
//   });
// }