export interface Status {
    id: number;
    name: string;
    state: number;
    type: string;
}

export interface StatusResponse {
    success: boolean;
    message: number;
}