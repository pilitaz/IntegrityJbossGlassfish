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
    json = {
        "grilla": {
            "opciones": {
                "selectable": "true",
                "sorteable": "true",
                "editable": "true",
                "scrollable": "true",
                "filterable": "false"
            },
            "columnas": [
                {
                    "idinterno": "0",
                    "titulo": "Documento",
                    "tipo": "number",
                    "field": "numdoc",
                    "editable": "",
                    "requerido": "",
                    "visible": ""
                },
                {
                    "idinterno": "1",
                    "titulo": "Fecha",
                    "tipo": "string",
                    "field": "fecdoc",
                    "editable": "",
                    "requerido": "",
                    "visible": ""
                },
                {
                    "idinterno": "3",
                    "titulo": "Valor cuota",
                    "tipo": "number",
                    "field": "valorcuota",
                    "editable": "",
                    "requerido": "",
                    "visible": ""
                    
                },
                {
                    "idinterno": "2",
                    "titulo": "Descripción",
                    "tipo": "string",
                    "field": "descripcion",
                    "editable": "",
                    "requerido": "",
                    "visible": ""
                }
            ],
            "botones": [
                {
                    "titulo": "Editar",
                    "tipo": "editar",
                    "funcion": editarElemento,
                    "class" : "po_editoff"
                },
                {
                    "titulo": "Eliminar",
                    "tipo": "eliminar",
                    "funcion": borrarElemento,
                    "class" : "po_cerrar"
                },
                {
                    "titulo": "Cambiar estado",
                    "tipo": "cambiarEstado",
                    "funcion": cambiarEstado,
                    "class" : "po_check"
                }
            ]
        }
    };
    
    data = [{
            "numdoc": 1236,
            "fecdoc": "2017-01-01",
            "concepto": 650,
            "descripcion": "PRESTAMO COMPAÑIA",
            "fechavigencia": "2017-01-01",
            "valorcuota": -10000.0,
            "acumulado": 3600000.0,
            "valortope": 0.0,
            "saldo": 0.0,
            "ultimatx": "2017-01-01",
            "apl": 0,
            "Per": "1"
        }, {
            "numdoc": 3659,
            "fecdoc": "2017-02-27",
            "concepto": 652,
            "descripcion": "LIBRANZAS CAFAM",
            "fechavigencia": "2017-03-01",
            "valorcuota": 369000.0,
            "acumulado": 6900000.0,
            "valortope": 0.0,
            "saldo": 0.0,
            "ultimatx": "2017-03-01",
            "apl": 0,
            "Per": "1"
        }];
    grid(json, data); 
    $(window).trigger("resize"); 
});

function editarElemento(e){
    alertDialogs("editarElemento");
}

function borrarElemento(e){
    alertDialogs("borrarElemento");
}

function cambiarEstado(e){
    alertDialogs("cambiarEstado")
}
function grid(json, data){
    var schema = new Object();
    schema.model = new Object();
    
    var columns = new Array();
    var align = "";
    debugger

    var btnUD = new Array();
    var tamañoColumnaBotones = 0
    var posicion;
    for(var i = 0; i<json.grilla.botones.length; i++){        
        btnUD[i] = new Object();
        btnUD[i].name = json.grilla.botones[i].titulo;                
        btnUD[i].click = json.grilla.botones[i].funcion;
//        btnUD[i].template ="<a class='k-grid-editar'><span id = \"spanEdit# #\"  class='k-sprite "+json.grilla.botones[i].class+"' title=\""+json.grilla.botones[i].titulo+"\"></span></a>"
        btnUD[i].template ="<a class='k-grid-"+json.grilla.botones[i].tipo+"'><span class='k-sprite "+json.grilla.botones[i].class+"'></span></a>"
         
        tamañoColumnaBotones = tamañoColumnaBotones+50;
        
    }
    debugger
     btnUD = [
//        {name: "aprobar", text: " ", click: aprobarPresen, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},
        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: editarElemento, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnIzq = {command: btnUD, title: "&nbsp;", width: tamañoColumnaBotones+"px"};
    
    for(var i = 0; i<json.grilla.columnas.length; i++){
        posicion = parseInt(json.grilla.columnas[i].idinterno);
        schema.model[json.grilla.columnas[i].field] = new Object();
        schema.model[json.grilla.columnas[i].field].type = json.grilla.columnas[i].tipo;
        if(json.grilla.columnas[i].tipo==="number"){
            align = "rightAling";
        }else{
            align = "";
        }
        columns[posicion] = new Object();
        columns[posicion].field = json.grilla.columnas[i].field;        
        columns[posicion].title = json.grilla.columnas[i].titulo;
        columns[posicion].template = "<div class='"+align+"'>#= kendo.toString( "+ json.grilla.columnas[i].field+",\"n0\")#</div>";
    }
    columns[json.grilla.columnas.length] = btnIzq;
    
    var grid = $("#grid").kendoGrid({
        editable: json.grilla.opciones.editable,
        sortable: json.grilla.opciones.sortable,
        scrollable: json.grilla.opciones.scrollable,
        selectable: json.grilla.opciones.selectable,
        filterable: json.grilla.opciones.filterable,
        dataSource: {
            data: data,            
            schema: schema,            
        },
        columns: columns,
    });
}