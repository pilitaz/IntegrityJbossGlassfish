
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
                {field: "grp__name",title:"Grupos"},
                            
                {command: [{name: "detalle", text: " ", click: editar_usr, template: "<a class='k-grid-detalle'><span class='k-sprite po_detalle'></span></a>"},
                    ],width: "60px"}
            ]
        });
                    
                
                    
    }//fin funcion detalle1
                
    function editar_usr(e){debugger
         e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        var id = this.dataItem($(e.currentTarget).closest("tr"));
        var grp=id.grp__name;
        var id=id.id;
         sessionStorage.setItem("Bpm_grp",grp);  
         sessionStorage.setItem("Bpm_id",id);  
         
        //sessionStorage.getItem("Json_Usrbpm");
        var myWindow = $("#window"),
        undo = $("#undo");

        function onClose() {
            undo.fadeIn();
        }

        myWindow.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Filtros",
            width: "60%",
            content: "http://localhost:8080/Integrity1/usuariosbpm/html/popUp.html",
            actions: [
                                    
                                    "Close"
                                ],
                                
            close: onClose
            }).data("kendoWindow").center().open();            
                
                }
                
    function detailInit1(e) {debugger
                    
                   
      var Jsonbpm=[];
        Jsonbpm = sessionStorage.getItem("Json_Usrbpm");                                           
        var Jsonbpm1  = JSON.parse(Jsonbpm);
        var Roles = Jsonbpm1.eebpm_rol;

        var cbh = document.getElementById('roles'); 
        var i = 0;
        var j=1;
        for (i  in Roles ){debugger
       
            crearLabel("label"+Roles[i].piiregrol, Roles[i].rol__name, "K"+j+"-Container");
            if (j == 3) {
                j = 1;
            } else {
                j++;
            }
        }  
    
    
function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    if (tipo == 'editor') {//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
        newlabel.style.verticalAlign = '220%';
    }
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
        
    }
                
                
               
 
             
 
   
    
    
});// Fin document ready

function CrearCampo(){

    var dropdownlist = $("#procesos").data("kendoComboBox");
    var x = dropdownlist.value();
    var y =0;

                        
    //grid1.addRow();
            
}
        
/**
 * Crear un elemento label dentro de un div
 * @param {type} id id del nuevo label
 * @param {type} titulo valor del label
 * @param {type} div div al cual sele asigna el nuevo elemento
 * @param {type} fuente tipo de fuente del label
 * @param {type} color si quiere un color especifico
 * @param {type} tipo en caso de ser Editor cambia ya que necesita un tam especifico
 * @returns {undefined}
 */
function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    if (tipo == 'editor') {//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
        newlabel.style.verticalAlign = '220%';
    }
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
        
        
            
            
       
