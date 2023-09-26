const express = require("express");
const app = express();
const port = process.env.port || 3000;
app.use(express.json()); //Habilitacion para recibir datos por medio de solicitud (insomnia)

/*Publicaciones de Blog - MONTOYA ROMERO OMAR
id (entero autoincremental)
Título (cadena de texto)
Contenido (texto largo)
Fecha de publicación (fecha y hora)*/

let blogs = [
	{
		id: 1,
		Título: "un blog para marketeros",
		Contenido: "Este es el contenido del primer post.",
		Fecha_de_publicación: "2023-09-26",
	},
	{
		id: 2,
		Título: "Uso de herramientas SEO.",
		Contenido: "Este es el contenido del segundo post.",
		Fecha_de_publicación: "2023-09-27",
	},
	{
		id: 3,
		Título: "Factores de posicionamiento en Google",
		Contenido: "Este es el contenido del tercer post.",
		Fecha_de_publicación: "2023-09-28",
	},
	{
		id: 4,
		Título: "Email marketing",
		Contenido: "Este es el contenido del cuarto post.",
		Fecha_de_publicación: "2023-09-29",
	},
	{
		id: 5,
		Título: "Estrategias de blogging",
		Contenido: "Este es el contenido del quinto post.",
		Fecha_de_publicación: "2023-09-30",
	},
	{
		id: 6,
		Título: "Meditación",
		Contenido: "Este es el contenido del sexto post.",
		Fecha_de_publicación: "2023-10-01",
	},
	{
		id: 7,
		Título: "Soft skills",
		Contenido: "Este es el contenido del séptimo post.",
		Fecha_de_publicación: "2023-10-02",
	},
	{
		id: 8,
		Título: "Control de las emociones",
		Contenido: "Este es el contenido del octavo post.",
		Fecha_de_publicación: "2023-10-03",
	},
	{
		id: 9,
		Título: "Uso de herramientas como Figma y Adobe",
		Contenido: "Este es el contenido del noveno post.",
		Fecha_de_publicación: "2023-10-04",
	},
	{
		id: 10,
		Título: "Diseño de plantillas web",
		Contenido: "Este es el contenido del décimo post.",
		Fecha_de_publicación: "2023-10-05",
	},
];

//Obtener la lista de registros (GET).
app.get("/socios/v1/blogs", (req, res) => {
	//1.- Verificar si existen los blogs
	if (blogs.length > 0) {
		//2.- Mostrarlas con un estado y mensaje
		res.status(200).json({
			estado: 1,
			mensaje: "Existen blogs",
			blogs: blogs,
		});
	} else {
		//3.- No existe, mostrar estado y mensaje
		res.status(404).json({
			estado: 0,
			mensaje: "No existen blogs",
		});
	}
});
//Obtener una registro por su ID (GET).

app.get("/socios/v1/blogs/:id", (req, res) => {
	//1.- Obtener el ID
	const { id } = req.params;
	//2.- Buscar el blog
	const blog = blogs.find((blogs) => blogs.id == id);
	//3.- Verificar si existe el registro
	if (blog) {
		//4.- Mostrar el blog
		res.status(200).json({
			estado: 1,
			mensaje: "blog encontrado",
			blog: blog,
		});
	} else {
		//5.- No existe, mostrar estado y mensaje
		res.status(404).json({
			estado: 0,
			mensaje: "blog no encontrado",
		});
	}
});
//Agregar un registro (POST).
app.post("/socios/v1/blogs", (req, res) => {
	const { Título, Contenido } = req.body;
	const Fecha = new Date();
	const id = Math.round(Math.random() * 1000);
	// Comprobar que el cliente  = usuario  = programador
	if (Título == undefined || Contenido == undefined) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
		});
	} else {
		//En javascript como agregar un nuevo elemento al arreglo
		const blog = { id: id, Título: Título, Contenido: Contenido, Fecha: Fecha };
		const longitudInicial = blogs.length;
		blogs.push(blog);
		if (blogs.length > longitudInicial) {
			res.status(201).json({
				estado: 1,
				mensaje: "Blog creado correctamente",
				blog: blog,
			});
		} else {
			res.status(500).json({
				estado: 0,
				mensaje: "No se agrego correctamente",
			});
		}
	}
});
//Actualizar un registro por su ID (PUT).
app.put("/socios/v1/blogs/:id", (req, res) => {
	//id viene ? = params
	// nombre y descripción ? = body
	const { id } = req.params;
	const { Título, Contenido } = req.body;
	const Fecha = new Date();
	if (Título == undefined && Contenido == undefined) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
		});
	} else {
		const posActualizar = blogs.findIndex((blog) => blog.id == id);
		if (posActualizar != -1) {
			//Si encontro la categoria con el id buscado
			//Actualizar la categoria
			blogs[posActualizar].Título = Título;
			blogs[posActualizar].Contenido = Contenido;
			blogs[posActualizar].Fecha = Fecha;
			res.status(200).json({
				estado: 1,
				mensaje: "Blog actualizado correctamente",
				blog: blogs[posActualizar],
			});
		} else {
			//No se encontro la categoria con el id buscado
			res.status(404).json({
				estado: 0,
				mensaje: "No se actualizo",
			});
		}
	}
});
//Eliminar un registro por su ID (DELETE).
app.delete("/socios/v1/blogs/:id", (req, res) => {
	const { id } = req.params;
	const posEliminar = blogs.findIndex((blog) => blog.id == id);
	if (posEliminar != -1) {
		blogs.splice(posEliminar, 1);
		res.status(200).json({
			estado: 1,
			mensaje: "Blog eliminado correctamente",
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No se eliminó",
		});
	}
});

app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});
