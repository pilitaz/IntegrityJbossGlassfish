
$(document).ready(function () {
     $("#bottn").kendoButton({
        click: guardar
    });
    var tarea = sessionStorage.getItem("Task_name");
     document.getElementById("procName").innerHTML = tarea;
    var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();

    var actualizar = new sirconsulta();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlSir();
    
    var mapCud = "UserBPM";
    var mapCud1 = "ee_user3";
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: urlactualizar,
                dataType: "json",
                type: "PUT",
                contentType: "application/json; charset=utf-8"
            },
            create: {
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {debugger
                    datajson.dsUserBPM.SirUserBPM[0].picproc__name = sessionStorage.getItem("Proc_usuar");
                    datajson.dsUserBPM.SirUserBPM[0].pictask__name= sessionStorage.getItem("Task_name");
                    return JSON.stringify(datajson);
                }

            }
        },
        batch: true,
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
                id: "usr__cod",
                fields: {
                    usr__cod: {editable: true, nullable: false,type:"string", validation: {required: true}},
                    usr__name: {editable: true, nullable: true, type:"string",validation: {required: true}},
                    car__nom: {editable: true, nullable: false,type:"string" },
                    actor__des: {editable: true, nullable: false,type:"string"}

                }
            }
        }
    });
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
    
    var grid_usr = $("#grilla_usr").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        filterable: {
            mode: "row",
            operators: {
                string: {
                    startswith: "Incia con",
                    contains: "Contiene",
                    eq: "Es igual a",
                    neq: "No es igual a"
                }
            }
        },
        columns: [
            {field: "usr__cod", title: "Usuarios", hidden: false , filterable: {
                    cell: {
                        operator: "contains"
                    }}},
            {field: "usr__name", title: "Nombre", hidden: false},
            {field: "car__nom", title: "Rol", hidden: false},
            {field: "actor__des", title: "Actor", hidden: false},
            
            {command: [{name: "check" ,text: "", width: "80px",click:cambiaColor , template: "<a class='k-grid-check title'><span class='k-sprite pro_checkoff'></span></a>"}], width: "50px" }],
        
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = dataSource.data();
            changImgFunc(results);
            filtros(results);
        },
        cancel: function (e) {
            e._defaultPrevented = true;
            
        }
    });
