/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
var est = "pre__est";
$(document).ready(function () {
    fltrEst();
    grilla();

});

function grilla(obj) {


    /* variables para consumir el servicio SiCud*/
    var objCud = new cud();
    var urlCud = objCud.getUrlCud();
    var mapCud = objCud.getmapCud();
    var inputCud = objCud.getdataInputCud();

    if (obj) {
        inputsir = obj;
    }
    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
        bco__cod: {type: 'number'},
        bco__nom: {type: 'string'},
        ter__nit: {type: 'string'},
        bco__org: {type: 'logical'},
        bco__sig: {type: 'string'},
        bco__chr: {type: 'string'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "bco__cod",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "sucursal", text: " ", click: selecSucur, template: "<a class='k-grid-sucursal' '><span class='k-sprite po_cerrar'></span></a>"},
        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
//    var btnDetalle = [
//        {name: "detalle",template: "<a class='k-grid-detalle'><span class='k-sprite re_bullet2'></span></a>"}
//    ];
//    var btnDer = {command: btnDetalle, title: "&nbsp;", width: "50px" };
//    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "150px"};

    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
//		btnDer,
        {field: "bco__cod", title: "Codigo del Banco", editor:bco__codList,width: "100%"},
        {field: "bco__nom", title: "Nombre Banco", width: "100%"},
//        {field: "ter__nit", title: "Nit", width: "100%"},
        {field: "ter__nit", title: "Nit", editor:ter__nitList, width: "100%"},
        {field: "ter__raz", title: "Razon social",editor:ter__razList, width: "100%",hidden: true},
        btnIzq
    ];

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            destroy: {
                url: urlCud,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
            },
            update: {
                url: urlCud,
                type: "PUT",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                url: urlCud,
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsir);
                    } else if (operation === 'create') {
                        var key1 = Object.keys(inputCud)[0]
                        options["ter__nit"] = options.ter__raz.ter__nit;
                        delete options["ter__raz"];
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    }else if (operation === 'update') {
                        var key1 = Object.keys(inputCud)[0]
                        options["ter__nit"] = options.ter__raz.ter__nit;
                        delete options["ter__raz"];
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    } else {
                        var key1 = Object.keys(inputCud)[0]
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);
                    }
                } catch (e) {
                    alertDialogs(e.message)
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    if (e[key1][mapSir]) {
                        for (var i = 0; i < e[key1][mapSir].length; i++) {
                            e[key1][mapSir][i].id = i
                        }
                    }
                    return e[key1][mapSir];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: model
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    if (!btnC) {
        document.getElementById("btnCrear").style.display = "none";
    }
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        pageable: false,
        dataSource: dataSource,
        sortable: true,
        selectable: false,
        columns: columns,
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {

            if (!e.model.isNew()) {//caso en el que el popup es editar

                e.container.kendoWindow("title", "Editar");
                debugger
                var idBanco = $("#idbco__cod").data("kendoNumericTextBox");
                idBanco.enable(false);
//                e.container.find("span[name=bco__cod]")[0].style.display = "none";
                //e.container.find("input[name=ter__raz]")[0].readOnly="true"
//                if (e.model[est] != 99) {
//                    kendo.ui.progress($('.k-edit-form-container'), true);
//                    kendo.ui.progress($('.k-edit-buttons'), true);
//                    e.container.find(".k-loading-image").css("background-image", "url('')");
//                }
            } else {
                e.container.kendoWindow("title", "Crear");
                ////caso en el que el popup es crear
//                Buscarlabel = buscarlabel.prevObject[3];
//                Buscarlabel.style.display = "none";
                //e.container.find("label[name=sre__cod]")[0].display="none";
            }
        }
    });
}

function addRow() {
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height((viewportHeight - 61));
});

function deleteRow(e) {
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.bco__nom + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function selecSucur(e){
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
        sessionStorage.setItem("objBanco",JSON.stringify(dataItem));
        window.location.assign(sessionStorage.getItem("url") + "sucurBancos/html/sucurBancos.html");
     } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }    
}

////////////////////////////////////////////////////////////////////////////////

function  bco__codList(container, options) {
    $('<input id="idbco__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoNumericTextBox({
       format: "{0:n0}"
    });
}

function ter__nitList(container, options) {
    
    var obj = new listater__nit();
    var dataSource = obj.getdataSource();
    $('<input id="idter__nit" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",
        dataSource: dataSource,
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        minLength: 7,
        change: onSelectNit
    });
}

function onSelectNit(e){
     $("#idter__raz").val(e.sender.listView._dataItems[0].ter__raz);
}
function listater__nit() {
    var objSirUn = new SIRsic_ter();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(inputsirUn)[0];
                        inputsirUn[key1].eeSIRsic_ter[0].picter_nit = $("#idter__nit").val();
                        return JSON.stringify(inputsirUn);
                    }
                } catch (e) {
                    alertDialogs(e.message)
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ter__nit",
                fields: {
                    ter__raz: {type: 'string'},
                    ter__nit: {type: 'string'}
                }
            }
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });

    this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
        }
    };
    this.getdataSource = function () {
        return dataSource;
    };
}
;
function ter__razList(container, options) {
    
    var obj = new listater__raz();
    var dataSource = obj.getdataSource();
    $('<input id="idter__raz" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__raz",
        template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',
        dataSource: dataSource,
         minLength: 4,
        change: onSelectRaz
    });
}
function onSelectRaz(e){
    $("#idter__nit").val(e.sender.listView._dataItems[0].ter__nit);
}
function listater__raz() {
    var objSirUn = new SIRsic_ter();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(inputsirUn)[0];
                        inputsirUn[key1].eeSIRsic_ter[0].picter_raz = $("#idter__raz").val();
                        return JSON.stringify(inputsirUn);
                    }
                } catch (e) {
                    alertDialogs(e.message)
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ter__nit",
                fields: {
                    ter__raz: {type: 'string'},
                    ter__nit: {type: 'string'}
                }
            }
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });

    this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
        }
    };
    this.getdataSource = function () {
        return dataSource;
    };
}
;

///-----------------------------------------------------------------------------

function sendAjax(verHtml, obj) {
    var objCU = new cud();
    var objD = objCU.getdataInputCud();
    var urlD = objCU.getUrlCud();
    var mapDataD = objCU.getmapCud();
    var key1 = Object.keys(objD)[0];
    objD[key1][mapDataD] = obj;

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objD),
        url: urlD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
            bandAlert = 0;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de  bancos" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con elel servicio de bancos.\n" + permitirIngreso);
        }

    });
}
function fltrEst() {
    var data = [
        {text: "Todos", value: "-1", },
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
    ];
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
        width: 400
    });
}

function onChangeFltr() {
    inputsir = {
        "dsSIRgpr_pre": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_pre": [
                {
                    "picpre__pcod": "*",
                    "picusuario": "*",
                    "piipre__est": $("#fltrEst").val()
                }
            ]
        }
    }
    grilla(inputsir);
}

