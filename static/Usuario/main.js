tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#38393b",
        "tertiary-container": "#ffdad6",
        "on-tertiary-fixed": "#410003",
        "surface-container-high": "#292a2c",
        "background": "#121315",
        "error-container": "#93000a",
        "on-secondary-fixed-variant": "#454747",
        "on-secondary": "#2f3131",
        "on-primary-fixed-variant": "#434b00",
        "on-tertiary-container": "#c22225",
        "secondary-fixed-dim": "#c6c6c7",
        "surface-container-highest": "#343537",
        "inverse-surface": "#e3e2e5",
        "outline": "#919378",
        "on-primary-container": "#606a00",
        "primary": "#ffffff",
        "secondary-fixed": "#e2e2e2",
        "on-secondary-fixed": "#1a1c1c",
        "on-background": "#e3e2e5",
        "tertiary": "#ffffff",
        "secondary-container": "#454747",
        "surface-container-low": "#1b1c1e",
        "surface-container-lowest": "#0d0e10",
        "primary-container": "#d9ef00",
        "surface-container": "#1f2022",
        "on-error": "#690005",
        "on-tertiary": "#680008",
        "on-surface": "#e3e2e5",
        "on-error-container": "#ffdad6",
        "surface-tint": "#bed100",
        "error": "#ffb4ab",
        "on-primary": "#2e3300",
        "surface": "#121315",
        "primary-fixed-dim": "#bed100",
        "inverse-on-surface": "#303033",
        "surface-dim": "#121315",
        "outline-variant": "#464832",
        "surface-variant": "#343537",
        "on-tertiary-fixed-variant": "#930010",
        "secondary": "#c6c6c7",
        "on-primary-fixed": "#1a1e00",
        "tertiary-fixed-dim": "#ffb3ac",
        "tertiary-fixed": "#ffdad6",
        "on-secondary-container": "#b4b5b5",
        "inverse-primary": "#5a6400",
        "on-surface-variant": "#c7c9ab",
        "primary-fixed": "#d9ef00"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter-mobile": "1rem",
        "margin-mobile": "1rem",
        "space-xl": "3rem",
        "space-lg": "2rem",
        "space-xs": "0.375rem",
        "space-md": "1.25rem",
        "space-sm": "0.75rem",
        "gutter": "1.5rem",
        "margin": "2.5rem"
      },
      fontFamily: {
        "headline-md": ["Public Sans"],
        "headline-lg-mobile": ["Public Sans"],
        "label-uppercase": ["Public Sans"],
        "body-base": ["Public Sans"],
        "title-card": ["Public Sans"],
        "body-lg": ["Public Sans"],
        "button-text": ["Public Sans"],
        "headline-lg": ["Public Sans"],
        "display-hero": ["Public Sans"],
        "body-sm": ["Public Sans"]
      },
      fontSize: {
        "headline-md": ["20px", { "lineHeight": "28px", "letterSpacing": "0.02em", "fontWeight": "700" }],
        "headline-lg-mobile": ["22px", { "lineHeight": "28px", "letterSpacing": "0.05em", "fontWeight": "800" }],
        "label-uppercase": ["13px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "800" }],
        "body-base": ["15px", { "lineHeight": "22px", "letterSpacing": "0", "fontWeight": "400" }],
        "title-card": ["18px", { "lineHeight": "24px", "letterSpacing": "0.01em", "fontWeight": "700" }],
        "body-lg": ["17px", { "lineHeight": "26px", "letterSpacing": "0.01em", "fontWeight": "400" }],
        "button-text": ["15px", { "lineHeight": "20px", "letterSpacing": "0.03em", "fontWeight": "800" }],
        "headline-lg": ["28px", { "lineHeight": "36px", "letterSpacing": "0.06em", "fontWeight": "800" }],
        "display-hero": ["44px", { "lineHeight": "52px", "letterSpacing": "0.04em", "fontWeight": "900" }],
        "body-sm": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }]
      }
    }
  }
};

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const icon = document.querySelector('#theme-toggle-btn span');
  if (icon) icon.textContent = document.documentElement.classList.contains('dark') ? 'dark_mode' : 'light_mode';
}

