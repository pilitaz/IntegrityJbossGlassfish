/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaPedidos() {
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
                    "pidped_fec": "?",
                    "piiped_num": 0,
                    "piiped_est": -1
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

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

/**
 * Funcion para obtener la url y el json de entrada para el servicio de aprovacion de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDgpd_ped_apro() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_ped_apro";
    var json = 
            {
                    "dsSICUDgpd_ped": {
                            "eeDatos": [{
                                    "picusrcod": sessionStorage.getItem("usuario"),
                                    "picfiid": sessionStorage.getItem("picfiid"),
                                    "local_ip":sessionStorage.getItem("ipPrivada"),
                                    "remote_ip":sessionStorage.getItem("ipPublica")
                            }],
                            "eegpd_ped": [{
                                    "ciu__cod": "",
                                    "com__con": "",
                                    "dpc__par": "true",
                                    "clc__cod": "",
                                    "mnd__cla": "",
                                    "pago__cod": 0,
                                    "ped__fec": "",
                                    "ped__fec__ent": "",
                                    "ped__num": 0,
                                    "obs__ped": "",
                                    "ped__pqs": "",
                                    "suc__cod": "",
                                    "ter__dir": "",
                                    "ter__nit": "",
                                    "ter__tel": "",
                                    "ven__cod": 0
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

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la cartera del cliente
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SIRcon_anf_cli() {
    var mapData = "eecon_anf_cli";
    var urlSir = ipServicios + baseContabilidad + "SIRcon_anf_cli";
    var json = {
                        "dsSIRcon_anf_cli" : {
                                "eeDatos" : [{
                                                "picusrcod" : sessionStorage.getItem("usuario"),
                                                "picfiid" : sessionStorage.getItem("picfiid"),
                                                "local_ip" : sessionStorage.getItem("ipPrivada"),
                                                "remote_ip" : sessionStorage.getItem("ipPublica")
                                        }
                                ],
                                "eSIRcon_anf_cli" : [{
                                                "piicor__ano" : 0,
                                                "picter__nit" : ""
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

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};