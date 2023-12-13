const data = require("./TestFeed_BH-FR.json");

// Set to store unique IDs
const uniqueIds = new Set();

// Set to store unique Group IDs
const uniqueGroupIds = new Set();

// Counter for the word "t-shirt"
let tshirtCount = 0;
// Helper function to check if a string contains the word "t-shirt" (case-insensitive)
const containsTShirt = (str) => str.toLowerCase().includes('t-shirt');

// Count occurrences of "t-shirt" in the "Title" field
let titleOccurrences = 0;

// Process each object in the array
data.forEach(item => {
  try {
    // Check if the object has an "Id" property
    if (item && item.Id) {
      uniqueIds.add(item.Id);
    }    
    // Check if the object has an "ItemGroupId" property
    if (item && item.ItemGroupId) {
        uniqueGroupIds.add(item.ItemGroupId);
    }
       // Check if the object has a "Title" property and if it contains the word "t-shirt"
      if (item && item.Title && item.Title.toLowerCase().includes('t-shirt')) {
        titleOccurrences++;
      }
  } catch (error) {
    console.error('Error processing JSON object:', error);
  }
});

// Process each object in the array
data.forEach(item => {
    try {
      // Iterate through all properties of the object
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const propertyValue = item[key];
  
          // Check if the property value is a string and if it contains the word "t-shirt"
          if (typeof propertyValue === 'string' && containsTShirt(propertyValue)) {
            tshirtCount++;
          }
        }
      }
    } catch (error) {
      console.error('Error processing JSON object:', error);
    }
  });

// Get the count of unique IDs
const uniqueIdsCount = uniqueIds.size;
const uniqueGroupIdsCount = uniqueGroupIds.size;

// Create an object to store the count of products for each category
const categoryCounts = {};

// Process each object in the array
data.forEach(item => {
  try {
    // Check if the object has a "Category" property
    if (item && item.Category) {
      // Increment the count for the category or initialize it to 1
      categoryCounts[item.Category] = (categoryCounts[item.Category] || 0) + 1;
    }
  } catch (error) {
    console.error('Error processing JSON object:', error);
  }
});

// Find the category with the least number of products
let minCategory = null;
let minCount = Infinity;

for (const category in categoryCounts) {
  if (categoryCounts[category] < minCount) {
    minCount = categoryCounts[category];
    minCategory = category;
  }
}

// Print the count of unique IDs
console.log(`Number of unique IDs: ${uniqueIdsCount}`);
console.log(`Number of unique Group IDs: ${uniqueGroupIdsCount}`);
console.log(`Number of occurrences of "t-shirt": ${tshirtCount}`);
console.log(`Number of occurrences of "t-shirt" in the Title field: ${titleOccurrences}`);
console.log(`Category with the least products: ${minCategory}`);
console.log(`Number of products in that category: ${minCount}`);
