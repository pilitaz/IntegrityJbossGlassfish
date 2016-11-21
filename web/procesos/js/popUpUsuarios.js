
$(document).ready(function () {
     $("#bottn").kendoButton({
        //click: CrearCampo
    });
  var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();

    var actualizar = new sirconsulta();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlSir();
    var mapCud = "ee_user2";
    var mapCud1 = "ee_user3";
    var dataSource = new kendo.data.DataSource({
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

            }
        },
        batch: true,
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
                    euserid: {editable: true, nullable: false, validation: {required: true}},
                    euser__Name: {editable: true, nullable: true, validation: {required: true}},
                    epassword: {editable: true, nullable: false},
                    usr__mail: {editable: true, nullable: false},
                    usr__carp: {editable: true, nullable: false},
                    usr__est: {editable: true, nullable: false},
                    car__cod: {editable: false, nullable: false},
                    car__nom: {editable: true, nullable: false},
                    actor__cod: {editable: true, nullable: false},
                    usr__jef: {editable: true, nullable: false, type: "boolean"},
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
   
        var grid1 = $("#grilla_usr").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        scrollable:true,
        pageSize: 5,
        columns: [
            {field: "euser__Name", title: "Nombre", hidden: true},
            {field: "euserid", title: "USUARIO", hidden: false},
            {field: "usr__mail", title: "CORREO", hidden: true},
            {field: "usr__carp", title: "CEDULA", hidden: true},
            {field: "car__nom", title: "ELIJA UN ROL", hidden: true, editor: filtroRol,
                template: function (e) {
                    return e.car__nom;
                }},
            {field: "actor__cod", title: "ELIJA UN ACTOR", hidden: true, editor: filtroActor,
                template: function (e) {
                    return e.actor__cod;
                }},
            {field: "usr__codjef", title: "ELIJA EL JEFE", hidden: true, editor: filtroJefe,
                template: function (e) {
                    return e.usr__codjef;
                }},
            {field: "usr__jef", title: "JEFE DE AREA ", hidden: true},
            {field: "usr__est", title: "ESTADO", hidden: true, editor: filtroestado,
                template: function (e) {
                    return e.usr__est;
                }},
            {field: "epassword", title: "CLAVE", width: "50px", hidden: true, editor: passEditorPopup},
            {field: "epassword1", title: "REPITA CLAVE", width: "50px", hidden: true, editor: onkeypass},
            {command: [{name: "editar", text: "editar", template: "<a class='k-grid-edit'><span class='k-sprite pro_check'></span></a>"}], width: "60px"}],
        editable: "popup",
        cancel: function (e) {
            e._defaultPrevented = true;

        }
    });

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
    var consultar1 = new serviRoles();
    var datajson1 = consultar1.getjson();
    var urlService1 = consultar1.getUrlSir();

    var datasource1 = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService1,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    return JSON.stringify(datajson1);
                }


            }
        },
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud1];
                } else {
                }
            },
            model: {
                id: "car__cod",
                field: {
                    car__nom: {editable: false, nullable: false}

                }
            }
        }

    });
    $("#filtro1").kendoComboBox({
        dataTextField: "car__nom",
        dataValueField: "car__cod",
        placeholder: "Rol...",
        dataSource: datasource1,
        change: function () {
            var value = this.value();
            if (value) {
                grid1.data("kendoGrid").dataSource.filter({field: "car__cod", operator: "eq", value: value});
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
    var estados = [
        {text: "Activo", valor: "1"},
        {text: "Inactivo", valor: "0"},
        {text: "Ingreso 1 vez", valor: "2"},
        {text: "Retirado", valor: "3"},
        {text: "Inactivo Manualmente", valor: "4"},
        {text: "Deshabilitado", valor: "5"},
        {text: "Inactivado Cambio De Clave", valor: "6"},
    ];

    $("#filtro2").kendoComboBox({
        dataTextField: "text",
        dataValueField: "valor",
        autoBind: false,
        placeholder: "Estado..",
        dataSource: estados,
        change: function () {
            var value1 = this.value();
            var value1 = parseInt(value1);
            if (value1 >= 0) {
                grid1.data("kendoGrid").dataSource.filter({field: "usr__est", value: value1});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        }
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
        var consultar = new serviRoles();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "ee_user3";
        $('<input  id = "rol" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "car__nom",
                    dataValueField: "car__nom",
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
                            data: function (e) {
                                var key1 = Object.keys(e)[0];
                                if (e[key1].eeEstados[0].Estado === "OK") {
                                    return e[key1][mapCud1];
                                } else {
                                }
                            },
                            model: {
                                id: "car__cod",
                                fields: {
                                    car__nom: {editable: false, nullable: false},
                                }
                            }
                        }
                    }

                });

    }
 /**
     * FUNCION FILTRO ACTOR EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  actor__cod
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read 
     *  
     */

    function filtroActor(container, options) {debugger
        var consultar = new siractores();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_actor";
        $('<input  id = "rol" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "actor__cod",
                    dataValueField: "actor__cod",
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
                            data: function (e) {
                                var key1 = Object.keys(e)[0];
                                if (e[key1].eeEstados[0].Estado === "OK") {
                                    return e[key1][mapCud1];
                                } else {
                                }
                            },
                            model: {
                                id: "actor__cod",
                                fields: {
                                    actor__cod: {editable: false, nullable: false},
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
     *  var arrayoriginal y array sin duplicados filtran datos de dropdown
     */


    function filtroJefe(container, options) {
        var consultar = new sirconsulta();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();


        var data1 = grid1.data("kendoGrid").dataSource._pristineData;


        var arrayOriginal = [];
        var arraySinDuplicados = [];
        var i = 0;
        for (i  in data1) {
            if(data1[i] !== undefined){
                arrayOriginal[i] = data1[i].usr__codjef;
            }
            
        }

        var arraySinDuplicados = arrayOriginal.filter(function (elem, pos) {
            return arrayOriginal.indexOf(elem) == pos;
        });

        $('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataSource: arraySinDuplicados

                });
    }



});
/**
 *  Funcion Filtro Estado PARA EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
 *  cONSULTA CAMPO  usr__est
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  
 */
function filtroestado(container, options) {
    var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var estados = [
        {text: "Activo", valor: "1"},
        {text: "Inactivo", valor: "0"},
        {text: "Ingreso 1 vez", valor: "2"},
        {text: "Retirado", valor: "3"},
        {text: "Inactivo Manualmente", valor: "4"},
        {text: "Deshabilitado", valor: "5"},
        {text: "Inactivado Cambio De Clave", valor: "6"},
    ];
    $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "valor",
                dataSource: estados
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
    Buscarlabel.style.display = "none";
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
function mostrarcampo() {
    document.getElementById("clave2").style.display = "";
    var buscarlabel = $("label").find("for");
    Buscarlabel = buscarlabel.prevObject[9];
    Buscarlabel.style.display = "";
}

/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */