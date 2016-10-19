var dsfiles = new Object();
dsfiles.dsfiles = new Object();
dsfiles.dsfiles.eeDatos = new Array();
dsfiles.dsfiles.eeDatos[0] = new Object();
dsfiles.dsfiles.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsfiles.dsfiles.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
dsfiles.dsfiles.eeDatos[0].local_ip = sessionStorage.getItem("ipPrivada");
dsfiles.dsfiles.eeDatos[0].remote_ip = sessionStorage.getItem("ipPublica");        
console.log(JSON.stringify(dsfiles));

$(document).ready(function () {
    dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: ipServicios+baseServicio+"DocumentList",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'             
            },
            parameterMap: function (options, operation) {
                try{                    
                    if (operation === 'read') {                                
                        return JSON.stringify(dsfiles);
                    }                     
                } catch (e) {
                    kendo.alert(e.message);
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            data:"dsfiles.ttfiles",
            model: {
                fields: {
                    nomfile: { type: "string" },
                    tamfile: { type: "integer" },
                    fecfile: { type: "date:MM-dd-yyyy"}
                }
            }
        }
    });
    
    $("#grid").kendoGrid({
        dataSource: dataSource,
        change: onChange,
        selectable: "row",
        filterable: {
            mode: "row"            
        },        
        //height: 100%,        
        columns: [
            { 
                field: "nomfile", 
                title: "Documentos", 
                width: "auto", 
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "contains"
                    }
                } 
            }
        ]
    });
});

function onChange(arg) {    
    var selected = $.map(this.select(), function(item) {
        return $(item).text();
    });
    sessionStorage.setItem("documento", selected);
    var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length-1];
    
    var actions = new Array();
    actions[0] = new Object();
    actions[0].text = "Ver online";            
    actions[0].action = showFile;
    actions[1] = new Object();
    actions[1].text = "Original";
    actions[1].primary = "true";
    actions[1].action = getFile;
    if(tipoArchivo!=="pdf"){
        actions[2] = new Object();
        actions[2].text = "Como pdf";            
        actions[2].action = getFileAsPDF;
    }
    createDialog("Que desea hacer?", "El archivo seleccinado es "+selected+" que desea hacer ", "400px", "auto", true, true, actions);   
    
}
/**
 * Descarga el archivo en su formato original
 * @param {type} e
 * @returns {undefined}
 */
function getFile(e){    
    try{
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios+baseServicio+"GetDocument",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");                 
                sessionStorage.setItem("documentobase64",documentobase64);                
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function(){            
            var dataURI = "data:text/plain;base64,"+ sessionStorage.getItem("documentobase64");            
            kendo.saveAs({
                dataURI: dataURI,
                fileName: sessionStorage.getItem("documento")
            });

        });
    }catch(e){
        kendo.alert(e.message);
    }   
}

function getFileAsPDF(e){
    try{
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios+baseServicio+"DocumentAsPdf",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");                 
                sessionStorage.setItem("documentobase64",documentobase64);                
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function(){
            var dataURI = "data:text/plain;base64,"+ sessionStorage.getItem("documentobase64");
            archivo = archivo.replace(/.[a-z]+/g, ".pdf");            
            kendo.saveAs({
                dataURI: dataURI,
                fileName: archivo
            });
        });
    }catch(e){
        kendo.alert(e.message);
    }
}

function showFile(e){
    try{        
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
       //console.log("dsfiles\n"+JSON.stringify(dsfiles));
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios+baseServicio+"GetDocument",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");                 
                sessionStorage.setItem("documentobase64",documentobase64);                
            },
            error: function (e) {
                kendo.alert("Error" + JSON.stringify(e));
            }
        }).done(function(){
            var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length-1];            
            if (tipoArchivo==="pdf"){
                var dataURI = "data:application/pdf;base64,"+ sessionStorage.getItem("documentobase64");                
            }else if(tipoArchivo==="gif"||tipoArchivo==="jpeg"||tipoArchivo==="png"||tipoArchivo==="pjpeg"||tipoArchivo==="tiff"){
                var dataURI = "data:image/"+tipoArchivo+";base64,"+ sessionStorage.getItem("documentobase64");
            }
            else {
                var dataURI = "data:text/plain;base64,"+ sessionStorage.getItem("documentobase64");
            }            
            var a = document.createElement("a");
            a.target = "_blank";
            a.href = dataURI;
            a.click();
        });
    }catch(e){
        kendo.alert(e.message);
    }
}