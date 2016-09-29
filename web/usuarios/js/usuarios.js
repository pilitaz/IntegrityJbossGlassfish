

/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    $(window).resize(function () {
        var viewportHeight = $(window).height();
        $('#outerWrapper').height(viewportHeight - 100);

    });

        //---------------------------------------------------------------------------------------------------------------------------
        // FUNCION PARA CREAR TOOLBAR -->>
                    //    $(document).ready(function() {                 
                    //     $("#toolbar").kendoToolBar({
                    //        resize: true,
                    //        expand: true,
                    //        items: [
                                
                                
                    //             { template: "<label>Buscar por Nombre:</label>" },
                    //             {
                    //                 template: "<input id='filtro' style='width: auto;' />",
                    //                 overflow: "always"
                    //             },
                                
                    //             { template: "<label>Buscar por roles:</label>  " },
                    //             {

                    //                 template: "<input type='search' id='filtro1' style='width: auto;' />",
                    //                 overflow: "always"

                    //             },
    							
                    //             { template: "<label name='Label6' style='position:relative;vertical-align: middle;width:50px;height:12px;font-family:Arial;font-size:12px;''> Estado </label>" },
                    //             {
                    //                 template: "<input type='search' id='filtro2' style='width:auto;' />",
                    //                 overflow: "always"
                    //             }	
                    //         ]
                    //     });
                    // });
