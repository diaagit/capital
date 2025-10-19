const _endpoints = [
    {
        method: "GET",
        name: "HTTP:GET /health",
        url: "http://localhost:3000/health",
    },
    {
        method: "GET",
        name: "Webhook:GET /health",
        url: "http://localhost:3002/health",
    },
    {
        method: "GET",
        name: "Validator:GET /health",
        url: "http://localhost:3003/health",
    },
    {
        body: JSON.stringify({}),
        method: "POST",
        name: "HTTP:POST /signup",
        url: "http://localhost:3000/api/v1/signup",
    },
];
