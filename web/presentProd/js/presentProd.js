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
        pre__pcod: {type: 'string'},
        pre__des: {type: 'string'},
        pre__est: {type: 'number'},
        uni__cod: {type: 'string'},
        pre__fac: {type: 'number'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "idpre",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "aprobar", text: " ", click: aprobarPresen, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},
        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    //var btnDer = {command: btnDetalle, title: "&nbsp;", width: "100px" };
    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "150px"};

    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
//		btnDer,
        {field: "pre__pcod", title: "Cod. Presentacion", width: "100%"},
        {field: "pre__des", title: "Descripcion", width: "100%"},
//            {field: "pre__est", title: "Estado",width: "100%"},
        {field: "uni__cod", title: "Unidad de Medida", editor: uni__codList, width: "100%"},
        {field: "pre__fac", title: "Factor Conversion", width: "100%"},
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
                        options[est] = 99;
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
                            e[key1][mapSir][i].idpre = i
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
                var buscarlabel = $("label").find("for");
                Buscarlabel = buscarlabel.prevObject[0];
                Buscarlabel.style.display = "none";
                e.container.find("input[name=pre__pcod]")[0].style.display = "none";
                //e.container.find("input[name=ter__raz]")[0].readOnly="true"
                if (e.model[est] != 99) {
                    kendo.ui.progress($('.k-edit-form-container'), true);
                    kendo.ui.progress($('.k-edit-buttons'), true);
                    e.container.find(".k-loading-image").css("background-image", "url('')");
                }
            } else {
                e.container.kendoWindow("title", "Crear");
                ////caso en el que el popup es crear
//                Buscarlabel = buscarlabel.prevObject[3];
//                Buscarlabel.style.display = "none";
                //e.container.find("label[name=sre__cod]")[0].display="none";
            }
        },
    });
}

function addRow() {
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 61);
});

function deleteRow(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));

        if (dataItem[est] == 99) {
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.pre__des + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function pre__pcodList(container, options) {
    var obj = new listapre__pcod();
    var dataSource = obj.getdataSource();
    $('<input id="idpre__pcod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listapre__pcod() {


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


function pre__desList(container, options) {
    var obj = new listapre__des();
    var dataSource = obj.getdataSource();
    $('<input id="idpre__des" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listapre__des() {


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


function pre__estList(container, options) {
    var obj = new listapre__est();
    var dataSource = obj.getdataSource();
    $('<input id="idpre__est" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listapre__est() {


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


function uni__codList(container, options) {
    var obj = new listauni__cod();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "uni__des",
        dataValueField: "uni__cod",
        dataSource: dataSource,
        index: 0,
    });
}

function listauni__cod() {
    var objSirUn = new SIRinv_uni();
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
                id: "uni__des",
                fields: {
                    uni__des: {type: 'string'},
//                    uni__des: {type: 'string'},
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


function pre__facList(container, options) {
    var obj = new listapre__fac();
    var dataSource = obj.getdataSource();
    $('<input id="idpre__fac" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listapre__fac() {


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


function aprobarPresen(e) {
    try {
        var fila = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
        e.preventDefault();
        var dataItem = fila;


        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if (fila[est] !== 1) {
                if (fila[est] === 99) {
                    fila[est] = 0;
                } else {
                    fila[est] = fila[est] + 1;
                }
            }
            sendAjaxAClase("PUT", [fila]);
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila[est] + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}
function sendAjaxAClase(verHtml, obj) {
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
            alertDialogs("Error al consumir el servicio de  presentación del producto" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con elel servicio de presentación del producto.\n" + permitirIngreso);
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

