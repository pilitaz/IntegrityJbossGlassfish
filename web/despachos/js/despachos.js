/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(
        function () {
            var viewportHeight = $(window).height();
            $('#outerWrapper').height(viewportHeight - 100);
        });
$(document).ready(
        function () {
            localStorage["grid_data"] = "";
            $("#botton").kendoButton({
                //click: Filtrar
            });
            var windowTemplate = kendo.template($("#windowTemplate").html());
            var window = $("#window1").kendoWindow({
                title: "Eliminar",
                visible: false, //the window will not appear before its .open method is called
            }).data("kendoWindow");
            addRow();
            ruta();
        });
        
        
function addRow() {
    $("#textarea").append("<div id='windowform'></div>");
    var myWindow1 = $("#windowform"), undo = $("#undo");

    function onClose() {
        undo.fadeIn();
        $("#windowform").empty();
    }
    var UrL = sessionStorage.getItem("url");
    myWindow1.kendoWindow({
        draggable: true,
        height: "40%",
        modal: true,
        resizable: true,
        title: "Crear",
        width: "35%",
        content: UrL + "despachos/html/popupFiltros.html",
        actions: [
            "Close"
        ],
        close:
                function () {
                    $("#textarea").empty();
                    this.destroy();
                }
    }).data("kendoWindow").center().open();
}

function editar_rol() {
    var grid1 = $("#grid").data("kendoGrid");
    window.location = ("tareas.html");
}

function filtrar(establecimiento, ciudad, region) {
    var e = -1;
    grilla(e);
    cerrar();
}


