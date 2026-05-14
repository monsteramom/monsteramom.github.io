# Monstera Mom — Site Notes

## Add a new plant to the shop

1. Drop photos in `assets/plants/your-plant-id/` — name them `1.jpg`, `2.jpg`, etc.
2. Copy `plants/monstera-deliciosa.html` → `plants/your-plant-id.html`, update the name, type, description, image paths, and care tabs. Leave the price line as-is.
3. Add the price to `plant-prices.js`.
4. Add a card to the plants grid in `index.html` (copy any existing card, update name/description/image/links).
5. Add `your-plant-id` to `AVAILABLE_PLANTS` at the top of `index.html`.
6. If no care entry exists yet, add one to `care.html` (care entries can also exist without a shop page).

**Plant ID rules:** lowercase, hyphens only. Example: `pink-princess`, `hoya-carnosa`.

---

## Mark something on sale

In `plant-prices.js`:
```js
// before
'swiss-cheese': { price: '$34.99' },

// after
'swiss-cheese': { original: '$40.00', sale: '$34.99' },
```
Updates both the homepage card and product page automatically.

---

## Hide a plant from the shop

Remove its ID from `AVAILABLE_PLANTS` in `index.html`. The page still exists, just won't show.

---

## Key files

| File | What it does |
|---|---|
| `index.html` | Homepage + shop grid + AVAILABLE_PLANTS |
| `plant-prices.js` | All prices and sales |
| `plants/[id].html` | Product pages |
| `care.html` | Care guide library |
| `blog.html` | Blog posts |
| `contact-section.js` | Social links + pickup address |
