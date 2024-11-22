import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reservacion } from '@/types/index.types';

interface AttendModalProps {
    isOpen: boolean;
    onClose: () => void;
    reservation: Reservacion;
    onSubmit: (formData: any) => void;
}

export const AttendModal: React.FC<AttendModalProps> = ({ isOpen, onClose, reservation, onSubmit }) => {
    const [formData, setFormData] = useState({
        Diagnostico: '',
        Tratamiento: '',
        // Puedes agregar más campos según sea necesario
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            ReservacionID: reservation.ReservacionID,
        };
        onSubmit(dataToSubmit);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
                <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <div className="sticky top-0 bg-white p-6 border-b rounded-t-lg">
                        <h2 className="text-2xl font-bold text-center">Atender Reservación</h2>
                        <Button 
                            onClick={onClose}
                            className="absolute top-4 right-4"
                            variant="ghost"
                        >
                            ✕
                        </Button>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Detalles de la Reservación</h3>
                        <div className="mb-4">
                            <p><strong>ID de Reservación:</strong> {reservation.ReservacionID}</p>
                            <p><strong>Motivo:</strong> {reservation.NombreCliente}</p>
                            <p><strong>Fecha y Hora:</strong> {new Date(reservation.Fecha_Hora).toLocaleString()}</p>
                            {/* Agrega otros detalles si es necesario */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="Diagnostico">
                                    Diagnóstico
                                </label>
                                <textarea
                                    id="Diagnostico"
                                    name="Diagnostico"
                                    value={formData.Diagnostico}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="Tratamiento">
                                    Tratamiento
                                </label>
                                <textarea
                                    id="Tratamiento"
                                    name="Tratamiento"
                                    value={formData.Tratamiento}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            {/* Agrega más campos si es necesario */}
                            <div className="mt-6 text-center">
                                <Button type="submit" className="mr-4">Guardar</Button>
                                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
