/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);                            
});

$(document).ready(function() { 
    document.getElementById('lbfuncion').innerHTML = sessionStorage.getItem("ncf");
    /**
     * aqui debe ir el servicio que me trae los datos
     */
    var objData = new sirData();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir()
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            data = e[key1][mapData];
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        } 
    });    

    var obj = new dsSIRinitial();    
    var jsonSIR = obj.getjson();
    var url = obj.getUrlSir();
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIR),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
      
        if ((e[key1].eeEstados[0].Estado === "OK")) {
            sessionStorage.setItem("dsSIRinitial", JSON.stringify(e))
            for(var i=0; i< e[key1].eeforms.length; i++){
                if(e[key1].eeforms[i].forms_nom === "grilla"){                    
                    grid(e[key1].eeforms[i], data); 
                }
            }
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        } 
    });    
});

function actualizarElemento(e){
    alertDialogs("actualizarElemento");
}

function crearElemento(){
    
}

function editarElemento(e){
     
    e.preventDefault();
    
    var grid = $("#grid").data("kendoGrid");
    var item = grid.dataItem(grid.select());
    var esCabeceraDetalle = true;
    if(esCabeceraDetalle){
        debugger
        document.getElementById('divGrillaPrincipal').style.display = 'none';
        document.getElementById('divCabeceraDetalle').style.display = 'block'; 
        document.getElementById('lbCabecera').innerHTML = "Usuario";
        crearTabla("customPopUp", "divCabecera", "label");
        cargarDatos(item, "label");
    }else{
        document.getElementById('lbAccion').innerHTML = "Editar";
        abrirCustomPopUp("customPopUp"); 
        
        $("#buttonCab")["0"].childNodes["0"].data= "Actualizar";
        cargarDatos(item, "input");
    }
    
}

function volver(){
    document.getElementById('divGrillaPrincipal').style.display = 'block';
    document.getElementById('divCabeceraDetalle').style.display = 'none'; 
}

function borrarElemento(e){
    alertDialogs("borrarElemento");
}

function cambiarEstado(e){
    alertDialogs("cambiarEstado");
}
function grid(json, data){
    
    var editable = false;
    if(json.forms_editable===true){
        editable = "popup";
    }
    
    var schema = new Object();
    schema.model = new Object();
    
    var columns = new Array();
    var align = "";
    var template = ""
    
    var btnUD = new Array();
    var tamañoColumnaBotones = 0;
    var posicion;
    
    for(var i = 0; i<json.eebuttons.length; i++){
        posicion = parseInt(json.eebuttons[i].idinterno);
        btnUD[posicion] = new Object();
        btnUD[posicion].name = json.eebuttons[i].nombre;                
        btnUD[posicion].click = eval(json.eebuttons[i].funcion);
        btnUD[posicion].template ="<a class='k-grid-"+json.eebuttons[i].nombre+"'><span class='k-sprite "+json.eebuttons[i].icono+"' title=\""+json.eebuttons[i].titulo+"\"></span></a>"         
        tamañoColumnaBotones = tamañoColumnaBotones+50;        
    }
    
    var btnIzq = {command: btnUD, title: "&nbsp;", width: tamañoColumnaBotones+"px"};
    
    for(var i = 0; i<json.eecolumns.length; i++){
        posicion = parseInt(json.eecolumns[i].idinterno);
        schema.model[json.eecolumns[i].cmp_nom2] = new Object();
        schema.model[json.eecolumns[i].cmp_nom2].type = json.eecolumns[i].tipo;
        schema.model[json.eecolumns[i].cmp_nom2].editable = json.eecolumns[i].cmp_edi;
        if(json.eecolumns[i].tipo==="number"){
            align = "rightAling";
            template = "<div class='"+align+"'>#= kendo.toString( "+ json.eecolumns[i].cmp_nom2+",\"n0\")#</div>";
            
        }else{
            align = "";
            template = "<div class='"+align+"'>#=" + json.eecolumns[i].cmp_nom2+ "#</div>";
        }
        columns[posicion] = new Object();
        columns[posicion].field = json.eecolumns[i].cmp_nom2;        
        columns[posicion].title = json.eecolumns[i].cmp_dsc;
        //columns[posicion].hidden = json.eecolumns[i].cmp_vis;
        columns[posicion].template = template;
    }
    columns[json.eecolumns.length] = btnIzq;
        
    var grid = $("#grid").kendoGrid({
        editable: editable,
        sortable: json.forms_sorteable,
        scrollable: json.forms_scrollable,
        selectable: json.forms_selectable,
        filterable: json.forms_filterable,
        dataSource: {
            data: data,            
            schema: schema,            
        },
        columns: columns,
    });
    $(window).trigger("resize");
}

