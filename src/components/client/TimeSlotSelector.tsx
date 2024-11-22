import type { TimeSlot } from '@/types/index.types';
import { TIME_SLOTS } from '@/services/index.services';
import { useTimeSlots } from '@/hooks/shared/useTimeSlots';


interface TimeSlotSelectorProps {
    selectedDate: string;
    onSelectSlot: (slot: TimeSlot) => void;
    disabled?: boolean;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
    selectedDate,
    onSelectSlot,
    disabled = false
}) => {
    const { availability, loading } = useTimeSlots({
        selectedDate,
        onError: (error) => console.error('Error cargando horarios:', error)
    });
    console.log('avality', availability)
    if (loading) {
        return <div>Cargando horarios disponibles...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIME_SLOTS.map(slot => (
                <button
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    disabled={disabled || !availability[slot.id]}
                    className={`
                        p-4 rounded-lg transition-colors
                        ${availability[slot.id]
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }
                    `}
                >
                    <div className="text-sm font-medium">
                        {slot.start} - {slot.end}
                    </div>
                    <div className="text-xs">
                        {slot.periodo}
                    </div>
                </button>
            ))}
        </div>
    );
};
