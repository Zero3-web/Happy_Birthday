window.addEventListener('DOMContentLoaded', function() {
    const premios = [
        "Un abrazo gigante 🤗",
        "Un deseo especial ✨",
        "Un día de suerte 🍀",
        "Un dulce favorito 🍬",
        "Un momento inolvidable 💖",
        "¡Un año increíble! 🎉"
    ];

    const grid = document.getElementById('scratch-grid');
    if (!grid) return;

    // Asigna aleatoriamente los premios a las 6 casillas
    const premiosShuffle = premios.slice().sort(() => Math.random() - 0.5);

    let terminado = false;

    function lanzarConfeti() {
        // Simple confetti usando canvas-confetti CDN
        if (!window.confetti) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
            script.onload = () => window.confetti && window.confetti();
            document.body.appendChild(script);
        } else {
            window.confetti();
        }
    }

    function mostrarFelicitacion(premio) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = 0;
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 999999;
        overlay.innerHTML = `
            <div style="color:#fff; font-size:2.5rem; font-family:'Arial Black',Arial,sans-serif; text-align:center; margin-bottom:2rem;">
                ¡Felicidades!<br><span style="font-size:2rem; display:block; margin-top:1rem;">${premio}</span>
            </div>
            <div style="margin-top:2rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;">
                <button id="share-whatsapp" class="sorpresa-share-btn">
                    <span>Compartir WhatsApp</span>
                </button>
                <button id="share-copy" class="sorpresa-share-btn">
                    Copiar enlace
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Compartir por WhatsApp
        document.getElementById('share-whatsapp').onclick = function() {
            const url = window.location.origin + window.location.pathname;
            const text = `¡Mira el regalo que gané en mi cumpleaños! ${premio} 🎁\n${url}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        };

        // Copiar enlace
        document.getElementById('share-copy').onclick = function() {
            const url = window.location.origin + window.location.pathname;
            const text = `¡Mira el regalo que gané en mi cumpleaños! ${premio} 🎁\n${url}`;
            navigator.clipboard.writeText(text).then(() => {
                this.textContent = "¡Copiado!";
                setTimeout(() => { this.textContent = "Copiar enlace"; }, 1500);
            });
        };
    }

    for (let i = 0; i < 6; i++) {
        const cell = document.createElement('div');
        cell.className = 'scratch-cell';

        // Mensaje oculto
        const content = document.createElement('div');
        content.className = 'cell-content';
        content.textContent = premiosShuffle[i];

        // Canvas para raspar
        const canvas = document.createElement('canvas');
        cell.appendChild(content);
        cell.appendChild(canvas);
        grid.appendChild(cell);

        let ctx;
        let isDrawing = false;
        let revealed = false;

        function resizeCanvas() {
            const w = cell.offsetWidth;
            const h = cell.offsetHeight;
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx = canvas.getContext('2d');
            drawCover();
        }

        function drawCover() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#bdbdbd';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ajusta el tamaño de fuente para que no se salga y centra vertical y horizontalmente
            let fontSize = Math.floor(Math.min(canvas.width, canvas.height) * 0.18);
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = '#888';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Medir el texto y ajustar fontSize si es necesario para que no se desborde
            let text = 'Raspa aquí';
            let metrics = ctx.measureText(text);
            while (metrics.width > canvas.width * 0.9 && fontSize > 10) {
                fontSize -= 2;
                ctx.font = `bold ${fontSize}px Arial`;
                metrics = ctx.measureText(text);
            }

            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function getPointerPos(e) {
            const rect = canvas.getBoundingClientRect();
            let x, y;
            if (e.touches && e.touches.length > 0) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                x = e.changedTouches[0].clientX - rect.left;
                y = e.changedTouches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            return {x, y};
        }

        function scratch(e) {
            if (!isDrawing || terminado) return;
            e.preventDefault();
            const pos = getPointerPos(e);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, Math.max(canvas.width, canvas.height) * 0.09, 0, 2 * Math.PI);
            ctx.fill();
        }

        function checkReveal() {
            if (terminado || revealed) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparent = 0;
            for (let j = 3; j < imageData.data.length; j += 4) {
                if (imageData.data[j] === 0) transparent++;
            }
            if (transparent > imageData.data.length / 10) { // ~40%
                revealed = true;
                terminado = true;
                canvas.style.opacity = '0';
                setTimeout(() => canvas.style.display = 'none', 700);
                lanzarConfeti();
                setTimeout(() => mostrarFelicitacion(content.textContent), 700);
                // Deshabilita todos los canvas
                document.querySelectorAll('.scratch-cell canvas').forEach(c => {
                    c.style.pointerEvents = 'none';
                });
            }
        }

        // Mouse events
        canvas.addEventListener('mousedown', function(e) {
            if (terminado) return;
            isDrawing = true;
            scratch(e);
        });
        canvas.addEventListener('mousemove', function(e) {
            if (isDrawing && !terminado) {
                scratch(e);
                checkReveal();
            }
        });
        canvas.addEventListener('mouseup', function() {
            isDrawing = false;
        });
        canvas.addEventListener('mouseleave', function() {
            isDrawing = false;
        });

        // Touch events para móviles
        canvas.addEventListener('touchstart', function(e) {
            if (terminado) return;
            isDrawing = true;
            scratch(e);
        });
        canvas.addEventListener('touchmove', function(e) {
            if (isDrawing && !terminado) {
                scratch(e);
                checkReveal();
            }
        });
        canvas.addEventListener('touchend', function() {
            isDrawing = false;
        });

        window.addEventListener('resize', function() {
            drawCover();
        });
    }
});
