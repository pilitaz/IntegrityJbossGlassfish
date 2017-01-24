
/* global kendo */

var globalCmp = {};
var globalFun = [];
var objFunDel = [];
var objFunAdd = "";
//var filtrosCampos = [];
var funciones = "";
var idIniFun = -1;
var cmp_ini = "";
var inputFun = [{
        "cmp_fin_nom": "",
        "cmp_fun_ope": "",
        "cmp_ini": "",
        "cmp_ini_nom": "",
        "piindicador": "",
        "rpt_cmp_pos": sessionStorage.getItem("idFun"),
        "rpt_fun_nom": "",
        "rpt_fun_pos": "",
        "rpt_id": sessionStorage.getItem("idRepo")
    }];
$(document).ready(function () {
    createStyleSheet();
//    document.getElementById("titulo").innerHTML = sessionStorage.getItem("nomFun");
    document.getElementById('subtitulo').innerHTML = "<br>Agregar una función   " + sessionStorage.getItem("nomFun");
    document.getElementById('labelTexto').innerHTML = "" +
            "El campo función te premite generar  " +
            "una columna en tu reporte con una " +
            "función matemática como multiplicar, " +
            "dividir, sumar y restar a partir de uno o " +
            "mas campos previamente agregados al " +
            "reporte. " +
            "<br><br>Ejemplo:<br> " +
            "Para un cambio de divisa se podrá " +
            "agregar un campo función, escoger el " +
            "campo valor, escoger la función " +
            "multiplicar y agregar la tasa " +
            "representativa. ";
    $("#nomFun").val(sessionStorage.getItem("nomFun"));
    $("#nomFun").kendoMaskedTextBox();
    llenarComboCmp();
    crearBr("botones");
    crearButton("btnSaveFiltros", "OK", "botones", "k-primary");
    $("#btnSaveFiltros").kendoButton({
        click: clicBtnCerrar
    });
});
function clicBtnCerrar() {
    parent.cerrarWindow();
}
function llenarComboCmp() {
    var objRepo = getinputRestRepoGridCmp();
    var url = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();
    var mapDataFun = "eerep_rpt_fun";

    var campo = $("#cmpVal").kendoComboBox({
        filter: "contains",
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        select: selectComboValIni,
        dataBound: showFunExt,
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
                        globalFun = e[key1][mapDataFun];
                        globalCmp = globalCmp.filter(function (obj) {
                            return obj.rpt_cmp_vis !== sessionStorage.getItem("nomFun");
                        });
                        return globalCmp;
                    } else {
                        alertDialog(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cmp_id",
                    fields: {
                        rpt_cmp_vis: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        },
    }).data("kendoComboBox");

}
function showFunExt(e) {
    var idFun = sessionStorage.getItem("idFun");
    var comboCmpIni = $("#" + "cmpVal").data("kendoComboBox");
    var j = 0; // variable de bandera para buscar la primer ope de funcion seleccionada
    if (globalFun) {

        for (var i = 0; i < globalFun.length; i++) {
            if (idFun == globalFun[i].rpt_cmp_pos) {
                if (j === 0) {
                    comboCmpIni.value(globalFun[i].cmp_ini_nom);
                    cmp_ini = globalFun[i].cmp_ini;
                    idIniFun = i;
                }
                creaFuncion(globalFun[i].rpt_fun_pos, i);
                j++;
            }
        }
    }
    creaCmpDefecto();
}

function crearImg(div, id, onclick) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "/Reporteador/images/espacio-95.png");
    x.setAttribute("class", "re_cerrar");
    x.setAttribute("id", id);
    x.setAttribute("onclick", "delFun(" + ("\"" + id + "\"") + ")");
    document.getElementById(div).appendChild(x);
}
function creaFuncion(i, imas) {
    $("#operaciones").append("<div id=" + "divFun" + i + " class = 'col-sm-12 row ' ></div>");
    crearBr("divFun" + i);
    $("#divFun" + i).append("<div id=" + "divFunOpe" + i + " class = 'col-sm-3' ></div>");
    $("#divFun" + i).append("<div id=" + "divFunCmpVal" + i + " class = 'col-sm-6' ></div>");
    $("#divFun" + i).append("<div id=" + "divFunEsp" + i + " class = 'col-sm-3' ></div>");
//    $("#divFiltr" + i).append("<div id=" + "divFiltrImg" + i + " class = 'col-sm-3' ></div>");


    crearLabel("opeLabel" + i, "Operación:", "divFunOpe" + i);
    crearBr("divFunOpe" + i);
    crearInput("funOpe" + i, "divFunOpe" + i);
    document.getElementById("funOpe" + i).style = "width: 70%";
    crearComboOpe("funOpe" + i);

    crearLabel("cmpValLabel" + i, "Campo o valor:", "divFunCmpVal" + i);
    crearBr("divFunCmpVal" + i);
    crearInput("cmpVal" + i, "divFunCmpVal" + i);
    document.getElementById("cmpVal" + i).style = "width: 70%";
    crearComboCmp("cmpVal" + i);

    crearLabel("", "", "divFunEsp" + i);
    crearBr("divFunEsp" + i);
    crearImg("divFunEsp" + i, i);

    crearBr("divFun" + i);
    if (globalFun) {
        if ((globalFun[imas])) {
            if (globalFun[imas].cmp_fun_ope !== "") {
                var comboOpe = $("#" + "funOpe" + i).data("kendoComboBox");
                if (globalFun[imas].cmp_fun_ope == "__") {
                    globalFun[imas].cmp_fun_ope = "-";
                }
                comboOpe.value(globalFun[imas].cmp_fun_ope);
            }
            if (globalFun[imas].cmp_fin_nom !== "") {
                var comboCmp = $("#" + "cmpVal" + i).data("kendoComboBox");
                comboCmp.value(globalFun[imas].cmp_fin_nom);
            }
        }
    }

}
function crearComboOpe(id) {
    $("#" + id).kendoComboBox({
        dataTextField: "text",
        dataValueField: "text",
        dataSource: [
            {text: "+"},
            {text: "-"},
            {text: "*"},
            {text: "/"}
        ],
        filter: "contains",
        suggest: true,
        index: 0,
        select: selectComboOpe

    });
}
function selectComboValIni(e) {
    if (idIniFun !== -1) {
        var dataItem1 = this.dataItem(e.item.index());

        var id = globalFun[idIniFun].rpt_fun_pos;
        var inputFun1 = JSON.parse(JSON.stringify(inputFun));
        var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
        cmp_ini = dataItem1.anx_nom;
        inputFun1[0].cmp_ini = dataItem1.anx_nom;
        inputFun1[0].cmp_ini_nom = dataItem1.cmp_dsc;

        var selected = $("#funOpe" + id).data("kendoComboBox").dataSource._data[$("#funOpe" + id).data("kendoComboBox").selectedIndex];
        inputFun1[0].cmp_fin_nom = globalFun[idIniFun].cmp_fin_nom;
        inputFun1[0].cmp_fun_ope = globalFun[idIniFun].cmp_fun_ope;
        inputFun1[0].rpt_fun_pos = globalFun[idIniFun].rpt_fun_pos;
        sendAjax(inputFun1, "PUT");
    }


}
function selectComboOpe(e) {
    var dataItem1 = this.dataItem(e.item.index());
    var numberPattern = /\d+/g;
    var id = e.sender.element[0].id;
    var id = id.match(numberPattern)[0];
    var inputFun1 = JSON.parse(JSON.stringify(inputFun));
    if (e.sender.element[0].id === "funOpe1000000") {
        addFunc(dataItem1.text);
    } else if (e.sender.element[0].id.indexOf("new") === -1) {
        if ((globalFun[idIniFun].rpt_fun_pos == id)) {
//            var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
            inputFun1[0].cmp_ini = cmp_ini;
            inputFun1[0].cmp_ini_nom = $("#cmpVal").val();
        }
        var selected = $("#funOpe" + id).data("kendoComboBox").dataSource._data[$("#funOpe" + id).data("kendoComboBox").selectedIndex];
        inputFun1[0].cmp_fin_nom = $("#cmpVal" + id).val();
        inputFun1[0].cmp_fun_ope = dataItem1.text;
        inputFun1[0].rpt_fun_pos = id;
        sendAjax(inputFun1, "PUT");
    }

}

