                    
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
                        
    var consultar = new sirusuariobpm();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eeeebpm_proc";
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },         
            parameterMap: function (options, operation) {
                if (operation === "read") {debugger
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].piccia__nit=sessionStorage.getItem("companyNIT");
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].picusuario=sessionStorage.getItem("usuario");
                    return JSON.stringify(datajson);
                }
            }
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    proc__des:     {editable: false, nullable: false},
                    piidreg:       {editable: false, nullable: false}
                }
            }
        }
    });
    var name = sessionStorage.getItem("usuario");
    document.getElementById("demo").innerHTML = "Tareas de " +  name;
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
    var grid1 = $("#grid").kendoGrid({
        dataSource: datasource,
                            
                            
        selectable: true,
                            
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "play", text: " ",  template: "<a class='k-grid-bullet'><span class='k-sprite pro_bullet1 '></span></a>",width: "50px"},
                           
            { field: "proc__name", title: "Procesos",  hidden:false},
            {command:
                        [
                    {name: "tareas", text: " ", click: grilla, template: "<a class='k-grid-tareas'><span class='k-sprite pro_groupoff'></span></a>"},
                    {name: "editar", text: " ",  click: grafica, template: "<a class='k-grid-editar'><span class='k-sprite pro_graphoff '></span></a>"},
                    {name: "info", text: " ",  template: "<a class='k-grid-info'><span class='k-sprite pro_infooff'></span></a>"},
                    {name: "play", text: " ",  template: "<a class='k-grid-play'><span class='k-sprite pro_playoff '></span></a>"},
                           
                ],
                width: "180px"}],                            
        editable: "popup",
                            
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = datasource.data();
            changImgFunc(results);
        },
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });

                        
    var consultar = new usrtask();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eebpm_task";
    var datasourcex = new kendo.data.DataSource({
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
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud1];
                } else {
                    // alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "task__id",
                fields: {
                    task__name:    {editable: false, nullable: false},
                    proc__name:     {editable: false, nullable: false},
                    task__ddt:       {editable: false, nullable: false},
                    task__tst:       {editable: false, nullable: false},
                    task__id:       {editable: false, nullable: false},
                    task__dpr:       {editable: false, nullable: false}
                }
            }
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
    var grid1 = $("#grid1").kendoGrid({
        dataSource: datasourcex,
                            
                            
        selectable: true,
                            
        //navigatable: true,
        columns: [
                                
            {field: "task__name", title: "Tareas",  hidden:false},
            {field: "inst__name", title: "Proceso",  hidden:false},
            {field: "task__ddt", title: "Fecha de Inicio",  hidden:false},
            {field: "task__tst", title: "Fecha de Terminacion",  hidden:false},
            {field: "task__dpr", title: "Creado por",  hidden:false},
                                
            {command:
                        [
                           
                           
                    {name: "destroy", template: "<a class='k-grid-delete' href='' style='min-width:16px;'><span class='k-sprite re_cerrar'></span></a>"}
                ],
                width: "50px"}]    ,                            
        //editable: "popup",
                            
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
                        
    $('#grid').hover(function() {
        $(this).css('background-color', 'Transparent');
        $(this).contents('tr').css({'border': '1px solid red', 'border-left': 'none', 'border-right': 'none'});
        $(this).contents('tr:first').css('border-left', '1px solid red');
        $(this).contents('tr:last').css('border-right', '1px solid red');
    },
    function() {
        $(this).css('background-color', 'Transparent');
        $(this).contents('tr').css('border', 'none');
    });

    // $("#grid").hover(
    //
    //      function() {
    // 
    //          $(this).css({ "border": "Solid Brown 1px" });
    //            $(this).css({ "border": "Solid Brown 1px" });
    //      },
    //
    // function() {
    //           $(this).css({ "border": "" });
    //
    //      });
    //-------------------------------------------------
        
    $("#filtro_p").kendoComboBox({
        dataTextField: "inst__name",
        dataValueField: "inst__name",
        placeholder: "Proceso ...",
        dataSource: datasourcex,
        change: function () {
            var value = this.value();
            if (value) {
                grid1.data("kendoGrid").dataSource.filter({field: "inst__name", operator: "eq", value: value});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        },
    });
    //--------------------------------
    $("#filtro_f").kendoComboBox({
        dataTextField: "task__ddt",
        dataValueField: "task__ddt",
        placeholder: "Fecha...",
        dataSource: datasourcex,
        change: function () {
            var value = this.value();
            if (value) {
                grid1.data("kendoGrid").dataSource.filter({field: "task__ddt", operator: "eq", value: value});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        },
    });
    //--------------------------------------
    $("#filtro_t").kendoComboBox({
        dataTextField: "task__dpr",
        dataValueField: "task__dpr",
        placeholder: "Creador...",
        dataSource: datasourcex,
        change: function () {
            var value = this.value();
            if (value) {
                grid1.data("kendoGrid").dataSource.filter({field: "task__dpr", operator: "eq", value: value});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        },
    });
                      
                    
                        
                        
});
                    
       
function grafica(e){
                    
    var myWindow1 = $("#textarea"),undo = $("#undo");
                
    function onClose() {debugger
        undo.fadeIn();
        $("#textarea").empty();
        
    }
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "70%",
        modal: true,
        resizable: false,
        title: "Grafica",
        width: "70%",
        content: UrL+"procesos/html/popUpGrafica.html",
        actions: [
            "Close"
        ],                               
        close: onClose
    }).data("kendoWindow").center().open();                 
}
    

                    
function grilla(e){debugger
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var id = this.dataItem($(e.currentTarget).closest("tr")).proc__name;
    sessionStorage.setItem("Proc_usuar",id);
                        
                        
    $("#grillapopUp").append("<div id='windowg'></div>");
                        
    var myWindow2 = $("#windowg"),undo = $("#undo");
                
    function onClose1() {debugger
            
        $("#grillapopUp").empty();
    }  
        
      
    var UrL= sessionStorage.getItem("url");
    myWindow2.kendoWindow({
        draggable: true,
        height: "90%",
        modal: true,
        resizable: false,
        title: "Tareas",
        width: "90%",
        content: UrL+"procesos/html/popUpGrilla.html",
        deactivate: function() {
            this.destroy();                                           
        },
        actions: [
            "Close"
        ],                               
        close: onClose1
    }).data("kendoWindow").center().open();   
                            
                      
}       
function disable(){}
function changImgFunc(results) {debugger
       
        

       
    for (var i = 0; i < results.length; i++) {
          
        if(results[i].adm===true){
                            
              
            // $("#"+"span"+results[i].proc__name).setAttribute('display','none'); 
            //                            .addClass('k-sprite admin_pron');
            
        }else
        {
            var x = document.createElement("SPAN");
            x.setAttribute("class", "k-sprite transparente");
            x.setAttribute("id","x"+results[i].proc__name );
                             
            //document.getElementById("spantarea"+results[i].proc__name).style.display = 'none';
            //document.getElementById("spanedit"+results[i].proc__name).style.display = 'none';
                 
            //document.getElementById("spantarea"+results[i].proc__name).append(x);
            //document.getElementById("spanedit"+results[i].proc__name).append(x);
                 
                 
                 
                
            $("#spantarea"+results[i].proc__name).empty();
            $("#spanedit"+results[i].proc__name).empty();
            
            document.getElementById("spantarea"+results[i].proc__name).setAttribute("class", "k-sprite transparente");
           document.getElementById("spantarea"+results[i].proc__name).setAttribute('onclick','disable();'); // for FF
            // button_element.onclick = function() {doSomething();}; 
            document.getElementById("spanedit"+results[i].proc__name).setAttribute("class", "k-sprite transparente");
            document.getElementById("spanedit"+results[i].proc__name).setAttribute('onclick','disable();');
        }

            
     
        
    }
} 
                        
                        
