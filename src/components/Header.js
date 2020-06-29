import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import LogoUrl from '../logo.svg'
import styled from "styled-components"
import {Button} from "antd"


const Header = styled.header`
background:#8896B3;
display:flex;
align-items:center;
padding:10px 100px;
`
const Logo = styled.img`
height:30px;
`

const StyleLink = styled(NavLink)`
color:#fff;
margin-left:30px;
&.active{
border-bottom:1px solid #fff;
}
`
const Login = styled.div`
  margin-left: auto;
`
const StyleButton = styled(Button)`
margin-left:10px;
`;


function Components() {

    const [isLogin, setIsLogin] = useState(false)
    return (
        <Header>
            <Logo src={LogoUrl} alt=""/>
            <nav>
                <StyleLink to="/" activeClassName="active" exact>首页</StyleLink>
                <StyleLink to="/history" activeClassName="active">上传历史</StyleLink>
                <StyleLink to="/about" activeClassName="active">关于我</StyleLink>
            </nav>
            <Login>
                {isLogin ? <>leehome<StyleButton onClick={()=>{setIsLogin(false)}} type="primary">注销</StyleButton></> : <><StyleButton
                    type="primary">
                    登录
                </StyleButton>
                    <StyleButton type="primary">
                        注册
                    </StyleButton></>}

            </Login>
        </Header>
    )
}

export default Components;