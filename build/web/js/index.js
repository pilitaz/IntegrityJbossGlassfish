
var puerto = sessionStorage.getItem("puerto");
var ip = sessionStorage.getItem("ip");

var urlIFrame = "http://" + ip + ":" + puerto + "/sbm/BizSolo/";

var arreglo_funCod = new Array();
var arreglo_funDes = new Array();
var arreglo_funIco = new Array();
var arreglo_funUrl = new Array();
var arreglo_funProg = new Array();
var arreglo_funVideo = new Array();
var arreglo_funRepor = new Array();
estadoIfra = "PagInicio";
$(document).ready(function () {
    sessionStorage.setItem("VideoAyuda", "http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865s");//cambiar urlVideo con url link apenas este listo el video de ayuda   

    if (sessionStorage.getItem("loginintegrity") === "valido") {

        $(window).trigger("resize");

        $("#btnCambiarClave").kendoButton({
        });
        $("#btnGuardarClave").kendoButton({
        });
        menufunciones();
        tamanoPagIni();
        correLinuxBack();
        document.getElementById("lbNombre").innerHTML = sessionStorage.getItem("usrnom");
        document.getElementById("lbEMail").innerHTML = sessionStorage.getItem("usrmail");
        document.getElementById("imgUsuario").src = "../images/equipo/" + sessionStorage.getItem("usuario") + ".png";
        document.getElementById("logoEmpresa").src = "data:image/png;base64," + sessionStorage.getItem("img");
        document.getElementById("idFrame").src = "fondo.html";
//        document.getElementById("idFrame").src = "http://190.144.16.114:18800/PruebaHRD";
    } else {
        window.location.assign(sessionStorage.getItem("url"));
    }
    $("#k-icon.k-i-arrow-s").className = "k-icon   k-i-hbars";
});


$(window).resize(function () {
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    $('#outerWrapper').height(viewportHeight - 55);

    if (estadoIfra === "PagShell") {
        tamanoShell(viewportWidth);
    } else if (estadoIfra === "PagFunciones") {
        tamanoFunciones(viewportWidth);
    } else {
        tamanoPagIni();
    }
});
/**
 * Cambia la imagen del menu izquierdo, cuyo id=imgId, por una imagen que muestre un estado activo(On) y cambia la URL del iframe. 
 * @param {type} imgId 
 * @param {type} estiloTd
 * @returns {undefined}
 */
function cambiarImagen(imgId, estiloTd) {
    ocultarArbol();
    tamanoFunciones();
    var imgName = imgId.replace("img", "").toLowerCase();
    var estado = document.getElementById(imgId).getAttribute("estado");
    apagarBotones(imgId);

    if (estado == "off") {
        var servicio = document.getElementById(imgId).getAttribute("servicio");
        document.getElementById(imgId).src = "../images/" + imgName + "On.png";
        document.getElementById(imgId).setAttribute("estado", "on");
        document.getElementById(imgId).setAttribute("onmouseover", "");
        document.getElementById(imgId).setAttribute("onmouseout", "");
        //document.getElementById(imgId).getAttribute("servicio");
        if (servicio === "Reporteador") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
            var urlFrameNew = "http://" + ip + ":" + puerto + "/" + servicio;
            document.getElementById("idFrame").src = urlFrameNew;
            document.getElementById("tdPerfil").style = "display:none"
        } else if (servicio === "procesos") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
            document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio + "/html/" + servicio + ".html";
            document.getElementById("tdPerfil").style = "display:none"
        } else if (servicio !== "") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
            document.getElementById("idFrame").src = urlIFrame + servicio + "/Start.jsp";
            document.getElementById("tdPerfil").style = "display:none"
        }

        cambiarFondoTD(estiloTd);
    }
}

/**
 * Cambia el fondo del todos los td que tengan el atributo name="imgLogoIntegrity"
 */
function cambiarFondoTD(nombreClase) {
    if (nombreClase == "") {
        document.getElementById("imgLogoIntegrity").src = "../images/Login Inicio-07.png";
    } else {
        document.getElementById("imgLogoIntegrity").src = "../images/logo-08.png";
    }
    var listaTdSuperior = document.getElementsByName("tdSuperior");
    for (var i = 0; i < listaTdSuperior.length; i++) {
        listaTdSuperior[i].className = nombreClase;
    }
}
/**
 * cambia el estado de todos los botones del menu vertical de la izquierda (Trasferencias, reportes, procesos, etc ) a off 
 * excepto el del id que le pasemos, este quedara activo
 */