function addFunc(select) {
    var length = $("#Campos").find('.col-sm-12 .row').length + 1;
    var e = "new" + length;
    creaFuncion(e, e);
    $("#funOpe" + e).data("kendoComboBox").value(select);
    $("#divFun1000000").remove();
    creaCmpDefecto();
}
function creaCmpDefecto() {
    if(document.getElementById("divFun1000000")){
        $("#divFun1000000").remove();
    }
    creaFuncion(1000000, 1000000);
        $("#cmpVal1000000").data("kendoComboBox").enable(false);
        document.getElementById("divFun1000000").classList.add("divNewFun");
        crearBr("1000000");
        crearBr("divFun1000000");
}


function crearComboCmp(id) {
    $("#" + id).kendoComboBox({
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        dataSource: globalCmp,
        close: saveElemCU,
        filter: "contains"
    });
}
function selectComboval(e) {
    var numberPattern = /\d+/g;
    if (isNumber(e.sende._prev)) {

    }
}
function saveElemCU(e) {

    var numberPattern = /\d+/g;
    var id = e.sender.element[0].id;
    var id = id.match(numberPattern)[0];
    var idnew = "";
    var cmpVal = "";
    var inifuncmp = $("#Campos").find('.col-sm-12 .row')["0"].id.match(numberPattern)[0];
    var inputFun1 = JSON.parse(JSON.stringify(inputFun));
    if (($("#cmpVal").val() !== "")) {
        cmpVal = $("#cmpVal" + id).context.activeElement.value;
        if (sessionStorage.getItem("idFun") === "10001") {
            blokWin();
            var inputCmpFun = getinputRestCmpCud();
            inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_vis = $("#nomFun").val();
            inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fun = true;
            sendAjaxAddCmpFun(inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp, "POST");
            inputFun1 = JSON.parse(JSON.stringify(inputFun));
            idnew = 1;
            desBlokWin();
        }
        if (e.sender.element[0].id.indexOf("new") !== -1) {
            if ((id === "1") || (idnew === 1) || (inifuncmp == id)) {
                var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
                if(selected){
                    cmp_ini = selected.anx_nom;
                    inputFun1[0].cmp_ini = selected.anx_nom;
                    inputFun1[0].cmp_ini_nom = selected.rpt_cmp_vis;
                }else{
                    cmp_ini = $("#cmpVal").val();
                inputFun1[0].cmp_ini = "";
                inputFun1[0].cmp_ini_nom = cmp_ini;
                }
            }
            cmpVal = $("#cmpValnew" + id).context.activeElement.value;
            inputFun1[0].cmp_fin_nom = cmpVal;
            inputFun1[0].cmp_fun_ope = $("#funOpenew" + id).val();
            inputFun1[0].rpt_fun_pos = id;
            sendAjax(inputFun1, "POST", "new" + id);
            if (objFunAdd !== "") {
                globalFun.push(objFunAdd);
            }
        } else {
            if ((id === inifuncmp)) {
                var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
                inputFun1[0].cmp_ini = cmp_ini;
                inputFun1[0].cmp_ini_nom = $("#cmpVal").val();
            }
            cmpVal = $("#cmpValnew" + id).context.activeElement.value;
            inputFun1[0].cmp_fin_nom = cmpVal;
            inputFun1[0].cmp_fun_ope = $("#funOpe" + id).val();
            inputFun1[0].rpt_fun_pos = id;
            sendAjax(inputFun1, "PUT");
        }
//        
    }
}

