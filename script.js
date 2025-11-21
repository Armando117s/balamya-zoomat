document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = "Autenticando...";
    setTimeout(() => {
        document.getElementById('login-view').classList.remove('active');
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('main-layout').classList.remove('hidden');
        document.getElementById('main-layout').classList.add('active');
        switchView('dashboard-view');
    }, 1000);
});

function switchView(viewId) {
    document.querySelectorAll('.sub-view').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if(target) target.classList.remove('hidden');
    
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active-nav'));
    let navId = '';
    if(viewId === 'dashboard-view') navId = 'nav-dashboard';
    if(viewId === 'animales-view') navId = 'nav-animales';
    if(viewId === 'dietas-view') navId = 'nav-dietas';
    if(viewId === 'perfil-view') navId = 'nav-perfil';
    if(navId) document.getElementById(navId).classList.add('active-nav');
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

// --- LÓGICA DE COCINA (NUEVO: Deshacer) ---

function marcarPreparacion(btn) {
    btn.innerText = "⏳ Preparando...";
    btn.style.background = "#93c5fd"; 
    btn.style.color = "#1e3a8a";
}

function confirmarPedido(btnConfirmar) {
    btnConfirmar.innerText = "¡Listo!";
    btnConfirmar.style.background = "#15803d"; 
    btnConfirmar.style.color = "#ffffff";
    btnConfirmar.disabled = true;

    const contenedorAcciones = btnConfirmar.parentElement;
    const btnPrep = contenedorAcciones.querySelector('.prep');
    const btnUndo = contenedorAcciones.querySelector('.undo'); // Botón Cancelar

    if (btnPrep) btnPrep.style.display = "none";
    if (btnUndo) btnUndo.classList.remove('hidden'); // Mostrar botón cancelar
}

function deshacerConfirmacion(btnUndo) {
    const contenedorAcciones = btnUndo.parentElement;
    const btnConfirm = contenedorAcciones.querySelector('.success');
    const btnPrep = contenedorAcciones.querySelector('.prep');

    // Resetear botón confirmar
    btnConfirm.innerText = "Confirmar";
    btnConfirm.style.background = "#2E7D32";
    btnConfirm.style.color = "white";
    btnConfirm.disabled = false;

    // Resetear botón preparación
    if (btnPrep) {
        btnPrep.style.display = "block";
        btnPrep.innerText = "Marcar en Preparación";
        btnPrep.style.background = "#3b82f6";
        btnPrep.style.color = "white";
    }

    // Ocultar botón cancelar
    btnUndo.classList.add('hidden');
}

// --- MODAL Y REPORTES ---

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
    const btn = document.querySelector('.btn-send');
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.style.background = "#999";
    setTimeout(() => {
        alert("Reporte enviado a Nutrición con éxito.");
        cerrarModal();
        btn.innerText = originalText;
        btn.style.background = "#ef4444";
    }, 1000);
}