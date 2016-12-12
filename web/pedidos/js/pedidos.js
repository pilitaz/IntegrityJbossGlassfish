/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Funcion para ajustar el alto de la grilla 
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 50);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {

//    document.getElementById("accessDiv").style.display = "none";
//    var url = sessionStorage.getItem("url");
//    createStyleSheet(url);
    grid();
});

/**
 * funcion para pintar la grilla
 * @returns {undefined}
 */
function grid() {
    var obj = new sirConsultaPedidos();
    var objRepo = obj.getjson();
    var urlRepo = obj.getUrlSir();
    var mapData = obj.getMapData();

    var objCU = new siCudPedidos();
    var objRepoD = objCU.getjson();
    var urlRepoD = objCU.getUrlSir();
    var mapDataRepoD = objCU.getMapData();
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlRepo,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            destroy: {
                url: urlRepoD,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        objRepo["obj"] = [options];
                        return JSON.stringify(objRepo);
                    }else if (operation === 'destroy') {
                        var key1 = Object.keys(objRepoD)[0];
                        objRepoD[key1][mapDataRepoD] = [options];
                        return JSON.stringify(objRepoD);
                    }
                } catch (e) {
                    alertDialogs("Error en el servicio"+ e.message);
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ped__num",
                fields: {
                    ped__num: {validation: {required: true}, type: 'string'},
                    ped__fec: {validation: {required: true}, type: 'string'},
                    ter__nit: {validation: {required: true}, type: 'string'},
//                    ter__nit: {validation: {required: true}, type: 'string'},
                }
            }
        }
    });
    $(window).trigger("resize");
    $("#gridPedidos").kendoGrid({
        dataSource: dataSource,
        dataBound: ondataBound,
        selectable: false,
        columns: [
            
            {field: "ped__num", title: "Número de Pedido"},
            {field: "ped__fec", title: "Fecha de Pedido"},
            {field: "ter__nit", title: "Nit"},
//            {field: "ter__nit", title: "&nbsp;"},
            {command:
                        [
                            {name: "aprovar", click: ClickAprov,template: "<a class='k-grid-aprovar' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"},
                            {name: "editar", text: " ", click: ClickEditar, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "destroyed", click: clickEliminar,template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "150px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
    });
//    $("#gridPedidos .k-grid-header").css('display', 'none');
}
function ondataBound(){
    
}
function crearPedido(){
  popUpPedidoCU();   
}
function ClickAprov(){
    
}
function ClickEditar(e){
    e = this.dataItem($(e.currentTarget).closest("tr"));
    debugger
    sessionStorage.setItem("regPedidos",JSON.stringify(e));
    popUpPedidoCU();
    
}

function clickEliminar(e){
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#gridPedidos").data("kendoGrid").dataItem($(e.target).closest("tr"));

        
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action = function () {
                var dataSource = $("#gridPedidos").data("kendoGrid").dataSource;
                dataSource.remove(dataItem);
                dataSource.sync();
                bandAlert = 0;
            };
            actions[1] = new Object();
            actions[1].text = "Cancelar";
            actions[1].action = function () {
                bandAlert = 0;
            };
            createDialog("Atención", "Esta seguro de eliminar el Reporte ---" + dataItem.rpt_nom + " ---?", "400px", "200px", true, true, actions);
       
    } catch (e) {
        $('#gridPedidos').data('kendoGrid').dataSource.read();
        $('#gridPedidos').data('kendoGrid').refresh();
    }
}
function popUpPedidoCU (){
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (50/100);
    
    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");
    
    function onCloseWindowItemFac() {
        document.getElementById("windowPedidoCabecera").remove();            
        undo.fadeIn();  
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Crear",
        content: sessionStorage.getItem("url")+ "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onCloseWindowItemFac
    }).data("kendoWindow").center().open();
}



