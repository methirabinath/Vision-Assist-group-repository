import axios from "axios";

const HAT_IP = "10.42.0.1";

const api = axios.create({
    baseURL: `http://${HAT_IP}:5000`,
    timeout: 5000
});

export const getHatStatus = async () => {

    try {

        const response = await api.get("/status");

        return response.data;

    } catch (error) {

        console.log("Hat connection error:", error);
        return null;

    }

};