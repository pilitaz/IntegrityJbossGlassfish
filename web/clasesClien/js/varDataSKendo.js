/* 
	* To change this license header, choose License Headers in Project Properties.
	* To change this template file, choose Tools | Templates
	* and open the template in the editor.
*/


//////////////////////////////////////////////////////////////////////////////////////
function sir () {
    var url = ipServicios+baseComercial+"SIRgpr_cla";
    var mapSir = "eegpr_cla";
    var dataInputSir = {
            "dsSIRgpr_cla":{  
                "eeDatos":[  
                    {  
                        "picusrcod":sessionStorage.getItem("usuario"),
                        "picfiid":sessionStorage.getItem("picfiid"),
                        "local_ip":sessionStorage.getItem("ipPrivada"),
                        "remote_ip":sessionStorage.getItem("ipPublica")
                    }
                ],
                "eeSIRgpr_cla":[  
                    {  
                        "piicla__cli" : 0,
                        "piccial__cod" : "*",
                        "piiclaest": -1,
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
    this.setdataInputSir = function (newname) {
        if (newname) {
            dataInputSir = newname;
		}
	};
    this.getdataInputSir = function () {
        return dataInputSir;
	};
};

///////////////////////////////////////////////////////////////////////////////////////
function cud () {
    var url = ipServicios+baseComercial+"SICUDgpr_cla";
    var mapCud = "eegpr_cla";
    var dataInputCud = {
		"dsSICUDgpr_cla":{  
			"eeDatos":[  
				{  
					"picusrcod":sessionStorage.getItem("usuario"),
					"picfiid":sessionStorage.getItem("picfiid"),
					"local_ip":sessionStorage.getItem("ipPrivada"),
					"remote_ip":sessionStorage.getItem("ipPublica")
				}
			]
		}};
		this.setUrlCud = function (newname) {
			if (newname) {
				url = newname;
			}
		};
		this.getUrlCud = function () {
			return url;
		};
		this.setmapCud = function (newname) {
			if (newname) {
				mapCud = newname;
			}
		};
		this.getmapCud = function () {
			return mapCud;
		};
		this.setdataInputCud = function (newname) {
			if (newname) {
				dataInputCud = newname;
			}
		};
		this.getdataInputCud = function () {
			return dataInputCud;
		};
};


