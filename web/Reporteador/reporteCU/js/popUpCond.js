/* global kendo */

var globalCmp = {};//guarda todos los campos disponibles en el reporte 
var globalCon = {};//guarda todos las condiciones disponibles en el reporte 
var globalCmpSelect = {};//guarda el campo que selecciono para la condicion 
var objConDel = [];
var objConAdd = [];
var objConEdit = [];
//var filtrosCampos = [];
var conciones = "";
var idIniCon = -1;
var cmp_ini = "";
var inputCon = [{
        "cmp_con_ono": "",
        "cmp_con_ope": "",
        "cmp_fin_nom": "",
        "cmp_ini": "",
        "cmp_ini_nom": "",
        "rpt_cmp_pos": sessionStorage.getItem("idDato"),
        "rpt_con_pos": "",
        "rpt_id": sessionStorage.getItem("idRepo")
    }];
function onloadPopUpCond() {
    globalCmp = {};//guarda todos los campos disponibles en el reporte 
    globalCon = {};//guarda todos las condiciones disponibles en el reporte 
    objConDel = [];
    objConAdd = [];
    objConEdit = [];
    //var filtrosCampos = [];
    conciones = "";
    idIniCon = -1;
    cmp_ini = "";
    $("cmpValoCond1").val();
    $("conOpeCond1").val();
    $("cmpValCond1").val();
    sessionStorage.setItem("opcFl", "Con");
    document.getElementById('tituloPopUp').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sessionStorage.getItem("cmpNom");
    $('#imgOpc').removeClass('re_compon').addClass('re_conon');
    $("#popUpCond").show();
    llenarComboCmp();//lleno el primer combo pero tambien miro si tiene condiciones y creo los respectyivos campos
//    crearComboCmp("cmpValCond1");
}
/**
 * funcion invocada por el boton ok
 * @returns {undefined}
 */
function clicBtnCerrar() {
    parent.reloadGrid();
}
/**
 * funcion que modifica un input en un combobox con ptodos los campos disponibles en el reporte
 * @returns {undefined}
 */
