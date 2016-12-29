$(document).ready(function() {
    
    /* variables para consumir el servicio Sir*/
    var objSir = new sir();
    var urlSir = objSir.getUrlSir(); 
    var mapSir = objSir.getmapSir();
    var inputsir = objSir.getdataInputSir();
    
	/* variables para consumir el servicio SiCud*/
    var objCud = new cud();
    var urlCud = objCud.getUrlCud();
    var mapCud = objCud.getmapCud();
    var inputCud = objCud.getdataInputCud();
    
    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
		ageo__cod: { type: 'integer'},
            ageo__nom: { type: 'string'},
	}
    
    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
		             id:"ageo__cod",	
		fields: fieldShema
	};
	
    /*variables para adicionar los botones de la grilla*/        
    var btnC = true;        
    var btnUD = [
        {name: "aprobar",  template: "<a class='k-grid-aprobar'><span class='k-sprite po_check'></span></a>"},
		{name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
	];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
	];
    //var btnDer = {command: btnDetalle, title: "&nbsp;", width: "100px" };
	var btnDer = {};
    var btnIzq = { command: btnUD, title: "&nbsp;", width: "150px" };
    
    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
		btnDer,
//		{field: "ageo__cod", title: "Codigo Area Geografica",width: "100%"},
            {field: "ageo__nom", title: "Area Geográfica",width: "100%"},
		btnIzq
	];
	
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                type: "POST", 
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
			},
            destroy: {
                url: urlCud,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
			},
            update: {
                url: urlCud,
                type: "PUT",
                dataType: "json",
                contentType: "application/json"
			},
            create: {
                url: urlCud,
                type: "POST",
                dataType: "json",
                contentType: "application/json"
			},
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsir);
					}
                    else {
                        var key1 = Object.keys(inputCud)[0] 
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);
					}
					} catch (e) {
                    alertDialogs(e.message)
				}
			}
		},
        schema: {
            type: "json",
			data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapSir];
					} else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
				}
			},
            model: model
		},
		error: function(e) {
			alertDialogs(e.errorThrown);
		}
	});
    if(!btnC){
        document.getElementById("btnCrear").style.display = "none";
	}
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        pageable: false,
        dataSource: dataSource,
		sortable: true,
        selectable: false,
        columns: columns,
        editable: "popup"
	});
    
    
    
    
});
function addRow(){
    var grid = $("#grid").data("kendoGrid");
	grid.addRow();
}
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 61);
});

function deleteRow(e){
	var grid = $("#grid").data("kendoGrid");
	e.preventDefault(); //prevent page scroll reset
	var tr = $(e.target).closest("tr"); //get the row for deletion
	var data = this.dataItem(tr); //get the row data so it can be referred later
	kendo.confirm("¿Esta seguro de eliminar este registro?").then(function () {
		grid.dataSource.remove(data)  //prepare a "destroy" request
		grid.dataSource.sync()
	}); 
}

function ageo__codList(container, options){
       var obj = new listaageo__cod();
       var dataSource = obj.getdataSource();
       $('<input id="idageo__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
               dataTextField: "text",
               dataValueField: "value",
               dataSource: dataSource,
               index: 0,
       });
}

function listaageo__cod () {


       this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
               }
       };
    this.getdataSource = function () {
        return dataSource;
       };
};


function ageo__nomList(container, options){
       var obj = new listaageo__nom();
       var dataSource = obj.getdataSource();
       $('<input id="idageo__nom" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
               dataTextField: "text",
               dataValueField: "value",
               dataSource: dataSource,
               index: 0,
       });
}

function listaageo__nom () {


       this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
               }
       };
    this.getdataSource = function () {
        return dataSource;
       };
};
// function aprobarArea(e){
//     try {
//        var fila = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
//        e.preventDefault();
//        var dataItem = fila;
//
//
//        var actions = new Array();
//        actions[0] = new Object();
//        actions[0].text = "OK";
//        actions[0].action = function () {
//            if (fila.cla__est !== 1) {
//                if (fila.cla__est === 99) {
//                    fila.cla__est = 0;
//                } else {
//                    fila.cla__est = fila.cla__est + 1;
//                }
//            }
//            sendAjaxAClase("PUT", [fila]);
//            bandAlert = 0;
//        };
//        actions[1] = new Object();
//        actions[1].text = "Cancelar";
//        actions[1].action = function () {
//            bandAlert = 0;
//        };
//        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila.cla__est + " ---?", "400px", "200px", true, true, actions);
//
//    } catch (e) {
//        $('#grid').data('kendoGrid').dataSource.read();
//        $('#grid').data('kendoGrid').refresh();
//    }
// }

