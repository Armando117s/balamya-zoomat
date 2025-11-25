document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Autenticando...";
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('login-view').classList.remove('active');
        document.getElementById('login-view').classList.add('hidden');
        const mainLayout = document.getElementById('main-layout');
        mainLayout.classList.remove('hidden');
        mainLayout.classList.add('active'); 
        switchView('dashboard-view');
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1000);
});

let switchView = function(viewId) {
    document.querySelectorAll('.sub-view').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if(target) target.classList.remove('hidden');
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active-nav'));
    let navId = '';
    if(viewId === 'dashboard-view') navId = 'nav-dashboard';
    if(viewId === 'animales-view') navId = 'nav-animales';
    if(viewId === 'dietas-view') navId = 'nav-dietas';
    if(viewId === 'perfil-view') navId = 'nav-perfil';
    if(navId) {
        const navItem = document.getElementById(navId);
        if(navItem) navItem.classList.add('active-nav');
    }
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active-mobile')) {
            toggleSidebar();
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('active-mobile');
    overlay.classList.toggle('active-overlay');
}

function goToKitchen() {
    document.getElementById('main-layout').classList.remove('active');
    document.getElementById('main-layout').classList.add('hidden');
    document.getElementById('kitchen-view').classList.remove('hidden');
    document.getElementById('kitchen-view').classList.add('active');
}

function backToDashboard() {
    document.getElementById('kitchen-view').classList.remove('active');
    document.getElementById('kitchen-view').classList.add('hidden');
    document.getElementById('main-layout').classList.remove('hidden');
    document.getElementById('main-layout').classList.add('active');
}

function logout() { location.reload(); }

function marcarPreparacion(btn) {
    btn.innerText = "⏳ Preparando...";
    btn.style.background = "#93c5fd"; 
    btn.style.color = "#1e3a8a";
}

/* --- LÓGICA MODIFICADA: CONVERTIR A AVISO --- */
function confirmarPedido(btnConfirmar) {
    btnConfirmar.innerText = "✅ ¡Listo!";
    // Cambiamos la clase para que se vea como un aviso estático
    btnConfirmar.className = "btn-large confirmed-notice"; 
    
    btnConfirmar.disabled = true;

    const contenedorAcciones = btnConfirmar.parentElement;
    const btnPrep = contenedorAcciones.querySelector('.prep');
    const btnUndo = contenedorAcciones.querySelector('.undo');

    if (btnPrep) btnPrep.style.display = "none";
    if (btnUndo) btnUndo.classList.remove('hidden');
}

function deshacerConfirmacion(btnUndo) {
    const contenedorAcciones = btnUndo.parentElement;
    // Buscamos el elemento que ahora tiene la clase de aviso
    const btnConfirm = contenedorAcciones.querySelector('.confirmed-notice');
    const btnPrep = contenedorAcciones.querySelector('.prep');

    if (btnConfirm) {
        btnConfirm.innerText = "Confirmar";
        // Restauramos la clase original de botón
        btnConfirm.className = "btn-large success"; 
        btnConfirm.disabled = false;
    }

    if (btnPrep) {
        btnPrep.style.display = "block";
        btnPrep.innerText = "Marcar en Preparación";
        btnPrep.style.background = "#3b82f6";
        btnPrep.style.color = "white";
    }
    btnUndo.classList.add('hidden');
}

/* --- MODAL STOCK (EXISTENTE) --- */
function abrirModalStock(animalNombre, listaIngredientes) {
    document.getElementById('modal-animal-name').innerText = animalNombre;
    const select = document.getElementById('modal-ingredient-select');
    select.innerHTML = ''; 
    const defaultOpt = document.createElement('option');
    defaultOpt.text = "Seleccione ingrediente...";
    select.add(defaultOpt);
    listaIngredientes.forEach(ing => {
        const opt = document.createElement('option');
        opt.value = ing;
        opt.text = ing;
        select.add(opt);
    });
    document.getElementById('modal-stock').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('modal-stock').classList.add('hidden');
    document.getElementById('modal-comments').value = '';
}

function enviarReporte() {
    // Nota: Usamos querySelector específico para evitar conflicto con el otro modal
    const btn = document.querySelector('#modal-stock .btn-send');
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.style.background = "#999";
    setTimeout(() => {
        alert("Reporte enviado a Nutrición con éxito.");
        cerrarModal();
        btn.innerText = originalText;
        // Restaurar color verde
        btn.style.background = "#2E7D32"; 
    }, 1000);
}

/* --- LÓGICA NUEVO ANIMAL (NUEVO) --- */

function abrirModalNuevoAnimal() {
    document.getElementById('modal-new-animal').classList.remove('hidden');
}

function cerrarModalNuevoAnimal() {
    document.getElementById('modal-new-animal').classList.add('hidden');
    // Limpiamos el formulario al cerrar para que esté vacío la próxima vez
    document.getElementById('form-nuevo-animal').reset();
}

function guardarAnimal() {
    // 1. Capturar los datos del formulario
    const nombre = document.getElementById('new-animal-name').value;
    const especie = document.getElementById('new-animal-species').value;
    const recinto = document.getElementById('new-animal-enclosure').value;

    // 2. Simular guardado (Aquí conectarías con tu Backend/Base de Datos)
    const btn = document.querySelector('#modal-new-animal .btn-send');
    const originalText = btn.innerText;
    
    btn.innerText = "Guardando...";
    
    setTimeout(() => {
        alert(`✅ ¡Ficha Creada Exitosamente!\n\nEspecie: ${especie}\nNombre/ID: ${nombre}\nUbicación: ${recinto}`);
        
        // 3. Cerrar modal y restaurar botónes
        cerrarModalNuevoAnimal();
        btn.innerText = originalText;
    }, 800);
}