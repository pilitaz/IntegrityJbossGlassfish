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
 */ function addRow(){debugger

   //var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;
        $("#textarea").append("<div id='windowform'></div>");
        var myWindow1 = $("#windowform"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowform").empty();
        
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "40%",
            modal: true,
            resizable: true,
            title: "Crear",
            width: "35%",
            content: UrL+"despachos/html/popupFiltros.html",
            actions: [
                "Close"
            ],                               
           close: function () {
            
            $("#textarea").empty();
            this.destroy();}
        }).data("kendoWindow").center().open();    
    
                            
}
function editar_rol(){debugger
                	
                    
    var grid1 = $("#grid").data("kendoGrid");
                        
    //                        var row = grid1.dataItem(grid1.select());
    //                        sessionStorage.setItem("Idrol",row.car__cod);
    //                         sessionStorage.setItem("Rolname",row.car__nom);
    window.location = ("tareas.html");
}
                    

                    
                    


function filtrar(establecimiento,ciudad,region){debugger
        var e=-1;
        grilla(e,establecimiento,ciudad,region);
        cerrar();

    }
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
    
    $("#botton").kendoButton({
        //click: Filtrar
    });
    var data = [
        {text: "Todos", value: "-1", clase: "po_checkCreate"},
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
        
    ];
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        //change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                  '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
         change: function (e) {debugger
         var send = parseInt ($("#fltrEst").data("kendoDropDownList").value() ); 
         grilla(send);
         }
         

    }); 
    
    var windowTemplate = kendo.template($("#windowTemplate").html());
   
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
    //    var gridheigth = $("body").height();
    //    gridheigth = gridheigth*0.008 + gridheigth;
    
    addRow();
    //camion();
	//ruta();
	//transportista();
    //grilla();
    
   

 
 ruta();

});


    function camion(){
       var consultar = new sirCamiones();
       var datajson = consultar.getjson();
       datajson.dsSIRdpc_cam.eeSIRdpc_cam[0].pidcam_cap = parseInt(document.getElementById('pesoTotal').innerHTML);
       //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eedpc_cam";
        $("#Camion")
                .kendoComboBox({
            dataTextField: "cam__des",
            dataValueField: "cam__cod",
            template:'<div class="divElementDropDownList">#: data.cam__des #'+' - '+' #:data.cam__vers #</div>',
            select: function(e) {                
               transportista(e);
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Camiones"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "cam__cod",
                        fields: {
                            cam__cod: {editable: false, nullable: false},
                            cam__des: {editable: false, nullable: false},
                            cam__vers: {editable: false, nullable: false},
                            cam__pla: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });
       }
       function ruta(){debugger
       var consultar = new sirRuta();
        var datajson = consultar.getjson();
       //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].piirgeo__cod = parseInt($("#Region").data("kendoDropDownList")._old);
       //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eedpc_rut";
        $("#Ruta")
                .kendoComboBox({
            dataTextField: "rut__des",
            dataValueField: "rut__cod",
            template:'<div class="divElementDropDownList">Desde:#: data.bar__dsc1 #'+' Hasta: '+' #:data.bar__dsc2 #</div>',
            select: function(e) {                
              
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Rutas"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "rut__cod",
                        fields: {
                            rut__cod: {editable: false, nullable: false},
                            rut__des: {editable: false, nullable: false},
                            bar__dsc1: {editable: false, nullable: false},
                            bar__dsc2: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });
       }
        function transportista(e){debugger

       var consultar = new sirTransportista();
        var datajson = consultar.getjson();
       datajson.dsSIRdpc_tra.eeSIRdpc_tra[0].piicam_cod = parseInt(e.dataItem.cam__cod);
       //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eedpc_tra";
        $("#Transportista")
                .kendoComboBox({
            dataTextField: "ter__raz",
            dataValueField: "ter__nit",
            template:'<div class="divElementDropDownList">#: data.ter__raz #'+' - '+' #:data.cam__des #</div>',
            select: function(e) {                
              
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Transportista"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ter__nit",
                        fields: {
                            ter__nit: {editable: false, nullable: false},
                            ter__raz: {editable: false, nullable: false},
                            rut__des: {editable: false, nullable: false},
                            cam__des: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });
       }
    


function grilla(e,establecimiento,ciudad,region){debugger
    var  consultar = new Sirdespacho();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
    //datajson.dsSIRgpd_sre.SIRgpd_sre[0].picsre__est = e;                
    var  actualizar = new sirDespacho();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_ped_det";
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
                    var cedula = $("#cedula")[0].value;
                    var nombre = $("#nombre")[0].value;
                    var region = $("#region").data("kendoDropDownList");
                    var select = region.selectedIndex;
                    region = region.dataSource._data[select].rgeo__cod;
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=region;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=options.sre__est; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=cedula; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__nom=options.rgeo__nom; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__raz=nombre; 
                    return JSON.stringify(actjson);
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();

                }
                if (operation === "create") {debugger
                    var cedula = $("#cedula")[0].value;
                    var nombre = $("#nombre")[0].value;
                    var region = $("#region").data("kendoDropDownList");
                    var select = region.selectedIndex;
                    region = region.dataSource._data[select].rgeo__cod;
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__raz=nombre;
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__nom=options.rgeo__nom;
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=region;
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=0; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=99; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=cedula; 
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {debugger 
                    var x=0;
                    if (options.sre__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=options.rgeo__cod;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=x; 
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
                id: "ped__num",
                fields: {
                    ped__fec:    {editable: true, nullable: false},
                    suc__cod:    {editable: true, nullable: false},
                    clc__cod:    {editable: false, nullable: false},  
                    cla__cod:    {editable: true, nullable: false},  
                    art__cod:    {editable: true, nullable: false}, 
                    ped__can__k:    {editable: false, nullable: false},  
                    art__des:    {editable: true, nullable: false},  
                    ped__pend:    {editable: true, nullable: false},
                    ped__num:    {editable: true, nullable: false},
                }
            }
        }
    });
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
            
            {field: "ped__num", title: "# Pedido",  hidden:false},
            {field: "art__des", title: "Producto",  hidden:false},
             {field: "ped__pend", title: "Cantidad",  hidden:false},
              {field: "ped__can__k", title: "Peso",  hidden:false, footerTemplate: conditionalSum},
            {command: [
                    {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff' ></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
        editable: "popup",
//         edit: function(e) {debugger
//            if (!e.model.isNew()) {//caso en el que el popup es editar
//                if(e.model.sre__est!= 99 ){
//                    
//                    
//                   kendo.ui.progress($('.k-edit-form-container'), true);
//                   kendo.ui.progress($('.k-edit-buttons'), true);
//                   e.container.find(".k-loading-image").css("background-image", "url('')");
//
//            }else{
//                $("#region").data("kendoDropDownList").enable(false);
//            //e.container.find("span")[1].attr('disabled','disabled');
//            //e.container.find("span[for='rgeo__nom']");
//            
//            }
//            }
//            else{//caso en el que el popup es crear 
//               var buscarlabel = $("label").find("for");
//                Buscarlabel = buscarlabel.prevObject[0];
//                Buscarlabel.style.display = "none";
//            }
//        } ,
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function (e) {
            camion();
            //var results = dataSource.data();
            //changImgFunc(results,e);
        },                    
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
}

function clickEliminar(e) {debugger
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
         if (dataItem.sre__est!= 99){
             alertDialogs("No se puede eliminar por el estado ");  
         }else{
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.sre__cod + " ---?", "400px", "200px", true, true, actions);
         }
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
       
}
         
    
 

    function changImgFunc(results , e) {debugger
     
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod)){
                if(results[i].sre__est==0){                            
                    document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].sre__est==99){     
                    document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].sre__est==1){     
                    document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }

    } 

function changeEst(e){debugger
    var  actualizar = new cudSuperregion();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
           
            
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {debugger
            if(seleccion.sre__est==0){  
                actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=seleccion.rgeo__cod;  
                actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=seleccion.sre__cod;                     
                actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=seleccion.ter__nit; 
                actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=1; 
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {debugger
                        if((resp.dsSICUDgpd_sre.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sre.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.sre__est==99){  
                actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=seleccion.rgeo__cod;  
                actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=seleccion.sre__cod;                     
                actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=seleccion.ter__nit; 
                actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=0;  
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {debugger
                        if((resp.dsSICUDgpd_sre.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sre.eeEstados[0].Estado);  
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
        actions[1].action = function () {debugger
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.sre__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {debugger
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
}             
       function cerrar(){debugger
    //onClosex();
    $("#windowform").data("kendoWindow").close();
  
    
}     

function conditionalSum() {
            var data = dataSource.data();
            var item, sum = 0;
            for (var idx = 0; idx < data.length; idx++) {debugger
              item = data[idx];
              if (item.art__des ) {
                sum += item.ped__can__k;
              } 
            }
           document.getElementById('pesoTotal').innerHTML = sum;
           return "";
          }                