// Cambiar entre pestañas "Actuales" e "Historial"
function switchTab(tab) {
  const btnActuales = document.getElementById('tab-btn-actuales');
  const btnHistorial = document.getElementById('tab-btn-historial');
  const contentActuales = document.getElementById('tab-actuales');
  const contentHistorial = document.getElementById('tab-historial');

  if (tab === 'actuales') {
    btnActuales.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-fixed shadow-md';
    btnActuales.setAttribute('aria-selected', 'true');
    btnHistorial.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container text-on-surface-variant hover:text-primary';
    btnHistorial.setAttribute('aria-selected', 'false');

    contentActuales.classList.remove('hidden');
    contentActuales.classList.add('flex');
    contentHistorial.classList.add('hidden');
    contentHistorial.classList.remove('flex');
  } else {
    btnHistorial.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-fixed shadow-md';
    btnHistorial.setAttribute('aria-selected', 'true');
    btnActuales.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container text-on-surface-variant hover:text-primary';
    btnActuales.setAttribute('aria-selected', 'false');

    contentHistorial.classList.remove('hidden');
    contentHistorial.classList.add('flex');
    contentActuales.classList.add('hidden');
    contentActuales.classList.remove('flex');
  }
}

// Mostrar avisos flotantes (Toast)
function showToast(title, message, isError = false) {
  const toast = document.getElementById('action-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  const iconWrapper = document.getElementById('toast-icon-wrapper');

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  if (isError) {
    iconWrapper.className = 'w-9 h-9 rounded-md bg-error flex items-center justify-center shrink-0';
    toastIcon.className = 'material-symbols-outlined text-on-error text-[20px]';
    toastIcon.textContent = 'warning';
  } else {
    iconWrapper.className = 'w-9 h-9 rounded-md bg-primary-container flex items-center justify-center shrink-0';
    toastIcon.className = 'material-symbols-outlined text-on-primary-fixed text-[20px]';
    toastIcon.textContent = 'check';
  }

  toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3800);
}

// Manejador de acciones en libros
function handleAction(type, bookTitle) {
  if (type === 'renovar') {
    showToast('Préstamo Renovado', `Has renovado "${bookTitle}" por 14 días adicionales.`);
  } else if (type === 'devolver') {
    showToast('Devolución en Proceso', `Generado código QR para buzón de entrega de "${bookTitle}".`, true);
  } else if (type === 'ficha') {
    showToast('Ficha de Catálogo', `Consultando disponibilidad bibliográfica de "${bookTitle}".`);
  } else if (type === 're-pedir') {
    showToast('Solicitud Agregada', `"${bookTitle}" se ha reservado para retiro.`);
  }
}

// Cambiar entre las pestañas "Mi Perfil Cívico" y "Comunidad SaBré"
function switchMainTab(tab) {
  const btnPerfil = document.getElementById('tab-btn-perfil');
  const btnComunidad = document.getElementById('tab-btn-comunidad');
  const viewPerfil = document.getElementById('view-perfil');
  const viewComunidad = document.getElementById('view-comunidad');

  if (tab === 'perfil') {
    btnPerfil.classList.add('bg-primary-container', 'text-on-primary-fixed');
    btnPerfil.classList.remove('bg-surface-container', 'text-on-surface-variant');

    btnComunidad.classList.add('bg-surface-container', 'text-on-surface-variant');
    btnComunidad.classList.remove('bg-primary-container', 'text-on-primary-fixed');

    viewPerfil.classList.remove('hidden');
    viewComunidad.classList.add('hidden');
  } else {
    btnComunidad.classList.add('bg-primary-container', 'text-on-primary-fixed');
    btnComunidad.classList.remove('bg-surface-container', 'text-on-surface-variant');

    btnPerfil.classList.add('bg-surface-container', 'text-on-surface-variant');
    btnPerfil.classList.remove('bg-primary-container', 'text-on-primary-fixed');

    viewComunidad.classList.remove('hidden');
    viewPerfil.classList.add('hidden');
  }
}

// Editar alias comunitario
function editarAliasPrompt() {
  const aliasActual = document.getElementById('display-alias').textContent;
  const nuevoAlias = prompt('Ingresá tu nuevo alias comunitario:', aliasActual);

  if (nuevoAlias && nuevoAlias.trim() !== '') {
    const aliasLimpio = nuevoAlias.trim();

    document.getElementById('display-alias').textContent = aliasLimpio;
    document.getElementById('alias-firma').textContent = aliasLimpio;

    showProfileToast('Alias Comunitario actualizado correctamente');
  }
}

// Mensaje de confirmación para la pantalla de Perfil
function showProfileToast(mensaje) {
  const toast = document.getElementById('profile-toast');
  const toastMsg = document.getElementById('toast-msg');

  toastMsg.textContent = mensaje;

  toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4500);
}

function enviarSugerencia(e) {
  e.preventDefault();
  const texto = document.getElementById('texto-propuesta').value;

  if (texto.trim()) {
    document.getElementById('sugerencia-form').reset();
    showProfileToast('¡Gracias! Tu propuesta comunitaria fue recibida con éxito.');
  }
}


