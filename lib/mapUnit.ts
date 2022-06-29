import {set} from "lodash";

const mapUnit = (unit:string)=>{
    if (unit === "u_piece") {
        return "units"
    }
    else if (unit=== "om2:one") {
        return "meter"
    }
    else if (unit=== "om2:one") {
        return "meter"
    }
    else if (unit=== "kg") {
        return "kilogram"
    }
    else if (unit=== "lt") {
        return "liter"
    }
    else if (unit=== "h") {
        return "hectogram"
    }
    else {
        return unit
    }

}

const mapUnits = (units: Array<{id:string, label:string}>) =>{
    const parsedUnits = units?.map((u)=>({id:u.id,name:mapUnit(u.label)}))
    return parsedUnits
}

export {mapUnits, mapUnit}