function llenarComboCmp() {
    var objRepo = getinputRestRepoGridCmp();
    var url = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();
    var mapDataCon = "eerep_rpt_con";

    var campo = $("#cmpValoCond1").kendoComboBox({
        filter: "contains",
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        select: select,
        dataBound: showConExt,
        dataSource: {
            transport: {
                read: {
                    async: false,
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objRepo["anx_cmp_id"] = [options];
                    return JSON.stringify(objRepo);
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        globalCmp = e[key1][mapData];
                        globalCon = e[key1][mapDataCon];
                        globalCmp = globalCmp.filter(function (obj) {
                            return obj.rpt_cmp_vis !== sessionStorage.getItem("cmpNom");
                        });
                        return globalCmp;
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cmp_id",
                    fields: {
                        rpt_cmp_vis: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (e) {
                alertDialogs(e.errorThrown);
            }
        },
    }).data("kendoComboBox");

}
/**
 * funcion para mnostrar las condiciones que ya vienen guardadas en el servicio
 * @param {type} e 
 * @returns {undefined}
 */
function showConExt(e) {
    $("#operaciones").empty();
    var obj = JSON.parse(sessionStorage.getItem("obj"));
    var idCon = obj.rpt_cmp_pos;
    var comboCmpIni = $("#" + "cmpValoCond1").data("kendoComboBox");
    var j = 0; // variable de bandera para buscar la primer ope de concion seleccionada
    if (globalCon) {
        for (var i = 0; i < globalCon.length; i++) {
            if (idCon == globalCon[i].rpt_cmp_pos) {
                if (j === 0) {
                    comboCmpIni.value(globalCon[i].cmp_ini_nom);
                    cmp_ini = globalCon[i].cmp_ini;
                    idIniCon = i;
                    crearComboOpe("conOpeCond1");
                    crearComboCmp("cmpValCond1");
                    var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
                    var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
                    conOpe0.value(globalCon[i].cmp_con_ope);
                    cmpVal0.value(globalCon[i].cmp_fin_nom);
                } else {
                    creaConcion(globalCon[i].rpt_con_pos, i);
                }
                j++;
            }
            /**
             * condicion en caso de que sea una condicion nueva y en base de datos ya tenga varias conbdiciones
             */
            if (j === 0) {
                $("#operaciones").empty();
                creaCmpDefecto();
                crearComboOpe("conOpeCond1");
                crearComboCmp("cmpValCond1");
                objConAdd.push("1");
                var cmpValo0 = $("#" + "cmpValoCond1").data("kendoComboBox");
                var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
                var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
                cmpValo0.value("");
                conOpe0.value(">");
                cmpVal0.value("");
            }
        }
    } else {
        $("#operaciones").empty();
        creaCmpDefecto();
        crearComboOpe("conOpeCond1");
        crearComboCmp("cmpValCond1");
        objConAdd.push("1");
        var cmpValo0 = $("#" + "cmpValoCond1").data("kendoComboBox");
        var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
        var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
        cmpValo0.value("");
        conOpe0.value(">");
        cmpVal0.value("");
    }
    creaCmpDefecto();
}

function crearImgCond(div, id, onclick) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "/Reporteador/images/espacio-95.png");
    x.setAttribute("class", "re_cerrar");
    x.setAttribute("id", id);
    x.setAttribute("onclick", "delCon(" + ("\"" + id + "\"") + ")");
    document.getElementById(div).appendChild(x);
}
/**
 * crea toda la estructura html para montar el input de operaciones y el input de campo o valores
 * @param {type} i
 * @param {type} imas
 * @returns {undefined}
 */
function creaConcion(i, imas) {
    $("#operaciones").append("<div  class = 'col-sm-1 ' ></div>");
    $("#operaciones").append("<div id=" + "divCon" + i + " class = 'col-sm-11  ' ></div>");
    $("#operaciones").append("<div  class = 'row' ></div>");
    crearBr("divCon" + i);

    $("#divCon" + i).append("<div id=" + "divConEsp" + i + " class = 'col-sm-4' ></div>");
    $("#divCon" + i).append("<div id=" + "divConOpe" + i + " class = 'col-sm-3' ></div>");
    $("#divCon" + i).append("<div id=" + "divConCmpVal" + i + " class = 'col-sm-5' ></div>");

//    $("#divFiltr" + i).append("<div id=" + "divFiltrImg" + i + " class = 'col-sm-3' ></div>");


    crearLabel("opeLabel" + i, "Operación:", "divConOpe" + i);
    crearBr("divConOpe" + i);
    crearInput("conOpeCond" + i, "divConOpe" + i);
    document.getElementById("conOpeCond" + i).style = "width: 80%";
    crearComboOpe("conOpeCond" + i);

    crearLabel("cmpValLabel" + i, "Campo o valor:", "divConCmpVal" + i);
    crearBr("divConCmpVal" + i);
    crearInput("cmpValCond" + i, "divConCmpVal" + i);
    document.getElementById("cmpValCond" + i).style = "width: 70%";
    crearComboCmp("cmpValCond" + i);

    crearLabel("", "", "divConEsp" + i);
    crearBr("divConEsp" + i);
    crearImgCond("divConCmpVal" + i, i);

    crearBr("divCon" + i);
    if (globalCon) {
        if ((globalCon[imas])) {
            if (globalCon[imas].cmp_con_ope !== "") {
                var comboOpe = $("#" + "conOpeCond" + i).data("kendoComboBox");
                if (globalCon[imas].cmp_con_ope == "__") {
                    globalCon[imas].cmp_con_ope = "-";
                }
                comboOpe.value(globalCon[imas].cmp_con_ope);
            }
            if (globalCon[imas].cmp_fin_nom !== "") {
                var comboCmp = $("#" + "cmpValCond" + i).data("kendoComboBox");
                comboCmp.value(globalCon[imas].cmp_fin_nom);
            }
        }
    }

}
/**
 * modifica un input y lo conbierte en un combobox con la lista de los campos disponiblers en el reporte seleccionado
 * @param {type} id
 * @returns {undefined}
 */
function crearComboOpe(id) {
    $("#" + id).kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {text: "Mayor", value: ">"},
            {text: "Menor", value: "<"},
            {text: "Igual", value: "="},
            {text: "Mayor Igual", value: ">="},
            {text: "Menor Igual", value: "<="}
        ],
        filter: "contains",
        suggest: true,
        index: 0,
        select: select

    });
}
/**
 * en caso de seleccionar una opcion en la lista de operaciones se cambia el item de 
 * @param {type} e
 * @returns {undefined}
 */
