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
                    "cap__cod":137,
                    "fun__cod":3,
                    "por__cod":10
                }

//                {  
//                    "cap__cod":sessionStorage.getItem("capitulo"),
//                    "fun__cod":sessionStorage.getItem("funcion"),
//                    "por__cod":sessionStorage.getItem("portafolio")
//                }
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


//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirDataDetalle() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRgpd_ped";
    var json = {
            "dsSIRgpd_ped": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpd_ped": [
                {
                    "picsuc_cod": "*",                    
                    "pidped_fec": "2017/01/02",
                    "piiped_num": 0,
                    "piiped_est": -1,
                    "pilhastapr": true
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirData() {
    var mapData = "eesic_forms";
    var urlSir = ipServicios + baseServicio + "SIRsic_forms";
    var json = {
        "dsSIRinitial": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eesic_rol_fun": [{
                    "cap__cod": 0,
                    "fun__cod": 0,
                    "por__cod": 0, 
                    "rol__cod": 0
                }]
            
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};


//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDForms() {
    var mapData = "eesic_forms";
    var urlSir = ipServicios + baseServicio + "SICUDsic_forms";
    var json = {  
        "dsSIRinitial":{  
            "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eesic_forms": [
                {
                    "cap_cod":"",
                    "forms_editable":"",
                    "forms_filterable":"",
                    "forms_nom":"",
                    "forms_num":"",
                    "forms_scrollable":"",
                    "forms_selectable":"",
                    "forms_sorteable":"",
                    "fun_cod":"",
                    "por_cod":"",
                    "titulo":"",
                    "piindicador":""
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};
