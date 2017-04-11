/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDetalle=[];
var dataSource={};

$(document).ready(function() {   
    
    
});

function mostrarCustomPopUp(idcustomPopUp) {    
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUp(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow");
    $("#disable" ).remove();
}

function abrirCustomPopUp(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
        
    mostrarCustomPopUp(idCustomPopUp);
    cargarDocumentos();
    gridDocumentos();
 
}

function gridDocumentos(){    
    var grid = $("#gridDocumentoAd").kendoGrid({
        dataSource: dataGridDetalle,       
        selectable: true,   
        scrollable: "auto",
        columns: [
            {
                field: "doc_name",
                title: "Documentos",
            },
            { command: [                    
                    {name: "descargar", click: descargarArchivo, template: "<a class='k-grid-descargar'><span class='k-sprite po_downflecha'></span></a>"}
                ],
                width: "50px" 
            }],        
        editable: false        
    }).data("kendoGrid");
}

function cargarDocumentos(){
    dataGridDetalle=[];
    try{
        
        var objData = new sirConsultaDocumentosPorRuta();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        var key1 = Object.keys(jsonSIRData)[0];
        var key2 = Object.keys(jsonSIRData[key1])[1];  
        
        var ano = "2017";
        var mes = "01";
        var instacia = "3306"
              
        
        jsonSIRData[key1][key2][0].picfolderpath = "ECM\/"+sessionStorage.getItem("companyNIT")+"\/"+sessionStorage.getItem("portafolio")+"\/"+ano+"\/"+mes+"\/"+instacia;        
       
        
        $.ajax({
            async: false, 
            type: "POST",
            data: JSON.stringify(jsonSIRData),
            url: urlData,
            dataType: "json",        
            contentType: "application/json;",
            success: function (e) {  
                
            } 
        }).done(function(e){         
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK")) {            
                dataGridDetalle = e[key1][mapData];
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            } 
        });    

        
                
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
} 
 
 function descargarArchivo(e) {
     debugger
    e.preventDefault();
    var divGrilla = e.delegateTarget.id;
    var grilla = $("#"+divGrilla).data("kendoGrid");
    item = grilla.dataItem(grilla.select());
    
     try{
        
        var objData = new sirDescargarDocumento();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        var key1 = Object.keys(jsonSIRData)[0];
        var key2 = Object.keys(jsonSIRData[key1])[1];  
        
         jsonSIRData[key1][key2][0].picfolderpath = "ECM/800001541/3/2017/01/3306";
         jsonSIRData[key1][key2][0].picdocname =  item.doc_name;
       
        
        $.ajax({
            async: false, 
            type: "POST",
            data: JSON.stringify(jsonSIRData),
            url: urlData,
            dataType: "json",        
            contentType: "application/json;",
            success: function (e) {  
                
            } 
        }).done(function(e){         
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK")) {            
                kendo.saveAs({
                    dataURI: e[key1][mapData][0].polfile,
                    fileName: e[key1][mapData][0].picdocname
                });
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            } 
        });    

        
                
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}