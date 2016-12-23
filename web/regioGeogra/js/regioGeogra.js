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
		rgeo__cod: { type: 'integer'},            rgeo__nom: { type: 'string'},
	}
    
    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
		             id:"rgeo__cod",	
		fields: fieldShema
	};
	
    /*variables para adicionar los botones de la grilla*/        
    var btnC = true;        
    var btnUD = [
		{name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
	];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
	];
    //var btnDer = {command: btnDetalle, title: "&nbsp;", width: "100px" };
	var btnDer = {};
    var btnIzq = { command: btnUD, title: "&nbsp;", width: "100px" };
    
    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
		btnDer,
		{field: "rgeo__cod", title: "Codigo Region Geografica",width: "100%"},            {field: "rgeo__nom", title: "Nombre Region Geo.",width: "100%"},
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

function rgeo__codList(container, options){       var obj = new listargeo__cod();       var dataSource = obj.getdataSource();       $('<input id="idrgeo__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({               dataTextField: "text",               dataValueField: "value",               dataSource: dataSource,               index: 0,       });}function listargeo__cod () {       this.setdataSource = function (newname) {        if (newname) {            dataSource = newname;               }       };    this.getdataSource = function () {        return dataSource;       };};function rgeo__nomList(container, options){       var obj = new listargeo__nom();       var dataSource = obj.getdataSource();       $('<input id="idrgeo__nom" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({               dataTextField: "text",               dataValueField: "value",               dataSource: dataSource,               index: 0,       });}function listargeo__nom () {       this.setdataSource = function (newname) {        if (newname) {            dataSource = newname;               }       };    this.getdataSource = function () {        return dataSource;       };};


