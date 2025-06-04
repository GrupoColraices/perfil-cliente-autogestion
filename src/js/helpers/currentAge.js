import { differenceInYears, parseISO} from 'date-fns';
export const calculateAge = (birthdate) => {
    const todayUTC = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
    const birthDateUTC = parseISO(birthdate);
    
    return differenceInYears(todayUTC, birthDateUTC);
}