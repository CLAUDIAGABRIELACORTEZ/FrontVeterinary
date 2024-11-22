import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RenderModalProps } from '@/types/index.types';

export const renderModal = <T extends Record<string, unknown>>({
    title,
    data,
    onClose,
    currentPage,
    setCurrentPage,
    itemsPerPage = 6,
    onEdit,
    openAttendModal, // Nueva prop
}: RenderModalProps<T>) => {

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    
    const renderPagination = (totalItems: number) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const maxButtons = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);
        
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
    
        return (
            <div className="flex flex-wrap justify-center mt-4 gap-1">
                {startPage > 1 && (
                    <>
                        <Button
                            onClick={() => setCurrentPage(1)}
                            variant="outline"
                            className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="mx-1">...</span>}
                    </>
                )}
    
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {page}
                    </Button>
                ))}
    
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="mx-1">...</span>}
                        <Button
                            onClick={() => setCurrentPage(totalPages)}
                            variant="outline"
                            className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                        >
                            {totalPages}
                        </Button>
                    </>
                )}
            </div>
        );
    };

    const renderTableHeaders = (): string[] => {
        if (currentItems.length === 0) return [];
        const item = currentItems[0];
        const baseHeaders: string[] = [];
        
        if ('Accion' in item) {
            baseHeaders.push(...['ID', 'UsuarioID', 'Accion', 'IPDir', 'Fecha_Hora']);
        }
        else if ('Cargo' in item) {
            baseHeaders.push(...['ID', 'Nombre', 'Telefono', 'Direccion', 'Email', 'Cargo', 'Profesion', 'Fecha_De_Contratacion']);
        }
        else if ('Especie' in item) {
            baseHeaders.push(...['ID', 'Nombre', 'Sexo', 'Fecha_De_Nacimiento', 'Observaciones', 'Especie', 'Raza', 'DueñoID']);
        }
        else if ('ClienteID' in item) {
            baseHeaders.push(...['ClienteID', 'NombreCompleto', 'Telefono', 'Direccion', 'Email']);
        }else if ('ReservacionID' in item) {
            baseHeaders.push(...['Estado', 'NombreServicioMedico', 'Fecha_Hora', 'NombreCliente', 'ReservacionID', 'UsuarioID']);
            baseHeaders.push('Atender'); // Agregar columna para "Atender" solo en Reservaciones
        }
        if (onEdit) {
            baseHeaders.push('Editar');
        }
        return baseHeaders;
    };

    const headers = renderTableHeaders();

    // Renderizado para dispositivos móviles
    const renderMobileCard = (item: T, index: number) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            {headers.map((header) => (
                header !== 'Editar' && header !== 'Atender' && (
                    <div key={header} className="mb-2 text-center">
                        <span className="font-semibold text-gray-700">{header}: </span>
                        <span className="text-gray-600">{item[header]?.toString() || ''}</span>
                    </div>
                )
            ))}
            {title === 'Lista de Reservaciones' && (
                <div className="mt-4 text-center">
                    <Button
                        onClick={() => openAttendModal?.(item)}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                        Atender
                    </Button>
                </div>
            )}
            {onEdit && (
                <div className="mt-4 text-center">
                    <Button
                        onClick={() => onEdit(item)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                    </Button>
                </div>
            )}
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th 
                                key={header} 
                                className="p-2 bg-gray-100 text-center font-semibold"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr 
                            key={index} 
                            className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors`}
                        >
                            {headers.map((header) =>
                                header === 'Atender' && title === 'Lista de Reservaciones' ? ( // Mostrar botón "Atender" solo en Reservaciones
                                    <td key={header} className="p-2 text-center border-b border-gray-200">
                                        <Button
                                            onClick={() => openAttendModal?.(item)}
                                            className="bg-blue-500 hover:bg-blue-600 mx-auto"
                                            size="sm"
                                        >
                                            Atender
                                        </Button>
                                    </td>
                                ) : header === 'Editar' && onEdit ? (
                                    <td key={header} className="p-2 text-center border-b border-gray-200">
                                        <Button
                                            onClick={() => onEdit(item)}
                                            className="bg-yellow-500 hover:bg-yellow-600 mx-auto"
                                            size="sm"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </td>
                                ) : (
                                    <td key={header} className="p-2 text-center border-b border-gray-200">
                                        {item[header]?.toString() || ''}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
                <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <div className="sticky top-0 bg-white p-6 border-b rounded-t-lg">
                        <h2 className="text-2xl font-bold text-center">{title}</h2>
                        <Button 
                            onClick={onClose}
                            className="absolute top-4 right-4"
                            variant="ghost"
                        >
                            ✕
                        </Button>
                    </div>

                    <div className="p-6">
                        {/* Vista móvil */}
                        <div className="md:hidden">
                            {currentItems.map((item, index) => renderMobileCard(item, index))}
                        </div>

                        {/* Vista desktop */}
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>

                        {renderPagination(data.length)}
                        
                        <div className="mt-6 text-center">
                            <Button onClick={onClose}>Cerrar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
