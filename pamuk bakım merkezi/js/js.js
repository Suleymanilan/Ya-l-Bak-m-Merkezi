/**
 * PAMUK BAKIM MERKEZİ - ANA SAYFA JAVASCRIPT
 */

// --- 1. ANA GÖRSEL SLIDER (HERO SLIDER) ---
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

// Slider'ı başlat
function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    // Tüm slaytları gizle
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    // Aktif slaytı göster
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

// Butonlarla değiştirme
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Noktalarla değiştirme
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Otomatik Geçiş (5 saniyede bir)
let autoSlide = setInterval(() => {
    changeSlide(1);
}, 5000);

// Kullanıcı bir butona bastığında otomatik geçişi sıfırla (rahatsız etmemesi için)
const sliderContainer = document.getElementById("slider");
if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
    sliderContainer.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => changeSlide(1), 5000);
    });
}


// --- 2. GÜNÜN MESAJI (RANDOM QUOTE) ---
function yeniSoz() {
    const sozler = [
        "Huzur, sevgi dolu bir gülümseme ile başlar.",
        "Tecrübe, geçmişin bilgeliğini bugünün enerjisiyle birleştirmektir.",
        "Her yaşın kendine has bir güzelliği ve hikayesi vardır.",
        "Biz bir aileyiz; sevgi paylaştıkça çoğalır.",
        "Güven ve şefkat, bakımın temelidir.",
        "İkinci baharınızda yanınızda olmaktan mutluluk duyuyoruz."
    ];

    const display = document.getElementById("quote-display");
    const rastgele = Math.floor(Math.random() * sozler.length);
    
    if (display) {
        // Küçük bir animasyon efekti
        display.style.opacity = 0;
        setTimeout(() => {
            display.innerText = sozler[rastgele];
            display.style.opacity = 1;
            display.style.color = "#2d5a27";
            display.style.fontWeight = "600";
        }, 300);
    }
}


// --- 3. YUMUŞAK KAYDIRMA (SMOOTH SCROLL) ---
// Menü linklerine tıklandığında sayfayı yumuşak bir şekilde kaydırır
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Navbar yüksekliğini hesaba katar
                behavior: 'smooth'
            });
        }
    });
});


// --- 4. NAVBAR EFEKTİ ---
// Sayfa aşağı kaydırıldığında navbar'a gölge ekler
window.addEventListener("scroll", function() {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        nav.style.padding = "15px 5%";
    } else {
        nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        nav.style.padding = "20px 5%";
    }
});

// Sayfa yüklendiğinde ilk slaytı göster
document.addEventListener("DOMContentLoaded", () => {
    if (slides.length > 0) showSlides(slideIndex);
});
// --- EKİP SLIDER (STAFF SLIDER) ---
let staffPos = 0;

function moveStaff(direction) {
    const track = document.getElementById('staffTrack');
    const cards = document.querySelectorAll('.staff-card');
    
    if (!track || cards.length === 0) return;

    // Kart genişliğini ve aradaki boşluğu (gap) hesapla
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth + parseFloat(cardStyle.marginRight || 0) + 20; // 20px gap varsayılan
    
    // Ekranda kaç kart göründüğünü bul
    let visibleCards = 3;
    if (window.innerWidth < 1024) visibleCards = 2;
    if (window.innerWidth < 768) visibleCards = 1;

    const maxPos = cards.length - visibleCards;

    // Yeni pozisyonu belirle
    staffPos += direction;

    // Sınırları kontrol et (Başa veya sona gelince dur)
    if (staffPos < 0) staffPos = 0;
    if (staffPos > maxPos) staffPos = maxPos;

    // Kaydırma işlemini uygula
    const moveAmount = staffPos * cardWidth;
    track.style.transform = `translateX(-${moveAmount}px)`;
}

// Ekran boyutu değiştiğinde slider'ı sıfırla (bozulmaları önlemek için)
window.addEventListener('resize', () => {
    staffPos = 0;
    const track = document.getElementById('staffTrack');
    if(track) track.style.transform = `translateX(0)`;
});