function enviarSugerencia(e) {
  e.preventDefault();
  const texto = document.getElementById('texto-propuesta').value;

  if (texto.trim()) {
    document.getElementById('sugerencia-form').reset();
    showProfileToast('¡Gracias! Tu propuesta comunitaria fue recibida con éxito.');
  }
}

/* ==========================================================================
   Lógica específica de la pantalla: Catálogo y Audiolibros
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa los eventos interactivos solo si los elementos de esta pantalla existen en el DOM
  initCatalogoInteractions();
});

function initCatalogoInteractions() {
  const searchInput = document.getElementById('catalog-search-input');
  const clearBtn = document.getElementById('clear-search');
  const filterChips = document.querySelectorAll('.filter-chip');
  const tabAll = document.getElementById('tab-all');
  const tabAudio = document.getElementById('tab-audio');
  const bookCards = document.querySelectorAll('.book-card');
  
  // Reproductor Audio
  const playBtn = document.getElementById('player-play-btn');
  const playerIcon = document.getElementById('player-icon');
  const playerPing = document.getElementById('player-ping');
  const playerTitle = document.getElementById('player-title');
  const waveformBars = document.querySelectorAll('.waveform-bar');
  const speedBtn = document.getElementById('speed-btn');
  const sampleButtons = document.querySelectorAll('.play-sample-btn');

  // Diálogo Ayudante
  const helperBtn = document.getElementById('btn-helper');
  const helperDialog = document.getElementById('helper-dialog');
  const closeDialogBtn = document.getElementById('close-dialog');

  if (!searchInput && !tabAll && !helperBtn) {
    // Si no estamos en la pantalla de catálogo, no ejecuta los listeners
    return;
  }

  let isPlaying = false;
  let waveInterval = null;
  let currentSpeed = 1.0;

  // 1. Buscador en tiempo real
  if (searchInput && clearBtn) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      clearBtn.classList.toggle('hidden', query.length === 0);
      
      bookCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = text.includes(query);
        card.style.display = matches ? 'flex' : 'none';
      });
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      bookCards.forEach(card => card.style.display = 'flex');
      actualizarEstadoVacio();
      searchInput.focus();
    });
  }

  // 2. Filtros por Chips (Todos, Físico, Audiolibro, Braille, Macrotipo)
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-primary-container', 'text-on-primary');
        c.classList.add('bg-surface-container-high', 'text-on-surface');
      });
      chip.classList.remove('bg-surface-container-high', 'text-on-surface');
      chip.classList.add('bg-primary-container', 'text-on-primary');

      const format = chip.getAttribute('data-format');
      bookCards.forEach(card => {
        if (format === 'todos') {
          card.style.display = 'flex';
        } else {
          const categories = card.getAttribute('data-category') || '';
          card.style.display = categories.includes(format) ? 'flex' : 'none';
        }
      });
    });
  });

  // 3. Control de Pestañas (Todos los Libros vs Audiolibros)
  if (tabAll && tabAudio) {
    tabAll.addEventListener('click', () => {
      tabAll.classList.add('bg-surface-container-high', 'text-primary-container');
      tabAll.classList.remove('text-on-surface-variant');
      tabAll.setAttribute('aria-selected', 'true');

      tabAudio.classList.remove('bg-surface-container-high', 'text-primary-container');
      tabAudio.classList.add('text-on-surface-variant');
      tabAudio.setAttribute('aria-selected', 'false');

      bookCards.forEach(c => c.style.display = 'flex');
    });

    tabAudio.addEventListener('click', () => {
      tabAudio.classList.add('bg-surface-container-high', 'text-primary-container');
      tabAudio.classList.remove('text-on-surface-variant');
      tabAudio.setAttribute('aria-selected', 'true');

      tabAll.classList.remove('bg-surface-container-high', 'text-primary-container');
      tabAll.classList.add('text-on-surface-variant');
      tabAll.setAttribute('aria-selected', 'false');

      bookCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        card.style.display = cat.includes('audio') ? 'flex' : 'none';
      });
    });
  }

  const emptyFilterMessage = document.getElementById('catalog-empty-filter');
  function actualizarEstadoVacio() {
    if (!emptyFilterMessage) return;
    const visibles = Array.from(bookCards).some(card => card.style.display !== 'none');
    emptyFilterMessage.classList.toggle('hidden', visibles || bookCards.length === 0);
  }
  if (searchInput) searchInput.addEventListener('input', actualizarEstadoVacio);
  filterChips.forEach(chip => chip.addEventListener('click', actualizarEstadoVacio));

  // 4. Lector de fichas bibliográficas mediante la voz del navegador
  let textoSeleccionado = playerTitle ? playerTitle.textContent : '';
  let velocidadLectura = 1.0;

  function leerTexto(texto) {
    if (!('speechSynthesis' in window)) {
      window.alert('Este navegador no dispone de lectura por voz.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-AR';
    utterance.rate = velocidadLectura;
    utterance.onend = () => { if (playerIcon) playerIcon.textContent = 'volume_up'; };
    utterance.onerror = () => { if (playerIcon) playerIcon.textContent = 'volume_up'; };
    if (playerIcon) playerIcon.textContent = 'stop';
    window.speechSynthesis.speak(utterance);
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        if (playerIcon) playerIcon.textContent = 'volume_up';
      } else if (textoSeleccionado.trim()) {
        leerTexto(textoSeleccionado);
      }
    });
  }

  sampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      textoSeleccionado = btn.getAttribute('data-book') || '';
      if (playerTitle) playerTitle.textContent = textoSeleccionado;
      leerTexto(textoSeleccionado);
    });
  });

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      const speeds = [1.0, 1.25, 1.5, 2.0];
      const idx = speeds.indexOf(velocidadLectura);
      velocidadLectura = speeds[(idx + 1) % speeds.length];
      speedBtn.textContent = `${velocidadLectura.toFixed(1)}x`;
      speedBtn.setAttribute('aria-label', `Velocidad de lectura ${velocidadLectura}x`);
    });
  }

  const themeButton = document.getElementById('theme-toggle-btn');
  if (themeButton) themeButton.addEventListener('click', toggleTheme);

  // 5. Modal / Drawer Asistente Accesible
  if (helperBtn && helperDialog) {
    helperBtn.addEventListener('click', () => {
      if (helperDialog.showModal) {
        helperDialog.showModal();
      } else {
        helperDialog.setAttribute('open', 'true');
      }
    });

    if (closeDialogBtn) {
      closeDialogBtn.addEventListener('click', () => {
        if (helperDialog.close) {
          helperDialog.close();
        } else {
          helperDialog.removeAttribute('open');
        }
      });
    }

    helperDialog.addEventListener('click', (e) => {
      const rect = helperDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        if (helperDialog.close) helperDialog.close();
      }
    });
  }
}


/* El detalle del libro ahora se carga desde la base de datos mediante una vista Django. */

