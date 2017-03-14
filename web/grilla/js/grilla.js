/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);                        
    $('#divPDF').height(viewportHeight - 100);
});

$(document).ready(function() {    
    json = {
        "grilla": [
            {
                "titulo": "Documento",
                "tipo": "number",
                "field": "numdoc",
                "format": "",
                "class": ""
            },
            {
                "titulo": "Fecha",
                "tipo": "string",
                "field": "fecdoc",
                "format": "",
                "class": ""
            },
            {
                "titulo": "Valor cuota",
                "tipo": "string",
                "field": "valorcuota",
                "format": "c0",
                "class": "ra"
            }
        ]
    };
    
    data = [{
            "numdoc": 1236,
            "fecdoc": "2017-01-01",
            "concepto": 650,
            "descripcion": "PRESTAMO COMPAÑIA",
            "fechavigencia": "2017-01-01",
            "valorcuota": 10000.0,
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


function grid(json, data){
    var schema = new Object();
    schema.model = new Object();
    
    var columns = new Array();
    
    debugger
    
    for(var i = 0; i<json.grilla.length; i++){
        schema.model[json.grilla[i].field] = new Object();
        schema.model[json.grilla[i].field].type = json.grilla[i].tipo;
        
        columns[i] = new Object();
        columns[i].field = json.grilla[i].field;        
        columns[i].title = json.grilla[i].titulo;
        columns[i].template = "<div class='"+json.grilla[i].class+"'>#= kendo.toString( "+ json.grilla[i].field+",\""+json.grilla[i].format+"\")#</div>";
    }

    var grid = $("#grid").kendoGrid({
        editable: false,
        sortable: false,
        scrollable: false,
        selectable: false,
        dataSource: {
            data: data,            
            schema: schema,            
        },
        columns: columns,
    });
}