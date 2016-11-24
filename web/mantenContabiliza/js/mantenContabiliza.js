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
    $('#outerWrapper').height(viewportHeight - 30);
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
    var obj = new sirconsultaMConta();
    var objRepo = obj.getjson();
    var urlRepo = obj.getUrlSir();
    var mapDataRepo = obj.getMapData();


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlRepo,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        objRepo["obj"] = [options];
                        return JSON.stringify(objRepo);
                    }
                } catch (e) {
                    alertDialog("Error en el servicio"+ e.message);
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapDataRepo];
                } else {
//                    alertDialog("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "rpt_id",
                fields: {
                    rpt_id: {validation: {required: true}, type: 'string'}
                }
            }
        }
    });
    $("#grid .k-grid-header").css('display', 'none');
    $(window).trigger("resize");
    $("#girdConta").kendoGrid({
        dataSource: dataSource,
        selectable: false,
        columns: [
            {command:
                        [
                            {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2on'></span></a>"}
                        ],
                title: "&nbsp;", width: "50px"},
            {field: "rpt_nom", title: "&nbsp;", width: "100%"},
            {command:
                        [
                            {name: "editar", text: " ", click: ClickEditar, template: "<a class='k-grid-editar'><span class='k-sprite re_editoff'></span></a>"},
                            {name: "destroyed", click: clickEliminar,template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite re_cerrar'></span></a>"}
                        ],
                width: "100px"}],
        editable: "popup"
    });
$("#grid .k-grid-header").css('display', 'none');
}

function ClickEditar(e){
    
}

function clickEliminar(e){
    
}