function apagarBotones(id) {
    var imgMenu = document.getElementsByName("imgMenu");
    for (var i = 0; i < imgMenu.length; i++) {
        if (imgMenu[i].id != id && imgMenu[i].getAttribute("estado") != "off") {
            var imgNombre = imgMenu[i].id.replace("img", "").toLowerCase();
            document.getElementById(imgMenu[i].id).src = "../images/" + imgNombre + "Off.png";
            document.getElementById(imgMenu[i].id).setAttribute("estado", "off");
            if (imgNombre == "imgTransacciones") {
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/" + imgNombre + "RO.png'; mostrarArbol();");
            } else {
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/" + imgNombre + "RO.png';");
            }
            document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../images/" + imgNombre + "Off.png';");
        }
    }
}
/**
 * Abre la pagina de ayuda que esta almacenda como una variable de sesion, la pagina que despiegla por el momento esta en http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865sS
 */
function ayuda() {
    var video = sessionStorage.getItem("VideoAyuda");
    if (video) {
        windowPopUp(video, "Ayuda");
    } else {
        var htmlText = '<html><head><title>Soporte</title></head><body><p align="center">' +
                '<img src="images/ayuda-52.png" alt="Soporte" width="200" height="45"><br></br></p>' +
                '<p align="center" style="font-family:Tahoma;font-size:10pt;">Visite nuestro ' +
                'canal de tutoriales <b>Integrity</b> y conozca todas las posibilidades de nuestro sistema.' +
                '<br></br></p><p align="center"><img src="images/video.png" alt="Soporte" width="500" height="307"></p></body></html>';
        alertDialogs(htmlText)
        $("#dialog1").kendoButton().data("kendoButton")
    }
}
/**
 * 
 * @param {type} detalle 
 * @param {type} titulo
 * @returns {undefined}
 */
function  windowPopUp(detalle, titulo) {

    try {

        //        $("#window").kendoWindow({
        //            draggable: true,
        //            height: "90%",
        //            modal: true,
        //            resizable: false,
        //            title: "hola",
        //            width: "1300px",
        //            content: "http://comunicacion349.wixsite.com/integrity/reportes-tutoriales",
        //            close: onClose
        //        }).data("kendoWindow").open();


        var myWindow = $("#window"),
                undo = $("#undo");

        undo.click(function () {
            myWindow.data("kendoWindow").open();
            undo.fadeOut();
        });



        function onClose() {
            undo.fadeIn();
        }

        myWindow.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            width: "60%",
            content: "http://comunicacion349.wixsite.com/integrity/reportes-tutoriales",
            close: onClose
        }).data("kendoWindow").center().open();

    } catch (e) {
        alertDialogs("Function: windowPopUp Error: " + e.message);
        console.log(e.message)
    }
}

//function onClose() {
//    alertDialogs("cerrando");
//    $("#window").fadeIn();
//}

function cambiarClave() {
    reemplazarDiv("divBtCambiarClave", "cambiarClave");
}

