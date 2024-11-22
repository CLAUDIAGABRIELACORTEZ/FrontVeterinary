import React from 'react';
import { UserPlus, Users, PawPrint, FilePlus } from 'lucide-react';
import { AdminCardProps, AdminCardsProps } from '@/types/index.types';


const AdminCard: React.FC<AdminCardProps> = ({ icon, title, description, onClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer" onClick={onClick}>
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export const AdminCards: React.FC<AdminCardsProps> = ({
    onShowPersonalForm,
    onShowClienteForm,
    onShowMascotaForm,
    onShowServicioForm
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <AdminCard 
                icon={<UserPlus size={40} />}
                title="Registrar Personal"
                description="Añadir nuevo personal a la clínica"
                onClick={onShowPersonalForm}
            />
            <AdminCard 
                icon={<Users size={40} />}
                title="Registrar Cliente"
                description="Añadir un nuevo cliente a la base de datos"
                onClick={onShowClienteForm}
            />
            <AdminCard 
                icon={<PawPrint size={40} />}
                title="Registrar Mascota"
                description="Añadir una nueva mascota a un cliente existente"
                onClick={onShowMascotaForm}
            />
            <AdminCard 
                icon={<FilePlus size={40} />}
                title="Registrar Servicio"
                description="Añadir una nuevo servicio"
                onClick={onShowServicioForm}
            />
        </div>
    );
};
