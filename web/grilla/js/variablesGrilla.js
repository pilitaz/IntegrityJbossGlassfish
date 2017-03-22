/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function dsSIRinitial() {    
    
    var urlSir = ipServicios + baseServicio +"SIRinitial";
    var json = {  
        "dsSIRinitial":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eesic_rol_fun":[  
                {  
                    "cap__cod":sessionStorage.getItem("capitulo"),
                    "fun__cod":sessionStorage.getItem("funcion"),
                    "por__cod":sessionStorage.getItem("portafolio")
                }
            ]
        }
    };
    
    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };
    
    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };
};

function sirData () {
    var url = ipServicios+baseServicio+"SirUsuarios";
    var mapSir = "ee_user2";
    var json = {
        "dsee_user2": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ]
        }
    };
    this.setUrlSir = function (newname) {
        if (newname) {
            url = newname;
		}
	};
    this.getUrlSir = function () {
        return url;
	};
    this.setmapSir = function (newname) {
        if (newname) {
            mapSir = newname;
		}
	};
    this.getmapSir = function () {
        return mapSir;
	};
    this.setjson = function (newname) {
        if (newname) {
            json = newname;
		}
	};
    this.getjson = function () {
        return json;
	};
};