
function ir_usuarios(){
    
    window.location = ("usuariosbpm.html");    
}



$(document).ready(function() {


$('body').css('display', 'none');

$('body').fadeIn(1000);


 
      
$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}

     var usr_name = sessionStorage.getItem("Userid_bpm");  
 document.getElementById("demo").innerHTML = usr_name;
 
    var consultar = new sirproceso();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
                        


                        var mapCud = "eebpm_proc";
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
                                        alert(e[key1].eeEstados[0].Estado);
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
                            }
                        });
                        //----------------------
        $("#procesos").kendoComboBox({
        dataTextField: "proc__name",
        dataValueField: "piidreg",
        placeholder: "Proceso...",
        dataSource: datasource,
        change: grupos
    });
    //-----------------------------------------------
                        
                        var consultarusr = new sirusuariobpm();
                        var datajsonusr = consultarusr.getjson();
                        var urlServiceusr = consultarusr.getUrlSir();
                        
                         
                        var NIT = sessionStorage.getItem("companyNIT");
                        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].piccia__nit = NIT;
                        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].picusr__bmp = usr_name;
                           
                        var mapCud = "eebpm_proc";
                        var datasourcex = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: urlServiceusr,
                                    dataType: "json",
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8"
                                },
                                
                                parameterMap: function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(datajsonusr);
                                    }
                                   
                                }
                                
                            },
                            batch: false,
                            severFiltering: true,                            
                            schema: {
                                data: function (e) {debugger
                                    var key1 = Object.keys(e)[0];
                                    if (e[key1].eeEstados[0].Estado === "OK") {
                                        var Json_usr = JSON.stringify(e[key1]); 
                                        sessionStorage.setItem("Json_Usrbpm",Json_usr);                                       
                                        return e[key1][mapCud];
                                    } else {
                                        alert(e[key1].eeEstados[0].Estado);
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
                            }
                        });
