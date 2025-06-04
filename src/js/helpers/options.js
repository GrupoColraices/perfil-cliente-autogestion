export const trueOrFalse = [
    { id: 1, name: 'Si', value: true },
    { id: 2, name: 'No', value: false }
]
export const gender = [
    { id: 1, name: 'Masculino', value: 'Masculino' },
    { id: 2, name: 'Femenino', value: 'Femenino' },
    { id: 3, name: 'Otro', value: 'Otro' }

]
export const housingType = [
    { id: 1, name: "Propietario", value: "Propietario" },
    { id: 2, name: "Inquilino", value: "Inquilino" },
    { id: 3, name: "Casa familiar", value: "Casa familiar" },
];
export const peoplePaying = [
    { id: 1, name: "Solo yo", value: "Solo yo" },
    { id: 2, name: "2", value: "2" },
    { id: 3, name: "3", value: "3" },
    { id: 4, name: "4", value: "4" },
    { id: 5, name: "5", value: "5" },
];
export const paymentMethod = [
    { id: 1, name: "Efectivo", value: "Efectivo" },
    { id: 2, name: "Cheque", value: "Cheque" },
    { id: 3, name: "Cuenta", value: "Cuenta" },
];

export const paymentFrequency = [
    { id: 1, name: "Diario", value: "Diario" },
    { id: 2, name: "Semanal", value: "Semanal" },
    { id: 3, name: "Quincenal", value: "Quincenal" },
    { id: 4, name: "Mensual", value: "Mensual" },
]
export const accountHolder = [
    { id: 1, name: "Todas", value: "Todas" },
    { id: 2, name: "Ninguna", value: "Ninguna" },
    { id: 3, name: "Una o más", value: "Una o más" },
]
export const financialDebt = [
    { id: 1, name: "Ninguna", value: "Ninguna" },
    { id: 2, name: "Crédito hipotecario", value: 5 },
    { id: 3, name: "Tarjeta de crédito", value: 6 },
    { id: 4, name: "Crédito libre inversión", value: 7 },
    { id: 5, name: "Otro", value: "Otro" },
]
export const typeHeritage = [
    { id: 1, name: "Ninguno", value: "Ninguno" },
    { id: 2, name: "Vehiculos", value: "Vehiculos" },
    { id: 3, name: "Renta fija", value: "Renta fija" },
    { id: 4, name: "Monetario", value: "Monetario" },
    { id: 5, name: "Maquinaria", value: "Maquinaria" },
    { id: 6, name: "Bienes Raices", value: "Bienes Raices" },
    { id: 7, name: "Acciones", value: "Acciones" },
]
export const propertyClass = [
    { id: 1, name: "Nuevo", value: "Nuevo" },
    { id: 2, name: "Usado", value: "Usado" },
    { id: 3, name: "Sobre planos", value: "Sobre planos" },
]
export const propertyPurpose = [
    { id: 1, name: "Vivienda", value: "Vivienda" },
    { id: 2, name: "Arriendo", value: "Arriendo" },
    { id: 3, name: "Inversión", value: "Inversión" },
    { id: 4, name: "Vivienda familiar", value: "Vivienda familiar" }
]
export const typeDocument = [
    { id: 1, name: "Cédula de ciudadanía", value: "Cédula de ciudadanía" },
    { id: 2, name: "NIT", value: "NIT" },
]
export const typeDocumentAgent = [
    { id: 1, name: "Cédula de ciudadanía", value: "Cédula de ciudadanía" },
    { id: 2, name: "Pasaporte", value: "Pasaporte" },
    { id: 3, name: "Otro", value: "Otro" },
]
export const typeReference = [
    { id: 1, name: 'Familiar', value: 'Familiar' },
    { id: 2, name: 'Personal', value: 'Personal' }
]
export const bankCreditTypes = {
    1: {
        bank: "Bancolombia",
        credits: [
            { id: 1, name: "Hipotecario" },
            { id: 2, name: "Leasing habitacional" },
        ]
    },
    2: {
        bank: "Davivienda",
        credits: [
            { id: 1, name: "Hipotecario" },
            { id: 2, name: "Leasing habitacional" },
        ]
    },
    3: {
        bank: "Banco Unión",
        credits: [
            { id: 1, name: "Hipotecario" },
            { id: 2, name: "Leasing habitacional" },
            { id: 3, name: "Libre Inversión" }
        ]
    }
};


export const authorizationCheckboxes = [
    {
        name: 'data_authorization',
        link: 'https://drive.google.com/file/d/14B-f-Y-ks_cOqjUXLBGGtsrzeQFnFOMu/view',
        label: 'Autorización de tratamientos de datos'
    },
    {
        name: 'risks_authorization',
        link: 'https://drive.google.com/file/d/1VqLSdva9Vf9TdTiuWdh-oM6l4l4zqGNY/view?usp=sharing',
        label: 'Autorización de consultas en centrales de riesgo'
    },
    {
        name: 'conditions_authorization',
        link: 'https://drive.google.com/file/d/1-Oji4VJPUOW8y0dgHrrq04PO8iJfXIdu/view?usp=sharing',
        label: 'Aceptación de condiciones del servicio'
    }
];


