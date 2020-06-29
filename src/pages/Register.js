import React from "react"
import {Form, Input, Button} from 'antd';
import styled from "styled-components"
import {useStores} from "../stores"
import {useHistory} from 'react-router-dom'



const Wrapper = styled.div`
max-width:600px;
margin:30px auto;
box-shadow:2px 2px 4px 0 rgba(0,0,0,0.2);
border-radius:4px;
padding:20px;
`
const Title = styled.h1`
text-align:center;
margin-bottom:30px;

`

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const Components = () => {
    const {AuthStore}=useStores();
const history= useHistory()
    const onFinish = values => {
        console.log('Success:', values);
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.register()
            .then(()=>{
                console.log('注册成功')
                history.push('/')
            }).catch(()=>{
            console.log('注册失败，什么都不做')
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule, value) => {
        if (/w/.test(value)) return Promise.reject('只能是字母或下划线')
        if (value.length < 6 || value.length > 16) return Promise.reject('长度为6~16个字符')
        return Promise.resolve();

    };
    const confirmPassword = ({getFieldValue}) => ({
        validator(rule, value) {
            if(getFieldValue('password') === value) return Promise.resolve();
            return Promise.reject('两次密码不一致');
        }
    });


    return (

        <Wrapper>
            <Title>注册</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入用户名!'},
                        {
                            validator: validateUsername
                        }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码!'}, {
                        min: 6, message: '最少6位字符'
                    }, {
                        max: 16, message: '最多16位字符'

                    }]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[{required: true, message: '请再次输入密码！'},
                        confirmPassword
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default Components;