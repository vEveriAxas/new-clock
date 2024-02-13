import { defineStore } from "pinia";



const useGeneralStore = defineStore("generalStore", () => {
    // Функция применяется для форматирования ключей объектов из формата snake_case в camelCase
    function convertKeysToCamelCase(obj) {
        try {
            // Если obj не является объектом, возвращаем исходное значение
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }

            // Если obj является массивом, перебираем его элементы и рекурсивно применяем функцию convertKeysToCamelCase
            if (Array.isArray(obj)) {
                return obj.map(item => convertKeysToCamelCase(item));
            }

            // Создаем новый объект, чтобы сохранить исходные значения
            const newObj = {};

            // Перебираем ключи (свойства) объекта obj
            for (let key in obj) {
                // Преобразуем ключ из snake_case в camelCase
                const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

                // Рекурсивно применяем функцию convertKeysToCamelCase к значению свойства
                newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
            }
            return newObj;
        } catch (err) {
            throw new Error(`store/general:convertKeysToCamelCase =>  ${err}`,);
        }
    }

    // Функция для сравнения двух объектов на разность значений их ключей
    function compareObjects(obj1, obj2) {
        let flag = true;
        for (let key in obj1) {
            if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                continue;
            }
            if (obj1[key] !== obj2[key]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    // Преобразование числа в разрядный валютный формат 
    function formatCurrency(amount) {
        // Преобразование числа в строку и удаление пробелов
        const strAmount = String(amount).replace(/\s+/g, '');

        // Деление числа на разряды
        const parts = strAmount.split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Объединение разделителя тысяч и копеек
        let result = integerPart;
        if (parts.length > 1) {
            result += `.${parts[1]}`;
        }

        // Добавление символа рубля
        result += ' ₽';
        return result;
    }

    // function checkAllPositions(project) {
    //     // Объединяем все массивы с файлами в один массив для выполнения Promise.all позже
    //     const generalPositionArray = [
    //         { videoFiles: [...project.firstPosition], position: 'first' },
    //         { videoFiles: [...project.secondPosition], position: 'second' },
    //         { videoFiles: [...project.thirdPosition], position: 'third' },
    //         { videoFiles: [...project.fourthPosition], position: 'fourth' },
    //     ];
    //     // Проходим по объектам содержащим информацию о каждой позиции часов
    //     generalPositionArray.forEach((positionObject) => {
    //         // Выполняется обход в цикле каждого файла в массиве одной из четырех позиций
    //         positionObject.videoFiles.forEach(async (file) => {
    //             if (file === null) {  // Если файла не существует либо если он в виде строки URL то не выполняем блок
    //                 console.log('Существуют незаполненные файлы');
    //             } else {
    //                 console.log('Файл заполнен');
    //             }
    //         });
    //     });
    // }

    return {
        convertKeysToCamelCase,
        compareObjects,
        formatCurrency,
        // checkAllPositions,
    }
});

export default useGeneralStore;