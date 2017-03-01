/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jsonReporte = {};
var columnasRepo = [];
/**
 * funcion para renderizar el tamaño de la grilla, para que quede del tamaño de la pantalla
 * @param {type} param
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 45);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {
    document.getElementById("titulo").innerHTML = sessionStorage.getItem("nomRepo");

//    mostrarGrid();
    PopUpCondicion();
});
/**
 * funcion para exttraer todos las llaves de un obj y si tiene algún espacio cambiarlo para que lo entienda Kendo
 tabien quita los caracteres especiales y los convierte en un _ pero solo para la llaves ya que kendo no puede leerlo el json con dichos caracteres
 */
function obtkeysObj() {
    try {
        obj = jsonReporte.Reporte;
        var keyEspNone = "";
        var arrgloitemEsp = [];
        var numberPattern = /\s|\(|\)|'|\+|\-|\*|\/|\{|\}|\[|\]|\.|\,|\=|\¡|\!|\¿|\?|\$|\%/g;
        var changeObj = JSON.stringify(jsonReporte);
        for (var key in obj[0]) {//saca las llaves del json de entrada

            if (key.match(numberPattern)) {
                arrgloitemEsp.push(key);
                keyEspNone = key.replace(numberPattern, "_");
                key = {field: keyEspNone,
                    title: key
                };
            }
            columnasRepo.push(key);
        }
        for (var i = 0; i < arrgloitemEsp.length; i++) {
            var str = arrgloitemEsp[i].replace(numberPattern, "_");
            for (j = 0; j < jsonReporte.Reporte.length; j++) {
                jsonReporte.Reporte[j][str] = jsonReporte.Reporte[j][arrgloitemEsp[i]];
                delete jsonReporte.Reporte[j][arrgloitemEsp[i]];
            }
        }
    } catch (e) {

    }
}
/**
 * funcion para mostrar la grilla
 * @returns {undefined}
 */
function mostrarGrid() {
    columnasRepo = [];
    sendServicio();
    obtkeysObj();
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        toolbar: ["pdf", "excel"],
        pdf: {
            allPages: true,
            avoidLinks: true,
            paperSize: "A4",
            margin: {top: "2cm", left: "1cm", right: "1cm", bottom: "1cm"},
            landscape: true,
            repeatHeaders: true,
            template: $("#page-template").html(),
            scale: 0.8
        },
        excel: {
            fileName: "Kendo UI Grid Export.xlsx",
            proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
        dataSource: {
            data: jsonReporte.Reporte,
            schema: {
                model: {
                    fields: {
                    }
                }
            },
        },
        scrollable: true,
        sortable: true,
        filterable: true,
        groupable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: columnasRepo
    });
}
function sendServicio() {
    var verHtml = "POST";
    var obj = getinputRestRepoView();
    var urlServ = geturlRestRepoView();
    var mapData = getmapDataRestRepoView();

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(obj),
        url: urlServ,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].dsSIRRep_rpt.dsSIRrep_rpt.eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de CrearConciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            if (verHtml === "POST") {
                var key1 = Object.keys(jsonResp)[0];
                jsonReporte = jsonResp[key1].polcdata;
//                
            }

        } else {
            alertDialogs("Problemas con el creación de condciones .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}

function exportarExcel() {
    try {
//		var titulos=sessionStorage.getItem("nomrep");
        var titulos = "hola";
        titulos = obtkeysObj(jsonReporte.eeReporte);
        var cantidadReportes = parseInt(sessionStorage.getItem("cantreportes"));
        var divs = [];
        var wb = [];
        divs.push("#mrep" + (x + 1));
        wb.push("Hoja" + (x + 1) + "Workbook");
        for (var x = 0; x < cantidadReportes; x++) {

        }
//		for(var x=0;x<divs.length;x++){
//			$(divs[x]).data("kendoGrid").saveAsExcel();
//		}
        $("#grid").data("kendoGrid").saveAsExcel();
        $.when.apply(null, promises).then(
                function (productsWorkbook, ordersWorkbook) {
                    var entradas = Array.prototype.slice.call(arguments); //Dinamizo la parametrizacion de la funcion (Recibo cualquier cantidad de parametros, todos los pongo en entradas)
                    for (var n = 0; n < entradas.length; n++) {
                        window["Hoja" + (n + 1) + "Workbook"] = entradas[n];
                    }
                    var sheets = [];
                    for (var x = 0; x < entradas.length; x++) {
                        sheets.push(window["Hoja" + (x + 1) + "Workbook"].sheets[0]);
                    }
                    for (var x = 0; x < sheets.length; x++) {
                        sheets[x].title = "Reporte No. " + (x + 1);
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: sheets
                    });
                    // save the new workbook,b
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "MultipleReportV2.xlsx"
                    });
                });
    } catch (e) {
        alertDialogs("Funcion: exportarExcel,  Error:" + e.message);
    }
}

/**
 * funcion que pinta unna ventana popUp para deplegar el archico popUpCondiciones html 
 * @returns {undefined}
 */
function PopUpCondicion() {
//    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
//    var obj = this.dataItem($(e.currentTarget).closest("tr"));
    var tDato = "";
    var idDato = 13;
    var idCmpidFltr = 13;
    sessionStorage.setItem("tDato", JSON.stringify(tDato));
    sessionStorage.setItem("idDato", JSON.stringify(idDato));
    sessionStorage.setItem("cmpNom", "njxhc");
//    sessionStorage.setItem("obj", JSON.stringify(obj));sessionStorage.setItem("filtros", JSON.stringify(filtros));
    var ip = sessionStorage.getItem("ip");
    var puerto = sessionStorage.getItem("puerto");
    $("#window").append("<div id='windowVfltr1'></div>");
    $("#windowVfltr1").append("<div id='windowVfltr'></div>");
    var myWindow = $("#windowVfltr");
//            undo = $("#undo");
    function onClose() {
        document.getElementById("windowVfltr1").remove();
//            undo.fadeIn();
        mostrarGrid();
    }
    ;



    myWindow.kendoWindow({
        draggable: true,
        height: "50%",
        modal: true,
        resizable: false,
        title: "",
        width: "50%",
        content: "http://" + ip + ":" + puerto + "/Reporteador/html/reporteViewPopUpFltr.html",
        close: onClose
    }).data("kendoWindow").center().open();

}

/**
 * funcion llamada desde el archivo popupFunciones  para cerra la vbentana y para actualizar la grilla campos
 * @returns {undefined}
 */
function cerrarWindow() {
    $("#windowVfltr").data("kendoWindow").close();
//    onClose()
    mostrarGrid();
//    onClose();
}
/**
 * funcion llamada desde los popUp en caso de que se genere un error al consumir cualquiere servicio
 * @param {type} message
 * @returns {undefined}
 */
function errorPopUp(message) {
    $("#windowVfltr").data("kendoWindow").close();
//    onClose()
    alertDialogs(message);
    mostrarGrid();

}

/**
 * Funcion para mostrar el popup de filtros ben el evento click del boton de filtros
 * @returns {undefined}
 */
function clickFiltros(){
    PopUpCondicion();
}