/* ==========================================================================
   PANTALLA 6: INTERACCIONES DE COMUNIDAD, VALORACIONES Y SUGERENCIAS
   ========================================================================== */

function initComunidadInteractions() {
  // Comprobación de que estamos en la pantalla de Comunidad
  const panelExp = document.getElementById('panel-experiencias');
  if (!panelExp) return;

  let currentSelectedScore = 0;

  // Toast propio de Comunidad
  const communityToast = document.getElementById('community-toast');
  const communityToastMessage = document.getElementById('community-toast-message');

  function showCommunityToastLocal(message) {
    if (!communityToast || !communityToastMessage) return;

    communityToastMessage.textContent = message;
    communityToast.classList.remove('hidden');
    communityToast.classList.add('flex');

    setTimeout(() => {
      communityToast.classList.add('hidden');
      communityToast.classList.remove('flex');
    }, 4000);
  }

  // 1. Pestañas: Experiencias, Valoraciones y Sugerencias
  const tabExp = document.getElementById('tab-community-exp');
  const tabVal = document.getElementById('tab-community-val');
  const tabSug = document.getElementById('tab-community-sug');

  const panelVal = document.getElementById('panel-valoraciones');
  const panelSug = document.getElementById('panel-sugerencias');

  function switchCommunityTabInternal(activeTab) {
    panelExp.classList.add('hidden');
    panelExp.classList.remove('flex');

    if (panelVal) {
      panelVal.classList.add('hidden');
      panelVal.classList.remove('flex');
    }

    if (panelSug) {
      panelSug.classList.add('hidden');
      panelSug.classList.remove('flex');
    }

    [tabExp, tabVal, tabSug].forEach(btn => {
      if (!btn) return;

      btn.setAttribute('aria-selected', 'false');
      btn.classList.remove('bg-primary-container', 'text-on-primary');
      btn.classList.add('bg-transparent', 'text-secondary');
    });

    if (activeTab === 'experiencias' && tabExp) {
      panelExp.classList.remove('hidden');
      panelExp.classList.add('flex');

      tabExp.setAttribute('aria-selected', 'true');
      tabExp.classList.add('bg-primary-container', 'text-on-primary');
      tabExp.classList.remove('bg-transparent', 'text-secondary');

    } else if (activeTab === 'valoraciones' && panelVal && tabVal) {
      panelVal.classList.remove('hidden');
      panelVal.classList.add('flex');

      tabVal.setAttribute('aria-selected', 'true');
      tabVal.classList.add('bg-primary-container', 'text-on-primary');
      tabVal.classList.remove('bg-transparent', 'text-secondary');

    } else if (activeTab === 'sugerencias' && panelSug && tabSug) {
      panelSug.classList.remove('hidden');
      panelSug.classList.add('flex');

      tabSug.setAttribute('aria-selected', 'true');
      tabSug.classList.add('bg-primary-container', 'text-on-primary');
      tabSug.classList.remove('bg-transparent', 'text-secondary');
    }
  }

  if (tabExp) {
    tabExp.addEventListener('click', () => {
      switchCommunityTabInternal('experiencias');
    });
  }

  if (tabVal) {
    tabVal.addEventListener('click', () => {
      switchCommunityTabInternal('valoraciones');
    });
  }

  if (tabSug) {
    tabSug.addEventListener('click', () => {
      switchCommunityTabInternal('sugerencias');
    });
  }

  // 2. Abrir y cerrar formulario para compartir experiencia
  const btnOpenShare = document.getElementById('btn-open-share-modal');
  const btnCloseShare = document.getElementById('btn-close-share-modal');
  const shareModalBox = document.getElementById('share-modal-box');

  if (btnOpenShare && shareModalBox) {
    btnOpenShare.addEventListener('click', () => {
      shareModalBox.classList.toggle('hidden');
      shareModalBox.classList.toggle('flex');
    });
  }

  if (btnCloseShare && shareModalBox) {
    btnCloseShare.addEventListener('click', () => {
      shareModalBox.classList.add('hidden');
      shareModalBox.classList.remove('flex');
    });
  }

  // 3. Publicar experiencia
  const btnPublishExp = document.getElementById('btn-publish-experience');

  if (btnPublishExp) {
    btnPublishExp.addEventListener('click', () => {
      const textInput = document.getElementById('experience-text');
      const categorySelect = document.getElementById('experience-category');

      const text = textInput ? textInput.value.trim() : '';
      const cat = categorySelect ? categorySelect.value : 'General';

      if (!text) {
        showCommunityToastLocal('Escribe tu comentario antes de publicar.');
        return;
      }

      const feed = document.getElementById('experience-feed');

      if (feed) {
        const newCard = document.createElement('article');

        newCard.className =
          'bg-surface-container-low p-space-sm rounded-xl flex flex-col space-y-space-xs shadow-sm';

        newCard.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-xs">
              <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-primary text-[22px]">person</span>
              </div>

              <div class="flex flex-col">
                <span class="font-button-text text-button-text text-primary-container">
                  @LectorComunitario (Tú)
                </span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  Publicado ahora
                </span>
              </div>
            </div>

            <span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-uppercase text-label-uppercase">
              ${cat}
            </span>
          </div>

          <p class="font-body-base text-body-base text-on-surface pt-0.5">
            "${text}"
          </p>

          <div class="flex items-center justify-between pt-space-xs text-on-surface-variant">
            <button class="btn-like-post flex items-center gap-1 text-primary-container hover:opacity-80">
              <span class="material-symbols-outlined text-[18px]"
                    style="font-variation-settings: 'FILL' 1;">
                thumb_up
              </span>

              <span class="font-body-sm text-body-sm font-bold">
                <span class="like-count">1</span> coincidió
              </span>
            </button>

            <span class="font-body-sm text-body-sm text-secondary">
              Aporte Verificado
            </span>
          </div>
        `;

        feed.insertBefore(newCard, feed.firstChild);

        const newLikeBtn = newCard.querySelector('.btn-like-post');

        if (newLikeBtn) {
          newLikeBtn.addEventListener('click', function () {
            const countSpan = this.querySelector('.like-count');

            if (countSpan) {
              countSpan.textContent =
                parseInt(countSpan.textContent) + 1;
            }
          });
        }
      }

      if (textInput) {
        textInput.value = '';
      }

      if (shareModalBox) {
        shareModalBox.classList.add('hidden');
        shareModalBox.classList.remove('flex');
      }

      showCommunityToastLocal('¡Tu experiencia ha sido publicada con éxito!');
    });
  }

  // 4. Me gusta en publicaciones existentes
  const existingLikes = document.querySelectorAll('.btn-like-post');

  existingLikes.forEach(btn => {
    btn.addEventListener('click', function () {
      const countSpan = this.querySelector('.like-count');

      if (countSpan) {
        countSpan.textContent =
          parseInt(countSpan.textContent) + 1;
      }
    });
  });

  // 5. Selección de estrellas
  const starBtns = document.querySelectorAll('.star-btn');

  starBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      currentSelectedScore =
        parseInt(this.getAttribute('data-score')) || 0;

      starBtns.forEach((sBtn, index) => {
        const starIcon =
          sBtn.querySelector('.material-symbols-outlined');

        if (index < currentSelectedScore) {
          sBtn.classList.add('active-star');

          if (starIcon) {
            starIcon.style.fontVariationSettings = "'FILL' 1";
          }
        } else {
          sBtn.classList.remove('active-star');

          if (starIcon) {
            starIcon.style.fontVariationSettings = "'FILL' 0";
          }
        }
      });
    });
  });

  // 6. Enviar valoración
  const btnSubmitRating =
    document.getElementById('btn-submit-rating');

  if (btnSubmitRating) {
    btnSubmitRating.addEventListener('click', () => {
      const selectItem =
        document.getElementById('select-item-rating');

      const itemName =
        selectItem ? selectItem.value : 'el elemento elegido';

      if (currentSelectedScore === 0) {
        showCommunityToastLocal(
          'Por favor selecciona entre 1 y 5 estrellas.'
        );
        return;
      }

      showCommunityToastLocal(
        `¡Registraste ${currentSelectedScore} estrellas para "${itemName}"!`
      );
    });
  }

  // 7. Enviar sugerencia
  const btnSubmitSuggestion =
    document.getElementById('btn-submit-suggestion');

  if (btnSubmitSuggestion) {
    btnSubmitSuggestion.addEventListener('click', () => {
      const titleInput =
        document.getElementById('suggestion-title');

      const bodyInput =
        document.getElementById('suggestion-body');

      const title =
        titleInput ? titleInput.value.trim() : '';

      const body =
        bodyInput ? bodyInput.value.trim() : '';

      if (!title || !body) {
        showCommunityToastLocal(
          'Completa el título y detalle de la sugerencia.'
        );
        return;
      }

      if (titleInput) {
        titleInput.value = '';
      }

      if (bodyInput) {
        bodyInput.value = '';
      }

      showCommunityToastLocal(
        '¡Sugerencia recibida con éxito por el comité de biblioteca!'
      );
    });
  }

  // 8. Cerrar Toast
  const btnCloseToast =
    document.getElementById('btn-close-community-toast');

  if (btnCloseToast) {
    btnCloseToast.addEventListener('click', () => {
      if (communityToast) {
        communityToast.classList.add('hidden');
        communityToast.classList.remove('flex');
      }
    });
  }
}


// Inicializar solamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  initComunidadInteractions();
});

/* ==========================================================================
   PANTALLA 7: HISTORIAL Y ALERTAS DE PRÉSTAMO
   ========================================================================== */
(function () {
  'use strict';

  function initHistorialInteractions() {
    const mainHistorial = document.querySelector('main[data-pantalla="historial"]');
    
    // Si no estamos en la pantalla de Historial, detener ejecución
    if (!mainHistorial) return;

    // 1. CREACIÓN DEL TOAST EN EL DOM
    let toastElement = document.getElementById('historial-toast-notificacion');
    let toastTimer = null;

    if (!toastElement) {
      toastElement = document.createElement('div');
      toastElement.id = 'historial-toast-notificacion';
      toastElement.className = 'historial-toast-container';
      toastElement.setAttribute('role', 'status');
      toastElement.setAttribute('aria-live', 'polite');
      toastElement.innerHTML = `
        <span class="material-symbols-outlined historial-toast-icono">info</span>
        <span class="historial-toast-texto" id="historial-toast-mensaje"></span>
      `;
      document.body.appendChild(toastElement);
    }

    function mostrarToastHistorial(mensaje) {
      const textoElemento = document.getElementById('historial-toast-mensaje');
      if (textoElemento) {
        textoElemento.textContent = mensaje;
      }

      toastElement.classList.add('historial-toast-visible');

      if (toastTimer) {
        clearTimeout(toastTimer);
      }

      toastTimer = setTimeout(function () {
        toastElement.classList.remove('historial-toast-visible');
      }, 3000);
    }

    // 2. LÓGICA DE FILTROS
    const botonesFiltro = mainHistorial.querySelectorAll('[data-filtro]');
    const registrosPrestamo = mainHistorial.querySelectorAll('article[data-estado-prestamo]');

    botonesFiltro.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const filtroSeleccionado = this.getAttribute('data-filtro');

        // Actualizar estilos de los botones de filtro
        botonesFiltro.forEach(function (btn) {
          btn.classList.remove('historial-filtro-btn-activo', 'bg-primary-container', 'text-on-primary-container');
          btn.classList.add('bg-surface-container', 'text-on-surface-variant');
        });

        this.classList.remove('bg-surface-container', 'text-on-surface-variant');
        this.classList.add('historial-filtro-btn-activo');

        // Ocultar / Mostrar registros según el filtro aplicado
        registrosPrestamo.forEach(function (registro) {
          const estadoRegistro = registro.getAttribute('data-estado-prestamo');

          if (filtroSeleccionado === 'todos' || estadoRegistro === filtroSeleccionado) {
            registro.classList.remove('historial-registro-oculto');
          } else {
            registro.classList.add('historial-registro-oculto');
          }
        });
      });
    });

    // 3. DELEGACIÓN DE EVENTOS PARA BOTONES DE ACCIÓN
    mainHistorial.addEventListener('click', function (evento) {
      const botonAccion = evento.target.closest('[data-accion]');
      if (!botonAccion) return;

      const tipoAccion = botonAccion.getAttribute('data-accion');
      const tituloLibro = botonAccion.getAttribute('data-libro-titulo') || 'el libro';

      if (tipoAccion === 'ver-prestamo') {
        mostrarToastHistorial('Consultando préstamo de "' + tituloLibro + '".');
      } else if (tipoAccion === 'renovar-prestamo') {
        mostrarToastHistorial('Solicitud de renovación enviada para "' + tituloLibro + '".');
      } else if (tipoAccion === 'ver-historial-completo') {
        mostrarToastHistorial('Consultando el historial completo de préstamos...');
      }
    });
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistorialInteractions);
  } else {
    initHistorialInteractions();
  }
})();

// Menú lateral de Biblioteca SaBré
document.addEventListener('DOMContentLoaded', () => {
    const botonAbrir = document.getElementById('boton-menu');
    const botonCerrar = document.getElementById('cerrar-menu');
    const menu = document.getElementById('menu-lateral');
    const fondo = document.getElementById('fondo-menu');

    if (!botonAbrir || !botonCerrar || !menu || !fondo) return;

    function abrirMenu() {
        menu.classList.add('menu-abierto');
        fondo.hidden = false;
        menu.removeAttribute('inert');
        menu.setAttribute('aria-hidden', 'false');
        botonAbrir.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-bloqueo-scroll');
        botonCerrar.focus();
    }

    function cerrarMenu() {
        menu.classList.remove('menu-abierto');
        fondo.hidden = true;
        menu.setAttribute('inert', '');
        menu.setAttribute('aria-hidden', 'true');
        botonAbrir.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-bloqueo-scroll');
        botonAbrir.focus();
    }

    botonAbrir.addEventListener('click', abrirMenu);
    botonCerrar.addEventListener('click', cerrarMenu);
    fondo.addEventListener('click', cerrarMenu);

    document.addEventListener('keydown', evento => {
        if (evento.key === 'Escape' && menu.classList.contains('menu-abierto')) {
            cerrarMenu();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnMenu = document.getElementById("btn-menu"); // Identificador del botón de las tres rayitas
    const menuLateral = document.getElementById("menu-lateral"); // Contenedor del menú desplegable
    const btnCerrar = document.getElementById("cerrar-menu"); // Botón 'X' para cerrar

    if (btnMenu && menuLateral) {
        btnMenu.addEventListener("click", function() {
            menuLateral.classList.toggle("activo"); // Cambia la clase para mostrarlo/ocultarlo
        });
    }

    if (btnCerrar && menuLateral) {
        btnCerrar.addEventListener("click", function() {
            menuLateral.classList.remove("activo");
        });
    }
});


/* ==========================================================================
   MÓDULO GLOBAL: ACCESIBILIDAD DE BIBLIOTECA SaBré
   Tamaño de texto y lector de pantalla
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const botonReducir = document.getElementById('btn-reducir-letra');
    const botonRestablecer = document.getElementById('btn-restablecer-letra');
    const botonAumentar = document.getElementById('btn-aumentar-letra');
    const botonLeer = document.getElementById('btn-leer-pagina');
    const botonDetener = document.getElementById('btn-detener-audio');

    // Si esta página no tiene la barra, no se ejecuta el módulo.
    if (!botonReducir || !botonRestablecer ||
        !botonAumentar || !botonLeer || !botonDetener) {
        return;
    }

    // ----------------------------------------------------------
    // 1. CONFIGURACIÓN DEL TAMAÑO DE TEXTO
    // ----------------------------------------------------------

    const CLAVE_TAMANO = 'bibliotecaSabreEscalaTexto';
    const TAMANO_MINIMO = 0.8;
    const TAMANO_MAXIMO = 1.5;
    const INCREMENTO = 0.1;

    let escalaTexto = 1;

    try {
        const guardado = localStorage.getItem(CLAVE_TAMANO);

        if (guardado !== null) {
            const valor = Number(guardado);

            if (Number.isFinite(valor)) {
                escalaTexto = Math.min(
                    TAMANO_MAXIMO,
                    Math.max(TAMANO_MINIMO, valor)
                );
            }
        }
    } catch (error) {
        console.warn('No se pudo recuperar la preferencia de texto.');
    }

    // Guarda los tamaños originales para evitar que se multipliquen
    // los aumentos cada vez que se presionan los botones.
    const elementosTexto = document.querySelectorAll(
        'body p, body span, body a, body li, body label, ' +
        'body button, body input, body textarea, body select, ' +
        'body td, body th, body h1, body h2, body h3, ' +
        'body h4, body h5, body h6, body small, body strong'
    );

    elementosTexto.forEach(function (elemento) {
        if (
            elemento.closest('#barra-accesibilidad-usuario') ||
            elemento.classList.contains('material-symbols-outlined')
        ) {
            return;
        }

        elemento.dataset.tamanoOriginal =
            window.getComputedStyle(elemento).fontSize;
    });

    function actualizarTexto() {
        elementosTexto.forEach(function (elemento) {
            const original = elemento.dataset.tamanoOriginal;

            if (!original) return;

            const valorOriginal = parseFloat(original);

            if (!Number.isFinite(valorOriginal)) return;

            elemento.style.fontSize =
                (valorOriginal * escalaTexto) + 'px';
        });

        try {
            localStorage.setItem(CLAVE_TAMANO, String(escalaTexto));
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de texto.');
        }

        botonReducir.disabled = escalaTexto <= TAMANO_MINIMO;
        botonAumentar.disabled = escalaTexto >= TAMANO_MAXIMO;

        botonReducir.setAttribute(
            'aria-disabled',
            String(botonReducir.disabled)
        );

        botonAumentar.setAttribute(
            'aria-disabled',
            String(botonAumentar.disabled)
        );
    }

    botonReducir.addEventListener('click', function () {
        escalaTexto = Math.max(
            TAMANO_MINIMO,
            Math.round((escalaTexto - INCREMENTO) * 10) / 10
        );

        actualizarTexto();
    });

    botonRestablecer.addEventListener('click', function () {
        escalaTexto = 1;
        actualizarTexto();
    });

    botonAumentar.addEventListener('click', function () {
        escalaTexto = Math.min(
            TAMANO_MAXIMO,
            Math.round((escalaTexto + INCREMENTO) * 10) / 10
        );

        actualizarTexto();
    });

    actualizarTexto();

    // ----------------------------------------------------------
    // 2. LECTOR DE PANTALLA
    // ----------------------------------------------------------

    let leyendo = false;

    function actualizarBotonesAudio() {
        botonLeer.style.display = leyendo ? 'none' : 'inline-flex';
        botonDetener.style.display = leyendo ? 'inline-flex' : 'none';

        botonLeer.setAttribute('aria-pressed', String(leyendo));
    }

    function detenerLectura() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        leyendo = false;
        actualizarBotonesAudio();
    }

    function obtenerTextoPagina() {
        const contenido =
            document.querySelector('main') ||
            document.querySelector('[role="main"]') ||
            document.body;

        const copia = contenido.cloneNode(true);

        // Excluir elementos que no deben leerse.
        copia.querySelectorAll(
            'script, style, noscript, nav, footer, ' +
            'button, input, textarea, select, ' +
            '[hidden], [aria-hidden="true"], ' +
            '#barra-accesibilidad-usuario, ' +
            '#menu-lateral, #fondo-menu'
        ).forEach(function (elemento) {
            elemento.remove();
        });

        return copia.innerText
            .replace(/\s+/g, ' ')
            .trim();
    }

    function leerPagina() {
        if (!('speechSynthesis' in window)) {
            alert(
                'Tu navegador no dispone de la función de lectura por voz.'
            );
            return;
        }

        detenerLectura();

        const texto = obtenerTextoPagina();

        if (!texto) {
            alert('No se encontró contenido para leer en esta página.');
            return;
        }

        const mensaje = new SpeechSynthesisUtterance(texto);

        mensaje.lang = 'es-AR';
        mensaje.rate = 0.95;
        mensaje.pitch = 1;
        mensaje.volume = 1;

        leyendo = true;
        actualizarBotonesAudio();

        mensaje.onend = function () {
            leyendo = false;
            actualizarBotonesAudio();
        };

        mensaje.onerror = function () {
            leyendo = false;
            actualizarBotonesAudio();
        };

        window.speechSynthesis.speak(mensaje);
    }

    botonLeer.addEventListener('click', leerPagina);

    botonDetener.addEventListener('click', detenerLectura);

    // Detener la lectura si se abandona la página.
    window.addEventListener('pagehide', detenerLectura);

    actualizarBotonesAudio();

});
