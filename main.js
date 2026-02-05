// Activar fondo de la barra de navegación al hacer scroll
window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 40);
});

document.addEventListener('DOMContentLoaded', function () {
    
    // --- LÓGICA DE MIEMBROS ---
    const signupSection = document.getElementById('miembros-signup');
    const contentSection = document.getElementById('miembros-contenido');
    const signupForm = document.getElementById('signupForm');
    const termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
    const modalCheckbox = document.getElementById('modalTermsCheckbox');
    const modalSubscribeBtn = document.getElementById('modalSubscribeButton');

    // Función para mostrar el contenido de miembros
    const showMemberContent = () => {
        if (signupSection) signupSection.style.display = 'none';
        if (contentSection) contentSection.style.display = 'block';
    };

    // 1. Revisar si el usuario ya es miembro al cargar la página
    if (localStorage.getItem('isMember') === 'true') {
        showMemberContent();
    }

    // 2. Manejar el envío del formulario de registro
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío real del formulario
            termsModal.show(); // Mostrar el modal de términos y condiciones
        });
    }

    // 3. Activar el botón de suscripción en el modal al aceptar los términos
    if (modalCheckbox && modalSubscribeBtn) {
        modalCheckbox.addEventListener('change', function() {
            if (this.checked) {
                modalSubscribeBtn.classList.remove('disabled');
            } else {
                modalSubscribeBtn.classList.add('disabled');
            }
        });
    }

    // 4. Al hacer clic en el botón final de suscripción
    if (modalSubscribeBtn) {
        modalSubscribeBtn.addEventListener('click', function() {
            if (!modalCheckbox.checked) return; // Doble chequeo por si acaso

            // Marcar al usuario como miembro en su navegador
            localStorage.setItem('isMember', 'true');
            
            // Mostrar el contenido de miembro
            showMemberContent();

            // Ocultar el modal
            termsModal.hide();

            // La redirección a WhatsApp ocurrirá automáticamente por el <a> tag.
        });
    }

    // --- LÓGICA DE CURSOS (MASONRY) ---
    const cursosGrid = document.querySelector('.cursos-grid');
    if (cursosGrid) {
        let msnry;

        imagesLoaded(cursosGrid, function() {
            msnry = new Masonry(cursosGrid, {
                itemSelector: '.curso-col',
                columnWidth: '.curso-col',
                percentPosition: true
            });
        });

        const cursoCollapses = document.querySelectorAll('.collapse');
        cursoCollapses.forEach(collapseEl => {
            const recalculateLayout = () => {
                if (msnry) msnry.layout();
            };
            collapseEl.addEventListener('shown.bs.collapse', recalculateLayout);
            collapseEl.addEventListener('hidden.bs.collapse', recalculateLayout);
        });
    }
});

