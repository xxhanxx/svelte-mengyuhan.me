import type { QiniuUploadResp, UploadDetails } from './interfaces/upload.interface';
import axios from 'axios'
class fileUploader {
    file: Blob;
    size = 0;
    progress = 0;
    processCallBack: Function;
    finishedCallBack: Function;
    reqChunkArr: Array<any> = [];
    uploadDetails: UploadDetails;
    t: ReturnType<typeof setInterval> = setInterval(() => { });
    constructor(
        file: Blob,
        uploadDetails: UploadDetails,
        size = 100,
        processCallBack: Function,
        finishedCallBack: Function,
    ) {
        this.file = file;
        this.size = size * 1024 * 1024;
        this.processCallBack = processCallBack;
        this.finishedCallBack = finishedCallBack;
        this.uploadDetails = uploadDetails;
        // this.begin(uploadDetails);
    };
    async begin() {
        if (this.uploadDetails.method === 0) {
            let start = 0,
                end = 0,
                chunkArr: any = [],
                size = this.size;
            let file = this.file;
            function slice() {
                end += size;
                var blob: Blob = file.slice(start, end);
                start += size;
                if (!blob.size) return chunkArr;
                chunkArr.push(blob);
                slice();
            }
            slice();
            await this.upload(chunkArr);
        } else if (this.uploadDetails.method === 1) {
            await this.upload();
        }
    }
    private changeProgress(num: number): void {
        this.t = setInterval(() => {
            if (this.progress == num) {
                clearInterval(this.t)
                if (this.progress >= 100) {
                    this.final();
                }
            } else {
                this.progress++;
                this.processCallBack(this.progress);
            }
        }, 1);
    };

    async upload(chunkArr: any = []): Promise<void> {
        if (this.uploadDetails.method === 0 && chunkArr.length >= 1) {
            const chunkAllNum: number = chunkArr.length;
            let count: number = 0;
            for (let i = 0; i < chunkAllNum; i++) {
                console.log('index: ', i);
                chunkArr[i].arrayBuffer().then(async (data: object) => {
                    let res: QiniuUploadResp = await this.qiniuUploadFragment(data, i);
                    if (res.data.etag) {
                        console.log('upload resp:', res.data);
                        count++;
                        this.changeProgress(count / chunkAllNum * 100);
                        this.reqChunkArr.splice(i, 0, { partNumber: i + 1, etag: res.data.etag })
                    }

                })
            }
        } else if (this.uploadDetails.method === 1) {
            let formData = new FormData();
            formData.append("key", this.uploadDetails.key);
            formData.append("Signature", this.uploadDetails.token);
            formData.append(
                "x-cos-security-token",
                this.uploadDetails.xCosSecurityToken
            );
            formData.append("file", this.file);
            this.qcloudUpload(formData).then(() => {
                this.final()
            })
        }
    }


    private async qcloudUpload(formData: FormData): Promise<any> {
        return axios.post(this.uploadDetails.url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                this.processCallBack(Math.floor(
                    (progressEvent.loaded / this.uploadDetails.size) * 100
                ));
            },
        })

    }

    private async qiniuUploadFragment(data: object, index: number): Promise<QiniuUploadResp> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `https://upload.qiniup.com/buckets/${this.uploadDetails.bucket}/objects/${this.uploadDetails.baseObjectName}/uploads/${this.uploadDetails.uploadId}/${index + 1}`,
                data,
                headers: {
                    'Authorization': 'UpToken ' + this.uploadDetails.token
                }
            }).then((res: QiniuUploadResp) => {
                resolve(res)
            }).catch((err: object) => {
                reject(err)
            })
        })
    };

    private final() {
        function compare(property: string) {
            return function (a: any, b: any) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        if (this.uploadDetails.method === 0) {
            this.reqChunkArr = this.reqChunkArr.sort(compare('partNumber'))
            axios({
                method: 'POST',
                url: `https://upload.qiniup.com/buckets/${this.uploadDetails.bucket}/objects/${this.uploadDetails.baseObjectName}/uploads/${this.uploadDetails.uploadId}`,
                data: {
                    parts: this.reqChunkArr
                },
                headers: {
                    'Authorization': 'UpToken ' + this.uploadDetails.token
                }
            }).then((res: any) => {
                this.finishedCallBack(`https://${this.uploadDetails.domain
                    }/${res.data.key}`);
            })
        } else if (this.uploadDetails.method === 1) {
            this.finishedCallBack(`https:${this.uploadDetails.url
                }${this.uploadDetails.key.substring(
                    1,
                    this.uploadDetails.key.length
                )}`);
        }

    };
}
export default fileUploader;
