

$(document).ready(function () {debugger
   var datos_cliente = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
   
   document.getElementById('Nit_cliente').innerHTML = datos_cliente.ter__nit;
   document.getElementById('Nombre_cliente').innerHTML = datos_cliente.ter__raz;
   document.getElementById('Clase_Cliente').innerHTML = datos_cliente.cla__nom;
   document.getElementById('Email').innerHTML = datos_cliente.ter__email;
   document.getElementById('Identificacion_Calificacion').innerHTML = datos_cliente.cal__ide;
   document.getElementById('Cupo_Credito').innerHTML = datos_cliente.cli__cre;
   document.getElementById('Cupo_De_Ventas').innerHTML = datos_cliente.cli__ven;
   document.getElementById('Persona_Contacto_Tesoreria').innerHTML = datos_cliente.con__tes;
   document.getElementById('Persona_Contacto_Ventas').innerHTML = datos_cliente.con__ven;
   document.getElementById('Certificado_Analisis').innerHTML = datos_cliente.cer__ana;
   document.getElementById('Despachos_Parciales').innerHTML = datos_cliente.dpc__par;
   document.getElementById('Numero_de_Copias_Factura').innerHTML = datos_cliente.num__cop__fac;
   document.getElementById('Forma_de_Pago').innerHTML = datos_cliente.pago__cod;
   document.getElementById('Numero_de_Lista').innerHTML = datos_cliente.lis__num;
   document.getElementById('Dia_de_Pago').innerHTML = datos_cliente.dia__pag;
   document.getElementById('Hora_de_Pago').innerHTML = datos_cliente.hor__pag;
   document.getElementById('Bodega_en_Consignacion').innerHTML = datos_cliente.loc__des;
   document.getElementById('Precio_por_Establecimiento').innerHTML = datos_cliente.ter__cret;
   document.getElementById('Tope_Maximo_Galones').innerHTML = datos_cliente.cli__gal;
   
  //document.getElementById('Nit_cliente').innerHTML = datos_cliente.ter__nit;
   
    if (datos_cliente.cli__est==1){
        $("#btnAgregarItem")[0].hidden="true";        
        $("#btnGuardar1")[0].hidden="true";
   }
   else
   {}
    gridDetalleVendedor();
  
});

function gridDetalleVendedor(){
    var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
    var  consultar = new sirVendedoresDetalle();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
    datajson.dsSIRgpd_vtr.SIRgpd_vtr[0].piivdd__cod = datos_vendedor.vdd__cod;                
    var  actualizar = new CudDetalleVendedor();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_vtr";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
     
            create: { 
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            destroy: {
                url: urlactualizar,
                dataType: "json",
                type: "DELETE",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {debugger
                    return JSON.stringify(datajson);
                }
                if (operation === "update") {debugger
                

                }
                if (operation === "create") {debugger
                    
                    var region = $("#territorios").data("kendoDropDownList");
                    var select = region.selectedIndex;
                        region = region.dataSource._data[select].trr__cod;
                    var nom_region = $("#territorios").data("kendoDropDownList").dataSource._data[select].trr__nom;
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__nom=nom_region;  
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__cod=region;                    
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].vdd__cod=datos_vendedor.vdd__cod;
                    return JSON.stringify(actjson);          
                                                        
                }
                if (operation === "destroy") {debugger 
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].ter__raz=options.ter__raz;  
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__cod=options.trr__cod;                    
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__nom=options.trr__nom;
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].vdd__cod=options.vdd__cod;                   
                    return JSON.stringify(actjson);               
                }
                                    
            }
                                
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {debugger
                var key1 = Object.keys(e)[0];
                if(e[key1].eeEstados){
                    if (e[key1].eeEstados[0].Estado === "OK") {
                       
                        return e[key1][mapCud];
                    }else
                    {
                        alertDialogs("Error"+e[key1].eeEstados[0].Estado);   
                    }
                }},
            model: {
                id: "vdd__cod",
                fields: {
                    vdd__cod:    {editable: true, nullable: false},
                    trr__cod:    {editable: true, nullable: false},
                    trr__nom:    {editable: true, nullable: false},  
                    ter__raz:    {editable: true, nullable: false}


                }
            }
        }
    });
    var grid1 = $("#gridDetalleVendedor").kendoGrid({
        dataSource: dataSource,

        columns: [
            {field: "trr__nom", title: "Territorios",  hidden:false, editor: territorio,
                template: function (e) {debugger
                    return e.trr__nom;
                }},

            {command: [
                    {name: "deletae", text: "destoy", template: "<a id='borrar' class='k-grid-deletae'><span id='borrar' class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "70px"}],
      
            editable: "popup",              
         dataBound: function (e) {debugger
            var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
            if (datos_vendedor.vdd__est!=99){
                var tamaño=document.getElementsByClassName("k-sprite po_cerrar").length;
                 for (var i = 0; i < tamaño; i++) {
                document.getElementsByClassName("k-sprite po_cerrar")[i].hidden="true";
                 }
   }
   else
   {}
        },                    
    });
    
}
function clickEliminar(e) {debugger
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {

              
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0; 
            
            
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.sre__cod + " ---?", "400px", "200px", true, true, actions);
         
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
       
}
function volverPedidos(){
 window.location = ("clientes.html");
}


function agregarItemDetalle(){
 var grid1 = $("#gridDetalleVendedor").data("kendoGrid");
    grid1.addRow();
}
function territorio(container, options) {debugger
        var consultar = new sirTerritorio();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_trr";
        $('<input  id = "territorios" />')
                .appendTo(container)
                .kendoDropDownList({
            dataTextField: "trr__nom",
            dataValueField: "trr__cod",
            autoClose: true,
            placeholder: "Territorios..",
            template:'<div class="divElementDropDownList">#: data.trr__nom #</div>',  
            dataSource: {
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
                schema: {
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "trr__cod",
                        fields: {
                            trr__cod: {editable: false, nullable: false},
                            trr__nom: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }        
    
    
    function clickEliminar(e) {debugger
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#gridDetalleVendedor").data("kendoGrid").dataItem($(e.target).closest("tr"));
         
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {

              
            var dataSource = $("#gridDetalleVendedor").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0; 
            
            
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.trr__nom + " ---?", "400px", "200px", true, true, actions);
         
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
       
}
      function cerrar(){debugger
    //onClosex();
    $("#windowform").data("kendoWindow").close();
  
    
}  
function popupNuevoVendedor(){debugger
      $("#textarea").append("<div id='windowform'></div>");
        var myWindow1 = $("#windowform"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowform").empty();
        
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "35%",
            modal: true,
            resizable: false,
            title: "Editar",
            width: "40%",
            content: UrL+"pedidos/html/popupCabeceravendedor.html",
            actions: [
                "Close"
            ],                               
           close: function () {
            
            $("#textarea").empty();
            this.destroy();}
        }).data("kendoWindow").center().open();    
    
   
}