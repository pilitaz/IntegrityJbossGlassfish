                   
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
    var  consultar = new sirSupArea();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_sar";
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
                     //var region = $("#region").data("kendoDropDownList").text();
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=options.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=options.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=cedula;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=options.sar__est;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=options.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=options.ter__raz;
                    return JSON.stringify(actjson);                   
                }
                if (operation === "create") {debugger
                     var cedula = $("#cedula").data("kendoDropDownList").text();
                     //var region = $("#region").data("kendoDropDownList").text();

                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=options.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=cedula;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=options.sar__est;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=options.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=options.ter__raz;
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {debugger
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=options.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=options.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=options.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=options.sar__est;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=options.ageo__cod; 
                    
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
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();
                    }
                }},
            model: {
                id: "sar__cod",
                fields: {
                    sar__cod:    {editable: false, nullable: false},
                    ter__nit:    {editable: true, nullable: false},
                    ageo__cod:    {editable: true, nullable: false},
                    pai__cod:    {editable: true, nullable: false},
                    ter__raz:    {editable: true, nullable: false},
                    sar__est:    {editable: true, nullable: false},         
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
            {field: "sar__cod", title: "Codigo",  hidden:false},
            {field: "pai__cod", title: "Codigo Pais"},  
            {field: "ter__nit", title: "NIT",  hidden:false,editor: filtroestado,
                template: function (e) {debugger
                    return e.ter__nit;
                }},   
             {field: "ter__raz", title: "Nombre",  hidden:false},
             {field: "ageo__cod", title: "Cod Area",  hidden:false},
            {
                field: "sar__est",
                title: "Estado",
                template: "<a class='k-grid-check'><span class='k-sprite po_check_disabled'></span></a>",
                width: "80px"},
            {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "90px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = dataSource.data();
            changImgFunc(results);
        },                                       
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
               
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "sar__cod",  
        dataValueField: "sar__cod",
        placeholder: "Codigo...",  
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.pai__cod + " ---?", "400px", "200px", true, true, actions);

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
        {text: "52960858", valor: "5"},
    ];
    $('<input id="cedula" required name="' + options.field + '"/>') 
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "text",
                dataSource: estados
            });
}                       

                        
 function regionCod(container, options) {

    var estados = [
        {text: "51", valor: "1"},
        {text: "55", valor: "2"},
        {text: "59", valor: "3"},
        

    ];
    $('<input id="region" required name="' + options.field + '"/>'+options.model.rgeo__cod)
            .appendTo(container)
          
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "text",               
                dataSource: estados
            });
               
}      
});
                    
                              
function changImgFunc(results) {debugger

    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod)){
        if(results[i].sar__est==0){                            
     document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod).setAttribute("class", "k-sprite po_check_sup");
     document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod).setAttribute("estado", "on");
        }else
        {}}
}
}          

