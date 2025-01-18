async function loadAndRenderProperties() {
    try {
        // Fetch the projects data
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        // Combine the first 5 residential and commercial properties
        const allProperties = [...data.residential.slice(0, 5), ...data.commercial.slice(0, 5)];
        
        // Get the property slider container
        const propertySlider = document.querySelector('.property-slider');
        
        // Clear existing content
        propertySlider.innerHTML = '';
        
        // Render each property
        allProperties.forEach(property => {
            const propertyHTML = `
                <div class="property-item">
                    <a href="property-single.html?id=${property.id}" class="img">
                        <img src="${property.images[0]}" alt="${property.name}" class="img-fluid" />
                    </a>

                    <div class="property-content">
                        <div class="price mb-2"><span>${property.name}</span></div>
                        <div>
                            <span class="d-block mb-2 text-black-50">${property.location.sector}, ${property.location.city}</span>
                            <span class="city d-block mb-3">${property.location.state}, ${property.location.country}</span>

                            <!-- 
                            <div class="specs d-flex mb-4">
                                <span class="d-block d-flex align-items-center me-3">
                                    <span class="icon-bed me-2"></span>
                                    <span class="caption">3 BHK</span>
                                </span>
                                <span class="d-block d-flex align-items-center">
                                    <span class="icon-bath me-2"></span>
                                    <span class="caption">2 Baths</span>
                                </span>
                            </div>
                            -->

                            <a href="property-single.html?id=${property.id}" 
                               class="btn btn-primary py-2 px-3">See details</a>
                        </div>
                    </div>
                </div>
            `;
            
            propertySlider.innerHTML += propertyHTML;
        });

        // Initialize the tiny-slider after adding all properties
        initializePropertySlider();

    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

function initializePropertySlider() {
    if (document.querySelector('.property-slider')) {
        var propertySlider = tns({
            container: '.property-slider',
            mode: 'carousel',
            speed: 700,
            gutter: 30,
            items: 1,
            autoplay: true,
            autoplayButtonOutput: false,
            controlsContainer: '#property-nav',
            // nav: false, // Hide the index dots
            responsive: {
                992: {
                    items: 3
                },
                768: {
                    items: 2
                }
            }
        });
    }
}

// Load properties when the DOM is ready
document.addEventListener('DOMContentLoaded', loadAndRenderProperties); 