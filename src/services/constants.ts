export const API_CONFIG = {
    BASE_URL: 'http://localhost:3333/api',
    ENDPOINTS: {
        ADM_PERSONAL:          '/admin/personal',
        ADM_CLIENTES:          '/admin/clientes',
        ADM_MASCOTAS:          '/admin/mascotas',
        ADM_LOGS:              '/admin/logs',
        ADM_HIST:               '/admin/historial',
        CLI_MASCOTAS:          '/cliente/mascotas',
        CLI_RESERVA:           '/cliente/reservacion',
        CLI_RESERVACLI:        '/cliente/reservacion/cli',
        CLI_RESERVAGRAL:       '/cliente/reservacion/gral',
        DOC_VACUNAS:           '/vetdoc/vacunas',
        DOC_REGVAC:            '/vetdoc/regvac',
        ADM_SERVICIO:           '/admin/servicioMedico',
        CLI_SERVICIO:           '/cliente/serviciosMedicos'
    },
    ITEMS_PER_PAGE: 6
} as const;
