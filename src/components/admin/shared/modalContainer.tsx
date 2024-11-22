import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { renderModal } from './Modal';

const ModalContainer = <T extends Record<string, unknown>>({
    title,
    data,
    itemsPerPage = 6,
    onClose,
    onEdit,
}: {
    title: string;
    data: T[];
    itemsPerPage?: number;
    onClose: () => void;
    onEdit?: (item: T) => void;
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const [isAttendModalOpen, setIsAttendModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<T | null>(null);

    const openAttendModal = (reservation: T) => {
        setSelectedReservation(reservation);
        setIsAttendModalOpen(true);
    };

    const closeAttendModal = () => {
        setSelectedReservation(null);
        setIsAttendModalOpen(false);
    };

    return (
        <>
            {renderModal({
                title,
                data,
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onClose,
                onEdit,
                openAttendModal, // Pasar la función aquí
            })}

            {isAttendModalOpen && selectedReservation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        <h2 className="text-xl font-bold mb-4">Atendiendo Reservación</h2>
                        <p>
                            <strong>Cliente:</strong> {selectedReservation['NombreCliente'] as string}
                        </p>
                        <p>
                            <strong>Servicio:</strong> {selectedReservation['NombreServicioMedico'] as string}
                        </p>
                        <p>
                            <strong>Fecha y Hora:</strong> {selectedReservation['Fecha_Hora'] as string}
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button onClick={closeAttendModal} variant="outline">
                                Cancelar
                            </Button>
                            <Button>Confirmar</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalContainer;