//function selectComboValIni(e) {
//    if (idIniCon !== -1) {
//        var dataItem1 = this.dataItem(e.item.index());
//
//        var id = globalCon[idIniCon].rpt_con_pos;
//        var inputCon1 = JSON.parse(JSON.stringify(inputCon));
//        var selected = $("#cmpValCond").data("kendoComboBox").dataSource._data[$("#cmpValCond").data("kendoComboBox").selectedIndex];
//        cmp_ini = dataItem1.anx_nom;
//        inputCon1[0].cmp_ini = dataItem1.anx_nom;
//        inputCon1[0].cmp_ini_nom = dataItem1.cmp_dsc;
//
//        var selected = $("#conOpeCond" + id).data("kendoComboBox").dataSource._data[$("#conOpeCond" + id).data("kendoComboBox").selectedIndex];
//        inputCon1[0].cmp_fin_nom = globalCon[idIniCon].cmp_fin_nom;
//        inputCon1[0].cmp_con_ope = globalCon[idIniCon].cmp_con_ope;
//        inputCon1[0].rpt_con_pos = globalCon[idIniCon].rpt_con_pos;
//        sendAjax(inputCon1, "PUT");
//    }
//}
function select(e) {
    var dataItem1 = this.dataItem(e.item.index());
    var numberPattern = /\d+/g;
    var id = e.sender.element[0].id;
    var id = id.match(numberPattern)[0];
    var inputCon1 = JSON.parse(JSON.stringify(inputCon));
    if ((e.sender.element[0].id.indexOf("new") === -1) && (objConAdd.indexOf(id) === -1) && (objConEdit.indexOf(id) === -1)) {
        objConEdit.push("id");
    }
//    if (e.sender.element[0].id === "conOpe1000000") {
//        addConc(dataItem1.text);
//    } else if (e.sender.element[0].id.indexOf("new") === -1) {
//        if ((globalCon[idIniCon].rpt_con_pos == id)) {
////            var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
//            inputCon1[0].cmp_ini = cmp_ini;
//            inputCon1[0].cmp_ini_nom = $("#cmpVal").val();
//        }
//        var selected = $("#conOpe" + id).data("kendoComboBox").dataSource._data[$("#conOpe" + id).data("kendoComboBox").selectedIndex];
//        inputCon1[0].cmp_fin_nom = $("#cmpVal" + id).val();
//        inputCon1[0].cmp_con_ope = dataItem1.value;
//        inputCon1[0].rpt_con_pos = id;
//        sendAjax(inputCon1, "PUT");
//    }

}

function addConc() {
    var length = $("#operaciones").find('.col-sm-11 ').length + 1;

    var numberPattern = /\d+/g;
    var id = objConAdd[objConAdd.length - 1];
    if (objConAdd.length !== 0) {
        length = parseInt(id.match(numberPattern)[0]) + 1;
    }
    objConAdd.push("new" + length);
    var e = "new" + length;
    $("#divCon1000000").remove();
    creaConcion(e, e);
    creaCmpDefecto();
}

function creaCmpDefecto() {
    if (!document.getElementById("divCon1000000")) {
        creaConcion(1000000, 1000000);
        $("#cmpValCond1000000").data("kendoComboBox").enable(false);
        $("#conOpeCond1000000").data("kendoComboBox").enable(false);
        $('#1000000').unbind('click');
        document.getElementById("divCon1000000").classList.add("divNewFun");
//        crearBr("1000000");
        crearBr("divCon1000000");
    }
}


function crearComboCmp(id) {
    $("#" + id).kendoComboBox({
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        dataSource: globalCmp,
//        close: saveElemCU,
        filter: "contains",
        select: select

    });
}

