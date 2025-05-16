window.addEventListener('DOMContentLoaded', function() {
    // Solo activa el loader si existe el elemento y el botón sorpresa (solo en index.html)
    // El loader solo debe aparecer en index.html, no en sorpresa.html
    const loader = document.getElementById('loader');
    const btnSorpresa = document.getElementById('btn-sorpresa');
    if (loader && btnSorpresa) {
        document.body.classList.add('loading');
    } else if (loader) {
        // Si estamos en otra página (como sorpresa.html), oculta el loader inmediatamente
        loader.style.display = 'none';
        document.body.classList.remove('loading');
    }
});

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const btnSorpresa = document.getElementById('btn-sorpresa');
    if (loader && btnSorpresa) {
        const carino = document.querySelector('.carino-text');
        if (carino) {
            const fullText = "Con Amor , Zero"; // <-- Cambia aquí el texto
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

        // Esconde el loader y luego inicia el typing del h1
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => {
                loader.style.display = 'none';

                // Typing effect para el h1 principal SOLO después de ocultar el loader
                const h1 = document.querySelector('.centered-text h1');
                if (h1) {
                    h1.textContent = "";
                    const text = "¡FELIZ CUMPLEAÑOS!";
                    let i = 0;
                    const typing = () => {
                        if (i < text.length) {
                            h1.textContent += text.charAt(i);
                            i++;
                            setTimeout(typing, 110);
                        }
                    };
                    typing();
                }

            }, 100); // Solo 100ms para ocultar el loader, inicia typing inmediatamente
        }, 3000);
    } else if (loader) {
        // Si estamos en otra página (como sorpresa.html), oculta el loader inmediatamente
        loader.style.display = 'none';
        document.body.classList.remove('loading');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn-sorpresa');
    if (btn) {
        // Oculta el texto del h1 al inicio
        const h1 = document.querySelector('.centered-text h1');
        if (h1) {
            h1.textContent = "";
        }
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar solo el spinner (sin texto)
            let loader = document.getElementById('loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'loader';
                loader.innerHTML = '<div class="spinner"></div>';
                document.body.appendChild(loader);
            } else {
                // Si ya existe, deja solo el spinner
                loader.innerHTML = '<div class="spinner"></div>';
                loader.style.display = '';
            }
            loader.style.opacity = '1';
            loader.style.pointerEvents = 'all';
            loader.style.background = '#000';
            document.body.classList.add('loading');

            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                setTimeout(function() {
                    loader.style.display = 'none';
                    window.location.href = 'sorpresa.html';
                }, 400);
            }, 2000);
        });
    }
});
