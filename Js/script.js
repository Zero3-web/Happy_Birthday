window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loading');
});

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const carino = document.querySelector('.carino-text');
    if (carino) {
        const fullText = "Con Amor";
        carino.textContent = "";
        let i = 0;
        const typeWriter = () => {
            if (i < fullText.length) {
                carino.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 120);
            }
        };
        typeWriter();
    }
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => loader.style.display = 'none', 1000);
        }
    }, 3000);
});

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn-sorpresa');
    const overlay = document.getElementById('transition-overlay');
    if (btn && overlay) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            overlay.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                overlay.style.opacity = '0'; // Oculta el overlay antes de redirigir
                overlay.style.pointerEvents = 'none';
                window.location.href = 'sorpresa.html';
            }, 800); // Espera la transición antes de redirigir
        });
    }
});
