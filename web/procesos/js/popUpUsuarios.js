
$(document).ready(function () {
     $("#bottn").kendoButton({
        click: guardar
    });
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
                if (operation === "read") {
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
                    usr__cod: {editable: true, nullable: false, validation: {required: true}},
                    usr__name: {editable: true, nullable: true, validation: {required: true}},
                    car__nom: {editable: true, nullable: false},
                    actor__des: {editable: true, nullable: false}

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
        columns: [
            {field: "usr__cod", title: "Usuarios", hidden: false},
            {field: "usr__name", title: "Nombre", hidden: false},
            {field: "car__nom", title: "Rol", hidden: false},
            {field: "actor__des", title: "Actor", hidden: false},
            
            {command: [{name: "check", text: "check" , width: "80px",click:cambiaColor , template: "<a class='k-grid-check'><span class='k-sprite pro_checkoff'></span></a>"}], width: "50px" }],
        
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
        $("#filtro").kendoAutoComplete({
        dataTextField: "usr__name",
        dataValueField: "usr__name",
        dataSource: dataSource,
        filter: "startswith",
        placeholder: "Nombre...",
    });
// 
    function changImgFunc(results) {
        
        var i=0;
       
        for (i = 0; i < results.length; i++){
            
            if (results[i].user__contain__task==true){
                
                document.getElementById("span"+results[i].usr__cod).setAttribute("class", "k-sprite pro_check");
                document.getElementById("span"+results[i].usr__cod).setAttribute("estado", "on");
            }else{
                document.getElementById("span"+results[i].usr__cod).setAttribute("estado", "off");
                
            }
            
            
        }
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
     function cambiaColor(e){
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
              

     }
     
     
     function filtros (e){
         
  
//         /**
// * Filtro auto complete por nombre
// */
//
        var data1 = grid_usr.data("kendoGrid").dataSource._pristineData;
        var arrayOriginal = [];
        var rol = [];
        var i = 0;
        for (i  in data1) {
            if(data1[i] !== undefined){
                arrayOriginal[i] = data1[i].car__nom;
            }           
        }
        var rol = arrayOriginal.filter(function (elem, pos) {
            return arrayOriginal.indexOf(elem) == pos;
        });
//---------------------------------------------------
        var data1 = grid_usr.data("kendoGrid").dataSource._pristineData;
        var arrayOriginal = [];
        var actor = [];
        var i = 0;
        for (i  in data1) {
            if(data1[i] !== undefined){
                arrayOriginal[i] = data1[i].actor__des;
            }            
        }
        var actor = arrayOriginal.filter(function (elem, pos) {
            return arrayOriginal.indexOf(elem) == pos;
        });


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
    $("#filtro1").kendoComboBox({

        placeholder: "Rol...",
        dataSource: rol,
        change: function () {
            var value = this.value();
            if (value) {
                grid_usr.data("kendoGrid").dataSource.filter({field: "car__nom", operator: "eq", value: value});
            } else {
                grid_usr.data("kendoGrid").dataSource.filter({});
            }
        },
    });


    /**
     *FUNCION FILTRO ACTOR TOOLBAR
     * 
     *  
     * 
     *  
     *  
     */
 

    $("#filtro2").kendoComboBox({
        autoBind: false,
        placeholder:"Actor..",
        dataSource: actor,
        change: function () {
            var value1 = this.value();
            var value1 = parseInt(value1);
            if (value1 >= 0) {
                grid_usr.data("kendoGrid").dataSource.filter({field: "actor__des", value: value1});
            } else {
                grid_usr.data("kendoGrid").dataSource.filter({});
            }
        }
    });

         
     }
 });