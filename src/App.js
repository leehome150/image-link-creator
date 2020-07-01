import React, {Suspense, lazy} from 'react';
import './App.css';
import Header from "./components/Header";
import Loading from "./components/Loading"
import {Switch, Route} from 'react-router-dom';
import 'antd/dist/antd.css'
import styled from "styled-components"
const Container=styled.div`
background-image: url(https://sbimg.cn/content/images/system/default/home_cover.jpg);
    background-color: white;
    min-width:100%;
    min-height:100vh;
`

const Home = lazy(() =>
    import('./pages/Home')
)
const History = lazy(() =>
    import('./pages/History')
)
const Login = lazy(() =>
    import('./pages/Login')
)
const Register = lazy(() =>
    import('./pages/Register')
)

function App() {
    return (
        <Container>
            <Header/>

            <main>
                <Suspense fallback={Loading()}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/history" component={History}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Suspense>

            </main>
        </Container>
    );
}

export default App;
