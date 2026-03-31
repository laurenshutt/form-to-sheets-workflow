const normalizeString = (str = "") =>
    str
        .normalize('NFD')                 
        .replace(/[\u0300-\u036f]/g, "")  
        .replace(/ß/g, 'ss')              
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ø/g, 'o')
        .replace(/đ/g, 'd')
        .replace(/þ/g, 'th')
        .replace(/ł/g, 'l')
        .toLowerCase();