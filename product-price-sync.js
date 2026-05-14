(function () {
    if (typeof PLANT_PRICES === 'undefined') return;

    var plantId = location.pathname.split('/').pop().replace('.html', '');
    var data = PLANT_PRICES[plantId];
    if (!data) return;

    var el = document.querySelector('.product-price, .product-prices');
    if (!el) return;

    if (data.sale) {
        var div = document.createElement('div');
        div.className = 'product-prices';
        div.innerHTML =
            '<span class="price-original">' + data.original + '</span>' +
            '<span class="price-sale">' + data.sale + '</span>' +
            '<span class="sale-badge">SALE</span>';
        el.replaceWith(div);
    } else if (data.price) {
        el.className = 'product-price';
        el.textContent = data.price;
    }
}());
