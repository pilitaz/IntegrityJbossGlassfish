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
                    "picsuc__cod": "*",
                    "picclc__cod": "*",
                    "pidped__fec": "?",
                    "piiped__num": 0,
                    "picusuario": "*"
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
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para Editar Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function consultaCabeceraPedido() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRgpd_ped";    

    var json = {
        "dsgpd_ped": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eetemp": [{
                    "picsuc__cod": "*",
                    "picclc__cod": "*",
                    "pidped__fec": "?",
                    "piiped__num": 0,
                    "picusuario": "*"
                }]
        }
    }

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
 * Funcion para obtener la url y el json de entrada para la surcursal de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaSucursal() {
    var mapData = "eesic_suc";
    var urlSir = ipServicios + baseParameters + "SIRSucursalagencia";
    var json = 
            {  
                "dssic_suc":{  
                    "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),                    
                }],
            "eetemp": [
                {
                    "piccia_nit": ""
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

/**
 * Funcion para obtener la url y el json de entrada para la Divisa de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaDivisa() {
    var mapData = "eesic_mnd";
    var urlSir = ipServicios + baseParameters + "SIRsic_mnd";
    var json = 
            {  
                "dssic_mnd":{  
                   "eeDatos":[  
                      {  
                         "picusrcod": sessionStorage.getItem("usuario"),
                         "picfiid": sessionStorage.getItem("picfiid"), 
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
 * Funcion para obtener la url y el json de entrada para el Condiciones de pago de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaCondicionesDePago() {
    var mapData = "eefac_pag";
    var urlSir = ipServicios + baseParameters + "SIRfac_pag";
    var json = 
            {
                    "dsfac_pag" : {
                            "eeDatos" : [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"), 
                                    }
                            ],
                            "eetemp" : [{                                            
                                            "piifac_pag" : ""
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
 * Funcion para obtener la url y el json de entrada para el Cliente de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaCliente() {
    var mapData = "eegfc_cli";
    var urlSir = ipServicios + baseParameters + "SIRgfc_cli";
    var json = 
            {
                    "dsgfc_cli" : {
                            "eeDatos" : [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"), 
                                    }
                            ],
                            "eetemp" : [{
                                            "picter_raz" : "",
                                            "picter_nit" : "",
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
 * Funcion para obtener la url y el json de entrada para el Vendedor de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaVendedor() {
    var mapData = "eesic_ven1";
    var urlSir = ipServicios + baseParameters + "SIRsic_ven";
    var json = 
            {
                    "dssic_ven" : {
                            "eeDatos" : [{
                                            "picusrcod" : sessionStorage.getItem("usuario"),
                                            "fiid" : sessionStorage.getItem("picfiid")
                                    }
                            ],
                            "eetemp" : [{
                                            "picsuc_cod" : "",
                                            "piiven_cod" : ""
                                    }
                            ]
                    },
                    "eesic_ven1" : [{}]
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
 * Funcion para obtener la url y el json de entrada para el Vendedor de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDPedido() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_ped";
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
                                    "dpc__par": "false",
                                    "clc__cod": "",
                                    "mnd__cla": "",
                                    "pago__cod": "",
                                    "ped__fec": "",
                                    "ped__fec__ent": "",
                                    "ped__num": "",
                                    "obs__ped": "",
                                    "ped__pqs": "",
                                    "suc__cod": "",
                                    "ter__dir": "",
                                    "ter__nit": "",
                                    "ter__tel": "",
                                    "ven__cod": "",
                                    "gpd__est": 0,
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
