                   
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
 */ function newrol(){
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;
                            
    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "popup";
                            
}
function editar_rol(){
                	
                    
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
    var  consultar = new sirSupTerritorio();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudTerritorios();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_str";
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
                if (operation === "read") {
                    return JSON.stringify(datajson);
                }
                if (operation === "update") {
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
                if (operation === "create") {
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
                if (operation === "destroy") {
                         
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
            data: function (e) {
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
                id: "str__cod",
                fields: {
                    ter__nit:    {editable: true, nullable: false},
                    ter__raz:    {editable: true, nullable: false},
                    str__est:    {editable: true, nullable: false}, 
                    str__cod:    {editable: true, nullable: false}, 
                    trr__nom:    {editable: true, nullable: false}, 
                    str__rec:    {editable: true, nullable: false,type: "boolean"},  
                    str__vta:    {editable: true, nullable: false,type: "boolean"},   
                    trr__cod:    {editable: true, nullable: false}, 
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
            {field: "str__cod", title: "Cod Supervisor",  hidden:false},
            {field: "ter__nit", title: "Nit",  hidden:false,editor: filtroestado,
                template: function (e) {
                    return e.ter__nit;
                }},   
            {field: "ter__raz", title: "Nombre",  hidden:false},
            {field: "trr__cod", title: "Cod Territorio",  hidden:false}, 
            {field: "trr__nom", title: "Territorio",  hidden:false, width: "160px"}, 
            {field: "str__vta", title: "Cod Territorio",  hidden:false}, 
            {field: "trr__cod", title: "Cod Territorio",  hidden:false}, 
            {command: [
                     {name: "check", text: "edit",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_checkCreate'></span></a>"},
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
             editable: "popup",
                edit: function(e) {
            if (!e.model.isNew()) {//caso en el que el popup es editar

                e.container.find("input[name=ter__raz]")[0].readOnly="true"
            }
            else{//caso en el que el popup es crear
                var buscarlabel = $("label").find("for");
                  Buscarlabel = buscarlabel.prevObject[3];
                  Buscarlabel.style.display = "none";
                  Buscarlabel = buscarlabel.prevObject[0];
                  Buscarlabel.style.display = "none";
                  e.container.find("input[name=ter__raz]")[0].style.display="none";
//                Buscarlabel = buscarlabel.prevObject[3];
//                Buscarlabel.style.display = "none";
                //e.container.find("label[name=sre__cod]")[0].display="none";
            }
        } ,
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
        dataTextField: "ter__nit",  
        dataValueField: "ter__nit",
        placeholder: "Cedula...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });

     function clickEliminar(e) {
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.ter__nit + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}                   
                        
 function filtroestado(container, options) {

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
                    
                    
 function changImgFunc(results , e) {
     //for para colorear los chek de estado
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod)){
                if(results[i].str__est===0){                            
                    document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].str__est===99){     
                    document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].str__est===1){     
                    document.getElementById("spanproceso"+results[i].sar__cod+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }
        // for para colorear chulo de ventas
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanvta"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod)){
                if(results[i].str__vta===true){                            
                    document.getElementById("spanvta"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_check");   
                    
                }else{
                    
                }
            }
        }
        // for para colorear chulo de recaudo
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanrec"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod)){
                if(results[i].str__rec===true){                            
                    document.getElementById("spanrec"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_check");   
                   
                }else{
                  
                }

            }
        }

    } 
    function changeEst(e){
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
   
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.sar__est==0){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=1;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.sar__est==99){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=0;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
                        }
                    } 
        
                });
            }
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de cambiar el estado de Registro ---" + seleccion.sar__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
} 
    function ventas(e){
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
   
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.sar__est==0){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=1;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.sar__est==99){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=0;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
                        }
                    } 
        
                });
            }
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de cambiar el estado de Registro ---" + seleccion.sar__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
} 
    function recaudo(e){
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
   
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.sar__est==0){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=1;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.sar__est==99){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=0;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
                        }
                    } 
        
                });
            }
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de cambiar el estado de Registro ---" + seleccion.sar__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
} 