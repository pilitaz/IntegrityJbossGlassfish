                   
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
                        
});
                    
                    
/**
 * FUNCION crear usuario nuevo
 * grid1 variable almacena data de grid
 *  
 *   
 *  
 *  
 */ function newrol(){debugger
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;
                            
    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "popup";
                            
}
function editar_rol(){debugger
                	
                    
    var grid1 = $("#grid").data("kendoGrid");
                        
    //                        var row = grid1.dataItem(grid1.select());
    //                        sessionStorage.setItem("Idrol",row.car__cod);
    //                         sessionStorage.setItem("Rolname",row.car__nom);
    window.location = ("tareas.html");
}
                    

                    
                    
$(document).ready(function() {
                                            
                    
    $("#toolbar").kendoToolBar({
        items: [
                                
                                
            { template: "<label>Buscar:</label>" },
            {
                template: "<input id='filtro' style='width: auto;'/>",
                overflow: "always"
            }
                                
        ]
    });
                        
                        
});

/**
 * FUNCION CRUD
 *  VAR mapCud =  variable gestion de funcion squema 
 *  VAR key1 = variable gestion de estado de respuesta de servicio 
 *  var cclave1 y  var cclave1 almacenan valor de campos contraseña y validacion de contgraseña
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  var  actualizar obtiene funcion create / update
 *  var  actjson : json para enviar al servicio de actualizar / crear
 *  var urlactualizar: url de servicio para actualizar / crear 
 *  
 */ 
$(document).ready(function () {                             
    var windowTemplate = kendo.template($("#windowTemplate").html());
    var  consultar = new sirAnulaPedido();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudTerritorios();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_anu";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: urlactualizar,
                dataType: "json",
                type: "PUT",
                contentType: "application/json; charset=utf-8"
            },
                                
            create: { 
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            destroy: {
                url: urlactualizar,
                dataType: "json",
                type: "DELETE",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {debugger
                    return JSON.stringify(datajson);
                }
                if (operation === "update") {debugger
                    var cedula = $("#cedula").data("kendoDropDownList").text();
                     var region = $("#region").data("kendoDropDownList").text();
                     var x=0;
                    if (options.sre__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=region;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=x; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=cedula; 
                    return JSON.stringify(actjson);
                                        
                                        
                }
                if (operation === "create") {debugger
                     var cedula = $("#cedula").data("kendoDropDownList").text();
                     var region = $("#region").data("kendoDropDownList").text();
                     var x=0;
                    if (options.sre__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=region;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=x; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=cedula; 
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {debugger
                         
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=options.rgeo__cod;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=options.sre__est; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=options.ter__nit; 
                    
                    return JSON.stringify(actjson);
                                        
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                           
                }
                                    
            }
                                
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {debugger
                var key1 = Object.keys(e)[0];
                if(e[key1].eeEstados){
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud];
                    }else
                    {
                    alertDialogs("Error"+e[key1].eeEstados[0].Estado);    
                    }
                }},
            model: {
                id: "anu__cod",
                fields: {
                    anu__cod:    {editable: true, nullable: false},
                    anu__des:    {editable: true, nullable: false},          
                }
            }
        }
    });
    var window = $("#window1").kendoWindow({
        title: "Eliminar",
        visible: false, //the window will not appear before its .open method is called

    }).data("kendoWindow");
    /**
     *  FUNCION CREAR GRILLA
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
                       
     *  
     *  
     */
    var gridheigth = $("body").height();
    gridheigth = gridheigth*0.12 + gridheigth;
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
                            
        height: gridheigth,
        sortable: true,
                           
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        //navigatable: true,
        columns: [ 
            {field: "anu__cod", title: "Cod Anulacion",  hidden:false},  
            {field: "anu__des", title: "Descripcion Anulacion",  hidden:false},
            {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "90px"}],
        editable: "popup",
                            
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
               
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "ter__nit",  
        dataValueField: "ter__nit",
        placeholder: "Cedula...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });

     function clickEliminar(e) {debugger
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.anu__des + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}                   
                        
 function filtroestado(container, options) {debugger

    var estados = [
        {text: "1010161021", valor: "1"},
        {text: "1032381122", valor: "2"},
        {text: "79563068", valor: "3"},
        {text: "77189658", valor: "4"},
        {text: "444444221", valor: "5"},
        {text: "52960858", valor: "6"},
        {text: "52185067", valor: "7"}  
    ];
    $('<input id="cedula" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "valor",
                dataSource: estados
            });
}                       

                        
 function regionCod(container, options) {

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},

    ];
    $('<input id="region" required name="' + options.field + '"/>'+options.model.rgeo__cod)
            .appendTo(container)
          
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "valor",               
                dataSource: estados
            });
               
}      
});
                    
                    

