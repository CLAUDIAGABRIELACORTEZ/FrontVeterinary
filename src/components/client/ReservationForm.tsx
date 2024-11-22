import { useEffect, useState } from 'react';
import { TimeSlotSelector } from './TimeSlotSelector';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { TimeSlot, ReservationRequest } from '@/types/index.types';

interface ServicioMedico {
    ID: number;
    Nombre: string;
    Precio: number;
}

interface Mascota {
    ID: number;
    Mascota_Nombre: string;
    Especie: string;
    Raza: string;
}

interface ReservationFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
    onSuccess,
    onCancel
}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [motivo, setMotivo] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [serviciosMedicos, setServiciosMedicos] = useState<ServicioMedico[]>([]);
    const [selectedServicio, setSelectedServicio] = useState<number | null>(null);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [selectedMascota, setSelectedMascota] = useState<number | null>(null);

    useEffect(() => {
        // Cargar los servicios médicos
        const fetchServiciosMedicos = async () => {
            try {
                const response: ServicioMedico[] = await ApiService.fetch(
                    `${API_CONFIG.ENDPOINTS.CLI_SERVICIO}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                setServiciosMedicos(response);
            } catch (error) {
                console.error('Error al cargar servicios médicos:', error);
            }
        };

        // Cargar las mascotas
        const fetchMascotas = async () => {
            try {
                const response: Mascota[] = await ApiService.fetch(
                    `${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                setMascotas(response);
            } catch (error) {
                console.error('Error al cargar mascotas:', error);
            }
        };

        fetchServiciosMedicos();
        fetchMascotas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot || !motivo || !selectedServicio || !selectedMascota) return;

        try {
            setSubmitting(true);

            const reservationData: ReservationRequest = {
                Motivo: motivo,
                FechaHoraReservada: `${selectedDate} ${selectedSlot.start}:00`,
                ServicioMedicoID: selectedServicio,
                MascotaID: selectedMascota
            };

            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.CLI_RESERVA}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            onSuccess();
        } catch (error) {
            console.error('Error al crear reservación:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fecha
                </label>
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            {selectedDate && (
                <TimeSlotSelector
                    selectedDate={selectedDate}
                    onSelectSlot={setSelectedSlot}
                    disabled={submitting}
                />
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Servicio Médico
                </label>
                <select
                    value={selectedServicio ?? ''}
                    onChange={(e) => setSelectedServicio(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                >
                    <option value="" disabled>
                        -- Selecciona un servicio médico --
                    </option>
                    {serviciosMedicos.map((servicio) => (
                        <option key={servicio.ID} value={servicio.ID}>
                            {servicio.Nombre} - Bs{servicio.Precio}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Mascota
                </label>
                <select
                    value={selectedMascota ?? ''}
                    onChange={(e) => setSelectedMascota(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                >
                    <option value="" disabled>
                        -- Selecciona una mascota --
                    </option>
                    {mascotas.map((mascota) => (
                        <option key={mascota.ID} value={mascota.ID}>
                            {mascota.Mascota_Nombre} - {mascota.Especie} ({mascota.Raza})
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Motivo de la consulta
                </label>
                <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    rows={3}
                    required
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={submitting || !selectedSlot || !motivo || !selectedServicio || !selectedMascota}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {submitting ? 'Reservando...' : 'Reservar'}
                </button>
            </div>
        </form>
    );
};
