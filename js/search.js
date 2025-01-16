let projectsData = null;

// Fetch projects data
async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        projectsData = await response.json();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Initialize search functionality
async function initializeSearch() {
    await fetchProjects();
    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Search function
    function searchProperties(query) {
        if (!query || query.length < 2) {
            searchResults.classList.add('d-none');
            return;
        }
        
        query = query.toLowerCase();
        const results = [];
        
        // Search in residential properties
        projectsData.residential.forEach(property => {
            if (
                property.name.toLowerCase().includes(query) ||
                property.location.sector.toLowerCase().includes(query) ||
                property.location.city.toLowerCase().includes(query)
            ) {
                results.push({
                    ...property,
                    type: 'Residential'
                });
            }
        });
        
        // Search in commercial properties
        projectsData.commercial.forEach(property => {
            if (
                property.name.toLowerCase().includes(query) ||
                property.location.sector.toLowerCase().includes(query) ||
                property.location.city.toLowerCase().includes(query)
            ) {
                results.push({
                    ...property,
                    type: 'Commercial'
                });
            }
        });
        
        displayResults(results);
    }
    
    // Display results function
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.classList.add('d-none');
            return;
        }
        
        searchResults.innerHTML = results
            .slice(0, 5) // Limit to 5 results
            .map(property => `
                <div class="search-result-item" data-property-id="${property.id}">
                    <h6 class="mb-1">${property.name}</h6>
                    <p class="mb-0">
                        ${property.location.sector}, ${property.location.city}
                        <span class="badge bg-secondary ms-2">${property.type}</span>
                    </p>
                </div>
            `)
            .join('');
            
        searchResults.classList.remove('d-none');
    }
    
    // Handle click on result item
    searchResults.addEventListener('click', (e) => {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem) {
            const propertyId = resultItem.dataset.propertyId;
            // Navigate to property page
            window.location.href = `/property-single.html?id=${propertyId}`;
        }
    });
    
    // Handle input changes with debounce
    searchInput.addEventListener('input', debounce((e) => {
        searchProperties(e.target.value);
    }, 300));
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('d-none');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch); 