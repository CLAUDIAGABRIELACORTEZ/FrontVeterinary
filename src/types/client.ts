export interface MascotaCli {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Años: string;
    Meses: string;
    Especie: string;
    Raza: string;
}

export interface Reservation {
    ReservacionID: number;
    Motivo: string;
    FechaHoraReservada: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
    UsuarioID: number;
}

export interface ReservationRequest {
    Motivo: string;
    FechaHoraReservada: string;
    ServicioMedicoID: number
    MascotaID: number
}

export interface TimeSlot {
    id: number;
    start: string;
    end: string;
    periodo: 'AM' | 'PM';
}

export interface ReservedTimeSlot {
    Fecha_Hora: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
}

export interface User {
    UsuarioID: number;
    Rol: 'Administrador' | 'Veterinario' | 'Cliente';
    Estado: 'Activo' | 'Inactivo';
}

export interface PendingReservation {
    ReservacionID: number;
    Fecha_Hora: string;
    Estado: 'Pendiente';
}

export interface CancelReservationRequest {
    ReservacionID: number;
}
