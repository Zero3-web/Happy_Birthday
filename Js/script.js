window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const btnSorpresa = document.getElementById('btn-sorpresa');
    const holaBtn = document.getElementById('loader-hola-btn');
    if (loader && btnSorpresa) {
        document.body.classList.add('loading');
        if (holaBtn) {
            // El resto de la lógica solo se activa al hacer click en hola
            holaBtn.addEventListener('click', function() {
                // Deshabilita el botón para evitar múltiples clics
                holaBtn.disabled = true;
                holaBtn.style.opacity = '0.6';
                // Permite que el evento load continúe
                window._blockLoader = false;
                // Dispara el evento load manualmente
                window.dispatchEvent(new Event('load'));
            });
        }
        // PREVIENE que el evento load se dispare automáticamente
        window._blockLoader = true;
    } else if (loader) {
        // Si estamos en otra página (como sorpresa.html), oculta el loader inmediatamente
        loader.style.display = 'none';
        document.body.classList.remove('loading');
    }
});

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const btnSorpresa = document.getElementById('btn-sorpresa');
    const centeredText = document.querySelector('.centered-text');
    // Solo continuar si el loader está visible Y el usuario ya hizo click en "hola"
    if (typeof window._blockLoader !== 'undefined' && window._blockLoader) {
        // Bloquea la ejecución automática hasta que el usuario haga click en hola
        return;
    }
    if (loader && btnSorpresa && centeredText && loader.style.display !== 'none') {
        const carino = document.querySelector('.carino-text');
        if (carino) {
            const fullText = "Porque lo mereces"; //manzana
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


                // Oculta el botón y prepara el mensaje personalizado
                const btn = document.getElementById('btn-sorpresa');
                if (btn) {
                    btn.style.opacity = '0';
                    btn.style.transition = 'opacity 0.7s cubic-bezier(.4,2,.6,1)';
                    btn.style.display = 'none';
                }
                let customMsg = document.getElementById('mensaje-personalizado');
                if (!customMsg) {
                    customMsg = document.createElement('div');
                    customMsg.id = 'mensaje-personalizado';
                    customMsg.style.fontSize = '2rem';
                    customMsg.style.margin = '2.5rem auto 0 auto';
                    customMsg.style.maxWidth = '90vw';
                    customMsg.style.color = '#fff';
                    customMsg.style.background = 'rgba(0,0,0,0.25)';
                    customMsg.style.borderRadius = '1.5rem';
                    customMsg.style.padding = '1.2rem 1.5rem';
                    customMsg.style.fontFamily = "'Segoe Script', 'Comic Sans MS', 'Brush Script MT', cursive, Arial, sans-serif";
                    customMsg.style.textAlign = 'center';
                    centeredText.appendChild(customMsg);
                }
                customMsg.textContent = "";
                customMsg.style.opacity = '0';
                customMsg.style.display = 'none';
                customMsg.style.transition = 'opacity 0.9s cubic-bezier(.4,2,.6,1)';

                const h1 = document.querySelector('.centered-text h1');
                if (h1) {
                    h1.textContent = "";
                    const text = "¡FELIZ CUMPLEAÑOS!"; //manzana
                    let j = 0;
                    const typing = () => {
                        if (j < text.length) {
                            h1.textContent += text.charAt(j);
                            j++;
                            setTimeout(typing, 110);
                        } else {
                            // Espera 3 segundos antes de mostrar el mensaje personalizado
                            setTimeout(() => {
                                customMsg.style.display = '';
                                setTimeout(() => { customMsg.style.opacity = '1'; }, 80); 
                                const mensaje = "Espero que este día esté lleno de alegría, sorpresas y mucho amor. ¡Disfruta tu regalo especial!";//manzana
                                let i = 0;
                                const typingMsg = () => {
                                    if (i < mensaje.length) {
                                        customMsg.textContent += mensaje.charAt(i);
                                        i++;
                                        setTimeout(typingMsg, 60); 
                                    } else {
                                        setTimeout(() => {
                                            if (btn && customMsg) {
                                                // Mover el botón justo después del mensaje personalizado
                                                customMsg.insertAdjacentElement('afterend', btn);
                                                // Para un fade-in suave sin mover el layout:
                                                btn.style.display = 'block';
                                                btn.style.opacity = '0';
                                                btn.style.transition = 'opacity 2.2s cubic-bezier(.4,2,.6,1)';
                                                btn.style.position = 'relative';
                                                btn.style.margin = '2.5rem auto 0 auto';
                                                btn.style.width = 'fit-content';
                                                btn.style.left = '0';
                                                btn.style.right = '0';
                                                void btn.offsetWidth;
                                                setTimeout(() => { btn.style.opacity = '1'; }, 80);
                                            }
                                        }, 600);
                                    }
                                };
                                typingMsg();
                            }, 1000);
                        }
                    };
                    typing();
                }

            }, 100); 
        }, 3000);
    } else if (loader) {
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
            // Mostrar solo el spinner 
            let loader = document.getElementById('loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'loader';
                loader.innerHTML = '<div class="spinner"></div>';
                document.body.appendChild(loader);
            } else {
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
