                    
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
    var mapCud = "eebpm_proc";
    var datasource = new kendo.data.DataSource({
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
                    return e[key1][mapCud];
                } else {
                   // alertDialogs(e[key1].eeEstados[0].Estado);
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
                                
                            { field: "proc__name", title: "Procesos",  hidden:false},
                            {command:
                        [
                           
                            {name: "play", text: " ", click: grilla, template: "<a class='k-grid-play'><span class='k-sprite pro_playon'></span></a>"},
                            {name: "editar", text: " ",  click: grafica, template: "<a class='k-grid-editar'><span class='k-sprite re_editoff'></span></a>"},
                            {name: "destroy", template: "<a class='k-grid-delete' href='' style='min-width:16px;'><span class='k-sprite re_cerrar'></span></a>"}
                        ],
                        width: "120px"}],                            
                            //editable: "popup",
                            
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
            data: function (e) {debugger
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
                                {field: "inst__name", title: "Creado por",  hidden:false},
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
                        
                      
                      
                    
                        
                        
                    });
                    
       
                function grafica(e){debugger
                    
                 
//                    var entityGrid = $("#grid").data("kendoGrid");
//                    var selectedItem = entityGrid.dataItem(entityGrid.select());
//                    document.getElementById("demo").innerHTML = selectedItem.id;      
//                    $("#chart").empty();
//                    $("#chart").kendoChart({
//                        title: {
//                            text: "Evolucion de tareas para " + selectedItem.id,
//                        },
//                        legend: {
//                            visible: false
//                        },
//                        seriesDefaults: {
//                            type: "bar"
//                        },
//                        series: [{
//                                name: "Total Visits",
//                                data: [56000, 63000, 74000, 91000, 117000, 138000]
//                            }, {
//                                name: "Unique visitors",
//                                data: [52000, 34000, 23000, 48000, 67000, 83000]
//                            }],
//                        valueAxis: {
//                            max: 140000,
//                            line: {
//                                visible: false
//                            },
//                            minorGridLines: {
//                                visible: true
//                            },
//                            labels: {
//                                rotation: "auto"
//                            }
//                        },
//                        categoryAxis: {
//                            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//                            majorGridLines: {
//                                visible: false
//                            }
//                        },
//                        tooltip: {
//                            visible: true,
//                            template: "#= series.name #: #= value #"
//                        }
//                    });
             //-------------------------------------
             var myWindow1 = $("#textarea"),
                undo = $("#undo");
        function onClose() {
            undo.fadeIn();
//            $('#gridproceso').data('kendoGrid').refresh();
//            $('#gridproceso').data('kendoGrid').dataSource.read();
//            $('#gridproceso').data('kendoGrid').refresh();
        }
//        var UrL= sessionStorage.getItem("url");  
         $("#textarea").empty();
            myWindow1.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Grafica _*",
            width: "60%",
            content: "popUpGrafica.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();                 
    }
    
                        
                    

                    
                        function grilla(e){debugger
                                           var consultar = new sirusuariobpm();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eebpm_proc";
    var datasource = new kendo.data.DataSource({
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
                    return e[key1][mapCud];
                } else {
                   // alertDialogs(e[key1].eeEstados[0].Estado);
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
                            $("#grid1").empty();
//                            var entityGrid = $("#grid").data("kendoGrid");
//                            var selectedItem = entityGrid.dataItem(entityGrid.select());
                           //document.getElementById("demo").innerHTML = selectedItem.id; 
                            var grid = $("#grid1").kendoGrid({
                                
                                dataSource: datasource,
                            
                            sortable: true,
                            selectable: true,
                            
                            //navigatable: true,
                            columns: [
                                 { template: "<a ><span class='k-sprite pro_playon'></span></a>", width: "60px"},
                                {field: "proc__name", title: "Procesos",  hidden:false},	
                               
                                {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite pro_editoff'></span></a>"}],  width: "60px"} 
                                ],                                
                            
                            
                            cancel: function(e) {                                                                                   
                                e._defaultPrevented= true;
                                $('#grid').data('kendoGrid').refresh();                                             
                                $('#grid').data('kendoGrid').dataSource.read();
                                $('#grid').data('kendoGrid').refresh();                                                                                        
                            } 
                        });
                        
                    }       

                    
                        
                        