function saveElemCUCond() {

//    var numberPattern = /\d+/g;
//    var id = e.sender.element[0].id;
//    var id = id.match(numberPattern)[0];
//    var idnew = "";
//    var cmpVal = "";
//    var iniconcmp = $("#Campos").find('.col-sm-12 .row')["0"].id.match(numberPattern)[0];
    if (($("#cmpValoCond1").val() !== "") && ($("#cmpValdef2").val() !== "")) {
        var cmpVal = $("#cmpValoCond1").data("kendoComboBox").dataSource._data[$("#cmpValoCond1").data("kendoComboBox").selectedIndex];
        var inputCon1 = [];
        if (objConDel.length > 0) {
            for (var i = 0; i < objConDel.length; i++) {
//                if((i === 0)&&(i < objConDel.length)&&(1 === 1)){}
//                var id = objConDel[i];
                var pos = objConDel[i];
//                if (id.split("new")[0] === "1") {
//                    pos = id;
//                } else {
//                    pos = id.split("new")[1];
//                }
                var id = objConDel[i];
                inputCon1.push({
                    "cmp_con_ono": "",
                    "cmp_con_ope": "",
                    "cmp_fin_nom": "",
                    "cmp_ini": cmpVal.anx_nom,
                    "cmp_ini_nom": cmpVal.cmp_dsc,
                    "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                    "rpt_con_pos": pos,
                    "rpt_id": sessionStorage.getItem("idRepo")
                });
//                            sendAjax(inputCon1, "POST");
            }
            sendAjaxCond(inputCon1, "DELETE");
        }


        if (objConAdd.length > 0) {
            inputCon1 = [];
            for (var i = 0; i < objConAdd.length; i++) {
                var cmp_ini = "";
                var id = objConAdd[i];
                var pos = "";
                if (id.split("new")[0] === "1") {
                    pos = id;
                } else {
                    pos = id.split("new")[1];
                }
                if ((pos === "1") && (i === 0)) {
                    cmp_ini = cmpVal.anx_nom;
                    var obj = JSON.parse(sessionStorage.getItem("obj"));
                    obj["rpt_cmp_con"] = true;
                    sendAjax2([obj], "PUT");//paso el nodo codiciones del campo seleccionado a true
                    i++;
                }
                inputCon1.push({
                    "cmp_con_ono": "",
                    "cmp_con_ope": $("#conOpeCond" + id).data("kendoComboBox").value(),
                    "cmp_fin_nom": $("#cmpValCond" + id).val(),
                    "cmp_ini": cmp_ini,
                    "cmp_ini_nom": cmpVal.cmp_dsc,
                    "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                    "rpt_con_pos": pos,
                    "rpt_id": sessionStorage.getItem("idRepo")
                });

            }
            ;
            sendAjaxCond(inputCon1, "POST");
        }
        if (objConEdit.length > 0) {
            inputCon1 = [];
            for (var i = 0; i < objConEdit.length; i++) {
                var id = objConAdd[i];
                var cmp_ini = "";
                var pos = "";
                if (id.split("new")[0] === "1") {
                    pos = id;
                } else {
                    pos = id.split("new")[1];
                }
                if ((pos === 1) && (i === 0)) {
                    cmp_ini = cmpVal.anx_nom;
                    i++;
                }
                var id = objConEdit[i];
                inputCon1.push({
                    "cmp_con_ono": "",
                    "cmp_con_ope": $("#conOpeCond" + id).data("kendoComboBox").value(),
                    "cmp_fin_nom": $("#cmpValCond" + id).val(),
                    "cmp_ini": cmp_ini,
                    "cmp_ini_nom": cmpVal.cmp_dsc,
                    "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                    "rpt_con_pos": pos,
                    "rpt_id": sessionStorage.getItem("idRepo")
                });
                //            sendAjax(inputCon1, "PUT");
            }
        }

    }

//    var inputCon1 = JSON.parse(JSON.stringify(inputCon));
//    if (($("#cmpVal").val() !== "")&&($("#cmpValdef2").val() !== "")) {
//        cmpVal = $("#cmpVal" + id).context.activeElement.value;
////            blokWin();
//        var obj = JSON.parse(sessionStorage.getItem("obj"));
//        var inputCmpCon = getinputRestCmpCud();
////            inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_vis = $("#nomCon").val();
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_id = obj.anx_cmp_id;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_lkp = obj.anx_cmp_lkp;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_vsb = obj.anx_cmp_vsb;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_nom = obj.anx_nom;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_bloq = obj.cmp_bloq;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_brk = obj.cmp_brk;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_dsc = obj.cmp_dsc;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_id = obj.cmp_id;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_inquery = obj.cmp_inquery;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_nom = obj.cmp_nom;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_ssm = obj.cmp_ssm;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_sum = obj.cmp_sum;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_td = obj.cmp_td;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rep_anx_cmp_idc = obj.rep_anx_cmp_idc;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fil = obj.rpt_cmp_fil;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fun = obj.rpt_cmp_fun;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_gru = obj.rpt_cmp_gru;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_pos = obj.rpt_cmp_pos;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_col = obj.rpt_cmp_col;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_pro = obj.rpt_cmp_pro;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_sum = obj.rpt_cmp_sum;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_vis = obj.rpt_cmp_vis;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_id = obj.rpt_id;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].transf = obj.transf;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].piindicador = obj.piindicador;
//        inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_con = true;
////            sendAjaxAddCmpCon(inputCmpCon.dsSICUDRep_rpt.eerep_rpt_cmp, "PUT");
////            inputCon1 = JSON.parse(JSON.stringify(inputCon));
////            desBlokWin();
//
//        if (e.sender.element[0].id.indexOf("new") !== -1) {
//            if ((id === "1") || (idnew === 1) || (iniconcmp == id)) {
//                var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
//                cmp_ini = selected.anx_nom;
//                inputCon1[0].cmp_ini = selected.anx_nom;
//                inputCon1[0].cmp_ini_nom = selected.rpt_cmp_vis;
//            }
//            cmpVal = $("#cmpValnew" + id).context.activeElement.value;
//            inputCon1[0].cmp_fin_nom = cmpVal;
//            inputCon1[0].cmp_con_ope = $("#conOpenew" + id).data("kendoComboBox").value();
//            inputCon1[0].rpt_con_pos = id;
////            sendAjax(inputCon1, "POST", "new" + id);
//            if (objConAdd !== "") {
//                globalCon.push(objConAdd);
//            }
//        } else {
//            if ((id === iniconcmp)) {
//                var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
//                inputCon1[0].cmp_ini = cmp_ini;
//                inputCon1[0].cmp_ini_nom = $("#cmpVal").val();
//            }
//            cmpVal = $("#cmpValnew" + id).context.activeElement.value;
//            inputCon1[0].cmp_fin_nom = cmpVal;
//            inputCon1[0].cmp_con_ope = $("#conOpe" + id).data("kendoComboBox").value();
//            inputCon1[0].rpt_con_pos = id;
////            sendAjax(inputCon1, "PUT");
//        }
////        
//    }
}

