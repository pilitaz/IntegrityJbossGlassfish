
var puerto = sessionStorage.getItem("puerto");
var ip = sessionStorage.getItem("ip");

puerto = "18800" ;
ip = "172.21.24.146";

var urlIFrame = "http://"+ip+":"+puerto+"/sbm/BizSolo/"; 
var arreglo_funCod = new Array();
var arreglo_funDes = new Array();
var arreglo_funIco = new Array();
var arreglo_funUrl = new Array();
var arreglo_funProg = new Array();
var arreglo_funVideo = new Array();
var arreglo_funRepor = new Array();

$(document).ready(function() {
    sessionStorage.setItem("VideoAyuda","http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865s");//cambiar urlVideo con url link apenas este listo el video de ayuda   
    
    //sessionStorage.setItem("cifrapass","");
    
    
    
    if(sessionStorage.getItem("loginintegrity")==="valido"){
        $(window).trigger("resize");
        
        $("#btnCambiarClave").kendoButton({
            
        });
        $("#btnGuardarClave").kendoButton({
            
        });
        menufunciones();
        correLinuxBack();
        document.getElementById("lbNombre").innerHTML = sessionStorage.getItem("usrnom");
        document.getElementById("lbEMail").innerHTML = sessionStorage.getItem("usrmail");    
        document.getElementById("imgUsuario").src = "../images/equipo/"+sessionStorage.getItem("usuario")+".png";
        document.getElementById("logoEmpresa").src = "data:image/png;base64," + sessionStorage.getItem("img");
        document.getElementById("idFrame").src = urlIFrame+"actatareas/Start.jsp";
        
    }else{
        window.location.assign(sessionStorage.getItem(url));
    }
});


$(window).resize(function() {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight-55);
});
/**
 * Cambia la imagen del menu izquierdo, cuyo id=imgId, por una imagen que muestre un estado activo(On) y cambia la URL del iframe. 
 * @param {type} imgId 
 * @param {type} estiloTd
 * @returns {undefined}
 */  
function cambiarImagen(imgId, estiloTd){
    ocultarArbol();
    var imgName=imgId.replace("img", "").toLowerCase();    
    var estado = document.getElementById(imgId).getAttribute("estado");
    apagarBotones(imgId);
    
    if(estado == "off"){
        var servicio = document.getElementById(imgId).getAttribute("servicio");
        document.getElementById(imgId).src = "../images/"+imgName+"On.png";
        document.getElementById(imgId).setAttribute("estado", "on");
        document.getElementById(imgId).setAttribute("onmouseover", "");
        document.getElementById(imgId).setAttribute("onmouseout", "");
        document.getElementById(imgId).getAttribute("servicio");
        if(servicio!=""){
            document.getElementById("idFrame").src = urlIFrame+servicio+"/Start.jsp";
            document.getElementById("tdPerfil").style="display:none"
        }        
        cambiarFondoTD(estiloTd);
    }
}

/**
 * Cambia el fondo del todos los td que tengan el atributo name="imgLogoIntegrity"
 */
function cambiarFondoTD(nombreClase){    
    if(nombreClase==""){        
        document.getElementById("imgLogoIntegrity").src = "../images/Login Inicio-07.png";
    }else{
        document.getElementById("imgLogoIntegrity").src = "../images/logo-08.png";
    }    
    var listaTdSuperior = document.getElementsByName("tdSuperior");    
    for (var i=0; i<listaTdSuperior.length; i++){
        listaTdSuperior[i].className = nombreClase;
    }  
}
/**
 * cambia el estado de todos los botones del menu vertical de la izquierda (Trasferencias, reportes, procesos, etc ) a off 
 * excepto el del id que le pasemos, este quedara activo
 */
function apagarBotones(id){
    var imgMenu = document.getElementsByName("imgMenu");    
    for (var i=0; i<imgMenu.length; i++){        
        if(imgMenu[i].id!=id && imgMenu[i].getAttribute("estado")!="off"){
            var imgNombre=imgMenu[i].id.replace("img", "").toLowerCase();            
            document.getElementById(imgMenu[i].id).src = "../images/"+imgNombre+"Off.png";
            document.getElementById(imgMenu[i].id).setAttribute("estado", "off");            
            if(imgNombre=="imgTransacciones"){
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/"+imgNombre+"RO.png'; mostrarArbol();");
            }else{
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/"+imgNombre+"RO.png';");
            }
            document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../images/"+imgNombre+"Off.png';");
        }
    }
}
/**
 * Abre la pagina de ayuda que esta almacenda como una variable de sesion, la pagina que despiegla por el momento esta en http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865sS
 */
