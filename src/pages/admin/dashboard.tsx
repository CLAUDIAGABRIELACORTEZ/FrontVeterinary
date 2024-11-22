import '@/app/globals.css';
import React, { useState } from 'react';
import { logout } from '@/utils/index.utils';
import { ApiResponse, Personal, Reservacion } from '@/types/index.types';
import { useRouter } from 'next/router';
import { AdminActions, AdminCards, AdminHeader, 
    renderForm, renderModal, ResponseModal, UpdateModal } from '@/components/admin/index.admincomp';
import { useAdminForms, useAdminModals, useAdminUpdates, useAuth } from '@/hooks/index.hooks';
import { AttendModal } from '@/components/admin/shared/Atencion';
import { ApiService } from '@/services/api';
import { API_CONFIG } from '@/services/constants';

const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);

    const {
        personalForm, setPersonalForm,
        clienteForm, setClienteForm,
        mascotaForm, setMascotaForm,
        servicioForm, setServicioForm,
        responseModal, setResponseModal, handleSubmit
    } = useAdminForms();

    const {
        showPersonalForm, setShowPersonalForm, setShowServiceForm,
        showClienteForm, setShowClienteForm, showServiceForm,
        showMascotaForm, setShowMascotaForm,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        showReservacionModal, setShowReservacionModal,
        showUsuarioModal, setShowUsuarioModal,
        personalList, clienteList, mascotaList, bitacoraList, reservacionList, usuarioList,
        currentPage, setCurrentPage, itemsPerPage, handleViewList
    } = useAdminModals();


     // 1. Agregar estados para el modal de atención
     const [showAttendModal, setShowAttendModal] = useState(false);
     const [attendForm, setAttendForm] = useState<Reservacion | null>(null);

     // 2. Función para abrir el modal de atención
    const openAttendModal = (reservacion: Reservacion) => {
        console.log('Abriendo modal de atención para:', reservacion);
        setAttendForm(reservacion);
        setShowAttendModal(true);
    };

    // 3. Función para manejar el envío del formulario de atención
    const handleAttendSubmit = async(formData: any) => {
        console.log(formData)
        try {
            const response: ApiResponse = await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_HIST, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            console.log('Historial médico creado:', response);
            // Puedes mostrar un mensaje de éxito al usuario aquí
            setResponseModal({
                isOpen: true,
                title: 'Historial médico creado con éxito',
                response: response,
            });
            setShowAttendModal(false);
            // Actualizar la lista de reservaciones si es necesario
        } catch (error) {
            console.error('Error al crear el historial médico:', error);
            // Manejar el error, mostrar mensaje al usuario, etc.
            // setResponseModal({
            //     isOpen: true,
            //     title: 'Error al crear historial médico',
            //     response: response,
            // });
        }
        setShowAttendModal(false);
        // Opcional: actualizar la lista de reservaciones si es necesario
    };
    const {
        showUpdateModal, setShowUpdateModal,
        updateType, updateForm, setUpdateForm,
        handleUpdate, handleEdit
    } = useAdminUpdates({
        setShowPersonalModal,
        setShowClienteModal,
        setShowMascotaModal
    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }
    const handleLogout = () => {
        logout(router);
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <AdminHeader onLogout={handleLogout} />
            <main className="container mx-auto mt-8 p-4">
                <AdminCards 
                    onShowPersonalForm={() => setShowPersonalForm(true)}
                    onShowClienteForm={() => setShowClienteForm(true)}
                    onShowMascotaForm={() => setShowMascotaForm(true)}
                    onShowServicioForm={() => setShowServiceForm(true)}
                />
                <AdminActions onViewList={handleViewList} />
            </main>
            {showPersonalForm && renderForm({
                title: "Registrar Personal",
                form: personalForm,
                setForm: setPersonalForm,
                onClose: () => setShowPersonalForm(false),
                handleSubmit
            })}
            {showClienteForm && renderForm({
                title: "Registrar Cliente",
                form: clienteForm,
                setForm: setClienteForm,
                onClose: () => setShowClienteForm(false),
                handleSubmit
            })}
            {showMascotaForm && renderForm({
                title: "Registrar Mascota",
                form: mascotaForm,
                setForm: setMascotaForm,
                onClose: () => setShowMascotaForm(false),
                handleSubmit
            })}
            {showServiceForm && renderForm({
                title: "Registrar Servicio",
                form: servicioForm,
                setForm: setServicioForm,
                onClose: () => setShowServiceForm(false),
                handleSubmit
            })}
            {showPersonalModal && renderModal<Personal>({
                title: "Lista de Personal",
                data: personalList,
                onClose: () => setShowPersonalModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'personal')
            })}
            {showClienteModal && renderModal({
                title: "Lista de Clientes",
                data: clienteList,
                onClose: () => setShowClienteModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'cliente')
            })}
            {showMascotaModal && renderModal({
                title: "Lista de Mascotas",
                data: mascotaList,
                onClose: () => setShowMascotaModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'mascota')
            })}
            {showBitacoraModal && renderModal({
                title: "Registros de Bitácora",
                data: bitacoraList,
                onClose: () => setShowBitacoraModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
            {showReservacionModal && renderModal({
                title: "Lista de Reservaciones",
                data: reservacionList,
                onClose: () => setShowReservacionModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                openAttendModal
            })}
            {showUsuarioModal && renderModal({
                title: "Lista de usuarios",
                data: usuarioList,
                onClose: () => setShowUsuarioModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
            <UpdateModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                type={updateType}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                onSubmit={handleUpdate}
                setShowPersonalModal={setShowPersonalModal}
                setShowClienteModal={setShowClienteModal}
                setShowMascotaModal={setShowMascotaModal}
            />
            <ResponseModal 
                isOpen={responseModal.isOpen}
                onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
                response={responseModal.response}
                title={responseModal.title}
            />
            {showAttendModal && attendForm && (
                <AttendModal
                    isOpen={showAttendModal}
                    onClose={() => setShowAttendModal(false)}
                    reservation={attendForm}
                    onSubmit={handleAttendSubmit}
                />
            )}
        </div>
    );
};

export default AdminPage;
