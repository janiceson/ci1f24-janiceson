function toggleFavorite(card) {
    const isFavorite = card.getAttribute('data-favorite') === 'true';
    card.setAttribute('data-favorite', !isFavorite);
    card.classList.toggle('favorite', !isFavorite);
}