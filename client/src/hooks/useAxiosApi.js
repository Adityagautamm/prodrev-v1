import { API } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosApi = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        // const requestIntercept = API.interceptors.request.use(
        //     config => {
        //         if (!config.headers['Authorization']) {
        //             config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        //         }
        //         return config;
        //     }, (error) => Promise.reject(error)
        // );

        const requestIntercept = API.interceptors.request.use((req) => {
            if (localStorage.getItem('profile')) {
                req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
            }

            return req;
        });


        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    // add method below to call API to get new access token and save it in state- may be use useRfresh hook to do that
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosApi;