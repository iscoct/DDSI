"use strict"

const mysql = require('mysql');
const operacionesComunes = require('../../Comun/js/operaciones');

var crearEmpleado = (nombre, dni, direccion, telefono, sueldo, estado) => {
	operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al conectarse con la BD en crearEmpleado");

		operacionesComunes.tomarMaximo(con, "CodEnt", "Entidad", (err, maximo) => {
			if(err)
				console.log("Hubo un error al hacer la consulta del máximo iden Entidad");
			else
				console.log("Realizada la consulta del máximo iden de la Entidad");

			let identificador = maximo + 1;
			let campos = ["CodEnt", "Nombre"];
			let valores = [identificador, nombre];

			operacionesComunes.insertarTupla("Entidad", campos, valores);

			campos = ["CodEnt", "DNI", "Direccion", "Telefono", "Sueldo", "Estado"];
			valores = [identificador, dni, direccion, telefono, sueldo, estado];

			operacionesComunes.insertarTupla("Empleados", campos, valores);

			con.end();
		});
	});
}

var crearDepartamento = (localizacion, area) => {
  operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al intentar conectarse a la BD en crearDepartamento");

		operacionesComunes.tomarMaximo(con, "CodDep", "Departamentos", (err, maximo) => {
      if(err)
				console.log("Hubo un error al hacer la consulta del máximo iden Departamento");
			else
				console.log("Realizada la consulta del máximo iden del Departamento");

			let idNuevo = maximo + 1;
			let valores = [idNuevo, localizacion, area];
			let campos = ["CodDep", "Localizacion", "Area"];

			operacionesComunes.insertarTupla("Departamentos", campos, valores);

      con.end();
		});
	});
}


/*
	callback será una función a la que le enviaremos
	el resultado de la consulta realizada, y este se encargará de tratar con él
*/
var consultarEmpleado = (identificador, callback) => {
	operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al conectarse con la BD en consultarEmpleado");

		let sql = "SELECT Entidad.*, Empleados.* FROM Empleados, Entidad WHERE Entidad.CodEnt = Empleados.CodEnt AND Entidad.CodEnt = " + identificador + ";";

		con.query(sql, function(err, result) {
			if(err)
				console.log("Hubo un error al hacer la consulta del empleado");
			else
				console.log("Realizada la consulta del empleado");

			callback(result);
			con.end();
		});
	});
};

var consultarDepartamento = (identificador, callback) => {
	operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al conectarse con la BD en consultarDepartamento");

		let sql = "SELECT * FROM Departamentos WHERE CodDep = " + identificador + ";";

		con.query(sql, function(err, result) {
			if(err)
				console.log("Hubo un error al hacer la consulta del departamento");
			else
				console.log("Realizada la consulta del departamento");

			callback(result);
			con.end();
		});
	});
};


var eliminarEmpleado = (identificador) => {
	operacionesComunes.eliminarTupla("Entidad", "CodEnt", identificador);
	operacionesComunes.eliminarTupla("Empleados", "CodEnt", identificador);
}

var eliminarDepartamento = (identificador) => {
	operacionesComunes.eliminarTupla("Departamentos", "CodDep", identificador);
}

var modificarEmpleado = (campos, valores, camposCondiciones, condiciones) => {
	operacionesComunes.modificarTupla("Empleados", campos, valores, camposCondiciones, condiciones);
}

var modificarDepartamento = (campos, valores, camposCondiciones, condiciones) => {
	operacionesComunes.modificarTupla("Departamentos", campos, valores, camposCondiciones, condiciones);
}

var crearInfProdComp = (nombre, precio, rendimiento, informe, idProducto) => {
	operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al intentar conectarse a la BD en crearInfProdComp");

		operacionesComunes.tomarMaximo(con, "CodProdComp", "ProductoCompetidor", (err, maximo) => {
			if(err)
				console.log("Hubo un error al consultar el máximo de CodProdComo en ProductoCompetidor");

			let idNuevo = maximo + 1;
			let valores = [idNuevo, precio, nombre, rendimiento];
			let campos = ["CodProdComp", "Precio", "Nombre", "Rendimiento"];

			operacionesComunes.insertarTupla("ProductoCompetidor", campos, valores);

			operacionesComunes.tomarMaximo(con, "CodComp", "Compara", (err, maximo) => {
				if(err)
					console.log("Hubo un error al consultar el máximo de CodComp en Compara");

				let idNuevoComp = maximo + 1;
				campos = ["CodProdComp", "CodProd", "CodComp", "Informe"];

				if(informe = '')
					informe = "null";

				valores = [idNuevo, idProducto, idNuevoComp, informe];

				operacionesComunes.insertarTupla("Compara", campos, valores);
				con.end();
			});
		});
	});
}


var consultarPertenece = (identificador, callback) => {
	operacionesComunes.conectarse(function(err, con) {
		if(err)
			console.log("Hubo un error al conectarse con la BD en consultarEmpleado");

		let sql = "SELECT CodEnt FROM Pertenece WHERE CodDep = " + identificador + ";";
		"DECLARE CURSOR cEmpleados IS		    SELECT Empleados.Nombre, Empleados.DNI FROM Empleados, Pertenece		    WHERE Pertenece.CodDep = 1 AND Pertenece.CodEnt = Empleados.CodEnt;		  NombreEmpleado VARCHAR2(30);		  DNIEmpleado VARCHAR2(9);		BEGIN		  OPEN cEmpleados;		  FETCH cEmpleados INTO NombreEmpleado, DNIEmpleado;		  DBMS_OUTPUT.PUT_LINE('Los empleados pertenecientes al departamento 1 son:');		  WHILE cEmpleados%found LOOP		    DBMS_OUTPUT.PUT_LINE(NombreEmpleado || ' con DNI:' || DNIEmpleado);		    FETCH cEmpleados INTO NombreEmpleado, DNIEmpleado;		  END LOOP;		  CLOSE cEmpleados;		END;"

		con.query(sql, function(err, result) {
			if(err)
				console.log("Hubo un error al hacer la consulta del empleado");
			else
				console.log("Realizada la consulta del empleado");

			callback(result);
			con.end();
		});
	});
};


module.exports.crearEmpleado = crearEmpleado;
module.exports.consultarEmpleado = consultarEmpleado;
module.exports.modificarEmpleado = modificarEmpleado;
module.exports.eliminarEmpleado = eliminarEmpleado;

module.exports.crearDepartamento = crearDepartamento;
module.exports.consultarDepartamento = consultarDepartamento;
module.exports.modificarDepartamento = modificarDepartamento;
module.exports.eliminarDepartamento = eliminarDepartamento;

module.exports.consultarPertenece = consultarPertenece;
