window.addEventListener('DOMContentLoaded', function() { //seguidores
    const premios = [
        "Una cena 🤗",
        "Un deseo especial ✨",
        "Un día de suerte 🍀",
        "Un dulce favorito 🍬",
        "Una Pc gamer 💖",
        "Un abrazo 🎉"
    ];

    const grid = document.getElementById('scratch-grid');
    if (!grid) return;

    // Esto Asigna aleatoriamente los premios a las 6 casillas
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
            <div id="felicidades-capture" style="color:#fff; font-size:4rem; font-family:'Arial Black',Arial,sans-serif; text-align:center; margin-bottom:2rem; background:rgba(0,0,0,0.0);padding:2rem 1rem;border-radius:2rem; position:relative;">
                ¡Felicidades , Ganaste!<br><span style="font-size:4rem; display:block; margin-top:1rem;">${premio}</span>
            </div>
            <div style="margin-top:2rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;">
                <button id="share-whatsapp" class="sorpresa-share-btn">
                    <span>Compartir por WhatsApp</span>
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('share-whatsapp').onclick = async function() {
            crearValeYCompartir(premio);
        };

        async function crearValeYCompartir(premio) {
            const width = 720, height = 1280;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // Fondo degradado oscuro
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, "#1a1a2e");
            grad.addColorStop(1, "#23234b");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Capa negra translúcida para contraste
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            // Marco blanco tipo vale
            ctx.save();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 10;
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 12;
            ctx.strokeRect(48, 48, width - 96, height - 96);
            ctx.restore();

            // Confeti 
            const colors = ['#ff8800', '#e52e71', '#4a90e2', '#fff700', '#00ffb3', '#ff4a4a'];
            for (let i = 0; i < 60; i++) {
                ctx.save();
                ctx.beginPath();
                const x = 60 + Math.random() * (width - 120);
                const y = 60 + Math.random() * (height - 120);
                const r = 5 + Math.random() * 7;
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.globalAlpha = 0.5 + Math.random() * 0.4;
                ctx.fill();
                ctx.restore();
            }

            // Panel central semitransparente para el contenido
            ctx.save();
            ctx.globalAlpha = 0.80;
            ctx.fillStyle = "#181828";
            ctx.fillRect(90, 220, width - 180, height - 440);
            ctx.restore();

            // Título "VALE DE REGALO"
            ctx.save();
            ctx.font = "bold 54px 'Arial Black', Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 8;
            ctx.fillStyle = "#fff";
            ctx.fillText("VALE DE REGALO", width / 2, 120);
            ctx.restore();

            // Línea decorativa punteada
            ctx.save();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.setLineDash([14, 10]);
            ctx.beginPath();
            ctx.moveTo(160, 190);
            ctx.lineTo(width - 160, 190);
            ctx.stroke();
            ctx.restore();

            // Emoji decorativo arriba
            ctx.save();
            ctx.font = "48px Arial";
            ctx.globalAlpha = 0.95;
            ctx.textAlign = "center";
            ctx.fillText("🎉🎈", width / 2, 200);
            ctx.restore();

            // Premio destacado, GRANDE y centrado en el panel
            ctx.save();
            ctx.font = "bold 56px 'Arial Black', Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "#fff";
            // Ajusta tamaño si es muy largo
            let premioFont = 56;
            while (ctx.measureText(premio).width > width - 220 && premioFont > 32) {
                premioFont -= 2;
                ctx.font = `bold ${premioFont}px 'Arial Black', Arial, sans-serif`;
            }
            ctx.fillText(premio, width / 2, height / 2 - 80);
            ctx.restore();

            // Instrucciones centradas debajo del premio
            ctx.save();
            ctx.font = "24px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 2;
            ctx.fillStyle = "#fff";
            ctx.fillText("Presenta este vale a la persona que te lo envió", width / 2, height / 2 + 10);
            ctx.fillText("y reclama tu regalo especial 🎁", width / 2, height / 2 + 44);
            ctx.restore();

            // Emoji decorativo abajo del panel
            ctx.save();
            ctx.font = "44px Arial";
            ctx.globalAlpha = 0.9;
            ctx.textAlign = "center";
            ctx.fillText("🎂🥳", width / 2, height - 260);
            ctx.restore();

            // Fecha actual, alineada a la derecha abajo
            const hoy = new Date();
            const fechaStr = hoy.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            ctx.save();
            ctx.font = "bold 24px Arial, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 2;
            ctx.fillStyle = "#fff";
            ctx.fillText(`Fecha: ${fechaStr}`, width - 80, height - 80);
            ctx.restore();

            // Pie de página centrado (más arriba)
            ctx.save();
            ctx.font = "bold 28px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 3;
            ctx.fillStyle = "#fff";
            ctx.fillText("¡Feliz cumpleaños! 🎊", width / 2, height - 160); // antes: height - 100
            ctx.restore();

            // Compartir imagen
            canvas.toBlob(async function(blob) {
                if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'vale-cumple.png', {type: blob.type})] })) {
                    const file = new File([blob], 'vale-cumple.png', {type: blob.type});
                    try {
                        await navigator.share({
                            files: [file],
                            title: '¡Mira el vale que gané!',
                            text: '¡Tengo un vale de regalo de cumpleaños! 🎁'
                        });
                    } catch (e) {
                        alert('No se pudo compartir la imagen.');
                    }
                } else {
                    const url = URL.createObjectURL(blob);
                    const whatsappMsg = encodeURIComponent(
                        `¡Tengo un vale de regalo de cumpleaños! 🎁\n${premio}\n\nDescarga la imagen adjunta y compártela en tu estado o chat de WhatsApp:\n${url}`
                    );
                    window.open(`https://wa.me/?text=${whatsappMsg}`, '_blank');
                    setTimeout(() => URL.revokeObjectURL(url), 10000);
                }
            }, 'image/png');
        }

        // Cambia el texto del botón
        overlay.querySelector('#share-whatsapp span').textContent = "Reclama tu premio a esa persona";
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
            ctx.fillStyle = '#ddd';
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
