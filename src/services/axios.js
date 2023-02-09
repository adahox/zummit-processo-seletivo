import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8000/api/'
});


const getConvenios = () => {
    return request.get("convenio")
        .then((response) => {
            if (response?.data) {
                console.log(response.data);
                return response.data;
            }
        }).catch((error) => {
            console.log(error);
        });
}

const getInstituicoes = () => {
    return request.get("instituicao")
        .then((response) => {
            if (response?.data) {
                console.log(response.data);
                return response.data;
            }
        }).catch((error) => {
            console.log(error);
        });
}

const simular = (payload) => {
    return request.post("simular", payload)
        .then((resultado) => {
            return resultado.data;
        });
}
export { getConvenios, getInstituicoes, simular };