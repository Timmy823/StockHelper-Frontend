export const accessApiGet = async (req_url, req_data, error_message) => {
    req_url += '?';
    Object.keys(req_data).map((key) => {
        req_url += key + "=" + req_data[key];
    });

    return accessApi('GET', req_url, error_message);
};

export const accessApiPost = async (req_url, req_data, error_message) => {
    return accessApi('POST', req_url, req_data, error_message);
};

const accessApi = async (method, req_url, request_body = undefined, error_message) => {
    let params = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: (method === 'POST') ? JSON.stringify(request_body): undefined,
    };

    const request = await fetch(req_url, params);

    const response = await request.json();

    if (request.status === 200) {
        return response;
    } else {
        return {
            "metadata": {
                "status": "error",
                "desc": error_message
            },
            "data": {}
        };
    }
};
