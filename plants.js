// ===== MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== PLANT FILTERING =====
let currentPlantCategory = 'all';
const ADMIN_SEARCH_TERM = 'add';
const ADMIN_FORM_PATH = 'mm-plant-workbench.html';
const CONTACT_URL = 'https://instagram.com/monstera.mom25';

function maybeOpenAdminForm(value) {
    if ((value || '').trim().toLowerCase() !== ADMIN_SEARCH_TERM) return false;
    window.location.href = ADMIN_FORM_PATH;
    return true;
}

function filterPlants(category, trigger) {
    currentPlantCategory = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (trigger) trigger.classList.add('active');
    applyPlantFiltersAndSort();
}

function getAvailablePlantIds() {
    if (typeof AVAILABLE_PLANTS !== 'string') return null;
    return AVAILABLE_PLANTS.split(',').map(p => p.trim()).filter(Boolean);
}

function applyAvailablePlants() {
    const availablePlantIds = getAvailablePlantIds();
    const plantCards = document.querySelectorAll('.plant-card[data-plant-id]');
    if (!availablePlantIds || plantCards.length === 0) return;
    const availableSet = new Set(availablePlantIds);
    plantCards.forEach(card => {
        card.dataset.available = String(availableSet.has(card.dataset.plantId));
    });
    applyPlantFiltersAndSort();
}

function getPlantPrice(card, mode) {
    const priceText = card.querySelector('.price-sale, .plant-price')?.textContent || '';
    const prices = priceText.match(/\d+(?:\.\d+)?/g)?.map(Number) || [0];
    return mode === 'price-desc' ? Math.max(...prices) : Math.min(...prices);
}

function applyPlantFiltersAndSort() {
    const grid = document.getElementById('plantsGrid');
    const plantCards = Array.from(document.querySelectorAll('.plant-card[data-plant-id]'));
    if (!grid || plantCards.length === 0) return;

    const query = (document.getElementById('plantSearch')?.value || '').trim().toLowerCase();
    const sortMode = document.getElementById('plantSort')?.value || 'featured';
    let visibleCount = 0;

    plantCards.forEach((card, index) => {
        if (!card.dataset.originalOrder) card.dataset.originalOrder = String(index);
        const matchesAvailable = card.dataset.available !== 'false';
        const matchesCategory = currentPlantCategory === 'all' || card.dataset.category === currentPlantCategory;
        const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
        const isVisible = matchesAvailable && matchesCategory && matchesSearch;
        card.classList.toggle('hidden', !isVisible);
        if (isVisible) visibleCount += 1;
    });

    [...plantCards].sort((a, b) => {
        if (sortMode === 'name-asc') return (a.querySelector('.plant-name')?.textContent || '').localeCompare(b.querySelector('.plant-name')?.textContent || '');
        if (sortMode === 'price-asc' || sortMode === 'price-desc') {
            return sortMode === 'price-asc'
                ? getPlantPrice(a, sortMode) - getPlantPrice(b, sortMode)
                : getPlantPrice(b, sortMode) - getPlantPrice(a, sortMode);
        }
        return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
    }).forEach(card => grid.appendChild(card));

    const plantCount = document.querySelector('.plant-count');
    if (plantCount) plantCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'listing' : 'listings'}`;

    const emptyState = document.getElementById('plantEmptyState');
    if (emptyState) emptyState.classList.toggle('visible', visibleCount === 0);
}

function initPlantControls() {
    const searchInput = document.getElementById('plantSearch');
    const sortSelect = document.getElementById('plantSort');
    if (searchInput && !searchInput.dataset.bound) {
        searchInput.dataset.bound = 'true';
        searchInput.addEventListener('input', applyPlantFiltersAndSort);
        searchInput.addEventListener('keydown', event => {
            if (event.key === 'Enter' && maybeOpenAdminForm(searchInput.value)) {
                event.preventDefault();
            }
        });
        searchInput.addEventListener('search', () => {
            maybeOpenAdminForm(searchInput.value);
        });
    }
    if (sortSelect && !sortSelect.dataset.bound) {
        sortSelect.dataset.bound = 'true';
        sortSelect.addEventListener('change', applyPlantFiltersAndSort);
    }
}

// ===== CONTACT FOR PLANT =====
function contactForPlant(plantName, price) {
    window.open(CONTACT_URL, '_blank', 'noopener');
    showSuccessMessage(`Message Monstera Mom on Instagram about ${plantName} (${price}).`);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const plant = document.getElementById('plant').value;
        const message = document.getElementById('message').value;
        const details = [name, email, plant, message].filter(Boolean).join(' - ');
        window.open(CONTACT_URL, '_blank', 'noopener');
        showSuccessMessage(details ? 'Message Monstera Mom on Instagram with your inquiry details.' : 'Message Monstera Mom on Instagram.');
        this.reset();
    });
}

// ===== SUCCESS MESSAGE =====
function showSuccessMessage(text) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// ===== ACTIVE NAV ON SCROLL =====
window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
        const navLink = document.querySelector(`.nav-link[href="#${section.getAttribute('id')}"]`);
        if (!navLink) return;
        const active = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;
        navLink.style.color = active ? 'var(--primary-color)' : 'var(--text-dark)';
        navLink.style.fontWeight = active ? '600' : '500';
    });
}

// ===== PRODUCT PAGE HELPERS =====
function showTab(tabName, trigger) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName)?.classList.add('active');
    if (trigger) trigger.classList.add('active');
}

function changeQuantity(delta) {
    const qty = document.getElementById('quantity');
    if (qty) qty.value = Math.max(1, parseInt(qty.value) + delta);
}

function addToCart() {
    const qty = document.getElementById('quantity')?.value || 1;
    const plantName = document.querySelector('.product-title')?.textContent || 'Plant';
    showSuccessMessage(`${qty} ${plantName} added to cart!`);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
    applyAvailablePlants();
    initPlantControls();

    if (window.Swiper) {
        document.querySelectorAll('.plant-slider, .detail-slider').forEach(slider => {
            if (!slider.swiper) {
                new Swiper(slider, {
                    slidesPerView: 1,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    loop: true,
                    autoplay: { delay: 3000 }
                });
            }
        });
    }
});

