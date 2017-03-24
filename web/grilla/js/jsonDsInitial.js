/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dsInitial= {
  "dsSIRinitial": {
    "eesic_rol_fun": [
      {
        "cap__cod": 1,
        "fun__cod": 1,
        "por__cod": 1,
        "rol__cod": 0,
        "piindicador": 0
      }
    ],
    "eeforms": [
      {
        "por_cod": 1,
        "cap_cod": 1,
        "fun_cod": 1,
        "forms_num": 1,
        "forms_nom": "grilla",
        "forms_title": "Pedidos",
        "forms_selectable": true,
        "forms_sorteable": true,
        "forms_editable": true,
        "forms_scrollable": true,
        "forms_filterable": true,
        "eecolumns": [
          {
            "idinterno": 0,
            "titulo": "",
            "cmp_nom": "nom_emp",
            "cmp_nom2": "euserid",
            "cmp_dsc": "Codigo Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 1,
            "titulo": "",
            "cmp_nom": "nom_emp.ape",
            "cmp_nom2": "euser__Name",
            "cmp_dsc": "Nombre Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 2,
            "titulo": "",
            "cmp_nom": "Correo Electronico",
            "cmp_nom2": "usr__mail",
            "cmp_dsc": "Edad",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 3,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__carp",
            "cmp_dsc": "Cedula",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 4,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__est",
            "cmp_dsc": "Estado",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 5,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__cod",
            "cmp_dsc": "Codigo Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 6,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__nom",
            "cmp_dsc": "Nombre Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 7,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "cia__nit",
            "cmp_dsc": "Nit Cia",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 8,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "actor__cod",
            "cmp_dsc": "Actor",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          }
        ],
        "eebuttons": [
          {
            "idinterno": 0,
            "titulo": "Editar",
            "nombre": "Editar1",
            "funcion": "editarElemento",
            "icono": "po_editoff"
          },
          {
            "idinterno": 1,
            "titulo": "Eliminar",
            "nombre": "Eliminar1",
            "funcion": "borrarElemento",
            "icono": "po_cerrar"
          },
          {
            "idinterno": 2,
            "titulo": "Cambiar Estado",
            "nombre": "cambiarEstado",
            "funcion": "cambiarEstado",
            "icono": "po_check"
          }
        ]
      },
      {
        "por_cod": 1,
        "cap_cod": 1,
        "fun_cod": 1,
        "forms_num": 2,
        "forms_nom": "grillaDetalle",
        "forms_title": "Articulos",
        "forms_selectable": true,
        "forms_sorteable": true,
        "forms_editable": true,
        "forms_scrollable": true,
        "forms_filterable": true,
        "eecolumns": [
          {
            "idinterno": 0,
            "titulo": "",
            "cmp_nom": "nom_emp",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Nombre2",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 1,
            "titulo": "",
            "cmp_nom": "nom_emp.ape",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Apellido2",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 2,
            "titulo": "",
            "cmp_nom": "nom_edad2",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Edad2",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 3,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Sueldo2",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          }
        ],
        "eebuttons": [
          {
            "idinterno": 0,
            "titulo": "Editar",
            "nombre": "Editar1",
            "funcion": "editarElemento",
            "icono": "po_editoff"
          },
          {
            "idinterno": 2,
            "titulo": "Cambiar Estado",
            "nombre": "cambiarEstado",
            "funcion": "cambiarEstado",
            "icono": "po_check"
          }
        ]
      },
      {
        "por_cod": 1,
        "cap_cod": 1,
        "fun_cod": 1,
        "forms_num": 3,
        "forms_nom": "popUpCabecera",
        "forms_title": "Pedido",
        "forms_selectable": true,
        "forms_sorteable": true,
        "forms_editable": true,
        "forms_scrollable": true,
        "forms_filterable": true,
        "eecolumns": [
          {
            "idinterno": 0,
            "titulo": "",
            "cmp_nom": "nom_emp",
            "cmp_nom2": "euserid",
            "cmp_dsc": "Codigo Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 1,
            "titulo": "",
            "cmp_nom": "nom_emp.ape",
            "cmp_nom2": "euser__Name",
            "cmp_dsc": "Nombre Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 2,
            "titulo": "",
            "cmp_nom": "Correo Electronico",
            "cmp_nom2": "usr__mail",
            "cmp_dsc": "Edad",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 3,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__carp",
            "cmp_dsc": "Cedula",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 4,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__est",
            "cmp_dsc": "Estado",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 5,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__cod",
            "cmp_dsc": "Codigo Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 6,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__nom",
            "cmp_dsc": "Nombre Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 7,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "cia__nit",
            "cmp_dsc": "Nit Cia",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 8,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "actor__cod",
            "cmp_dsc": "Actor",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          }
        ],
        "eebuttons": [
          {
            "idinterno": 0,
            "titulo": "Crear",
            "nombre": "crear",
            "funcion": "crearElemento",
            "icono": ""
          }
        ]
      },
      {
        "por_cod": 1,
        "cap_cod": 1,
        "fun_cod": 1,
        "forms_num": 3,
        "forms_nom": "popUpDetalle",
        "forms_title": "Articulo",
        "forms_selectable": true,
        "forms_sorteable": true,
        "forms_editable": true,
        "forms_scrollable": true,
        "forms_filterable": true,
        "eecolumns": [
          {
            "idinterno": 0,
            "titulo": "",
            "cmp_nom": "nom_emp",
            "cmp_nom2": "euserid",
            "cmp_dsc": "Codigo Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 1,
            "titulo": "",
            "cmp_nom": "nom_emp.ape",
            "cmp_nom2": "euser__Name",
            "cmp_dsc": "Nombre Usuario",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 2,
            "titulo": "",
            "cmp_nom": "Correo Electronico",
            "cmp_nom2": "usr__mail",
            "cmp_dsc": "Edad",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 3,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__carp",
            "cmp_dsc": "Cedula",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 4,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "usr__est",
            "cmp_dsc": "Estado",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 5,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__cod",
            "cmp_dsc": "Codigo Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 6,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "car__nom",
            "cmp_dsc": "Nombre Cargo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 7,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "cia__nit",
            "cmp_dsc": "Nit Cia",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 8,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "actor__cod",
            "cmp_dsc": "Actor",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          }
        ],
        "eebuttons": [
          {
            "idinterno": 0,
            "titulo": "Crear",
            "nombre": "crear",
            "funcion": "crearElemento",
            "icono": ""
          }
        ]
      },
      {
        "por_cod": 1,
        "cap_cod": 1,
        "fun_cod": 1,
        "forms_num": 4,
        "forms_nom": "popUpBusqueda",
        "forms_title": "Busqueda",
        "forms_selectable": false,
        "forms_sorteable": false,
        "forms_editable": false,
        "forms_scrollable": false,
        "forms_filterable": false,
        "eecolumns": [
          {
            "idinterno": 0,
            "titulo": "",
            "cmp_nom": "nom_emp",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Nombre",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 1,
            "titulo": "",
            "cmp_nom": "nom_emp.ape",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Apellido",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "char",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 2,
            "titulo": "",
            "cmp_nom": "nom_edad",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Edad",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          },
          {
            "idinterno": 3,
            "titulo": "",
            "cmp_nom": "nom_emp.sueldo",
            "cmp_nom2": "nom_emp",
            "cmp_dsc": "Sueldo",
            "cmp_vis": true,
            "cmp_lec": false,
            "cmp_tip": "int",
            "cmp_edi": true,
            "cmp_req": true
          }
        ],
        "eebuttons": [
          {
            "idinterno": 0,
            "titulo": "Buscar",
            "nombre": "buscar",
            "funcion": "buscarElementos",
            "icono": ""
          }
        ]
      }
    ],
    "eeEstados": [
      {
        "Estado": "OK",
        "Returnid": 0
      }
    ]
  }
}

