// utils/filterPageData.js
export const filterPageData = (data, page) => {
    // Extract unique pages dynamically from the data
    const uniquePages = [...new Set(data.map((d) => d.page))];
  
    // If the provided page is not valid, return all data
    if (!uniquePages.includes(page)) {
      return data;
    }
  
    // Filter data for the specified page
    return data.filter((d) => d.page === page);
  };
  
  // Utility function to get unique pages
  export const getUniquePages = (data) => {
    return [...new Set(data.map((d) => d.page))];
  };
  