/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
    var dsSIRbpm_proc = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos = new Array();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0] = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc = new Array();
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0] = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0].piccia__nit = "800001541";
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0].picproc__name = "*";
    console.log(JSON.stringify(dsSIRbpm_proc));
     
    
    var dataSourceProcesos = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: "http://172.21.24.146:8810/rest/Procesos/SIRbpm_proc",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'             
            },            
            destroy: {
                url: "http://172.21.24.146:8810/rest/Procesos/SICUDbpm_proc",
                dataType: "jsonp"
            },
            parameterMap: function (options, operation) {
                try{                    
                    if (operation === 'read') {                                
                        return JSON.stringify(dsSIRbpm_proc);
                    }                     
                } catch (e) {
                    kendo.alert(e.message);
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            data:"dsSIRbpm_proc.eebpm_proc",
            model: {
                fields: {
                    proc__name: { type: "string" }                    
                }
            }
        }
    });
    
    var gridheigth = $("#windowProcess").height()-$("#divSubtituloProcesos").height()-15;
    
    $("#gridProcesos").kendoGrid({
        dataSource: dataSourceProcesos,
        height: gridheigth,
        sortable: true,
        pageable: true,
        filterable: {
            mode: "row"            
        },
        columns: [
            {
                field: "proc__name",
                title: "Proceso",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "contains"
                    }
                },
                editor: proceso,
                template: function (e){  
                    if(e.proc__name){return e.proc__name;}
                    
                }
            },
            {
                command: [
                    {name: "eliminar", text: " ", template: "<a class='k-grid-detalle'><span class='k-sprite po_cerrar'></span></a>"}
                ], 
                width: "100px"
            }
        ],
        editable: "inline"
    });
    
    var dsSIRbpm_mpr = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos = new Array();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0] = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr = new Array();
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr[0] = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr[0].picproc__nam = "*";
    
    function proceso(container, options) {        
        $('<input id="ipProceso" style="width: 100%;" data-bind="value: ' + options.field + '" />').appendTo(container).kendoDropDownList({
            optionLabel: "Seleccione el proceso",
            dataTextField: "mpr__nam",
            dataValueField: "mpr__nam",
            template:'<div class="divElementDropDownList">#: data.mpr__nam #</div>',            
            dataSource: {
                transport: {
                    read: {
                        url: "http://172.21.24.146:8810/rest/Procesos/SIRbpm_mpr", 
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {                    
                        try {                         
                            if (operation === 'read') {                                
                                return JSON.stringify(dsSIRbpm_mpr);
                            }	
                        } catch (e) {
                            kendo.alert(e.message)
                        }
                    }
                },
                schema: {
                    type: "json",
                    data:function (e){
                        if(e.dsSIRbpm_mpr.eeEstados[0].Estado==="OK"){
                            return e.dsSIRbpm_mpr.eebpm_mpr;
                        }else{
                            kendo.alert(e.dsSIRbpm_mpr.eeEstados[0].Estado);
                        }
                    },
                    model: {                       
                        fields: {                            
                            mpr__nam: {validation: {required: true}, type: 'string'}                            
                        }
                    }
                },
                error: function (xhr, error) {
                    kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }
        });
    }
});

function agregarProceso(e){    
    var grid = $("#gridProcesos").data("kendoGrid");
    grid.addRow();    
}