//    $("#filtro").kendoAutoComplete({
//        dataTextField: "usr__name",
//        dataValueField: "usr__name",
//        dataSource: dataSource,
//        filter: "startswith",
//        placeholder: "Nombre...",
//    });
    // 
    function changImgFunc(results) {debugger
         var results =  $('#grilla_usr').data('kendoGrid')._data;
         //document.getElementById("7382b9f0-a33a-4b0b-bac0-e076f71dd743");

        
        var i=0;
        for (i = 0; i < results.length; i++){
            
            if (results[i].user__contain__task==true){
                
                document.getElementById("span"+results[i].usr__cod).setAttribute("class", "k-sprite pro_check");
                document.getElementById("span"+results[i].usr__cod).setAttribute("estado", "on");
            }else{
                document.getElementById("span"+results[i].usr__cod).setAttribute("estado", "off");
                
            }
            
            
        }
        var datosCheck = [];
           for (i = 0; i < results.length; i++){debugger
           var check = document.getElementById("span"+results[i].usr__cod);
             if (check.className === "k-sprite pro_check"){
                 datosCheck[i]=results[i].usr__cod;
             }
             
             
          }       
      
        $("#cargados").kendoDropDownList({
        placeholder: "...",
        dataSource: datosCheck,
    });
        
    }
    function guardar (e){debugger
        
        var nit = sessionStorage.getItem("companyNIT");
        var proceso = sessionStorage.getItem("Proc_usuar");
        var tarea= sessionStorage.getItem("Task_name");
        var desTarea= sessionStorage.getItem("Task_type");
      
         var consultarUsr = new cudTareasXusr();
        var data = consultarUsr.getjson();
        var urlservicio = consultarUsr.getUrlSir();
        
      var data1 = grid_usr.data("kendoGrid").dataSource._pristineData;    
      var i=0;
      var array=[];
      
      
      for  ( i = 0; i < data1.length; i++){
          var name = data1[i].usr__cod;
          var estado = document.getElementById("span"+name).getAttribute("estado");
          if( estado==="on")
            {
                var json={};
                json.cia__nit=nit;
                json.proc__name=proceso;
                json.task__name=tarea;
                json.task__type=desTarea;
                json.usr__cod = data1[i].usr__cod;
                array.push(json);
                
            }
      else
      {
          
      }
        }       
         data.dsbpm_own_task.TTparam[0].picproc_name= proceso;
          data.dsbpm_own_task.eebpm_own_task=array;
               
               
               
    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(data),
        url: urlservicio,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) {  debugger
            if((resp.dsbpm_own_task.eeEstados["0"].Estado)=="OK")
            {
            parent.cerrar();
    
            }
            else
            {
             alert("Error"+resp.dsbpm_own_task.eeEstados["0"].Estado);   
            }
        } 
        
        });
    }
    //-----------------------
     function cambiaColor(e){debugger

   
     var id = e.currentTarget.firstElementChild.id;
     var estado = document.getElementById(id).getAttribute("estado");
      if( estado==="on")
      {
     document.getElementById(id).setAttribute("class", "k-sprite pro_checkoff");
     document.getElementById(id).setAttribute("estado", "off");
      }
      else
      {
     document.getElementById(id).setAttribute("class", "k-sprite pro_check");
     document.getElementById(id).setAttribute("estado", "on");
      }
                      var results =  $('#grilla_usr').data('kendoGrid')._data;
        var datosCheck = [];
        var i =0;
        for (i = 0; i < results.length; i++){debugger
            var check = document.getElementById("span"+results[i].usr__cod);
            if (check.className === "k-sprite pro_check"){
                datosCheck[i]=results[i].usr__cod;
            }
        }       
       
 var dropdownlist = $("#cargados").data("kendoDropDownList");
        dropdownlist.setDataSource(datosCheck);
     }
     
     
     function filtros (e){
//         
//  
////         /**
//// * Filtro auto complete por nombre
//// */
////
//        var data1 = grid_usr.data("kendoGrid").dataSource._pristineData;
//        var arrayOriginal = [];
//        var rol = [];
//        var i = 0;
//        for (i  in data1) {
//            if(data1[i] !== undefined){
//                arrayOriginal[i] = data1[i].car__nom;
//            }           
//        }
//        var rol = arrayOriginal.filter(function (elem, pos) {
//            return arrayOriginal.indexOf(elem) == pos;
//        });
////---------------------------------------------------
//        var data1 = grid_usr.data("kendoGrid").dataSource._pristineData;
//        var arrayOriginal = [];
//        var actor = [];
//        var i = 0;
//        for (i  in data1) {
//            if(data1[i] !== undefined){
//                arrayOriginal[i] = data1[i].actor__des;
//            }            
//        }
//        var actor = arrayOriginal.filter(function (elem, pos) {
//            return arrayOriginal.indexOf(elem) == pos;
//        });
//
//     /**
//     *FUNCION FILTRO ROL TOOLBAR
//     * 
//     *  
//     * 
//     *  
//     *  
//     */
//     
//    $("#filtro1").kendoComboBox({
//
//        placeholder: "Rol...",
//        dataSource: rol,
//        change: function () {
//            var value = this.value();
//            if (value) {
//                grid_usr.data("kendoGrid").dataSource.filter({field: "car__nom", operator: "eq", value: value});
//            } else {
//                grid_usr.data("kendoGrid").dataSource.filter({});
//            }
//        },
//    });


    /**
     *FUNCION FILTRO ACTOR TOOLBAR
     * 
     *  
     * 
     *  
     *  
     */
 
//
//   $("#filtro2").kendoComboBox({
//
//        placeholder: "Actor...",
//        dataSource: actor,
//        change: function () {
//            var value = this.value();
//            if (value) {
//                grid_usr.data("kendoGrid").dataSource.filter({field: "actor__des", operator: "eq", value: value});
//            } else {
//                grid_usr.data("kendoGrid").dataSource.filter({});
//            }
//        },
//    });

         
     }
      // $("span.k-icon k-i-filter")[0].className = "k-icon   k-i-hbars";
     

 });