function delCon(e) {

    var id = e;
    var numberPattern = /\d+/g;
    var idNum = id.match(numberPattern)[0];
    if (idNum !== "1000000") {
        if (objConAdd.indexOf("new" + idNum) !== -1) {
            objConAdd.splice(objConAdd.indexOf("new" + idNum), 1);
        } else {
            objConDel.push(id);
        }
        document.getElementById("divCon" + e).remove();
    }


//    var inputCon1 = JSON.parse(JSON.stringify(inputCon));
////    var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
//    inputCon1[0].cmp_ini = cmp_ini;
//    inputCon1[0].cmp_ini_nom = $("#cmpVal").val();
//    inputCon1[0].cmp_fin_nom = $("#cmpVal" + id).val();
//    inputCon1[0].cmp_con_ope = $("#conOpe" + id).data("kendoComboBox").value();
//    inputCon1[0].rpt_con_pos = idNum;
//    if (((idNum == 1) || (globalCon[idIniCon].rpt_con_pos == idNum)) && (globalCon[idIniCon + 1])) {
//        var idIni = $("#Campos").find('.col-sm-12 .row')["0"].id;
//        idIniCon = idIniCon + 1;
//        var idIni = idIni.match(numberPattern)[0];
//        var inputCon2 = JSON.parse(JSON.stringify(inputCon));
////        var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
//        inputCon2[0].cmp_ini = cmp_ini;
//        inputCon2[0].cmp_ini_nom = $("#cmpVal").val();
//        inputCon2[0].cmp_fin_nom = globalCon[idIniCon].cmp_fin_nom;
//        inputCon2[0].cmp_con_ope = globalCon[idIniCon].cmp_con_ope;
//        inputCon2[0].rpt_con_pos = globalCon[idIniCon].rpt_con_pos;
//        sendAjax(inputCon2, "PUT");
//    }
//
//    sendAjax(inputCon1, "DELETE");

}

