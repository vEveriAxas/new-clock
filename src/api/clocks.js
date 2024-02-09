import axios from "axios";
import {
    host,
    // paramsImg
} from "./index";
import useErrorStore from "@/store/error";
import useGeneralStore from "@/store/general";

// Первичное создание проекта (не включая видеофайлов, их добавление происходит в операции изменения проекта )
async function createProject(name, description, price, isPublic) {
    const errorStore = useErrorStore();
    const generalStore = useGeneralStore();
    try {
        const response = await axios.post(
            host + "/api/projects/",
            {
                name: name,
                description: description,
                price: price,
                is_public: isPublic,
            },
            {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                }
            },
        );
        // Получение нового проекта с БД
        const { data: { data } } = response;  // project
        // Форматирование объектов data и user с формата snake_case в CamelCase
        const formatData = generalStore.convertKeysToCamelCase(data);

        return { project: formatData, user: formatData.user };
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const { response: { status } } = err;
        throw new Error(`api/clocks:createProject =>  ${errorStore.checkErrorStatus(status)}`,);
    }
}

// Получение списка проектов пользователя по его ID
async function getUserProjects(userID, isPublic, includePublic, page) {
    const errorStore = useErrorStore();
    const generalStore = useGeneralStore();
    try {
        const response = await axios.get(
            host + "/api/projects/",
            {
                params: {
                    user_id: userID,
                    is_public: isPublic,
                    include_public: includePublic,
                    page: page,
                },
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            },
        );
        // Получение нового проекта с БД
        const { data: { data } } = response;  // Array[project]
        // Форматирование ключей объектов массива полученных проектов с формата snake_case в CamelCase
        const projects = generalStore.convertKeysToCamelCase(data);
        return projects;
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const { response: { status } } = err;
        throw new Error(`api/clocks:getUserProjects =>  ${errorStore.checkErrorStatus(status)}`,);
    }
}

// Получение проекта по ID
async function getProjectByID(projectID) {
    const errorStore = useErrorStore();
    const generalStore = useGeneralStore();
    try {
        const response = await axios.get(
            host + `/api/projects/${projectID}`,
            {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            },
        );
        // Получение нового проекта с БД
        const { data: { data } } = response;  // project
        // Форматирование ключей объекта полученного проекта с формата snake_case в CamelCase
        const project = generalStore.convertKeysToCamelCase(data);
        return project;
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const { response: { status } } = err;
        throw new Error(`api/clocks:getProjectByID =>  ${errorStore.checkErrorStatus(status)}`,);
    }
}

// Редактирование общих данных проекта
async function editProjectByID(projectID, name, description, price, isPublic) {
    const errorStore = useErrorStore();
    const generalStore = useGeneralStore();
    try {
        const response = await axios.put(
            host + `/api/projects/${projectID}`,
            {
                name: name,
                description: description,
                price: price,
                is_public: isPublic,
            },
            {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                }
            },
        );
        // Получение нового проекта с БД
        const { data: { data } } = response;  // project
        // Форматирование ключей объекта полученного проекта с формата snake_case в CamelCase
        const changedProject = generalStore.convertKeysToCamelCase(data);
        return changedProject;
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const { response: { status } } = err;
        throw new Error(`api/clocks:editProjectByID =>  ${errorStore.checkErrorStatus(status)}`,);
    }
}

// Изменение/Добавление видеофайлов в проект по позициям
async function putVideoProjectByID(projectID, videoData, positionNumber, index) {
    // const maskObjectProperty = {
    //     first: 'firstPosition',
    //     second: 'secondPosition',
    //     third: 'thirdPosition',
    //     fourth: 'fourthPosition',
    // }
    const errorStore = useErrorStore();
    const generalStore = useGeneralStore();
    const formData = new FormData();
    formData.append("new_video", videoData);
    try {
        const response = await axios.put(
            host + `/api/projects/${projectID}/positions/${positionNumber}/${index}/video/`,
            // body
            formData,
            // params
            {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "multipart/form-data",
                }
            },
        );
        // Получение нового проекта с БД
        const { data: { data } } = response;  // project
        // Форматирование ключей объекта полученного проекта с формата snake_case в CamelCase
        const updatedProject = generalStore.convertKeysToCamelCase(data);
        return updatedProject;
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const { response: { status } } = err;
        if(status) {
            throw new Error(`api/clocks:putVideoProjectByID =>  ${errorStore.checkErrorStatus(status)}`);
        }
        throw new Error(`api/clocks:putVideoProjectByID =>  ${err}`);
    }
}


export {
    createProject,
    getUserProjects,
    getProjectByID, 
    editProjectByID,
    putVideoProjectByID,
};
