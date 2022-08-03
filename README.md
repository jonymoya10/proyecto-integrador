CURSO TÉCNICO: NODE.JS

Metodos para realizar las Request


GET (Obtener Datos)
Consultar todos http://localhost:3000/

get('http://localhost:3000/busstops/',
getAllStops); get('http://localhost:3000/busstops/:id',
getStopById); post('http://localhost:3000/busstops/',newStop); 

POST (Agregar datos)
http://localhost:3000/

post('http://localhost:3000/busstops/:linea'


DELETE (Eliminar datos)
delete('http://localhost:3000/busstops/:id', deleteStopById);

PATCH (Modificar Datos)
patch('http://localhost:3000/:id', updateStopById);