/**
     * FUNCION crear usuario nuevo
     * grid1 variable almacena data de grid
     *  
     *   
     *  
     *  
*/ 

                function creausuario(){
            	var grid1 = $("#grid").data("kendoGrid");
            		grid1.addRow();

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
                            var  consultar = new sirconsulta();
                            var  datajson = consultar.getjson();
                            var  urlService = consultar.getUrlSir();
                            
                            var  actualizar = new cudcreate();
                            var  actjson = actualizar.getjson();
                            var  urlactualizar = actualizar.getUrlCud();
                            

                            //var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
                            var mapCud = "ee_user2";
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
                                    parameterMap: function (options, operation) {
                                        if (operation === "read") {
                                            return JSON.stringify(datajson);
                                        }
                                        if (operation === "update") {
                                            var cclave1 = document.getElementById("clave1").value;
                                            var cclave2 = document.getElementById("clave2").value;
                                                if (cclave1 == "**********"){//EVULUAR CONTRASEÑA
                                                    actjson.dsee_user2.ee_user2[0] = options;
                                                    return JSON.stringify(actjson);                                          
                                                 }
                                                 else
                                                {
                                                    if (cclave1===cclave2){
                                                    actjson.dsee_user2.ee_user2[0] = options;
                                                    return JSON.stringify(actjson);
                                                    }
                                                    else
                                                    {
                                                       window.alert('Las contraseñas no coinciden');

                                                    }
                                                }
                                            
                                        }
                                         if (operation === "create") {
                                            var cclave1 = document.getElementById("clave1").value;
                                            var cclave2 = document.getElementById("clave2").value;                                   
                                                if (cclave1 == "**********"){
                                                actjson.dsee_user2.ee_user2 = [options];
                                                actjson.dsee_user2.ee_user2[0].car__cod = "9999";
                                                return JSON.stringify(actjson);                                     
                                                 }
                                                 else
                                                {
                                                     if (cclave1===cclave2){
                                                        actjson.dsee_user2.ee_user2 = [options];
                                                        actjson.dsee_user2.ee_user2[0].car__cod = "9999";
                                                        return JSON.stringify(actjson); 
                                                    }
                                                      else
                                                    {
                                                       window.alert('Las contraseñas no coinciden');

                                                    }

                                                }
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
                                            alert(e[key1].eeEstados[0].Estado);
                                        }
                                    },
                                    model: {
                                        id: "usr__est",
                                        fields: {
                                            euserid:     {editable: true, nullable: false},                                      
     										euser__Name: {editable: true, nullable: true},									
    								        epassword:   {editable: true, nullable: false},
    								        usr__mail:   {editable: true, nullable: false},
    								        usr__carp:   {editable: true, nullable: false},
    								        usr__est:    {editable: true, nullable: false},
    								        car__cod:    {editable: false, nullable: false},
    								        car__nom:    {editable: true, nullable: false},
    								        usr__jef:    {editable: true, nullable: false, type: "boolean"},
    								        usr__codjef: {editable: true, nullable: false}
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
             					var grid1 = $("#grid").kendoGrid({
                                dataSource: dataSource,
                                     height: 600,
                                    sortable: true,
                                    pageable: {
                                    refresh: true,
                                    pageSizes: true,
                                    buttonCount: 5
                                },
                                //navigatable: true,
                                columns: [
                                    {field: "euser__Name", title: "NOMBRE COMPLETO",hidden:true},  
                                    {field: "euserid", title: "USUARIO", hidden:false },                                                             
                                    {field: "usr__mail"  , title:  "CORREO" ,hidden:true},
                                    {field: "usr__carp"   , title: "CEDULA" ,hidden:true},
                                    {field: "car__nom"    , title: "ELIJA UN ROL",  hidden:true , editor: filtroRol,
                                        template: function (e) {
                                            return e.car__nom;
                                        }},
                                    {field: "usr__codjef" , title: "ELIJA EL JEFE",hidden:true , editor: filtroJefe,
                                        template: function (e) {
                                            return e.usr__codjef;
                                        }},
                                    {field: "usr__jef"  , title:   "JEFE DE AREA ",hidden:true},
                                    {field: "usr__est"   , title:  "ESTADO" ,hidden:true , editor: filtroestado,
                                        template: function (e) {
                                            return e.usr__est;
                                        }},                                
                                    {field: "epassword"  , title: "CLAVE", width: "50px" ,hidden:true, editor: passEditorPopup }, 
                                    {field: "epassword1"  , title: "REPITA CLAVE", width: "50px" ,hidden:true, editor: onkeypass }, 								                               
                                    {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"}],  width: "60px"} ],                                
                                     editable: "popup",
                                     cancel: function(e) {                                                                                   
                                             e._defaultPrevented= true;
                                             $('#grid').data('kendoGrid').refresh();                                             
                                             $('#grid').data('kendoGrid').dataSource.read();
                                             $('#grid').data('kendoGrid').refresh();                                                                                        
                                            } 
                            });

/**
     * FUNCION AUTOCOMPLETADO NOMBRE TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro = ID del autocomplete
     *  consulta sobre campo : usr__est
     *  
     *  
*/ 
     						$("#filtro").kendoAutoComplete({ 
     						dataTextField: "euserid",
                            dataValueField: "euserid",
                            dataSource: dataSource,                        
                            filter: "startswith",
                            placeholder: "Nombre...",                        
                        });
/**
     *FUNCION FILTRO ROL TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro1 = ID del combobox
     *  consulta sobre campo : usr__est
     *  
     *  
*/ 
                         	$("#filtro1").kendoComboBox({  
                            filter: "contains",                           
     						dataTextField: "car__nom",
                            dataValueField: "car__nom",
                            placeholder: "Rol...",  
                            autoBind: false,
                            dataSource: dataSource ,   
                             change: function() {
                                var value = this.value();
                                if (value) {
                                    grid1.data("kendoGrid").dataSource.filter({ field: "car__nom", operator: "eq", value: value });
                                } else {
                                    grid1.data("kendoGrid").dataSource.filter({});
                                }
                            },                                         
    				          	});


/**
     *FUNCION FILTRO ESTADO TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro2 = ID del combobox
     *  consulta sobre campo : usr__est
     *  
     *  
*/ 
                         	$("#filtro2").kendoComboBox({                         
     						dataTextField: "usr__est",
                            dataValueField: "usr__est",
                            autoBind: false,
                            placeholder: "Estado..",  
                            dataSource: dataSource,   
                             change: function() {
                                var value = this.value();
                                if (value) {
                                    grid1.data("kendoGrid").dataSource.filter({ field: "usr__est", operator: "eq", value: value });
                                } else {
                                    grid1.data("kendoGrid").dataSource.filter({});
                                }
                            }                                                                   
    				          	});                   	
                        });

/**
     * FUNCION FILTRO ROL EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  car__nom
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read 
     *  
*/ 
                        function filtroRol(container, options) {
                        var  consultar = new sirconsulta();
                        var  datajson = consultar.getjson();
                        var  urlService = consultar.getUrlSir();
                        $('<input required name="' + options.field + '"/>')
                                    .appendTo(container)
                                    .kendoDropDownList({

                                        autoBind: false,
                                        dataTextField: "car__nom",
                                        dataValueField: "car__nom",
                                        optionLabel: "Seleccionar Rol...",
                                        dataSource: {
                                            type: "json",
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
                                            batch: true,
                                            schema: {
                                                data: "dsee_user2.ee_user2",
                                                model: {
                                                    id: "car__cod",
                                                    fields: {
                                                        car__nom: {editable: true, nullable: false},
                                                    }
                                                }
                                            }
                                        }
                                    });
                        }
/**
     *  Funcion filtroJefe PARA EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  usr__codjef
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read  
     *  
*/  
                    function filtroJefe(container, options) {
                        var  consultar = new sirconsulta();
                        var  datajson = consultar.getjson();
                        var  urlService = consultar.getUrlSir();

                            $('<input required name="' + options.field + '"/>')
                                    .appendTo(container)
                                    .kendoDropDownList({
                                        autoBind: false,
                                        dataTextField: "usr__codjef",
                                        dataValueField: "usr__codjef",
                                        optionLabel: "Selecionar Jefe...",
                                        dataSource: {
                                            type: "json",
                                            transport: {
                                                read: {
                                                    url: urlService,
                                                    //data: JSON.stringify(json),
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
                                            batch: true,
                                            schema: {
                                                data: "dsee_user2.ee_user2",
                                                model: {
                                                    id: "car__cod",
                                                    fields: {
                                                        usr__codjef: {editable: true, nullable: false},
                                                    }
                                                }
                                            }
                                        }
                                    });
                        }

/**
     *  Funcion Filtro Estado PARA EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  usr__est
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read 
     *  
*/  
    		                function filtroestado(container, options) {
                        var  consultar = new sirconsulta();
                        var  datajson = consultar.getjson();
                        var  urlService = consultar.getUrlSir();
                            $('<input required name="' + options.field + '"/>')
                                    .appendTo(container)
                                    .kendoDropDownList({
                                        autoBind: false,
                                        dataTextField: "usr__est",
                                        dataValueField: "usr__est",
                                        optionLabel: "Seleccionar Estado...",
                                        dataSource: {
                                            type: "json",
                                            transport: {
                                                read: {
                                                    url:urlService,
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
                                            batch: true,
                                            schema: {
                                                data: "dsee_user2.ee_user2",
                                                model: {
                                                    id: "car__cod",
                                                    fields: {
                                                        usr__est: {editable: true, nullable: false},
                                                    }
                                                }
                                            }
                                        }
                                    });
                        }
/**
     * Funcion passEditorPopup se ejecuta en el evento onkeyup
     *  Id clave 1 primer campo de clave 
     *  
     *  
     *  
     *  
*/        					function passEditorPopup(container, options) {                                         
                                $('<input id ="clave1" type = \"password\"  onkeyup = \"mostrarcampo()\" required name="' + options.field + '" />')
                                        .appendTo(container)
                                        .kendoMaskedTextBox({                                                                         
                                        });
                            }

/**
     * Funcion onkeypass para ocultar campo de clave
     *  
     *  var buscarlabel = busca el label de kendo edit.
     *  Buscarlabel.style.display= oculta el campo
     *  id clave2 campo para validar contraseña 
     *  
*/
        					function onkeypass(container, options) {                                          
                                $('<input id ="clave2" type = \"password\"" name="' + options.field + '" />')
                                        .appendTo(container)
                                        .kendoMaskedTextBox({                                	                                    
                                        });
                                var buscarlabel = $("label").find("for");//BUSCAR TODOS LOS ELEMENTOS LABEL--<<  
                                Buscarlabel = buscarlabel.prevObject[9];
                                Buscarlabel.style.display= "none";
                                 document.getElementById("clave2").style.display = "none";
                            }
    /**
     * Funcion ocultarcampo para mostrar campo de clave
     *  
     *  var buscarlabel = busca el label de kendo edit.
     *  Buscarlabel.style.display=  muestra el campo
     *  
     *  
     */
                        function mostrarcampo (){
                            document.getElementById("clave2").style.display = "";
                            var buscarlabel = $("label").find("for");                       
                            Buscarlabel = buscarlabel.prevObject[9];
                            Buscarlabel.style.display= "";
                        }