function delFun(e) {

    var id = e;
    var numberPattern = /\d+/g;
    var idNum = id.match(numberPattern)[0];

    var inputFun1 = JSON.parse(JSON.stringify(inputFun));
//    var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
    inputFun1[0].cmp_ini = cmp_ini;
    inputFun1[0].cmp_ini_nom = $("#cmpVal").val();
    inputFun1[0].cmp_fin_nom = $("#cmpVal" + id).val();
    inputFun1[0].cmp_fun_ope = $("#funOpe" + id).val();
    inputFun1[0].rpt_fun_pos = idNum;
    if (((idNum == 1) || (globalFun[idIniFun].rpt_fun_pos == idNum)) && (globalFun[idIniFun + 1])) {
        var idIni = $("#Campos").find('.col-sm-12 .row')["0"].id;
        idIniFun = idIniFun + 1;
        var idIni = idIni.match(numberPattern)[0];
        var inputFun2 = JSON.parse(JSON.stringify(inputFun));
//        var selected = $("#cmpVal").data("kendoComboBox").dataSource._data[$("#cmpVal").data("kendoComboBox").selectedIndex];
        inputFun2[0].cmp_ini = cmp_ini;
        inputFun2[0].cmp_ini_nom = $("#cmpVal").val();
        inputFun2[0].cmp_fin_nom = globalFun[idIniFun].cmp_fin_nom;
        inputFun2[0].cmp_fun_ope = globalFun[idIniFun].cmp_fun_ope;
        inputFun2[0].rpt_fun_pos = globalFun[idIniFun].rpt_fun_pos;
        sendAjax(inputFun2, "PUT");
    }

    sendAjax(inputFun1, "DELETE");

    document.getElementById("divFun" + e).remove();
}