function mostrarCustomPopUp(idcustomPopUp) {
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUp(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow", function(){
        var tabla = document.getElementById("tablaPopUp"); 
        tabla.parentNode.removeChild(tabla);
        if(document.getElementById('lbAccion')){
            document.getElementById('lbAccion').innerHTML = "Crear";
        }
    });
    $("#disable" ).remove();
}

function abrirCustomPopUp(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
    
    mostrarCustomPopUp(idCustomPopUp);
    crearTabla(idCustomPopUp, idCustomPopUp, "input");   
}

/**
 * 
 * @param {type} idCustomPopUp
 * @param {type} divBody
 * @param {type} elementoHtml
 * @returns {undefined}
 */
function crearTabla(idCustomPopUp, divBody, elementoHtml) { 
    var body;
    body = document.getElementById(divBody); 
//    if(idCustomPopUp==="customPopUp"){
//        body = document.getElementById("popupCampos");            
//    }else if(idCustomPopUp==="customPopUpBusqueda"){
//        body = document.getElementById("popupCamposBusqueda");            
//    }else{
//        body = document.getElementById(divBody);            
//    }
//    else if(){
//        
//    }
    
    var json = JSON.parse(sessionStorage.getItem("dsSIRinitial"));    
    var campos;
    var numcolumnas = 0; /*Cada columna es una pareja de label e input*/
    var numfilas=0;
    var tamColLabel = 0;
    var tamColInput = 0;
    
    for(var i=0; i< json.dsSIRinitial.eeforms.length; i++){
        if(json.dsSIRinitial.eeforms[i].forms_nom ===  idCustomPopUp){             
            campos = json.dsSIRinitial.eeforms[i]; 
            if(campos.eecolumns.length>10){
                numcolumnas=2;
                numfilas = parseInt(campos.eecolumns.length/2) + campos.eecolumns.length%2
                tamColLabel = 15;
                tamColInput = 35;
            }else{
                numcolumnas=1;               
                numfilas = campos.eecolumns.length; 
                tamColLabel = 30;
                tamColInput = 70;
            }
        }
    }
    
    
    if(idCustomPopUp==="customPopUp"){
       document.getElementById('tituloPopUp').innerHTML = campos.forms_nom;
        $("#buttonCab")["0"].childNodes["0"].data= campos.eebuttons[0].titulo;
        $("#buttonCab").kendoButton({
            click: eval(campos.eebuttons[0].funcion)
        }); 
    }else if(idCustomPopUp==="customPopUpBusqueda"){
        $("#btBuscar").kendoButton({
            click: eval(campos.eebuttons[0].funcion)
        });
    }
    
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    tabla.setAttribute("id", "tablaPopUp");
    tabla.setAttribute("style", "width: 100%; padding-top: 20px;");
    var tblBody = document.createElement("tbody");
    var muncampo = 0;
    
    // Crea las celdas
    for (var i = 0; i < numfilas; i++) {
        // Crea las hileras de la tabla        
        var hilera = document.createElement("tr");
        
        for (var j = 0; j < numcolumnas; j++) {            
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            celda.setAttribute("style", "text-align: right; with:"+tamColLabel+"%;");
            var label = document.createElement("label"); 
            label.setAttribute("class", "letraParrafo");
            label.setAttribute("id", "lb"+campos.eecolumns[muncampo].cmp_nom2);
            label.innerHTML = campos.eecolumns[muncampo].cmp_dsc;
            celda.appendChild(label);
            hilera.appendChild(celda);
            
            var celdaInput = document.createElement("td");
            celdaInput.setAttribute("style", "text-align: left; with:"+tamColInput+"%");            
            var input = document.createElement(elementoHtml);
            if(elementoHtml === "input"){
                input.setAttribute("class", "k-textbox");   
            }else if(elementoHtml === "label"){
                
            }            
            input.setAttribute("id", campos.eecolumns[muncampo].cmp_nom2);
            input.setAttribute("style", "width: 90%");
            input.setAttribute("name", elementoHtml+"TD");
            celdaInput.appendChild(input);
            hilera.appendChild(celdaInput);
            muncampo = muncampo+1;
            if(muncampo === campos.eecolumns.length){
                j=numcolumnas;
            }
        }
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }    
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";    
}

function buscarElementos(){
    alertDialogs("buscarElementos");
}

function cargarDatos(item, etiquetahtml){
    debugger
    var inputs = document.getElementsByName(etiquetahtml+"TD");       
    
    if(etiquetahtml==="input"){
        for(var i=0; i< inputs.length ; i++){
            $("#"+inputs[i].id).val(item[inputs[i].id]);
        }    
    }else if (etiquetahtml==="label"){
        for(var i=0; i< inputs.length ; i++){
            document.getElementById(inputs[i].id).innerHTML = item[inputs[i].id];
        }        
    }
    
}