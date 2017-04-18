/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDocumentos=[];


$(document).ready(function() {   
 
    cargaListaDocumentosPagina();
    gridDocumentosPagina();
    
});



function cargaListaDocumentosPagina(){
    dataGridDocumentos=[];
    try{
        
        var objData = new sirConsultaDocumentos();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        
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
                dataGridDocumentos = e[key1][mapData];
            } else {
                alertDialogs(e[key1].eeEstados[0].Estado);
            } 
        });            
                
    } catch (e) {
        alertDialogs(e.message);
    }
}

function gridDocumentosPagina(){ 
    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
    
    var grid = $("#gridDocumentosPaginas").kendoGrid({
        dataSource: dataGridDocumentos,   
        height: gridheigth,
        selectable: true,   
        scrollable: "auto",
        filterable:true,
        columns: [
            {
                field: "doc_name",
                title: "Documentos",
            },
            {
                field: "doc_mod_date",
                title: "Última modificación",
            },
            { command: [                    
                    {name: "descargar", click: descargarArchivo, template: "<a class='k-grid-descargar'><span class='k-sprite po_downflecha'></span></a>"},
                    {name: "preview", click: detallesArchivo, template: "<a class='k-grid-preview'><span class='k-sprite po_preview'></span></a>"}
                ],
                width: "100px" 
            }],        
        editable: false        
    }).data("kendoGrid");
    
    function detallesArchivo(e){ 
        debugger
        e.preventDefault();
        var divGrilla = e.delegateTarget.id;
        var grilla = $("#"+divGrilla).data("kendoGrid");
        var item = grilla.dataItem(grilla.select());
        
        try{
            
            var objData = new sirDescargarDocumento();    
            var jsonSIRData = objData.getjson();
            var urlData = objData.getUrlSir();
            var mapData = objData.getmapSir()
            
            var key1 = Object.keys(jsonSIRData)[0];
            var key2 = Object.keys(jsonSIRData[key1])[1];  
            
            jsonSIRData[key1][key2][0].picfolderpath = item.doc_path;
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
                    
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                } 
            });     
        } catch (e) {
            alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
        }
    }
}


