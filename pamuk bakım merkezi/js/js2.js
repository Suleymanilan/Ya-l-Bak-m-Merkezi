 let psIndex = 0;
    function movePS(dir) {
        const track = document.getElementById('psTrack');
        const cards = document.querySelectorAll('.ps-card');
        const cardWidth = cards[0].offsetWidth + 30;
        const visibleCards = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        const maxScroll = cards.length - visibleCards;

        psIndex += dir;
        if(psIndex < 0) psIndex = 0;
        if(psIndex > maxScroll) psIndex = maxScroll;

        track.style.transform = `translateX(-${psIndex * cardWidth}px)`;
    }

    function openPSBio(img, name, bio) {
        document.getElementById('ps-m-img').src = img;
        document.getElementById('ps-m-name').innerText = name;
        document.getElementById('ps-m-text').innerText = bio;
        document.getElementById('ps-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closePSBio() {
        document.getElementById('ps-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }