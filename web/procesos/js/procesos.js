                    
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
                        
});
                                 
             
/**
 * FUNCION CRUD
 *  VAR mapCud =  variable gestion de funcion squema 
 *  VAR key1 = variable gestion de estado de respuesta de servicio 
 *  var cclave1 y  var cclave1 almacenan valor de campos contraseña y validacion de contgraseña
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  var  actualizar obtiene funcion create / update
 *  var  actjson : json para enviar al servicio de actualizar / crear
 *  var urlactualizar: url de servicio para actualizar / crear 
 *  
 */ 
$(document).ready(function () {                             
                        
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
        }
    });
    var name = sessionStorage.getItem("usuario");
    document.getElementById("demo").innerHTML = "Tareas de " +  name;
    /**
     *  FUNCION CREAR GRILLA
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
                       
     *  
     *  
     */     
    var grid1 = $("#grid").kendoGrid({
        dataSource: datasource,
                            
                            
      
                            
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "play", text: " ",  template: "<a class='k-grid-bullet'><span class='k-sprite pro_bullet'></span></a>",width: "50px"},
                           
            { field: "proc__name", title: "Procesos",  hidden:false},
            {command:
                        [
                    {name: "proceso", text: "", click: grafica, template: "<a title='procesos' class='k-grid-proceso'><span  title='comenzar' class='k-sprite pro_prooff'></span></a>"},
                    {name: "tareas", text: "", click: grilla, template: "<a title='comenzar' class='k-grid-tareas'><span  title='comenzar' class='k-sprite pro_groupoff'></span></a>"},
                    {name: "editar", text: " ",  click: grafica, template: "<a class='k-grid-editar'><span class='k-sprite pro_graphoff '></span></a>"},
                    {name: "info", text: " ",  template: "<a class='k-grid-info'><span class='k-sprite pro_infooff'></span></a>"},
                    {name: "play", text: " ",  template: "<a class='k-grid-play'><span class='k-sprite pro_playoff '></span></a>"},
                           
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

                        
    var consultar = new sirtask();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eebpm_task";
    var datasourcex = new kendo.data.DataSource({
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
                    return e[key1][mapCud1];
                } else {
                  alertDialogs("El usuario no tiene tareas asiganadas");
                }
            },
            model: {
                id: "task__id",
                fields: {
                    task__name:    {editable: false, nullable: false},
                    inst__name:     {editable: false, nullable: false},
                    task__usr:       {editable: false, nullable: false},
                    task__ddt:       {editable: false, nullable: false,type: "date"},
                    task__id:       {editable: false, nullable: false},
                    task__dpr:       {editable: false, nullable: false},
                    task__tst:       {editable: false, nullable: false, type: "date"},
                    task__des:       {editable: false, nullable: false},
                    task__type:       {editable: false, nullable: false}
                }
            }
        }
    });
    /**
     *  FUNCION CREAR GRILLA DE TAREAS
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
     *  
     *  
     */     
    var grid1 = $("#grid1").kendoGrid({
        dataSource: datasourcex,
        selectable:"multiple, row",
        sortable: true,
        filterable: {
            mode: "row",
            operators: {
                string: {
                    startswith: "Incia Con",
                    contains: "Contiene",
                    eq: "Es igual a",
                    neq: "No es igual a"
                }
            }
        },
        columns: [
            {field: "inst__name", title: "Proceso",  hidden:false},
            {field: "task__name", title: "Tareas",  hidden:false},
            {field: "task__des", title: "Descripcion",  hidden:false},               
            {field: "task__tst", title: "Fecha de Inicio",  hidden:false},           
            {field: "task__ddt", title: "Fecha de entrega",  hidden:false},
            {field: "task__dpr", title: "Admin de proceso",  hidden:false},
            {field: "task__type", title: "Tipo",  hidden:false},             
            {command:
                        [
                    {name: "inciar", click: iniciarTarea, template: "<a class='k-grid-iniciar' href='' style='min-width:16px;'><span class='k-sprite pro_playoff'></span></a>"}
                ],
                width: "50px"}], 
        rowTemplate: kendo.template($("#rowTemplateCmp1").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp1").html()),
        dataBound: function () {
            var results1 = datasourcex.data();
            changImgFunc1(results1);
        },
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid1').data('kendoGrid').refresh();                                             
            $('#grid1').data('kendoGrid').dataSource.read();
            $('#grid1').data('kendoGrid').refresh();                                                                                        
        } 
    });

                      
                    
                        
                        
});
//funcion que incia la tarea de acuerdo a los parametros diseñados

function iniciarTarea(e){
             $("#formvacations").append("<div id='windowform'></div>");
        var myWindow1 = $("#windowform"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowform").empty();
        }
        
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "80%",
            modal: true,
            resizable: false,
            title: "Solicitud De Vacaciones",
            width: "50%",
            content: UrL+"procesos/html/formVacations.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();    
    
}
//funcion para inciar proceso, envia peticion al servicio 
//y luego refresca la grilla
function iniciarProceso(e){
    
    var adm = this.dataItem($(e.currentTarget).closest("tr")).id;
    var consultar = new sistartaplication();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
                        
    datajson.dsAplication.SIRapp[0].picproc__name= adm;
                   
    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) {
            if((resp.dsAplication.eeEstados["0"].Estado)=="OK")
            {
            
             alertDialogs("Se ha inciado el proceso "+adm);
            $('#grid1').data('kendoGrid').refresh();                                             
            $('#grid1').data('kendoGrid').dataSource.read();
            $('#grid1').data('kendoGrid').refresh(); 
            }
            else
            {
             alertDialogs("Error"+resp.dsAplication.eeEstados["0"].Estado);   
            }
        } 
        
        });
}
//funcion para crear grafica 
function grafica(e){
    var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;
    if (adm=== true ){               
        var myWindow1 = $("#textarea"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#textarea").empty();
        
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Grafica",
            width: "70%",
            content: UrL+"procesos/html/popUpGrafica.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();    
    }
    else{}
}
//    
//Funcion para crear la grilla de tareas por poceseo 
//Se crea un html llamado popupgrilla                    
function grilla(e){
    e.preventDefault();
    var id = this.dataItem($(e.currentTarget).closest("tr")).proc__name;
    var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;  
    if (adm=== true ){
        sessionStorage.setItem("Proc_usuar",id);                                           
        $("#grillapopUp").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#grillapopUp").empty();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            draggable: true,
            height: "90%",
            modal: true,
            resizable: false,
            title: "Tareas",
            width: "90%",
            content: UrL+"procesos/html/popUpGrilla.html",
            deactivate: function() {
                this.destroy();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
    }
    else
    {}
                      
}       
function disable(){
    
}
function reasignar(){
//    function mostrarCustomPopUp() {
//    $("body").append("<div id='disable'></div>");
//    $("#customPopUp").fadeIn("slow");
//
//}    
        $("#formvacations").append("<div id='windowform'></div>");
        var myWindow1 = $("#windowform"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowform").empty();
        }
        
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "40%",
            modal: true,
            resizable: false,
            title: "Reasignar Tareas",
            width: "50%",
            content: UrL+"procesos/html/ReasignacionMasiva.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();    
    
}
function changImgFunc1(results) {
   var results =  $('#grid1').data('kendoGrid')._data;
    var consultar = new serviTime();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    
     $.ajax({
            type: "POST",
            async: false, 
            data: JSON.stringify(datajson),
            url: urlService,
            dataType : "json",  
            contentType: "application/json;",
            success: function (resp) {             
                sessionStorage.setItem("Fecha_Hora",resp.dstime.eetime["0"].systime);
                               
            },
            error: function (e) {              
            }
        });
    var s =   sessionStorage.getItem("Fecha_Hora");
    var x = s.replace("T", " ");
    var fechaSistema =  new Date(x);
    var mesSistema = fechaSistema.getMonth()+1;
    var diaSistema = fechaSistema.getDate();
    var AñoSistema = fechaSistema.getUTCFullYear();
    var horaSistema = fechaSistema.getHours();
    var minSistema = fechaSistema.getMinutes();
    for (var i = 0; i < results.length; i++) {
    var fecha1 = new Date(results[i].task__tst);
    var mesSistema1 = fecha1.getMonth()+1;
    var diaSistema1 = fecha1.getDate();
    var AñoSistema1 = fecha1.getUTCFullYear();
    var horaSitema1 = fecha1.getHours();
    var minSistema1 = fecha1.getMinutes();
    
    var fecha2 = new Date(results[i].task__ddt);
    var mesSistema2 = fecha2.getMonth()+1;
    var diaSistema2 = fecha2.getDate();
    var AñoSistema2 = fecha2.getUTCFullYear();
    var horaSitema2 = fecha2.getHours();
    var minSistema2 = fecha2.getMinutes();
    
        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).innerHTML  = diaSistema1+"/"+mesSistema1+"/"+AñoSistema1 + " "+horaSitema1+":"+minSistema1; 
        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).innerHTML  = diaSistema2+"/"+mesSistema2+"/"+AñoSistema2 + " "+horaSitema2+":"+minSistema1; 
    }
    
    for (var i = 0; i < results.length; i++) {
     
    var fecha2 = new Date(results[i].task__ddt);
    var mesServicio = fecha2.getMonth()+1;
    var diaServicio = fecha2.getDate();
    var AñoServicio = fecha2.getUTCFullYear();
    var horaServicio = fecha2.getHours();
    var minServicio = fecha2.getMinutes();
    
    var fechaSistema = AñoSistema+diaSistema+mesSistema;
        if ((mesServicio<mesSistema || diaServicio<diaSistema || AñoServicio<AñoSistema)){
            
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red';       
    }
    else{
        if(diaServicio===diaSistema ){
            if (horaSistema > horaServicio  ){
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red'; 
                    }else{
            if (horaServicio == horaSistema &&   minSistema >= minServicio ){
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red'; 
                    }
                    }                       
                    }
    }
    
 }  
}

function changImgFunc(results) {

    for (var i = 0; i < results.length; i++) {
        if(results[i].can__start===true){                            
     document.getElementById("spanplay"+results[i].proc__name).setAttribute("class", "k-sprite pro_playon");
     document.getElementById("spanplay"+results[i].proc__name).setAttribute("estado", "on");
        }else
        {}}
  
    for (var i = 0; i < results.length; i++) {        
        if(results[i].adm===true){
        }else
        {
            var x = document.createElement("SPAN");
            x.setAttribute("class", "k-sprite transparente");
            x.setAttribute("id","x"+results[i].proc__name );             
            $("#spantarea"+results[i].proc__name).onclick = "";
            $("#spanedit"+results[i].proc__name).onclick = "";
            document.getElementById("spantarea"+results[i].proc__name).setAttribute("class", "k-sprite transparente");
            document.getElementById("spantarea"+results[i].proc__name).setAttribute('onclick','disable();'); // for FF
            document.getElementById("spanedit"+results[i].proc__name).setAttribute("class", "k-sprite transparente");
            document.getElementById("spanedit"+results[i].proc__name).setAttribute('onclick','disable();');
        }
    }
} 
                        
                        
