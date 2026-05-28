export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string,
        name: string,
        email: string,
        role: string,
    },
    token: string;
}