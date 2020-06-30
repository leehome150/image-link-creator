import React from "react"
import {useStores} from "../stores"
import {observer} from 'mobx-react';
import {message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

const Component = observer(() => {
    const {ImageStore, UserStore} = useStores()
    const props = {
        showUploadList: false,
        beforeUpload: file => {
            ImageStore.setFile(file)
            ImageStore.setFilename(file.name)
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传')
                return false
            }
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile)
                }).catch(() => {
                console.log('上传失败')
            })
            return false
        }
    }


    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>,
            {
                ImageStore.serverFile ? <div>
                    <h1>上传结果</h1>
                    <dl>
                        <dt>线上地址</dt>
                        <dd><a target="_blank" rel="noopener noreferrer"
                               href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                        </dd>
                        <dt>
                            文件名
                        </dt>
                        <dd>
                            {ImageStore.filename}
                        </dd>
                        <dt>
                            图片预览
                        </dt>
                        <dd>
                            <img src={ImageStore.serverFile.attributes.url.attributes.url} alt="图片链接"/>
                        </dd>
                        <dt>更多尺寸</dt>
                        <dd>...</dd>
                    </dl>
                </div> : null
            }

        </div>
    )
})

export default Component;