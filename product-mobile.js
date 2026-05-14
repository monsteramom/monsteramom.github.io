function placeProductDetailsForViewport() {
    const detailContainer = document.querySelector('.product-detail-container');
    const productMain = document.querySelector('.product-main-content');
    const productInfo = document.querySelector('.product-info');
    const imageSlider = document.querySelector('.image-slider');
    const productTitle = document.getElementById('sidebar-title');
    const productPrice = document.querySelector('.product-price');
    const availability = document.querySelector('.availability');
    const contactButton = document.getElementById('contactBtn');
    const productDetails = document.querySelector('.product-details');

    if (!detailContainer || !productMain || !productInfo || !imageSlider || !productTitle || !productPrice || !availability || !productDetails) {
        return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
        detailContainer.classList.add('mobile-detail-order');
        if (productMain.firstElementChild !== productTitle) {
            productMain.insertAdjacentElement('afterbegin', productTitle);
        }
        if (availability.previousElementSibling !== productTitle) {
            productTitle.insertAdjacentElement('afterend', availability);
        }
        if (productDetails.previousElementSibling !== imageSlider) {
            imageSlider.insertAdjacentElement('afterend', productPrice);
            if (contactButton) {
                productPrice.insertAdjacentElement('afterend', contactButton);
                contactButton.insertAdjacentElement('afterend', productDetails);
            } else {
                productPrice.insertAdjacentElement('afterend', productDetails);
            }
        }
    } else {
        detailContainer.classList.remove('mobile-detail-order');
        if (productTitle.parentElement !== productInfo) {
            productInfo.appendChild(productTitle);
        }
        productTitle.insertAdjacentElement('afterend', productPrice);
        productPrice.insertAdjacentElement('afterend', availability);
        if (contactButton) {
            availability.insertAdjacentElement('afterend', contactButton);
            contactButton.insertAdjacentElement('afterend', productDetails);
        }
    }

    if (!isMobile && productDetails.parentElement !== productInfo) {
        productInfo.appendChild(productDetails);
    }
}

function initProductGalleryAutoplay() {
    const slider = document.getElementById('imageSlider');
    const wrapper = document.getElementById('sliderWrapper');
    const slides = wrapper ? Array.from(wrapper.querySelectorAll('.slide')) : [];

    if (!slider || !wrapper || slides.length === 0 || slider.dataset.autoplayBound === 'true') {
        return;
    }

    wrapper.style.width = (slides.length * 100) + '%';
    slides.forEach(function (slide) {
        slide.style.flexBasis = (100 / slides.length) + '%';
    });

    if (slides.length <= 1) return;

    slider.dataset.autoplayBound = 'true';
    let currentSlide = 0;
    let autoplayTimer;

    const goToSlide = (index) => {
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        wrapper.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
        slider.querySelectorAll('.gallery-dot').forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentSlide);
        });
    };

    window.changeSlide = function changeSlide(direction) {
        goToSlide(currentSlide + direction);
        startAutoplay();
    };

    if (!slider.querySelector('.gallery-dots')) {
        const dots = document.createElement('div');
        dots.className = 'gallery-dots';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Show image ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoplay();
            });
            dots.appendChild(dot);
        });
        slider.appendChild(dots);
    }

    const startAutoplay = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        stopAutoplay();
        autoplayTimer = window.setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 3600);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);
    slider.addEventListener('touchstart', stopAutoplay, { passive: true });
    slider.addEventListener('touchend', startAutoplay, { passive: true });

    startAutoplay();
}

function initProductLightbox() {
    const wrapper = document.getElementById('sliderWrapper');
    if (!wrapper) return;
    const images = Array.from(wrapper.querySelectorAll('.slide img'));
    if (images.length === 0) return;

    const lb = document.createElement('div');
    lb.id = 'productLightbox';
    lb.className = 'product-lightbox';
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
        '<button class="lb-close" type="button" aria-label="Close">×</button>' +
        '<button class="lb-prev" type="button" aria-label="Previous image">&#8249;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>' +
        '<button class="lb-next" type="button" aria-label="Next image">&#8250;</button>' +
        '<div class="lb-dots"></div>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lb-img');
    const lbDots = lb.querySelector('.lb-dots');
    let lbIndex = 0;

    images.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lb-dot';
        dot.setAttribute('aria-label', 'Image ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        lbDots.appendChild(dot);
    });

    function goTo(i) {
        lbIndex = (i + images.length) % images.length;
        lbImg.src = images[lbIndex].src;
        lbImg.alt = images[lbIndex].alt;
        lb.querySelectorAll('.lb-dot').forEach(function (d, j) {
            d.classList.toggle('active', j === lbIndex);
        });
    }

    function open(i) {
        goTo(i);
        lb.classList.add('active');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('active');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    images.forEach(function (img, i) {
        img.closest('.slide').style.cursor = 'zoom-in';
        img.addEventListener('click', function () { open(i); });
    });

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { goTo(lbIndex - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { goTo(lbIndex + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') goTo(lbIndex - 1);
        if (e.key === 'ArrowRight') goTo(lbIndex + 1);
    });

    var touchX = 0;
    lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
        var diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? lbIndex + 1 : lbIndex - 1);
    }, { passive: true });
}

function initProductPageHelpers() {
    placeProductDetailsForViewport();
    initProductGalleryAutoplay();
    initProductLightbox();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPageHelpers);
} else {
    initProductPageHelpers();
}

window.addEventListener('resize', placeProductDetailsForViewport);