function camion() {
    var consultar = new sirCamiones();
    var datajson = consultar.getjson();
    datajson.dsSIRdpc_cam.eeSIRdpc_cam[0].pidcam_cap = parseInt(document.getElementById('pesoTotal').innerHTML);
    //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_cam";
    $("#Camion").removeClass();
    $("#Camion").kendoComboBox({
        dataTextField: "cam__des",
        dataValueField: "cam__cod",
        template: '<div class="divElementDropDownList">#: data.cam__des #' + ' - ' + ' #:data.cam__vers #</div>',
        select: function (e) {
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
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Camiones" + e[key1].eeEstados[0].Estado);
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

function ruta() {
    var consultar = new sirRuta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_rut";
    $("#Ruta")
            .kendoComboBox({
                dataTextField: "rut__des",
                dataValueField: "rut__cod",
                template: '<div class="divElementDropDownList">Desde:#: data.bar__dsc1 #' + ' Hasta: ' + ' #:data.bar__dsc2 #</div>',
                select: function (e) {
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
                        data: function (e) {
                            var key1 = Object.keys(e)[0];
                            if (e[key1].eeEstados[0].Estado === "OK") {
                                return e[key1][mapCud1];
                            } else {
                                alertDialogs("Error Con Servicio Rutas" + e[key1].eeEstados[0].Estado);
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

function transportista(e) {
    $("#Transportista").removeClass();
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
                template: '<div class="divElementDropDownList">#: data.ter__raz #' + ' - ' + ' #:data.cam__des #</div>',
                select:
                        function (e) {
                        },
                dataSource: {
                    transport: {
                        read: {
                            url: urlService,
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap:
                                function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(datajson);
                                    }
                                }
                    },
                    schema: {
                        data:
                                function (e) {
                                    var key1 = Object.keys(e)[0];
                                    if (e[key1].eeEstados[0].Estado === "OK") {
                                        return e[key1][mapCud1];
                                    } else {
                                        alertDialogs("Error Con Servicio Transportista" + e[key1].eeEstados[0].Estado);
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

function grilla(obj, dataSource1) {
    var consultar = new Sirdespacho();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    //datajson.dsSIRgpd_sre.SIRgpd_sre[0].picsre__est = e;                
    var actualizar = new sirDespacho();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlSir();
    var mapCud = "eegpd_ped_det";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update:
                    function (options) {
                        var localData = JSON.parse(localStorage["grid_data"]);
                        for (var i = 0; i < localData.length; i++) {
                            if (localData[i].ID == options.data.ID) {
                                localData[i].Value = options.data.Value;
                            }
                        }
                        localStorage["grid_data"] = JSON.stringify(localData);
                        options.success(options.data);
                    },
            destroy:
                    function (options) {
                        var localData = JSON.parse(localStorage["grid_data"]);
                        for (var i = 0; i < localData.length; i++) {
                            if (localData[i].ID === options.data.ID) {
                                localData.splice(i, 1);
                                break;
                            }
                        }
                        localStorage["grid_data"] = JSON.stringify(localData);
                        options.success(localData);
                    },
            parameterMap:
                    function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                        if (operation === "update") {
                            var cedula = $("#cedula")[0].value;
                            var nombre = $("#nombre")[0].value;
                            var region = $("#region").data("kendoDropDownList");
                            var select = region.selectedIndex;
                            region = region.dataSource._data[select].rgeo__cod;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod = region;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod = options.sre__cod;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est = options.sre__est;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit = cedula;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__nom = options.rgeo__nom;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__raz = nombre;
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
            data:
                    function (e) {
                        if ((localStorage["grid_data"] === "") || (!localStorage["grid_data"])) {
                            var key1 = Object.keys(e)[0];
                            if (e[key1].eeEstados) {
                                if (e[key1].eeEstados[0].Estado === "OK") {
                                    if ((localStorage["grid_data"] === "") || (!localStorage["grid_data"])) {
                                        for (var i = 0; i < e[key1]["eegpd_ped_det"].length; i++) {
                                            e[key1]["eegpd_ped_det"][i].ID = i;
                                            e[key1]["eegpd_ped_det"][i].checkIn = false;
                                        }
                                        localStorage["grid_data"] = JSON.stringify(e[key1][mapCud]);
                                        return e[key1][mapCud];
                                    } else {
                                        return JSON.parse(localStorage["grid_data"]);
                                    }
                                } else
                                {
                                    alertDialogs("Error" + e[key1].eeEstados[0].Estado);
                                }
                            }
                        } else {
                            return JSON.parse(localStorage["grid_data"]);
                        }
                    },
            model: {
                id: "ped__num",
                fields: {
                    ped__fec: {editable: true, nullable: false},
                    suc__cod: {editable: true, nullable: false},
                    clc__cod: {editable: false, nullable: false},
                    cla__cod: {editable: true, nullable: false},
                    art__cod: {editable: true, nullable: false},
                    ped__can__k: {editable: false, nullable: false},
                    art__des: {editable: true, nullable: false},
                    ped__pend: {editable: true, nullable: false},
                    ped__num: {editable: true, nullable: false},
                }
            }
        }
    });
    if (dataSource1) {
        dataSource = dataSource1;
    }
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
            {field: "ped__num", title: "# Pedido", hidden: false},
            {field: "art__des", title: "Producto", hidden: false},
            {field: "ped__pend", title: "Cantidad", hidden: false},
            {field: "ped__can__k", title: "Peso", hidden: false, footerTemplate: conditionalSum},
            {command: [
                    {name: "check", text: "estado", template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>"},
                ], width: "60px"}],
        editable: "popup",
//         
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function (e) {
            camion();
        },
        cancel: function (e) {
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    });
}

function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
        if (dataItem.sre__est != 99) {
            alertDialogs("No se puede eliminar por el estado ");
        } else {
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action =
                    function () {
                        var dataSource = $("#grid").data("kendoGrid").dataSource;
                        dataSource.remove(dataItem);
                        dataSource.sync();
                        bandAlert = 0;
                    };
            actions[1] = new Object();
            actions[1].text = "Cancelar";
            actions[1].action =
                    function () {
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

function changImgFunc(results, e) {
    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod)) {
            if (results[i].sre__est == 0) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkAct");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
            }
            if (results[i].sre__est == 99) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkCreate");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
            }
            if (results[i].sre__est == 1) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkBloq");
            }
        }
    }
}

function changeEst(e) {
    var idGrid = e;
    var localData = JSON.parse(localStorage["grid_data"]);
    for (var i = 0; i < localData.length; i++) {
        if (localData[i].ID == e) {
            if (localData[i].checkIn) {
                localData[i].checkIn = false;
            } else {
                localData[i].checkIn = true;
            }
        }
    }
//    $('#grid').data('kendoGrid')
    var newDataSource = new kendo.data.DataSource({
        data: localData
    });
    $("#grid").data("kendoGrid").setDataSource(newDataSource);
    localStorage["grid_data"] = JSON.stringify(localData);
    grilla("", newDataSource);
}

function cerrar() {
    //onClosex();
    $("#windowform").data("kendoWindow").close();
}

function conditionalSum() {
    var data = dataSource.data();
    var item, sum = 0;
    for (var idx = 0; idx < data.length; idx++) {
        item = data[idx];
        if (item.checkIn) {
            sum += item.ped__can__k;
        }
    }
    document.getElementById('pesoTotal').innerHTML = sum;
    return "";
}                