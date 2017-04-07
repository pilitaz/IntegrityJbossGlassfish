             function notificaciones(){  debugger             
                        
    var consultar = new sirNotificaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eesic_alt";
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
                id: "alt__id",
                fields: {
                    alt__cad:    {editable: false, nullable: false},
                    alt__dat:     {editable: false, nullable: false},
                    alt__ini:       {editable: false, nullable: false},
                    alt__msj:    {editable: false, nullable: false},
                    func__name:     {editable: false, nullable: false},
                    usr__cod__g:       {editable: false, nullable: false},
                    alt__tit:    {editable: false, nullable: false},
                    alt__url:     {editable: false, nullable: false},
                    alt__tip:       {editable: false, nullable: false},
                    
                }
            }
        }, error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    
        $("#gridNotificaciones").kendoGrid({
        dataSource: datasource,
        scrollable: false,       
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "imgNoti", text: " ",  template: "<a class='imgNoti'><img id='imgTransacciones' src='../images/transaccionesOff.png' /></a>",},
                           
           
            { field: "alt__msj", title: "",  hidden:false},
           ],                            
                            
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = datasource.data();
            changImgFunc(results);
        },
       
    });
 $("#gridNotificaciones .k-grid-header").css('display', 'none');
                        
                 
                 function changImgFunc(results) {debugger
                     
                     for (var i = 0; i < results.length; i++) {
                         //var nombre="spanplay"+results[i].alt__tip;
                         switch (results[i].alt__tip) {
                             case "procesos":
                                 document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/procesosRO.png";
//                                 document.getElementById("imgNoti"+results[i].alt__id).setAttribute("estado", "on");
                                 break;
                             case "reportes":
                                  document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/reportesRO.png";
                                 break;
                             
                         }                    
                         
                     }
                     
                 }
}             

             