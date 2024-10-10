document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    const inputBuscar = document.getElementById('inputBuscar');
    const contenedor = document.getElementById('contenedor');

    //Dar funcionalidad al boton de busqueda cuando se haga clic
    btnBuscar.addEventListener('click', ()=> { 
        const search = inputBuscar.value;
        if(search){
            fetchShowImages(search);
        }
    });

    function fetchShowImages(search){
        const url = `https://images-api.nasa.gov/search?q=${search}`;
        //Realizamos la solicitud a la API usando Fetch
        fetch(url) 
            .then(response => response.json()) //Convertimos la respuesta a formato JSON
            //Desestructuracion del objeto data
            .then(data => {
                contenedor.innerHTML = '';
                const {collection: {items}} = data;
                //Iteramos sobre cada elemento devuelto por la API
                items.forEach (item => {
                    if(item.links && item.data) {
                        const image = item.links[0].href; //Obtenemos la url de la imagen 
                        const title = item.data[0].title; //Obtenemos el titulo 
                        const description = item.data[0].description || 'No hay descripcion disponible'; //Obtenemos la descripcion 
                        const dateCreated = new Date (item.data[0].date_created).toLocaleDateString();
                        
                        //Creamos una tarjeta de Bootstrap para cada imagen
                        const card = `
                            <div class = "col-md-3 mb-4">
                                <div class = "card text-center">
                                    <img src="${image}" class = "card-img-top" alt ="${title}">
                                    <div class = "card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <div class = "card-text overflow-auto flex-grow-1" style = "max-height:100px;">
                                            ${description} 
                                        </div>
                                    </div>
                                    <div class ="card-footer">
                                        <small class ="text-body-secondary"> dateCreated: ${dateCreated}</small>
                                    </div>
                                </div>
                            </div>
                        `;
                        //Agregamos la tarjeta creada
                        contenedor.innerHTML += card; 
                    } 
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos', error);
            });
    }
});