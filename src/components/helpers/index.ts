export function toCelsius(kelvin: number): number{
    return parseInt((kelvin - 273.15).toString())
}