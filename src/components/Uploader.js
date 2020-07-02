import React, {useRef} from "react"
import {useStores} from "../stores"
import {observer, useLocalStore} from 'mobx-react';
import {message, Upload, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from "styled-components"

const Result = styled.div`
margin-top:30px;
border:1px dashed #8896B3;
padding:20px;
`
const H1 = styled.h1`
margin；20px 0;
text-align:center;
color:#1890FF;
`
const Img = styled.img`
max-width:300px;
`

const {Dragger} = Upload;

const Component = observer(() => {

    const ref1 = useRef()
    const ref2 = useRef()
    const {ImageStore, UserStore} = useStores()
    const store = useLocalStore(() => ({
        width: null,
        setWidth() {
            store.width = ref1.current.value;
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : '';
        },
        height: null,
        setHeight() {
            store.height = ref1.current.value;
        },
        get heightStr() {
            return store.height ? `/h/${store.height}` : '';
        },
        get fullStr() {
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }

    }))
    const bindWidthChange = () => {
        store.setWidth()
    }
    const bindHeightChange = () => {
        store.setHeight()
    }
    const props = {
        showUploadList: false,
        beforeUpload: file => {
            ImageStore.setFile(file)
            ImageStore.setFilename(file.name)
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传')
                return false
            }
            if (!/(png|jpg|jpeg|gif)$/i.test(file.type)) {
                message.error('只能上传png/jpg/gif格式的图片');
                return false;
            }
            if (file.size > 1024 * 1024) {
                message.error('图片最大1M');
                return false;
            }
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile)
                }).catch(() => {
                console.log('上传失败')
            })
            return false
        },

    }


    return (
        <div>
            <Spin tip="上传中" spinning={ImageStore.isUploading}>
                <Dragger {...props} style={{backgroundColor: "transparent", border: "transparent"}}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或则拖拽上传图片</p>
                    <p className="ant-upload-hint">
                        仅支持.png/.gif/.jpg/格式的图片，图片最大1M
                    </p>
                </Dragger>
            </Spin>
            {
                ImageStore.serverFile ? <Result>
                    <H1>上传结果</H1>
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
                            <Img src={ImageStore.serverFile.attributes.url.attributes.url} alt="图片链接"/>
                        </dd>
                        <dt>更多尺寸</dt>
                        <dd><input placeholder="最大宽度（可选）" onChange={bindWidthChange} ref={ref1}/>
                            <input placeholder="最大高度（可选）" onChange={bindHeightChange} ref={ref2}/></dd>
                        <dd>
                            <a target="_blank" rel="noopener noreferrer" href={store.fullStr}>{store.fullStr}</a>
                        </dd>
                    </dl>
                </Result> : null
            }
        </div>
    )
})

export default Component;