(function () {
    const CONTACT = {
        intro: 'Local pickup in Halifax',
        title: 'Let us help you choose the right plant.',
        text: 'Send a quick message with the plant you like, your light situation, and your pickup timing. We will confirm availability before you head out.',
        actions: [
            {
                label: 'Instagram',
                url: 'https://instagram.com/monstera.mom25',
                style: 'btn-primary'
            },
            {
                label: 'Facebook',
                url: 'https://facebook.com/monsteramom25',
                style: 'btn-social btn-facebook'
            },
            {
                label: 'TikTok',
                url: 'https://www.tiktok.com/@monstera.mom25',
                style: 'btn-social btn-tiktok'
            }
        ],
        mapUrl: 'https://maps.app.goo.gl/6CVKxyr7oPk4TdZ4A',
        links: [
            {
                icon: 'IG',
                title: 'Instagram',
                text: 'Follow for plant drops, care notes, and updates.',
                label: '@monstera.mom25',
                url: 'https://instagram.com/monstera.mom25'
            },
            {
                icon: 'FB',
                title: 'Facebook',
                text: 'Connect with the local plant community.',
                label: 'Monstera Mom',
                url: 'https://facebook.com/monsteramom25'
            },
            {
                icon: 'TT',
                title: 'TikTok',
                text: 'See what is growing behind the scenes.',
                label: '@monstera.mom25',
                url: 'https://www.tiktok.com/@monstera.mom25'
            },
            {
                icon: 'MAP',
                title: 'Pickup Location',
                text: 'Available locally in Halifax, Nova Scotia.',
                label: '5885 Spring Garden Road',
                url: 'https://maps.app.goo.gl/6CVKxyr7oPk4TdZ4A'
            }
        ]
    };

    function renderContactSection(target) {
        const sectionId = target.dataset.contactId || 'contact';
        const actions = CONTACT.actions.map(action => `
            <a href="${action.url}" class="btn ${action.style}" target="_blank" rel="noopener">${action.label}</a>
        `).join('');

        target.outerHTML = `
            <section id="${sectionId}" class="section contact-section shared-contact-section">
                <div class="container">
                    <div class="shared-contact-panel">
                        <div class="shared-contact-copy">
                            <p class="section-kicker">${CONTACT.intro}</p>
                            <h2>${CONTACT.title}</h2>
                            <p>${CONTACT.text}</p>
                            <div class="shared-contact-actions">
                                ${actions}
                            </div>
                        </div>
                        <div class="shared-contact-mini">
                            <a href="${CONTACT.mapUrl}" class="contact-map-card" target="_blank" rel="noopener" aria-label="Open Monstera Mom pickup location in Google Maps">
                                <div class="contact-map-preview">
                                    <span class="map-pin"></span>
                                    <span class="map-road map-road-one"></span>
                                    <span class="map-road map-road-two"></span>
                                    <span class="map-road map-road-three"></span>
                                </div>
                                <div class="contact-map-copy">
                                    <span>Pickup</span>
                                    <strong>5885 Spring Garden Road</strong>
                                    <p>Halifax, Nova Scotia</p>
                                    <em>Open in Google Maps</em>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-shared-contact]').forEach(renderContactSection);
    });
}());
