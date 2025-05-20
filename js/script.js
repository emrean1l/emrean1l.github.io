document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const sectionCards = document.querySelectorAll('.section-card'); // section-card'ları seçiyoruz
    const fullScreenOverlay = document.getElementById('full-screen-overlay'); // overlay elementini seçiyoruz

    // Accordion Logic
    accordionHeaders.forEach(header => {
        header.addEventListener('click', (event) => {
            // Overlay'ın tetiklenmesini engellemek için yayılımı durdur
            event.stopPropagation();

            const currentContent = header.nextElementSibling;

            // Diğer açık olanları kapat
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Tıklananı aç/kapat
            header.classList.toggle('active');
            currentContent.classList.toggle('show');

            if (currentContent.classList.contains('show')) {
                currentContent.style.maxHeight = currentContent.scrollHeight + "px";
            } else {
                currentContent.style.maxHeight = null;
            }
        });
    });

    // Full Screen Overlay Effect Logic
    sectionCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Eğer tıklanan element bir link, buton veya akordiyon öğesinin parçası ise efekti çalıştırma
            if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || event.target.closest('.accordion-item')) {
                return;
            }

            const cardRect = card.getBoundingClientRect();

            // Overlay'ın başlangıç konumunu ve boyutunu ayarla
            fullScreenOverlay.style.left = `${cardRect.left + cardRect.width / 2}px`;
            fullScreenOverlay.style.top = `${cardRect.top + cardRect.height / 2}px`;
            fullScreenOverlay.style.width = `0`;
            fullScreenOverlay.style.height = `0`;
            fullScreenOverlay.style.borderRadius = `50%`;
            fullScreenOverlay.style.opacity = `0`;
            // CSS değişkeninden rengi al
            fullScreenOverlay.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim(); 

            // Aktif sınıfını ekleyerek efekti başlat
            setTimeout(() => {
                fullScreenOverlay.classList.add('active');
                // Ekranı tamamen kapladığında arka plan rengini değiştir (ana arka plan rengi)
                fullScreenOverlay.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
                document.body.style.overflow = 'hidden'; // Sayfayı kaydırmayı engelle
            }, 50); // Küçük bir gecikme transition'ın düzgün çalışmasını sağlar

            // Efekt tamamlandıktan sonra overlay'i kapat
            // Bu kısım, overlay'in ne kadar süre açık kalacağını belirler
            setTimeout(() => {
                fullScreenOverlay.classList.remove('active');
                fullScreenOverlay.style.opacity = `0`; // Geri dönerken şeffaflaşmasını sağla
                fullScreenOverlay.style.transform = `scale(0)`; // Geri dönerken küçülmesini sağla
                document.body.style.overflow = ''; // Sayfa kaydırmayı tekrar etkinleştir
                // Renk ve boyutları sıfırlayalım ki bir sonraki tıklamada düzgün başlasın
                fullScreenOverlay.style.width = `0`;
                fullScreenOverlay.style.height = `0`;
                fullScreenOverlay.style.borderRadius = `50%`;
            }, 1000); // Efektin süresinden biraz daha uzun (CSS'deki 0.6s transition + biraz bekleme)
        });
    });

    // Overlay'a tıklandığında da kapanmasını sağla (isteğe bağlı)
    fullScreenOverlay.addEventListener('click', () => {
        fullScreenOverlay.classList.remove('active');
        fullScreenOverlay.style.opacity = `0`;
        fullScreenOverlay.style.transform = `scale(0)`;
        document.body.style.overflow = '';
        fullScreenOverlay.style.width = `0`;
        fullScreenOverlay.style.height = `0`;
        fullScreenOverlay.style.borderRadius = `50%`;
    });
});