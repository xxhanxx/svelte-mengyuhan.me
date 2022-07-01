interface QiniuUploadResp {
    data: {
        etag: String
    }
};

interface UploadDetails {
    method: number,
    url: string,
    baseObjectName: string,
    uploadId: string,
    key: string,
    token: string,
    bucket: string,
    domain: string,
    size: number,
    xCosSecurityToken: string
}
export type { QiniuUploadResp, UploadDetails }