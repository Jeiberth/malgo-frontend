// src/api/swapResource.js

import axios from '/src/axios.js';  // Import the axios instance

export default class tenantApplication {

    getTenantApplications(){
        return axios({
            url: `/tenant/applications`,
            method: 'get',
        });
    }

    approveTenantApplication(data){
        return axios({
            url: '/tenant/application/accept',
            method: 'put',
            data: data,
        });
    }

    denyTenantApplication(data){
        return axios({
            url: '/tenant/application/deny',
            method: 'put',
            data: data,
        });
    }

    saveTenantApplication(data){
        return axios({
            url: '/tenant/application/save',
            method: 'put',
            data: data,
        });
    }

    createTenantApplication(data){
        return axios({
            url: '/create/tenant/application',
            method: 'post',
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    updateComment(data){
        return axios({
            url: '/tenant/application/comment',
            method: 'put',
            data: data,
        });
    }

    requestAdditionalInfo(data){
        return axios({
            url: '/tenant/application/request/doc',
            method: 'put',
            data: data,
        });
    }

    submitAdditionalInfo(data){
        return axios({
            url: '/tenant/application/request/doc/upload',
            method: 'post',
            data: data,
        });
    }


}