function ayuda(){
    
    var video = sessionStorage.getItem("VideoAyuda");
    if(video){
        windowPopUp(video,"Ayuda");
    }else{
        var htmlText= '<html><head><title>Soporte</title></head><body><p align="center">'+
		'<img src="images/ayuda-52.png" alt="Soporte" width="200" height="45"><br></br></p>'+
		'<p align="center" style="font-family:Tahoma;font-size:10pt;">Visite nuestro '+
		'canal de tutoriales <b>Integrity</b> y conozca todas las posibilidades de nuestro sistema.'+
		'<br></br></p><p align="center"><img src="images/video.png" alt="Soporte" width="500" height="307"></p></body></html>';
        alert(htmlText);
    }
}
/**
 * 
 * @param {type} detalle 
 * @param {type} titulo
 * @returns {undefined}
 */
function  windowPopUp(detalle,titulo){
    
    try{
        
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
        
    }catch(e){
        alert("Function: windowPopUp Error: "+e.message);
        console.log(e.message)
    }
}

function onClose() {
    alert("cerrando");
    $("#window").fadeIn();
}

function cambiarClave(){
    reemplazarDiv("divBtCambiarClave", "cambiarClave");    
}

function guardarClave(){
    try{
        if(document.getElementById("IpClave").value==document.getElementById("IpRClave").value){
            console.log("claves iguales")
            var cambioExitoso;
            var jSonData = new Object();
            jSonData.dslogin = new Object();
            jSonData.dslogin.ttdatauser = new Array();
            jSonData.dslogin.ttdatauser[0] = new Object();
            jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");        
            jSonData.dslogin.ee_userPAS = new Array();
            jSonData.dslogin.ee_userPAS[0] = new Object();
            jSonData.dslogin.ee_userPAS[0].euserid = sessionStorage.getItem("usuario");
            jSonData.dslogin.ee_userPAS[0].epassword = document.getElementById("IpClave").value;
            jSonData.dslogin.ee_userPAS[0].usrmail =  sessionStorage.getItem("usrmail");
            
            console.log("url servicio cambio clave "+ipServicios + baseServicio +"cambiopass\n"+JSON.stringify(jSonData));
            
            $.ajax({
                type: "POST",
                data: JSON.stringify(jSonData),
                url: ipServicios + baseServicio +"cambiopass",
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) {                    
                    cambioExitoso = JSON.stringify(resp.dslogin.ttestado[0].pocestado);                
                },
                error: function (e) {
                    alert("Error \n" + JSON.stringify(e));
                }
            }).done(function(){
                if (cambioExitoso=='"OK"') {
                    alert("cambio existoso, sera redirigido al login");
                    cerrarSesion();
                }else{
                    alert(cambioExitoso);
                }
                
            });
            
            reemplazarDiv("cambiarClave","divBtCambiarClave");
        }else{
            status.text("Datos incompletos");            
        }
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/*
 * Funcion reemplaza un div por otro, oculta el divOcultar y muestra el divMostrar con un leve efecto.
 */
function reemplazarDiv(divOcultar, divMostrar){
    document.getElementById(divOcultar).style.display = 'none';    
    $("#"+divMostrar).fadeIn("slow");
}

function mostrarArbol(){    
    $("#divArbol").fadeIn("slow");
}
function ocultarArbol(){
    $("#divArbol").fadeOut("slow");
}
/*
 * Funcion que se encarga de limpiar todas las variables de sesion y retornar a la pagina de login.
 */
function cerrarSesion(){    
    window.location.assign(sessionStorage.getItem("url"));
    sessionStorage.clear();
}
/*
 * reestructura el json que esta en menuJsonIni y lo trasnforma de tal forma que sea util para enviarlo a la pag tree2.html la cual muestra una arbol
 */
function menufunciones() {
    try{  
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");
        jSonData.dslogin.ttdatauser[0].picfiid = sessionStorage.getItem("picfiid");
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio +"arbol",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {
                
                menuUsuario = JSON.stringify(resp.dslogin.ttmenuxusuario);
                sessionStorage.setItem("menuJsonIni",menuUsuario);
                
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function(){
            var dataarbol = sessionStorage.getItem("menuJsonIni");	
            
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
        });
        
        
    }catch(e){alert(e.message);}
}

function inicio(){
    window.location.assign("index.html");
}

function documentos(){
    servicio="Documentos";
    $("#tdPerfil").fadeOut("slow");
    document.getElementById("idFrame").src = urlIFrame+servicio+"/Start.jsp";      
}

function abreFuncion(servicio){
    $("#tdPerfil").fadeOut("slow");
    alert(servicio);
    apagarBotones();
    cambiarFondoTD("tdVerde")
    if(servicio.slice(0,8)=="caracter"){        
        var contra = sessionStorage.getItem("contra");//sbm.util.getValue("textField1");
        var servicio = servicio.replace(/caracter/g,"");
        sessionStorage.setItem("servicio",servicio);
        sessionStorage.setItem("sesion",sessionStorage.getItem("picfiid"));        
        document.getElementById("idFrame").src = urlIFrame + "IntegrityViejo/Start.jsp";        
    }else{
        document.getElementById("idFrame").src = urlIFrame+servicio+"/Start.jsp";
    }
    
}

function fijarPcf(){//apenas el usuario da click en alguna funcion del arbol tree2.html regresa a esta funcion con el nombre de la funcion y el id 
    try{        
        var dataarbol=sessionStorage.getItem("txtJson2");        
        var datas = JSON.parse(dataarbol);
        for(var i=0;i<datas.core.data.length;i++){//for para montar los datos en unas variables que van a ser utilizadas para identificar la fun seleccionada
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
        var textFSelec =  arreglo_funDes[arreglo_funCod.indexOf(idFSelect)];
        var urlFSelec =  arreglo_funUrl[arreglo_funCod.indexOf(idFSelect)];
        var urlVideo =  arreglo_funVideo[arreglo_funCod.indexOf(idFSelect)];
        var urlRepor =  arreglo_funRepor[arreglo_funCod.indexOf(idFSelect)];
        sessionStorage.setItem("pcf","");
        if((!urlFSelec)&&(arreglo_funProg[arreglo_funCod.indexOf(idFSelect)])){
            urlFSelec = "caracter"+arreglo_funProg[arreglo_funCod.indexOf(idFSelect)];
        }        
        else if(urlRepor!=""){
            sessionStorage.setItem("idrepcon",urlRepor);
        }        
        abreFuncion(urlFSelec);
        ocultarArbol();
        
    }catch(e){alert(e.message + " fijarPcf()");}
}

function correLinuxBack() {//corre las funciones del shell in a box
    try {
        var ip=(((sessionStorage.getItem("url").split("/"))[2]).split(":"))[0];
        
        var portLinux = sessionStorage.getItem("portLinux");
        document.getElementById("includeTerm").src = "http://"+ip+":"+portLinux+"/"
		+ "?u="
		+ sessionStorage.getItem("usuario")
		+ "&p="
		+ sessionStorage.getItem("contra");
        
        
    } catch (e) {
        alert(e.message + " corre");
    }
}
function corre(){//esta funcion se ejecuta por que la app IntegrityViejo la llama y su funcion es determinar si le muestra al usuario la plataforma linux Envevida o una cosola de wind   
    var hibrido = sessionStorage.getItem("hibrido");
    
    if (hibrido == "LinuxWeb") {
        document.getElementById("IframeInc").style = "position: absolute; left: 0; top: 0;";  
        crearFont (sessionStorage.getItem("ncf"),"IframeInc",4,"#ffffff");       
    }else{
        document.location.href = "localexplorer:W:/SrcDesarrollo/Programas/Shell/integrity3.bat";
    }
}
function  crearFont (titulo,div,tam,color){
    var font = document.createElement('font');
    font.setAttribute('color', color);
    font.setAttribute('size', tam);    
    font.innerHTML = titulo;
    document.getElementById(div).appendChild(font);
}
function limpiar(div) {
    var d = document.getElementById(div);
    while (d.hasChildNodes())
        d.removeChild(d.firstChild);
}