    var Entradas=[];
    var Principals=[];
    var Postres=[];

function agregarIngrediente(nombre) {

    var html = $("#listaIngredientes").html() + 
    `
        <li class="list-group-item">
            <div class="row">
                <div class="col-1 mr-1">
                    <button class="btn btn-danger" id="${nombre}">&times;</button>
                </div>
                <div class="col-9 ml-2">
                    <h4 class="display-4" 
                        style="font-size: .7cm;">${nombre}</h4>
                </div>
            </div>
        </li>
    ` ;
    
    $("#listaIngredientes").html(html);
}

function borrarIngredientes() {
    var html = "";
    $("#listaIngredientes").html(html);
}



function agregarReceta(tipo,receta) {

    if(tipo==="Entrada")
    {
        var htmlE = $("#divEntrada").html() + 
        `
            <div class="card col-12" style="height:250px;">
                <img src="${receta.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${receta.nombre}</h5>
                <button class="btn btn-outline-primary" id="boton+${receta.id}">Mostrar</button>
                </div>
            </div>
        ` ;
        $("#divEntrada").html(htmlE);
    }else
    {    
        if(tipo==="Plato Principal")
        {
            var htmlP = $("#divPrincipal").html() + 
            `
            <div class="card col-12" style="height:250px;">
                <img src="${receta.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${receta.nombre}</h5>
                <button class="btn btn-outline-primary" id="boton+${receta.id}">Mostrar</button>
                </div>
            </div>
            ` ;
            $("#divPrincipal").html(htmlP);
        }else
        {
            if(tipo==="Postre")
            {
                var htmlPos = $("#divPostre").html() + 
                `
                    <div class="card col-12" style="height:250px;">
                        <img src="${receta.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${receta.nombre}</h5>
                        <button class="btn btn-outline-primary" onclick="MostrarReceta(${receta.categoria},${receta.id})" id="boton+${receta.id}">Mostrar</button>
                        </div>
                    </div>
                ` ;
                $("#divPostre").html(htmlPos);
            }
        }
    }

}

function muestraAlerta( mensaje ) {
    $("#alerta").text(mensaje);
    $("#alerta").show(1000);
}

function MostrarReceta(cat,id) {

    console.log("Muestra receta");
    if(cat==="Entrada")
    {
        var receE = Entradas.find( receta  => receta.id === id);

        var htmlE=
        `
        <div class="col align-self-center">
        <div class="card" style="height: 250px; width: 250px;">
            <img src="${receE.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${receE.nombre}</h5>
            </div>
            <ul class="list-group list-group-flush" id="ingredientesReceta">
              <li class="list-group-item">${receE.ingredientes.forEach()}</li>
            </ul>
            <div class="card-body">
              <p id="descripcionReceta">${receE.descripcion}</p>
            </div>
          </div>
      </div>
        ` ;
        $("#receta").html(htmlE);

    }
    if(cat==="Plato Principal")
    {
        var receP = Principals.find( receta  => receta.id === id);

        var htmlP=
        `
        <div class="col align-self-center">
        <div class="card" style="height: 250px; width: 250px;">
            <img src="${receP.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${receP.nombre}</h5>
            </div>
            <ul class="list-group list-group-flush" id="ingredientesReceta">
              <li class="list-group-item">${receP.ingredientes.forEach()}</li>
            </ul>
            <div class="card-body">
              <p id="descripcionReceta">${receP.descripcion}</p>
            </div>
          </div>
      </div>
        ` ;
        $("#receta").html(htmlP);
    }
    if(cat==="Postre")
    {
        var recePos = Postres.find( receta  => receta.id === id);

        var htmlPos=
        `
        <div class="col align-self-center">
        <div class="card" style="height: 250px; width: 250px;">
            <img src="${recePos.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${recePos.nombre}</h5>
            </div>
            <ul class="list-group list-group-flush" id="ingredientesReceta">
              <li class="list-group-item">${recePos.ingredientes.forEach()}</li>
            </ul>
            <div class="card-body">
              <p id="descripcionReceta">${recePos.descripcion}</p>
            </div>
          </div>
      </div>
        ` ;
        $("#receta").html(htmlPos);
    }



   


    $("#Receta").show();
    $("#Menu").hide(0);
}

$(document).ready(function() {
    $("#alerta").hide(0);
    $("#Receta").hide(0);
    
    var ingredientes=[];
    
    
    
    $("#addform #botonadd").click(function() {
        console.log("Agregando ingrediente");
        agregarIngrediente($("#ingredienteNuevo").val());
        ingredientes.push($("#ingredienteNuevo").val());
        $("#ingredienteNuevo").val("");
        console.log(ingredientes);
    });

    
    $("#addform").submit( function(e){
        e.preventDefault();
        
                var nombre          = $("#nombre").val();
                var categoria       = $("#categoria").val();
                var imagen          = $("#imagen").val();
                var ingredientesF    = ingredientes;
                var descripcion     = $("#descripcion").val();
        
        if(nombre.trim() ==="")
        {
            muestraAlerta("La receta debe tener nombre");
            return;
        }
        if(categoria.trim() ==="")
        {
            muestraAlerta("se debe seleccionar una categoria");
            return;
        }
        if(imagen.trim() ==="")
        {
            muestraAlerta("la imagen debe de ser una URL");
            return;
        }
        if(descripcion.trim() ==="")
        {
            muestraAlerta("la descripcion es necesaria");
            return;
        }
        if(ingredientes.length == 0)
        {
            muestraAlerta("debe haber al menos un ingrediente");
            return;
        } 
        
        var receta = {
            nombre,
            categoria,
            imagen,
            ingredientesF,
            descripcion,
            id:Date.now()
        };

        agregarReceta(categoria,receta);
        if(categoria === "Entrada")
        {
            Entradas.push(receta);
        }
        else{
            if(categoria === "Plato Principal")
            {
                Principals.push(receta);
            }   
            else{
                if(categoria === "Postre")
                {
                    Postres.push(receta);
                }
            }
        }

        console.log("agrega receta");
        console.log(Entradas);
        console.log(Principals);
        console.log(Postres);
        $("#nombre").val("");
        $("#categoria").val("");
         $("#imagen").val("");
        ingredientes =[];
        borrarIngredientes();
        $("#descripcion").val("");
        
} );

    
});