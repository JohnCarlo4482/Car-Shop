// Car data
const cars = [
    {
        id: 1,
        name: "BMW X5",
        category: "suv",
        price: "$65,000",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
        year: "2024",
        mileage: "New",
        fuel: "Gasoline",
        features: ["Leather Seats", "Navigation", "AWD", "Panoramic Roof"]
    },
    {
        id: 2,
        name: "Tesla Model S",
        category: "electric",
        price: "$89,000",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
        year: "2024",
        mileage: "New",
        fuel: "Electric",
        features: ["Autopilot", "Premium Audio", "Glass Roof", "Supercharging"]
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        category: "sedan",
        price: "$45,000",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
        year: "2023",
        mileage: "15,000 mi",
        fuel: "Gasoline",
        features: ["AMG Package", "Premium Interior", "Safety Assist", "LED Lights"]
    },
    {
        id: 4,
        name: "Porsche 911",
        category: "sport",
        price: "$125,000",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
        year: "2024",
        mileage: "New",
        fuel: "Gasoline",
        features: ["Sport Package", "Carbon Fiber", "Track Mode", "Premium Sound"]
    },
    {
        id: 5,
        name: "Audi Q7",
        category: "suv",
        price: "$58,000",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
        year: "2023",
        mileage: "22,000 mi",
        fuel: "Gasoline",
        features: ["7 Seats", "Virtual Cockpit", "Quattro AWD", "Premium Plus"]
    },
    {
        id: 6,
        name: "Lucid Air",
        category: "electric",
        price: "$95,000",
        image: "https://images.unsplash.com/photo-1459603677915-a62079ffd002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww",
        year: "2024",
        mileage: "New",
        fuel: "Electric",
        features: ["515mi Range", "Glass Canopy", "Dream Drive", "Luxury Interior"]
    }
];

// Global state
let currentSection = 'home';
let selectedCategory = 'all';
let selectedCar = cars[0]; // Default selected car

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const categoryBtns = document.querySelectorAll('.category-btn');
const carsGrid = document.getElementById('carsGrid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeStore();
    initializeForms();
    showSection('home');
});

// Navigation functions
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            navigateToSection(targetSection);
            
            // Close mobile menu if open
            mobileNav.classList.remove('active');
        });
    });
}

function navigateToSection(sectionName) {
    showSection(sectionName);
    updateActiveNavLink(sectionName);
    currentSection = sectionName;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showSection(sectionName) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateActiveNavLink(sectionName) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionName}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functions
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

// Store functions
function initializeStore() {
    renderCars();
    initializeCategoryFilters();
}

function initializeCategoryFilters() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            selectCategory(category);
        });
    });
}

function selectCategory(category) {
    selectedCategory = category;
    
    // Update active category button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    renderCars();
}

function renderCars() {
    const filteredCars = selectedCategory === 'all' 
        ? cars 
        : cars.filter(car => car.category === selectedCategory);
    
    carsGrid.innerHTML = filteredCars.map(car => createCarCard(car)).join('');
}

function createCarCard(car) {
    const featuresDisplay = car.features.slice(0, 2).map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');
    
    const moreFeatures = car.features.length > 2 
        ? `<span class="feature-tag">+${car.features.length - 2} more</span>`
        : '';

    return `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-content">
                <div class="car-header">
                    <h3 class="car-name">${car.name}</h3>
                    <span class="car-year">${car.year}</span>
                </div>
                <div class="car-price">${car.price}</div>
                <div class="car-specs">
                    <span>Mileage: ${car.mileage}</span>
                    <span>Fuel: ${car.fuel}</span>
                </div>
                <div class="car-features">
                    <h4>Key Features:</h4>
                    <div class="features-list">
                        ${featuresDisplay}
                        ${moreFeatures}
                    </div>
                </div>
                <div class="car-actions">
                    <button class="btn btn-primary btn-small" onclick="selectCarForPurchase(${car.id})">
                        View Details
                    </button>
                    <button class="btn btn-outline btn-small">
                        Contact Dealer
                    </button>
                </div>
            </div>
        </div>
    `;
}

function selectCarForPurchase(carId) {
    const car = cars.find(c => c.id === carId);
    if (car) {
        selectedCar = car;
        updateSelectedCarDisplay();
        navigateToSection('buy');
    }
}

function updateSelectedCarDisplay() {
    const selectedCarElement = document.getElementById('selectedCar');
    const carImage = document.getElementById('selectedCarImage');
    const carName = document.getElementById('selectedCarName');
    const carPrice = document.getElementById('selectedCarPrice');
    const carFeatures = document.getElementById('selectedCarFeatures');
    
    if (carImage) carImage.src = selectedCar.image;
    if (carImage) carImage.alt = selectedCar.name;
    if (carName) carName.textContent = selectedCar.name;
    if (carPrice) carPrice.textContent = selectedCar.price;
    
    if (carFeatures) {
        carFeatures.innerHTML = selectedCar.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    }
}

// Form functions
function initializeForms() {
    initializeContactForm();
    initializePurchaseForm();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactFormSubmit(e);
        });
    }
}

function initializePurchaseForm() {
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handlePurchaseFormSubmit(e);
        });
    }
}

function handleContactFormSubmit(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function handlePurchaseFormSubmit(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Purchase inquiry submitted! Our team will contact you shortly.', 'success');
    console.log('Purchase inquiry data:', data);
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#2563eb'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 400px;
            font-weight: 500;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility functions
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

// Export functions for global access
window.navigateToSection = navigateToSection;
window.selectCarForPurchase = selectCarForPurchase;

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
    updateActiveNavLink(hash);
});

// Set initial URL hash
if (!window.location.hash) {
    window.history.replaceState(null, null, '#home');
}