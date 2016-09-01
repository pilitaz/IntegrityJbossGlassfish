
var usuario;
var password;
var permitirIngreso;

function onLoad() {    
    sessionStorage.clear();
    var url =   document.URL;
    sessionStorage.setItem("url", url);
    var y =   document.URL.split("/");
    var ipPuerto = document.URL.split("/")[2];
    var puerto =   y[2].split(":");
    sessionStorage.setItem("ip", puerto[0]);
    sessionStorage.setItem("puerto", puerto[1]);
    $("#btnLogin").kendoButton({
    });

    presionaEnter();
}

/*
 * Metodo que consume el servicio de para el Login
 * 
 */
function login() {
    usuario = $("#usuario").val();
    password = $("#password").val();
    
    try {        
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = usuario;
        jSonData.dslogin.ttdatauser[0].picusrpass = password;
        var jsonResp = "";
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio +"Login",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {
                
                permitirIngreso = JSON.stringify(resp.dslogin.ttestado[0].pocestado);
                jsonResp = resp; 
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
                window.location.assign("html/login.html");
            }
        }).done(function(){
            if(permitirIngreso=='"OK"'){                
                console.log("Usuario con permiso de ingresar \n" + permitirIngreso);                    
                sessionStorage.setItem("usrnom",jsonResp.dslogin.eesicusuarios[0].usrnom);
                sessionStorage.setItem("usuario",usuario);
                sessionStorage.setItem("usrmail",jsonResp.dslogin.eesicusuarios[0].usrmail);
                sessionStorage.setItem("picfiid",jsonResp.dslogin.ttdatauser[0].picfiid);                    
                sessionStorage.setItem("poccargo",jsonResp.dslogin.ttdatauser[0].poccargo);
                sessionStorage.setItem("img",jsonResp.dslogin.eesiccia[0].cialog);
                sessionStorage.setItem("companyNIT",jsonResp.dslogin.eesiccia[0].cianit);
                sessionStorage.setItem("contra",jsonResp.dslogin.eesicusuarios[0].clavprov);                    
                sessionStorage.setItem('sesion', sessionStorage.getItem("picfiid"));
                sessionStorage.setItem("loginintegrity","valido");
                sessionStorage.setItem("hibrido",jsonResp.dslogin.eesiccia[0].ciaserv);
                sessionStorage.setItem("portLinux",jsonResp.dslogin.eesiccia[0].ciapuerto);
                window.location.assign("html/index.html");
            }else{                    
                console.log("Usuario no puede ingresar \n" + permitirIngreso);                
            }
        });
        
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }    
}

/*
 *  Permite que los datos del fomulario sean enviando cuando el usuario oprime la tecla "Enter"
 */
function presionaEnter() {
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        var target = e.keyCode;
        if (target == 13) {
            login();
            document.getElementById("btnLogin").click();
        }
    }, false);
}
