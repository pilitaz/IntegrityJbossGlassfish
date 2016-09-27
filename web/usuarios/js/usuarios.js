/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
});




var wnd = {  
   "dsee_user2":{  
      "eeDatos":[  
         {  
 			"picusrcod":"jorgereita1",
            "picfiid":"80019884934504174879",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "ee_user2":[  
         {  
            "euserid":"apastori",
            "euser__Name":"Ansaldo PastoriS",
            "epassword":"**********",
            "usr__mail":"apastori@quantumltda.com",
            "usr__carp":"560187",
            "usr__est":1,
            "car__cod":9999,
            "car__nom":"PORTALNOMINA",
            "usr__jef":false,
            "usr__codjef":"aduarte"
         }
      ]
   }
};

var wnd1 =
{  
   "dsee_user2":{  
      "eeDatos":[  
         {  
 			"picusrcod":"jorgereita1",
            "picfiid":"80019884934504174879",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "ee_user2":[  
         {  
            "euserid":"Pepito Perez",
            "euser__Name":"Usuario de Pruebas",
            "epassword":"1234",
            "usr__mail":"pruebas@quantumltda.com",
            "usr__carp":"560187",
            "usr__est":1,
            "car__cod":9999,
            "car__nom":"PORTALNOMINA",
            "usr__jef":false,
            "usr__codjef":"aduarte"
         }
      ]
   }
};


                    var json =
                            {  
							   "dsee_user2":{  
							      "eeDatos":[  
							         {  
						 			"picusrcod":"jorgereita1",
						            "picfiid":"80019884934504174879",
						            "local_ip":"172.21.24.105",
						            "remote_ip":"190.144.16.114"
							         }
							      ]
							   }
							};

    //---------------------------------------------------------------------------------------------------------------------------
    //toolbar-->
                   $(document).ready(function() {

                    $("#toolbar").kendoToolBar({
                        
                       items: [
                            
                            
                            { template: "<label>Buscar por Nombre:</label>" },
                            {
                                template: "<input id='filtro' style='width: 150px;' />",
                                overflow: "never"
                            },
                            
                            { template: "<label>&nbsp;&nbsp;&nbsp;&nbsp;Buscar por roles:</label>" },
                            {

                                template: "<input type='search' id='filtro1' style='width: 150px;' />",
                                overflow: "never"

                            },

							
                            { template: "<label>&nbsp;&nbsp;&nbsp;&nbsp; Buscar por Estado:</label>" },
                            {
                                template: "<input type='search' id='filtro2' style='width: 150px;' />",
                                overflow: "never"
                            }	

                        ]
                    });


                });


 //------------------------------------------------------
 //Funcion Crear nuevo usuario
function creatv(){
	var grid = $("#grid").data("kendoGrid");
		grid.addRow();
                }
//--------------------------------------------------------

                function prueba(){
                	var grid = $("#grid").data("kendoGrid");
                	var lastCell = grid.tbody.find("tr:last td:last");


                }
    //--------------------------------------------------------------------------------------------------------------------------------
    //crud--->


                    $(document).ready(function () { 
                        var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
                        var mapCud = "ee_user2";
                         dataSource = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: crudServiceBaseUrl,
                                    dataType: "json",
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8"
                                },
                                update: {
                                    url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SicudUsuarios",
                                    dataType: "json",
                                    type: "PUT",
                                    contentType: "application/json; charset=utf-8"
                                },

                                    create: { 
                                    url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SicudUsuarios",
                                    dataType: "json",
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8"
                                },
                                parameterMap: function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(json);
                                    }
                                    if (operation === "update") {
                                        debugger
                                        
                                        wnd.dsee_user2.ee_user2 = options.models;
                                        return JSON.stringify(wnd);

                                    }
                                     if (operation === "create") {
                                        
                                        debugger
                                        wnd1.dsee_user2.ee_user2 = options.models;
                                        return JSON.stringify(wnd1);
                                        
                                    }
                                }
                            },
                            batch: true,
                            severFiltering: true,
                            //pageSize: 20,
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
                                $(window).trigger("resize");
          					var grid1 = $("#grid").kendoGrid({
                            dataSource: dataSource,
                            pageable: true,
                            scrollable: true,
                            //sortable: true,
                            resizable: true,
                            filterable: true,
                            navigatable: true,
                            columns: [

                                {field: "euser__Name", title: "NOMBRE COMPLETO",hidden:true},  
                                {field: "euserid", title: "USUARIO", hidden:false },                                                             
                                {field: "usr__mail"  , title:  "CORREO" ,hidden:true},
                                {field: "usr__carp"   , title: "CEDULA" ,hidden:true},
                                {field: "car__nom"    , title: "ELIJA UN ROL",  hidden:true , editor: categoryDropDownEditor,
                                    template: function (e) {
                                        return e.car__nom;
                                    } },//


                                {field: "usr__codjef" , title: "ELIJA EL JEFE",hidden:true , editor: categoryDropDownEditor1,
                                    template: function (e) {
                                        return e.usr__codjef;
                                    } },// },//


                                {field: "usr__jef"  , title:   "JEFE DE AREA ",hidden:true},//


                                {field: "usr__est"   , title:  "ESTADO" ,hidden:true , editor: categoryDropDownEditor2,
                                    template: function (e) {
                                        return e.usr__est;
                                    }},                                
                                {field: "epassword"  , title: "CLAVE", width: "50px" ,hidden:true, editor: passEditorPopup }, 

								
								
                                
                                {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"}],  width: "60px"} ],
                                 editable: "popup"

                        });


 						$("#filtro").kendoAutoComplete({ 
 						dataTextField: "euserid",
                        dataValueField: "euserid",
                        dataSource: dataSource,                        
                        filter: "startswith",
                        placeholder: "Nombre...",
                        separator: ", "



                    });









                     	$("#filtro1").kendoComboBox({ 
 
                        filter: "contains",                           
 						dataTextField: "car__nom",
                        dataValueField: "car__nom",
                        autoBind: false,
                        optionLabel: "All",
                        dataSource: dataSource ,   
                         change: function() {
                            var value = this.value();
                            if (value) {
                                grid1.data("kendoGrid").dataSource.filter({ field: "car__nom", operator: "eq", value: value });
                            } else {
                                grid1.data("kendoGrid").dataSource.filter({});
                            }
                        },
                                             
                        separator: ", "
				          	});









                     	$("#filtro2").kendoComboBox({ 

 						
                        //filter: "contains",                           
 						dataTextField: "usr__est",
                        dataValueField: "usr__est",
                        autoBind: false,
                        //optionLabel: "All",
                        dataSource: dataSource,   
                         change: function() {
                            var value = this.value();
                            if (value) {
                                grid1.data("kendoGrid").dataSource.filter({ field: "usr__est", operator: "eq", value: value });
                            } else {
                                grid1.data("kendoGrid").dataSource.filter({});
                            }
                        },
                                             
                        separator: ", "
				          	});
                    	







                    });

    //-------------------------------------------------------------------------------------------------------------------
    //--
                    function categoryDropDownEditor(container, options) {
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
                                                url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios",
                                                //data: JSON.stringify(json),
                                                dataType: "json",
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8"
                                            },
                                            parameterMap: function (options, operation) {
                                                if (operation === "read") {

                                                    return JSON.stringify(json);
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


//---------------------------------------------
                function categoryDropDownEditor1(container, options) {
                        $('<input required name="' + options.field + '"/>')
                                .appendTo(container)
                                .kendoDropDownList({
                                    autoBind: false,
                                    dataTextField: "usr__codjef",
                                    dataValueField: "usr__codjef",
                                    optionLabel: "Seleccionar Rol...",
                                    dataSource: {
                                        type: "json",
                                        transport: {
                                            read: {
                                                url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios",
                                                //data: JSON.stringify(json),
                                                dataType: "json",
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8"
                                            },
                                            parameterMap: function (options, operation) {
                                                if (operation === "read") {

                                                    return JSON.stringify(json);
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




    //------------------------------------------------------------------------------------------------------------------


		                function categoryDropDownEditor2(container, options) {
                        $('<input required name="' + options.field + '"/>')
                                .appendTo(container)
                                .kendoDropDownList({
                                    autoBind: false,
                                    dataTextField: "usr__est",
                                    dataValueField: "usr__est",
                                    optionLabel: "Seleccionar Rol...",
                                    dataSource: {
                                        type: "json",
                                        transport: {
                                            read: {
                                                url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios",
                                                //data: JSON.stringify(json),
                                                dataType: "json",
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8"
                                            },
                                            parameterMap: function (options, operation) {
                                                if (operation === "read") {

                                                    return JSON.stringify(json);
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
//---------------------------------------------------------------------------------------------------
					function passEditorPopup(container, options) {
                        $('<input type = \"password\" onkeyup="onkeypass()" " required name="' + options.field + '" />')
                                .appendTo(container)
                                .kendoMaskedTextBox({
                                onkeyup :  onkeypass	
                                    
                                });
                    }

					function onkeypass(container, options) {debugger
                        $('<input type = \"password\"" required name="' + options.field + '" />')
                                .appendTo(container)
                                .kendoMaskedTextBox({
                                	
                                    
                                });
                    }