function guardarClave() {
    try {
        if (document.getElementById("IpClave").value === document.getElementById("IpRClave").value) {
            console.log("claves iguales")
            var cambioExitoso;
            var jSonData = new Object();
            jSonData.dslogin = new Object();
            jSonData.dslogin.ttdatauser = new Array();
            jSonData.dslogin.ttdatauser[0] = new Object();
            jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");
            jSonData.dslogin.ttdatauser[0].picusrpass = "";
            jSonData.dslogin.ttdatauser[0].picfiid = sessionStorage.getItem("picfiid");
            jSonData.dslogin.ee_userPAS = new Array();
            jSonData.dslogin.ee_userPAS[0] = new Object();
            jSonData.dslogin.ee_userPAS[0].euserid = sessionStorage.getItem("usuario");
            jSonData.dslogin.ee_userPAS[0].epassword = document.getElementById("IpClave").value;
            jSonData.dslogin.ee_userPAS[0].usrmail = sessionStorage.getItem("usrmail");

            console.log("url servicio cambio clave " + ipServicios + baseServicio + "cambiopass\n" + JSON.stringify(jSonData));

            $.ajax({
                type: "POST",
                data: JSON.stringify(jSonData),
                url: ipServicios + baseServicio + "cambiopass",
                dataType: "json",
                contentType: "application/json;",
                success: function (resp) {
                    cambioExitoso = JSON.stringify(resp.dslogin.eeEstados[0].Estado);
                },
                error: function (e) {
                    alertDialogs("Error al consumir el servicio de login.\n" + e.status + " - " + e.statusText);
                }
            }).done(function () {
                if (cambioExitoso === '"OK"') {
                    alertDialogs("cambio existoso, sera redirigido al login");
                    cerrarSesion();
                } else {
                    alertDialogs(cambioExitoso);
                }

            });
            reemplazarDiv("cambiarClave", "divBtCambiarClave");
        } else {
            alertDialogs("Datos incompletos");
        }
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/*
 * Funcion reemplaza un div por otro, oculta el divOcultar y muestra el divMostrar con un leve efecto.
 */
function reemplazarDiv(divOcultar, divMostrar) {
    document.getElementById(divOcultar).style.display = 'none';
    $("#" + divMostrar).fadeIn("slow");
}

function mostrarArbol() {
    $("#divArbol").fadeIn("slow");
}
function ocultarArbol() {
    $("#divArbol").fadeOut("slow");
}
/*
 * Funcion que se encarga de limpiar todas las variables de sesion y retornar a la pagina de login.
 */
function cerrarSesion() {
    window.location.assign(sessionStorage.getItem("url"));
    sessionStorage.clear();
}
/*
 * reestructura el json que esta en menuJsonIni y lo trasnforma de tal forma que sea util para enviarlo a la pag tree2.html la cual muestra una arbol
 */
function menufunciones() {
    try {
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");
        jSonData.dslogin.ttdatauser[0].picfiid = sessionStorage.getItem("picfiid");

        var jsonResp = "";
        var permitirIngreso;
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio + "arbol",
            dataType: "json",
            contentType: "application/json;",
            success: function (jsonResp) {
                menuUsuario = JSON.stringify(jsonResp.dslogin.ttmenuxusuario);
                sessionStorage.setItem("menuJsonIni", menuUsuario);
                permitirIngreso = JSON.stringify(jsonResp.dslogin.eeEstados[0].Estado);
            },
            error: function (e) {
                alertDialogs("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataarbol = sessionStorage.getItem("menuJsonIni");
            if (permitirIngreso === '"OK"') {
                if (dataarbol) {
                    dataarbol = dataarbol.replace(/Codigo/g, "id");
                    dataarbol = dataarbol.replace(/Depende/g, "parent");
                    dataarbol = dataarbol.replace(/Nombre/g, "text");
                    dataarbol = dataarbol.replace(/Imagen/g, "icon");
                    dataarbol = dataarbol.replace(/CON IMAGEN/g, "../css/images/leaf.gif");
                    dataarbol = dataarbol.replace(/SIN IMAGEN/g, "");
                    dataarbol = dataarbol.replace(/Servicio/g, "columna5");
                    txtJson = "{ \"plugins\" : [],\"core\" : { \"data\" : " + dataarbol + "}}";
                    sessionStorage.setItem("txtJson2", txtJson);
                    $("#divArbol").load("tree2.html");
                }
            } else {
                alertDialogs(permitirIngreso);
            }
        });


    } catch (e) {
        alertDialogs(e.message);
    }
}

function inicio() {
    window.location.assign("index.html");
}

function abreFuncion(servicio) {
    tamanoFunciones();
    document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
    $("#tdPerfil").fadeOut("slow");
    $('#divDerecho').width($(window).width());
    apagarBotones();
    cambiarFondoTD("tdVerde");
    if (servicio.slice(0, 5) === "html&") {
        var servicio = servicio.replace(/html&/g, "");
        sessionStorage.setItem("servicio", servicio);
        document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio + "/html/" + servicio + ".html";
    } else if (servicio.slice(0, 8) == "caracter") {
        var contra = sessionStorage.getItem("contra");//sbm.util.getValue("textField1");
        var servicio = servicio.replace(/caracter/g, "");
        sessionStorage.setItem("servicio", servicio);
        sessionStorage.setItem("sesion", sessionStorage.getItem("picfiid"));
        servLinuxSOption(servicio);
        //document.getElementById("idFrame").src = urlIFrame + "IntegrityViejo/Start.jsp";        
    } else {
        document.getElementById("idFrame").src = urlIFrame + servicio + "/Start.jsp";
    }

}

function fijarPcf() {//apenas el usuario da click en alguna funcion del arbol tree2.html regresa a esta funcion con el nombre de la funcion y el id 
    try {
        var dataarbol = sessionStorage.getItem("txtJson2");
        var datas = JSON.parse(dataarbol);
        for (var i = 0; i < datas.core.data.length; i++) {//for para montar los datos en unas variables que van a ser utilizadas para identificar la fun seleccionada
            var funCod = datas.core.data[i].id;
            var funDes = datas.core.data[i].text;
            var funIco = datas.core.data[i].icon;
            var funUrl = datas.core.data[i].columna5;
            var funProg = datas.core.data[i].Programa;
            var funVideo = datas.core.data[i].Tablas;
            var funRepor = datas.core.data[i].Parametro;
            //var funUrl = "TiposContabilizacion/Start.jsp";
            arreglo_funCod[i] = funCod;
            arreglo_funDes[i] = funDes;
            arreglo_funIco[i] = funIco;
            arreglo_funUrl[i] = funUrl;
            arreglo_funProg[i] = funProg;
            arreglo_funVideo[i] = funVideo;
            arreglo_funRepor[i] = funRepor;
        }
        var idFSelect = sessionStorage.getItem("pcf");
        var textFSelec = arreglo_funDes[arreglo_funCod.indexOf(idFSelect)];
        var urlFSelec = arreglo_funUrl[arreglo_funCod.indexOf(idFSelect)];
        var urlVideo = arreglo_funVideo[arreglo_funCod.indexOf(idFSelect)];
        var urlRepor = arreglo_funRepor[arreglo_funCod.indexOf(idFSelect)];
        sessionStorage.setItem("pcf", "");
        if ((!urlFSelec) && (arreglo_funProg[arreglo_funCod.indexOf(idFSelect)])) {
            urlFSelec = "caracter" + arreglo_funProg[arreglo_funCod.indexOf(idFSelect)];
        } else if (urlRepor != "") {
            sessionStorage.setItem("idrepcon", urlRepor);
        }
        abreFuncion(urlFSelec);
        ocultarArbol();

    } catch (e) {
        alertDialogs(e.message + " fijarPcf()");
    }
}

function correLinuxBack() {//corre las funciones del shell in a box
    try {
        var ip = (((sessionStorage.getItem("url").split("/"))[2]).split(":"))[0];

        var portLinux = sessionStorage.getItem("portLinux");
        document.getElementById("includeTerm").src = "http://" + ip + ":" + portLinux + "/"
                + "?u="
                + sessionStorage.getItem("usuario")
                + "_"
                + sessionStorage.getItem("companyNIT")
                + "&p="
                + sessionStorage.getItem("contra");


    } catch (e) {
        alertDialogs(e.message + " corre");
    }
}
function corre() {//esta funcion se ejecuta por que la app IntegrityViejo la llama y su funcion es determinar si le muestra al usuario la plataforma linux Envevida o una cosola de wind   
    var hibrido = sessionStorage.getItem("hibrido");
    tamanoShell();
    if (hibrido == "LinuxWeb") {
        document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0;";
        document.getElementById("labelConsole").innerHTML = sessionStorage.getItem("ncf");
    } else {
        document.location.href = "localexplorer:W:/SrcDesarrollo/Programas/Shell/integrity3.bat";
    }
}
function servLinuxSOption(programa) {
    var jSonData = {
        "dsOpcion": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeParametros": [
                {
                    "picprograma": programa,
                    "piccianit": sessionStorage.getItem("companyNIT")
                }
            ]
        }
    };
    var jsonResp = "";
    var permitirIngreso;
    $.ajax({
        "async": false,
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios + baseServicio + "SOpcion",
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            msnError("Error al consumir el servicio de login.\n" + e.status + " - " + e.statusText);
            var buttonObject = $("#btnLogin").kendoButton().data("kendoButton")
            buttonObject.enable(true);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            corre();
        } else {
            $("body").append("<div id='dialogs'></div>");
            var dialog = $('#dialogs');
            dialog.kendoDialog({
                width: "400px",
                title: "Problemas con el inicio sesión en plataforma Caracter",
                closable: false,
                modal: true,
                content: "<p>" + permitirIngreso + "</p><br>",
                actions: [
                    {text: 'Intentar de nuevo', primary: true, action: IntentarNuevamente}
                ]
            });
            console.log("Usuario no puede ingresar \n" + permitirIngreso);
            var buttonObject = $("#btnLogin").kendoButton().data("kendoButton")
            buttonObject.enable(true);
        }
    });
}
function IntentarNuevamente() {
    var dialog = $('#dialog');
    dialog.fadeIn('slow', function () {
        $(".dialog").remove();
    });
}
function tamanoShell(e) {
    estadoIfra = "PagShell";
    if (e) {
        div_ancho = e;
        $("#divDerecho").width(div_ancho);
    }
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

    $("#divIFrame").width(div_ancho - 500);
    $("#divIFrame").height(div_alto);
    $("#divFrameInc").height(div_alto - 51);
    $("#idFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 20);

    $("#includeTerm").height(div_alto - 51);
    $("#includeTerm").width(div_ancho - 51);
    $("#includeArbol").height(div_alto - 10);
}

function tamanoPagIni(width) {
    estadoIfra = "PagInicio";
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

    $("#includeTerm").height(div_alto - 51);
    $("#includeTerm").width(div_ancho - 51);
    $("#divIFrame").width(div_ancho - 500);
    $("#divFrameInc").height(div_alto - 51);
    $("#divIFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 253 - 20);
    $("#includeArbol").height(div_alto - 10);
}

function tamanoFunciones(e) {

    estadoIfra = "PagFunciones";
    if (e) {
        div_ancho = e;
        $("#divDerecho").width(div_ancho);
    }
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

//    $( "#includeTerm" ).height( div_alto - 44);
//    $( "#includeTerm" ).width( div_ancho - 35-20);
//    
    $("#includeTerm").width(div_ancho - 51);
    $("#divIFrame").width(div_ancho - 500);
    $("#divIFrame").height(div_alto);
    $("#divFrameInc").height(div_alto - 51);

    $("#idFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 20);
    $("#includeArbol").height(div_alto - 10);
}

function mostrarDocumentos() {
    gridDDoc()
    var tamañoContenedor = $("#outerWrapper").width();
    var d = document.getElementById('divDocumentos');
    d.style.left = (tamañoContenedor - 300) + 'px';
//    document.getElementById("divDocumentos1").src = sessionStorage.getItem("url") + "/html/" + "documentos" + ".html";
//    $("#divDocumentos").load("documentos.html");
//    $('#gridDoc').data('kendoGrid').dataSource.read();
//        $('#gridDoc').data('kendoGrid').refresh();

    $("#divDocumentos").fadeIn(2500);
}
function ocultarDocumentos() {
    $("#divArbol").load("tree2.html");
    $("#divDocumentos").fadeOut("slow");
}
function closeFrame() {
    var friends = document.getElementById("idFrame");
    friends.style.display = "none";
}

function onChange(arg) {
    var selected = $.map(this.select(), function (item) {
        return $(item).text();
    });
    sessionStorage.setItem("documento", selected);
    var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length - 1];

    var actions = new Array();
    actions[0] = new Object();
    actions[0].text = "Ver online";
    actions[0].action = showFile;
    actions[1] = new Object();
    actions[1].text = "Original";
    actions[1].primary = "true";
    actions[1].action = getFile;
    if (tipoArchivo !== "pdf") {
        actions[2] = new Object();
        actions[2].text = "Como pdf";
        actions[2].action = getFileAsPDF;
    }
    bandAlert = 0;
    createDialog("Documentos", "El archivo seleccinado es " + selected + " que desea hacer ", "400px", "auto", true, true, actions);

}
var dsfiles = new Object();
dsfiles.dsfiles = new Object();
dsfiles.dsfiles.eeDatos = new Array();
dsfiles.dsfiles.eeDatos[0] = new Object();
dsfiles.dsfiles.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsfiles.dsfiles.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
dsfiles.dsfiles.eeDatos[0].local_ip = sessionStorage.getItem("ipPrivada");
dsfiles.dsfiles.eeDatos[0].remote_ip = sessionStorage.getItem("ipPublica");
var grid = "";

function gridDDoc(){
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
//                url: "http://35.162.169.179:8810/rest/Base/BaseIntegrity/DocumentList",
                url: ipServicios + baseServicio + "DocumentList",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(dsfiles);
                    }
                } catch (e) {
                    kendo.alert(e.message);
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            data: "dsfiles.ttfiles",
            model: {
                fields: {
                    nomfile: {type: "string"},
                    tamfile: {type: "integer"},
                    fecfile: {type: "date:MM-dd-yyyy"}
                }
            }
        }
    });

    grid = $("#gridDoc").kendoGrid({
        dataSource: dataSource,
        change: onChange,
        selectable: "row",
        scrollable: false,
        //height: 100%,        
        columns: [
            {
               field: "nomfile",
            }
        ]
    });
    //para ocultar el header de la grilla
    $("#gridDoc .k-grid-header").css('display', 'none');
};


/**
 * funcion para filtrar los elementos de la grilla al oprimir una tecla dentro del input buscarDoc
 * @param {type} param
 */function fltrDoc() {
    var value = $("#buscarDoc").val();
    if (value) {
        grid.data("kendoGrid").dataSource.filter({field: "nomfile", operator: "contains", value: value});
    } else {
        grid.data("kendoGrid").dataSource.filter({});
    }
};