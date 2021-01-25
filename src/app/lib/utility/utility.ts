export function getyear(): number[] {
    const intialYear = 1950;
    const currentYear = new Date().getFullYear();
    let years: number[] = [];
    for (var i = intialYear; i <= currentYear; i++) {
        years.push(i)
    }
    return years;
}