function crearBr(div) {
    var mybr = document.createElement('br');
    document.getElementById(div).appendChild(mybr);
}

function sendAjaxCond(data, verHtml, oldId) {
    if (data[0].cmp_con_ope === "Mayor") {
        data[0].cmp_con_ope = ">";
    } else if (data[0].cmp_con_ope === "Menor") {
        data[0].cmp_con_ope = "<";
    } else if (data[0].cmp_con_ope === "Igual") {
        data[0].cmp_con_ope = "=";
    } else if (data[0].cmp_con_ope === "Mayor Igual") {
        data[0].cmp_con_ope = ">=";
    } else if (data[0].cmp_con_ope === "Menor Igual") {
        data[0].cmp_con_ope = "<=";
    }
//    displayLoading("#operaciones");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_con";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid,
                }
            ],
            "eerep_rpt_con": data,
        }
    }
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(obj),
        url: urlServ,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            bandAlert = 0;
            alertDialogs("Error al consumir el servicio de CrearConciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            if (verHtml === "POST") {
                var key1 = Object.keys(jsonResp)[0];
                var id = jsonResp[key1].eerep_rpt_con[0].rpt_con_pos;
                globalCon.push(jsonResp[key1].eerep_rpt_con[0]);
                replaceIdEle(oldId, id);
                cerrarCustomPopUp();
//                closeLoading("#operaciones");
            }

        } else {
            bandAlert = 0;
//            closeLoading("#operaciones");
            alertDialogs("Problemas con el creación de conciones .\n" + permitirIngreso);
        }

    });

}
function sendAjaxAddCmpCon(data, verHtml) {
    if (verHtml !== "POST") {


        var obj = getinputRestCmpCud();
        var urlServ = geturlRestCmpCud();
        obj = {
            "dsSICUDRep_rpt": {
                "eeDatos": [
                    {
                        "picusrcod": user,
                        "picfiid": fiid,
                    }
                ],
                "eerep_rpt_cmp": data,
            }
        }
        var jsonResp = "";
        var permitirIngreso = "";
        $.ajax({
            type: verHtml,
            data: JSON.stringify(obj),
            url: urlServ,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                parent.errorPopUp("Error al consumir el servicio de CrearConciones" + e.status + " - " + e.statusText);
            }
        }).done(function () {
            if (permitirIngreso == '"OK"') {
                closeLoading("#operaciones");
            } else {
                closeLoading("#operaciones");
                parent.errorPopUp("Problemas con el creación de conciones .\n" + permitirIngreso);
            }

        });
//    displayLoading("#operaciones");
    }

}
function replaceIdEle(idOld, idNew) {

    document.getElementById("divCon" + idOld).id = "divCon" + idNew;
    document.getElementById("divConOpe" + idOld).id = "divConOpe" + idNew;
    document.getElementById("opeLabel" + idOld).id = "opeLabel" + idNew;
    document.getElementById("conOpe" + idOld).id = "conOpe" + idNew;
    document.getElementById("divConCmpVal" + idOld).id = "divConCmpVal" + idNew;
    document.getElementById("cmpValLabel" + idOld).id = "cmpValLabel" + idNew;
    document.getElementById("cmpVal" + idOld).id = "cmpVal" + idNew;
    document.getElementById("divConEsp" + idOld).id = "divConEsp" + idNew;
    document.getElementById(idOld).setAttribute('onclick', "delCon(" + ("\"" + idNew + "\"") + ")");
    document.getElementById(idOld).id = idNew;
}