//--------------------------------------------------------------------------------
   
                        
    //---------------------------------------------------------

    
                            function grupos(){
 
                            var dropdownlist = $("#procesos").data("kendoComboBox");
                            var x = dropdownlist.value();
                            var y = dropdownlist.text();
                            

                          var consultar = new sirgrupos();
                          var datajson = consultar.getjson();
                          var urlService = consultar.getUrlSir();
                        
                        datajson.dsSIRbpm_grp.SIRbpm_grp[0].piidreg = x;
                        datajson.dsSIRbpm_grp.SIRbpm_grp[0].picproc__name = y;
                        

                        var mapCud = "eebpm_grp";
                        var datasource1 = new kendo.data.DataSource({
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
                                        //createDialog("Que desea hacer"+e[key1].eeEstados[0].Estado);
                                        alert(e[key1].eeEstados[0].Estado);
                                    }
                                },
                                model: {
                                    id: "proc__name",
                                    fields: {
                                        eebpm_grp:    {editable: false, nullable: false},
                                        grp__name:     {editable: false, nullable: false},
                                        piireggrp:     {editable: false, nullable: false}
                                    }
                                }
                            }
                        });
                        
        
        
        $("#grupos").kendoComboBox({
        dataTextField: "grp__name",
        dataValueField: "piireggrp",
        placeholder: "Proceso...",
        dataSource: datasource1,
        change: roles
        
            });
    }
    //--------------------------------------------------------------------------
    
    function roles(){
        
    }
            
    //---------------------------------------------------------------------------------
        
                            var grid1 = $("#gridproceso").kendoGrid({
                            dataSource: datasourcex,
                            selectable: true,
                            pageSize: 10,
                            scrollable: true,
                            sortable: true,
                            
                            detailInit: detailInit,
                            detailTemplate: kendo.template($("#template").html()),
                            
                            //navigatable: true,
                            columns: [
                                { field: "proc__name", title:"ID" }
                                ]
                        });
 
                function detailInit(e) {
                     
                     
                     
                     
                     
                    var detailRow = e.detailRow;
                    
                        var consultarusr = new sirusuariobpm();
                        var datajsonusr = consultarusr.getjson();
                        var urlServiceusr = consultarusr.getUrlSir();
                           var mapCud = "eebpm_grp";
                           
                             
                        var NIT = sessionStorage.getItem("companyNIT");
                        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].piccia__nit = NIT;
                        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].picusr__bmp = usr_name;
                           
                        var datasourcey = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: urlServiceusr,
                                    dataType: "json",
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8"
                                },
                                
                                parameterMap: function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(datajsonusr);
                                    }
                                   
                                }
                                
                            },
                            severFiltering: true,
                            serverPaging: true,
                            serverSorting: true,
                            filter: { field: "piireg", operator: "eq", value: e.data.piidreg },
                            schema: {
                                data: function (e) {
                                    var key1 = Object.keys(e)[0];
                                    if (e[key1].eeEstados[0].Estado === "OK") {
                                        
                                        return e[key1][mapCud];
                                    } else {
                                        alert(e[key1].eeEstados[0].Estado);
                                    }
                                },
                                model: {
                                    id: "proc__name",
                                    fields: {
                                        proc__name:    {editable: false, nullable: false},
                                        grp__name:     {editable: false, nullable: false},
                                        piireggrp:       {editable: false, nullable: false}
                                    }
                                }
                            }
                        });                                  

                             
                             var grillad = detailRow.find(".orders").kendoGrid({
                            dataSource:  datasourcey,                
                            
                            detailInit: detailInit1,
                            detailTemplate: kendo.template($("#template1").html()),
                            columns: [
                            {field: "grp__name",title:"gr"},
                            
                           {command: [{name: "detalle", text: " ", click: editar_usr, template: "<a class='k-grid-detalle'><span class='k-sprite po_detalle'></span></a>"},
                       ],width: "60px"}
                        ]
                    });
                    
                
                    
                }//fin funcion detalle1
                
                  function detailInit1(e) {debugger
                    
                   
                      var Jsonbpm=[];
                      Jsonbpm = sessionStorage.getItem("Json_Usrbpm");                                           
                        var Jsonbpm1  = JSON.parse(Jsonbpm);
                        var contador = Jsonbpm1.eebpm_rol;
                        contador = contador.length;
                
                    
                }
                
                
               
        function editar_usr(e){  debugger
            
        var Jsonbpm=[];
         Jsonbpm = sessionStorage.getItem("Json_Usrbpm");                                           
   
        var Jsonbpm1  = JSON.parse(Jsonbpm);
    var contador = Jsonbpm1.eebpm_rol;
    contador = contador.length;
    
    
    var cbh = document.getElementById('roles'); 
    var cb = document.createElement('input');
    
            cb.type = 'checkbox';

    cbh.appendChild(cb);
            
            
             e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
                        var id = this.dataItem($(e.currentTarget).closest("tr")).grp__name;
                        var id2 = this.dataItem($(e.currentTarget).closest("tr")).piireggrp;
                         var id3 = this.dataItem($(e.currentTarget).closest("tr")).proc__name;
                          var id4 = this.dataItem($(e.currentTarget).closest("tr")).piireg;
     

                          var consultar = new sirRoles();
                          var datajson = consultar.getjson();
                          var urlService = consultar.getUrlSir();
                        
                        datajson.dsSIRbpm_rol.SIRbpm_rol[0].piireg = id4;
                        datajson.dsSIRbpm_rol.SIRbpm_rol[0].picproc__name = id3;
                        
                        datajson.dsSIRbpm_rol.SIRbpm_rol[0].piireggrp = id2;
                        datajson.dsSIRbpm_rol.SIRbpm_rol[0].picgrp__name = id;
                        

                        var mapCud = "eebpm_rol";
                        var datasource2 = new kendo.data.DataSource({
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
                                        //createDialog("Que desea hacer"+e[key1].eeEstados[0].Estado);
                                        alert(e[key1].eeEstados[0].Estado);
                                    }
                                },
                                model: {
                                    id: "proc__name",
                                    fields: {
                                        rol__name:    {editable: false, nullable: false},
                                    }
                                }
                            }
                        });

                   $("#window").kendoWindow({
                        width: "600px",
                        title: "Roles",
                        visible: false,
                       
                        actions: [
                            "Pin",
                            "Minimize",
                            "Maximize",
                            "Close"
                        ]
                        
                      
                        
                    }).data("kendoWindow").center().open();
       
        } 
             
 
   
    
    
});// Fin document ready

   function CrearCampo(){

      var dropdownlist = $("#procesos").data("kendoComboBox");
      var x = dropdownlist.value();
      var y =0;

                        
      //grid1.addRow();
            
        }
        
        
            
            
       
        