//funcion que carga todos los usuarios
//cambia el estado de todos los check en On, y cuando lo hace 
//refresca el datasource del dropdown
 
 function cargartodos(){debugger     
     
     var estado = document.getElementById("cargar").attributes[2].nodeValue;
    
     if (estado === "cero"){
    document.getElementById("cargar").setAttribute("class", "k-sprite pro_check1"); 
    document.getElementById("cargar").setAttribute("estado", "on");   
    
     var grid = $("#grilla_usr").data("kendoGrid");
    grid= grid._data;
    var i=0;
            for (i = 0; i < grid.length; i++){
                document.getElementById("span"+grid[i].usr__cod).setAttribute("class", "k-sprite pro_check");
                document.getElementById("span"+grid[i].usr__cod).setAttribute("estado", "on");
        } 
        
     }
     else
     {
         if (estado === "on"){
            document.getElementById("cargar").setAttribute("class", "k-sprite pro_checkoff1"); 
            document.getElementById("cargar").setAttribute("estado", "off"); 
            var grid = $("#grilla_usr").data("kendoGrid");
            grid= grid._data;
            var i=0;
            for (i = 0; i < grid.length; i++){
                document.getElementById("span"+grid[i].usr__cod).setAttribute("class", "k-sprite pro_checkoff");
                document.getElementById("span"+grid[i].usr__cod).setAttribute("estado", "off");
        } 
             
         }
                  if (estado === "off"){
            document.getElementById("cargar").setAttribute("class", "k-sprite pro_check1"); 
            document.getElementById("cargar").setAttribute("estado", "on"); 
            var grid = $("#grilla_usr").data("kendoGrid");
            grid= grid._data;
            var i=0;
            for (i = 0; i < grid.length; i++){
                document.getElementById("span"+grid[i].usr__cod).setAttribute("class", "k-sprite pro_check");
                document.getElementById("span"+grid[i].usr__cod).setAttribute("estado", "on");
        } 
             
         }
         
     }

                var results =  $('#grilla_usr').data('kendoGrid')._data;
        var datosCheck = [];
        var i =0;
        for (i = 0; i < results.length; i++){debugger
            var check = document.getElementById("span"+results[i].usr__cod);
            if (check.className === "k-sprite pro_check"){
                datosCheck[i]=results[i].usr__cod;
            }
        } 
        var dropdownlist = $("#cargados").data("kendoDropDownList");
        dropdownlist.setDataSource(datosCheck);
 
     
     
     }
  
 function borrartodos(){debugger     
     var grid = $("#grilla_usr").data("kendoGrid");
    grid= grid._data;
    var i=0;
            for (i = 0; i < grid.length; i++){
                document.getElementById("span"+grid[i].usr__cod).setAttribute("class", "k-sprite pro_checkoff");
                document.getElementById("span"+grid[i].usr__cod).setAttribute("estado", "off");
        }
        var results =  $('#grilla_usr').data('kendoGrid')._data;
        var datosCheck = [];
        var i =0;
        for (i = 0; i < results.length; i++){debugger
            var check = document.getElementById("span"+results[i].usr__cod);
            if (check.className === "k-sprite pro_check"){
                datosCheck[i]=results[i].usr__cod;
            }
        }       
        var dropdownlist = $("#cargados").data("kendoDropDownList");
        dropdownlist.setDataSource(datosCheck);
 }