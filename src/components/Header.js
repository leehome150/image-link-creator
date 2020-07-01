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
padding:10px 100px;
`
const Logo = styled.img`
height:30px;
`

const StyledLink = styled(NavLink)`
color:#fff;
margin-left:30px;
&.active{
border-bottom:1px solid #fff;
}
`
const Login = styled.div`
  margin-left: auto;
`
const StyledButton = styled(Button)`
margin-left:10px;
`;
const Span=styled.span`
font-family:Impact, fantasy;
font-size:26px;
position:fixed;
left:50%;
transform:translateX(-50%)
    
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
            <Logo src={LogoUrl} alt=""/>
            <nav>
                <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
                <Span>Afeng-epic图床</Span>
            </nav>
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