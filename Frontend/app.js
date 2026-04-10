const API = "http://localhost:3000";
const app = document.getElementById("app");

////////////////////// ESTUDIANTES //////////////////////

async function cargarEstudiantes(){

const res = await fetch(`${API}/estudiantes`);
const data = await res.json();

let html = `
<h2>Estudiantes</h2>

<form id="formEst">
<input id="nombre" placeholder="Nombre" required>
<input id="apellido" placeholder="Apellido">
<input id="edad" type="number" placeholder="Edad">
<input id="grado" placeholder="Grado">
<button>Guardar</button>
</form>

<table border="1">
<tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Grado</th><th>Acción</th></tr>
`;

data.forEach(e=>{
html+=`
<tr>
<td>${e.id_estudiante}</td>
<td>${e.nombre} ${e.apellido}</td>
<td>${e.edad}</td>
<td>${e.grado}</td>
<td>
<button onclick="eliminarEst(${e.id_estudiante})">Eliminar</button>
</td>
</tr>`;
});

html+=`</table>`;
app.innerHTML=html;

document.getElementById("formEst").addEventListener("submit", async e=>{
e.preventDefault();

await fetch(`${API}/estudiantes`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
nombre:nombre.value,
apellido:apellido.value,
edad:edad.value,
grado:grado.value
})
});

cargarEstudiantes();
});
}

async function eliminarEst(id){
await fetch(`${API}/estudiantes/${id}`,{method:"DELETE"});
cargarEstudiantes();
}

////////////////////// PROFESORES //////////////////////

async function cargarProfesores(){

const res = await fetch(`${API}/profesores`);
const data = await res.json();

let html = `
<h2>Profesores</h2>

<form id="formProf">
<input id="nombre" placeholder="Nombre" required>
<input id="apellido" placeholder="Apellido">
<input id="edad" type="number" placeholder="Edad">
<button>Guardar</button>
</form>

<table border="1">
<tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Acción</th></tr>
`;

data.forEach(p=>{
html+=`
<tr>
<td>${p.id_profesor}</td>
<td>${p.nombre} ${p.apellido}</td>
<td>${p.edad}</td>
<td>
<button onclick="eliminarProf(${p.id_profesor})">Eliminar</button>
</td>
</tr>`;
});

html+=`</table>`;
app.innerHTML=html;

document.getElementById("formProf").addEventListener("submit", async e=>{
e.preventDefault();

await fetch(`${API}/profesores`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
nombre:nombre.value,
apellido:apellido.value,
edad:edad.value
})
});

cargarProfesores();
});
}

async function eliminarProf(id){
await fetch(`${API}/profesores/${id}`,{method:"DELETE"});
cargarProfesores();
}

////////////////////// CURSOS //////////////////////

async function cargarCursos(){

const cursos = await (await fetch(`${API}/cursos`)).json();
const horarios = await (await fetch(`${API}/horarios`)).json();

let opciones = "";

/* MAPA HORARIOS */
const mapaHorarios = {};

horarios.forEach(h=>{
mapaHorarios[h.id_horario] = h.franja;
opciones += `<option value="${h.id_horario}">${h.franja}</option>`;
});

let html = `
<h2>Cursos</h2>

<form id="formCurso">
<input id="nombreC" placeholder="Nombre" required>
<textarea id="descripcion" placeholder="Descripción"></textarea>

<select id="horario">
${opciones}
</select>

<button>Guardar</button>
</form>

<table border="1">
<tr><th>Curso</th><th>Descripción</th><th>Horario</th></tr>
`;

cursos.forEach(c=>{
html+=`
<tr>
<td>${c.nombre}</td>
<td>${c.descripcion}</td>
<td>${mapaHorarios[c.id_horario]}</td>
</tr>`;
});

html+=`</table>`;
app.innerHTML=html;

document.getElementById("formCurso").addEventListener("submit", async e=>{
e.preventDefault();

await fetch(`${API}/cursos`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
nombre:nombreC.value,
descripcion:descripcion.value,
id_horario:horario.value
})
});

cargarCursos();
});
}

////////////////////// MATRICULAS //////////////////////
async function cargarMatriculas(){

const estudiantes = await (await fetch(`${API}/estudiantes`)).json();
const profesores = await (await fetch(`${API}/profesores`)).json();
const cursos = await (await fetch(`${API}/cursos`)).json();
const matriculas = await (await fetch(`${API}/matriculas`)).json();

/* MAPAS */
const mapaProfesores = {};
profesores.forEach(p=>{
mapaProfesores[p.id_profesor] = `${p.nombre} ${p.apellido}`;
});

const optEst = estudiantes.map(e=>`<option value="${e.id_estudiante}">${e.nombre}</option>`).join("");
const optProf = profesores.map(p=>`<option value="${p.id_profesor}">${p.nombre}</option>`).join("");
const optCurso = cursos.map(c=>`<option value="${c.id_curso}">${c.nombre}</option>`).join("");

let html = `
<h2>Matrículas</h2>

<form id="formMat">
<select id="est">${optEst}</select>
<select id="prof">${optProf}</select>
<select id="cur">${optCurso}</select>
<button>Matricular</button>
</form>

<table border="1">
<tr>
<th>ID</th>
<th>Estudiante</th>
<th>Profesor</th>
<th>Curso</th>
<th>Acción</th>
</tr>
`;

matriculas.forEach(m=>{
html+=`
<tr>
<td>${m.id_matricula}</td>
<td>${m.estudiante}</td>
<td>${mapaProfesores[m.id_profesor]}</td>
<td>${m.curso}</td>
<td>
<button onclick="eliminarMat(${m.id_matricula})">Eliminar</button>
</td>
</tr>`;
});

html+=`</table>`;
app.innerHTML=html;

document.getElementById("formMat").addEventListener("submit", async e=>{
e.preventDefault();

await fetch(`${API}/matriculas`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
id_estudiante:est.value,
id_profesor:prof.value,
id_curso:cur.value
})
});

cargarMatriculas();
});
}

async function eliminarMat(id){
await fetch(`${API}/matriculas/${id}`,{method:"DELETE"});
cargarMatriculas();
}

////////////////////// GLOBAL //////////////////////

window.cargarEstudiantes = cargarEstudiantes;
window.cargarProfesores = cargarProfesores;
window.cargarCursos = cargarCursos;
window.cargarMatriculas = cargarMatriculas;

window.eliminarEst = eliminarEst;
window.eliminarProf = eliminarProf;
window.eliminarMat = eliminarMat;