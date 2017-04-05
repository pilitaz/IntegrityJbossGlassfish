
$(document).ready(function() {
    
    $("#fileInput").kendoUpload({        
    });
     
    var base64;
    var fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {            
            base64 = reader.result;
            subirArchivo(base64,file);
        }        
        reader.readAsDataURL(file);	        
    });
     var consultar = new sirusuariobpm();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eeeebpm_proc";
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },         
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].piccia__nit=sessionStorage.getItem("companyNIT");
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].picusuario=sessionStorage.getItem("usuario");
                    return JSON.stringify(datajson);
                }
            }
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    proc__des:     {editable: false, nullable: false},
                    piidreg:       {editable: false, nullable: false}
                }
            }
        }, error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    $("#grid").kendoGrid({
        dataSource: datasource,
                            
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "play", text: " ",  template: "<a class='k-grid-bullet'><span class='k-sprite pro_bullet'></span></a>",width: "50px"},
                           
            { field: "proc__name", title: "Procesos",  hidden:false},
            {command:
                        [
                    {name: "proceso"},
      
                ],
                width: "220px"}],                            
        editable: "popup",
                            
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = datasource.data();
            changImgFunc(results);
        },
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
    
    
});

function subirArchivo(base64, file){
    
    base64 = base64.replace(/data:[a-z]+\/[a-z]+;base64,/g, "");
    
    var obj = new subirArchivos();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    //var mapData = obj.getMapData(); 
    
    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];                            
    json[key1][key2][0].pirfile = base64;
    json[key1][key2][0].picfilename = file.name;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            
        } 
    }).done(function(e){        
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {            
            parent.closePopUpSubirArchivo("Archivo subido correctamente");
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        }       
    });
}
