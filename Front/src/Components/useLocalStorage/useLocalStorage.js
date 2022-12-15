import { useState } from "react";

// Creamos un initialValue porque puede que no tengamos nada guardado en el localStorage
export function useLocalStorage  (key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try{
            // Recuperamos del localStorage el elemento que le pasamos por key
            const item = window.localStorage.getItem(key);
            
            // Retornamos segun tengamos o no contenido: (parseamos en caso de tener item porque lo pasamos como string y lo queremos como objeto)
            return item ? JSON.parse(item) : initialValue;
        } catch(e) {
            // Hacemos un catch para que en el caso de haya un error devuelva el initialValue y continue con la otra funcion
            return initialValue;
        }
    });

    // setValue va a recibir un parametro que quiero guardar
    const setValue = (value) => {
        try{
            // Guardo en el estado local de este hook
            setStoredValue(value);
            // Setteamo un localStorage pasandole de nomnbre la key y agregandole el valor en forma de string (porque solo lee strings)
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(e) {
            console.log(e);
        }
    }

    // Este custom hook va devolver un array de dos posiciones:
    // 1) El valor que tenemos guardado
    // 2) Va a tener una forma de actualizar el localStorage
    return [storedValue, setValue];
};