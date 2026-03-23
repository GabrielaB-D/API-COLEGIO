-- TABLA HORARIOS
create table horarios(
	id_horario serial primary key,
	franja varchar(50)
);

-- TABLA PROFESORES
create table profesores(
	id_profesor serial primary key,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	edad int
);

-- TABLA ESTUDIANTES
create table estudiantes(
	id_estudiante serial primary key,
	nombre varchar(100) not null,
	apellido varchar(100),
	edad int,
	grado varchar(20)
);

-- TABLA CURSOS
create table cursos(
	id_curso serial primary key,
	id_horario int,
	nombre varchar(100) not null,
	descripcion text,
	constraint fk_horario 
		foreign key (id_horario) 
		references horarios(id_horario) 
		on delete set null
);

-- TABLA MATRICULAS
create table matriculas (
	id_matricula serial primary key,
	id_estudiante int, 
	id_profesor int,
	id_curso int,
	constraint fk_profesor 
		foreign key (id_profesor) 
		references profesores(id_profesor) 
		on delete set null,
	constraint fk_estudiante 
		foreign key (id_estudiante) 
		references estudiantes(id_estudiante),
	constraint fk_curso 
		foreign key (id_curso) 
		references cursos(id_curso)
);

-- =========================
-- INSERTS
-- =========================

-- HORARIOS (2)
insert into horarios (franja) values 
('Diurno'),
('Nocturno');

-- PROFESORES (4)
insert into profesores (nombre, apellido, edad) values
('Carlos', 'Ramirez', 45),
('Ana', 'Lopez', 38),
('Luis', 'Gonzalez', 50),
('Maria', 'Fernandez', 29);

-- ESTUDIANTES (4)
insert into estudiantes (nombre, apellido, edad, grado) values
('Juan', 'Perez', 16, '10mo'),
('Sofia', 'Martinez', 17, '11mo'),
('Diego', 'Hernandez', 15, '9no'),
('Valeria', 'Castro', 18, '12mo');

-- CURSOS (4)
insert into cursos (id_horario, nombre, descripcion) values
(1, 'Matematicas', 'Curso basico de matematicas'),
(1, 'Ingles', 'Curso de ingles intermedio'),
(2, 'Programacion', 'Introduccion a la programacion'),
(2, 'Redes', 'Conceptos basicos de redes');

-- MATRICULAS (4)
insert into matriculas (id_estudiante, id_profesor, id_curso) values
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);