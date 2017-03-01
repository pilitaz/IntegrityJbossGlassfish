                   
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);                       
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
                    
 function detalle(e){debugger
       e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
                        var id = this.dataItem($(e.currentTarget).closest("tr")).ter__nit;
//                      
                        sessionStorage.setItem("Nit_Tercero",(id));
                        window.location = ("proveedores.html");
   }
             function detalle1(e){debugger
    
                        sessionStorage.setItem("Nit_Tercero","Nuevo");
                        window.location = ("proveedores.html");
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
         change: function (e) {
         var send = parseInt ($("#fltrEst").data("kendoDropDownList").value() ); 
         grilla(send);
         }
         

    }); 
    
    var windowTemplate = kendo.template($("#windowTemplate").html());
        var window = $("#window1").kendoWindow({
        title: "Eliminar",
        visible: false, //the window will not appear before its .open method is called

    }).data("kendoWindow");
    
        function grilla(e){debugger
        var  consultar = new sirProveedor();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
//        datajson.dsSIRgpd_pri.SIRgpd_pri[0].piictr__est=e;           
        var  actualizar = new sirProveedor();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();

        var mapCud = "eecon_prv";

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
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=options.pri__cod;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].ctr__est=options.ctr__est;                       
                        return JSON.stringify(actjson);


                    }
                    if (operation === "create") {

                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des; 
                        actjson.dsSICUDgpd_pri.eegpd_pri[0].piictr__est=99; 
                        return JSON.stringify(actjson);          
//                        $('#grid').data('kendoGrid').refresh();
//                        $('#grid').data('kendoGrid').dataSource.read();
//                        $('#grid').data('kendoGrid').refresh();                                     
                    }
                    if (operation === "destroy") {

                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=options.pri__cod;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des;  

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
                    }else{
                        alertDialogs("Error "+e._errors["0"]._errorMsg)
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        ter__nit:    {editable: false, nullable: false},
                        ter__raz:    {editable: true, nullable: false},          
                    }
                }
            },
            error: function (e) {
                   
                alertDialogs(e.errorThrown);
            }
        });

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
    //    gridheigth = gridheigth*0.12 + gridheigth;
        var grid1 = $("#grid").kendoGrid({
            dataSource: dataSource, 
            columns: [
                {field: "ter__nit", title: "Nit",  hidden:false,  width: "150px"},  
                {field: "ter__raz", title: "Razon Social",  hidden:false},
                {command: [
                        {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                        {name: "editar", text: "edit", click: detalle, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff' ></span></a>"},
                      
                    ], 
                    width: "100px"}
                ],
            editable: "popup",
            edit: function(e) {
                if (!e.model.isNew()) {//caso en el que el popup es editar
                        if(e.model.ctr__est!= 99 ){
                            kendo.ui.progress($('.k-edit-form-container'), true);
                            kendo.ui.progress($('.k-edit-buttons'), true);
                            e.container.find(".k-loading-image").css("background-image", "url('')");

                        }else{

                        }
                    }
                else{//caso en el que el popup es crear 

                }
            } ,
            rowTemplate: kendo.template($("#rowTemplateCmp").html()),
            altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
             dataBound: function (e) {
                var results = dataSource.data();
                changImgFunc(results,e);
            },                                                           
            cancel: function(e) {                                                                                   
                e._defaultPrevented= true;
                $('#grid').data('kendoGrid').refresh();                                             
                $('#grid').data('kendoGrid').dataSource.read();
                $('#grid').data('kendoGrid').refresh();                                                                                        
            } 
        });
        $(window).trigger("resize"); 
    }
    grilla(-1);
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "pri__des",  
        dataValueField: "pri__des",
        placeholder: "Prioridad...",  
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.pri__des + " ---?", "400px", "200px", true, true, actions);

        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    }
});
 
function changImgFunc(results) {

        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].pri__cod+results[i].pri__des)){
                if(results[i].ctr__est==0){                            
                    document.getElementById("spanproceso"+results[i].pri__cod+results[i].pri__des).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].ctr__est==99){     
                    document.getElementById("spanproceso"+results[i].pri__cod+results[i].pri__des).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].ctr__est==1){     
                    document.getElementById("spanproceso"+results[i].pri__cod+results[i].pri__des).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }
 }
                    

function changeEst(e){
    var  actualizar = new cudPrioridades();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
           
            
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.ctr__est==0){  
                actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=seleccion.pri__cod;  
                actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=seleccion.pri__des;                     
                actjson.dsSICUDgpd_pri.eegpd_pri[0].ctr__est=1; 
                
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_pri.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_pri.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.ctr__est==99){  
                actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=seleccion.pri__cod;  
                actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=seleccion.pri__des;                     
                actjson.dsSICUDgpd_pri.eegpd_pri[0].ctr__est=0;  
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_pri.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_pri.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.pri__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
}             