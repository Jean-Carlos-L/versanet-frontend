import { useState} from "react";

//este filtro será para la tabla de activity log, se podrá filtrar por: action, entity, actorName y un rango de fechas (createdAt)

export const useFilters = () => {
    const [filters, setFilters] = useState<FiltersActivityLog>({
        action: '',
        entity: '', 
        actorName: '',
        dateFrom: null,
        dateTo: null,
    });

    const handleChange = (key: string, value: string | null) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return {
        filters,
        handleChange,
    };
};

export interface FiltersActivityLog {
    action: string;
    entity: string;
    actorName: string;
    dateFrom: string | null;
    dateTo: string | null;
}