import { Bitacora, Cliente, Mascota, Personal } from '@/types/index.types';
import { useState } from 'react';


export const useAdminModals = () => {
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showClienteForm, setShowClienteForm] = useState(false);
    const [showMascotaForm, setShowMascotaForm] = useState(false);
    const [personalList, setPersonalList] = useState<Personal[]>([]);
    const [clienteList, setClienteList] = useState<Cliente[]>([]);
    const [mascotaList, setMascotaList] = useState<Mascota[]>([]);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showMascotaModal, setShowMascotaModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [bitacoraList, setBitacoraList] = useState<Bitacora[]>([]);
    const [showBitacoraModal, setShowBitacoraModal] = useState(false);

    const fetchData = async <T,>(endpoint: string, setData: React.Dispatch<React.SetStateAction<T[]>>) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3333${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data: T[] = await response.json();
                setData(data);
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewList = async (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora') => {
        switch (type) {
            case 'personal':
                await fetchData<Personal>('/admin/personal/', setPersonalList);
                setShowPersonalModal(true);
                break;
            case 'clientes':
                await fetchData<Cliente>('/admin/clientes/', setClienteList);
                setShowClienteModal(true);
                break;
            case 'mascotas':
                await fetchData<Mascota>('/admin/mascotas/', setMascotaList);
                setShowMascotaModal(true);
                break;
            case 'bitacora':
                await fetchData<Bitacora>('/admin/logs', setBitacoraList);
                setShowBitacoraModal(true);
                break;
        }
        setCurrentPage(1);
    };

    return {
        showPersonalForm, setShowPersonalForm,
        showClienteForm, setShowClienteForm,
        showMascotaForm, setShowMascotaForm,
        personalList, clienteList, mascotaList, bitacoraList,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        currentPage, setCurrentPage,
        itemsPerPage, handleViewList
    };
};
