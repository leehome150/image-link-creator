import React from 'react';
import LogoUrl from '../logo.svg';
import { NavLink,useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useStores } from '../stores';
import { observer } from 'mobx-react';


const Header = styled.header`
background:transparent;
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 10px;
`
const Logo = styled.img`
height:30px;
`

const StyledLink = styled(NavLink)`
color:#fff;
margin-left:20px;
&.active{
border-bottom:1px solid #fff;
}
`
const Login = styled.div`
`
const StyledButton = styled(Button)`
margin-left:10px;
`;
const Span=styled.span`
font-family:Impact, fantasy;
font-size:26px;    
`


const Components=observer(() => {

    const history=useHistory()
    const { UserStore, AuthStore } = useStores();

    const handleLogout = () => {
      AuthStore.logout()
    };

    const handleLogin = () => {
        history.push('/login')

    };

    const handleRegister = () => {
        history.push('/register')
    }

    return (
        <Header>

            <nav>
                <Logo src={LogoUrl} alt=""/>
                <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
            </nav>
            <Span>Afeng-epic图床</Span>
            <Login>
                {
                    UserStore.currentUser ? <>
                        {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
                    </> :<>
                        <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                        <StyledButton type="primary" onClick={handleRegister}>注册账户</StyledButton>
                    </>

                }

            </Login>
        </Header>
    )
})

export default Components;