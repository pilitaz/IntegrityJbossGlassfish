/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
                        
});

$(document).ready(function() {    
    anoLiquidacion();
    $(window).trigger("resize");
    var data = [
        { productName: "QUESO CABRALES", unitPrice: 21, qty: 5 },
        { productName: "ALICE MUTTON", unitPrice: 39, qty: 7 },
        { productName: "GENEN SHOUYU", unitPrice: 15.50, qty: 3 },
        { productName: "CHARTREUSE VERTE", unitPrice: 18, qty: 1 },
        { productName: "MASCARPONE FABIOLI", unitPrice: 32, qty: 2 },
        { productName: "VALKOINEN SUKLAA", unitPrice: 16.25, qty: 3 }
    ];
    var schema = {
        model: {
            productName: { type: "string" },
            unitPrice: { type: "number", editable: false },
            qty: { type: "number" }
        },
        parse: function (data) {
            $.each(data, function(){
                this.total = this.qty * this.unitPrice;
            });
            return data;
        }
    };
    var aggregate = [
        { field: "qty", aggregate: "sum" },
        { field: "total", aggregate: "sum" }
    ];
    var columns = [
        { field: "productName", title: "Product", footerTemplate: "Total"},
        { field: "unitPrice", title: "Price", width: 120},
        { field: "qty", title: "Pcs.", width: 120, aggregates: ["sum"], footerTemplate: "#=sum#" },
        { field: "total", title: "Total", width: 120, aggregates: ["sum"], footerTemplate: "#=sum#" }
    ];
    var grid = $("#grid").kendoGrid({
        editable: false,
        sortable: true,
        dataSource: {
            data: data,
            aggregate: aggregate,
            schema: schema,
        },
        columns: columns
    });
    
    $("#paper").kendoDropDownList({
        change: function() {
            $(".pdf-page")
                    .removeClass("size-a4")
                    .removeClass("size-letter")
                    .removeClass("size-executive")
                    .addClass(this.value());
        }
    });
});

function anoLiquidacion(){
    
    var obj = new sirConsultaAnoLiq();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipAnoLiq").kendoDropDownList({
        optionLabel: "Seleccione el año",
        dataTextField: "ano",
        dataValueField: "ano",
        template:'<div class="divElementDropDownList">#: data.ano #</div>',        
        change: nomina,
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ano",
                    fields: {
                        ano: {validation: {required: true}, type: 'string'}                        
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function nomina(){
    
    $("#ipNomina").removeClass();
    
    var obj = new sirConsultaNomina();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipNomina").kendoDropDownList({
        optionLabel: "Seleccione la nomina",
        dataTextField: "Descripcion",
        dataValueField: "nronomina",
        template:'<div class="divElementDropDownList">#: data.Descripcion #</div>',        
        change: comprobante,
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {  
                            var key1 = Object.keys(json)[0];
                            var key2 = Object.keys(json[key1])[1];                            
                            json[key1][key2][0].piiyear = $("#ipAnoLiq").val();
                            return JSON.stringify(json);                            
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {                        
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "nronomina",
                    fields: {
                        nronomina: {validation: {required: true}, type: 'string'},                        
                        Descripcion: {validation: {required: true}, type: 'string'},  
                        fechaliquidacion: {validation: {required: true}, type: 'string'}  
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function comprobante(){ 
    var comprobante;
    
    var obj = new sirComprobante();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];
    debugger
    var kendoDropDownListNomina = $("#ipNomina").data("kendoDropDownList");    
    var dataItem = kendoDropDownListNomina.dataSource._data[kendoDropDownListNomina.selectedIndex-1];
        
    json[key1][key2][0].piiyear = $("#ipAnoLiq").val();
    json[key1][key2][0].nronomina = $("#ipNomina").val();
    json[key1][key2][0].pidfecliq = dataItem.fechaliquidacion;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                comprobante = e;
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        } 
    }).done(function(e){                                          
        alert(JSON.parse(comprobante));
    });
}

function getPDF(selector) {
    kendo.drawing.drawDOM($(selector)).then(function(group){
        kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
    });
}
//
//$(document).ready(function() {
//    
//});


