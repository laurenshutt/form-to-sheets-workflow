export const normalizeCaps = (str = "") => {
        
    const letters = str.replace(/[^a-z]/gi, "");
    
    if (!letters) return str;

    const upperCount = (letters.match(/[A-Z]/g) || []).length;
    const isMostlyCaps = upperCount / letters.length > 0.5;

    if (!isMostlyCaps) return str;

    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};