function crearBr(div) {
    var mybr = document.createElement('br');
    document.getElementById(div).appendChild(mybr);
}

function sendAjax(data, verHtml, oldId) {
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_fun";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid,
                }
            ],
            "eerep_rpt_fun": data,
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
            parent.errorPopUp("Error al consumir el servicio de CrearFunciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
//            closeLoading("#operaciones");
            if (verHtml === "POST") {
                var key1 = Object.keys(jsonResp)[0];
                var id = jsonResp[key1].eerep_rpt_fun[0].rpt_fun_pos;
                if (globalFun) {
                    globalFun.push(jsonResp[key1].eerep_rpt_fun[0]);
                }
            }
            closeLoading("#operaciones");
        } else {
//            closeLoading("#operaciones");
            parent.errorPopUp("Problemas con el creación de funciones .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}
function sendAjaxAddCmpFun(data, verHtml) {
    displayLoading("#operaciones");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_fun";
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
        async: false,
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            parent.errorPopUp("Error al consumir el servicio de CrearFunciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            
            var key1 = Object.keys(jsonResp)[0];
            var id = jsonResp[key1].eerep_rpt_cmp[0].rpt_cmp_pos;
            sessionStorage.setItem("idFun", id);
            inputFun[0].rpt_cmp_pos = id;
            if (globalFun) {
                idIniFun = globalFun.length;
            } else {
                idIniFun = 0;
            }

        } else {
            closeLoading("#operaciones");
            parent.errorPopUp("Problemas con el creación de funciones .\n" + permitirIngreso);
        }

    });

}
function replaceIdEle(idOld, idNew) {

    document.getElementById("divFun" + idOld).id = "divFun" + idNew;
    document.getElementById("divFunOpe" + idOld).id = "divFunOpe" + idNew;
    document.getElementById("opeLabel" + idOld).id = "opeLabel" + idNew;
    document.getElementById("funOpe" + idOld).id = "funOpe" + idNew;
    document.getElementById("divFunCmpVal" + idOld).id = "divFunCmpVal" + idNew;
    document.getElementById("cmpValLabel" + idOld).id = "cmpValLabel" + idNew;
    document.getElementById("cmpVal" + idOld).id = "cmpVal" + idNew;
    document.getElementById("divFunEsp" + idOld).id = "divFunEsp" + idNew;
    document.getElementById(idOld).setAttribute('onclick', "delFun(" + ("\"" + idNew + "\"") + ")");
    document.getElementById(idOld).id = idNew;
}


function blokWin() {

    kendo.ui.progress($(document.body), true);
}
function desBlokWin() {
    kendo.ui.progress($(document.body), false);
}
