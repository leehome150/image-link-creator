import React from "react"
import {useStores} from "../stores"
import {observer} from "mobx-react"
import styled from "styled-components"

const Tips =styled.div`
background:#8896B3;
margin: 30px 0;
padding:10px;
color:#fff;
border-radius:4px;
`
const Component = observer(({children}) => {
    const {UserStore} = useStores()
    return (<>
            {
                UserStore.currentUser ? null : <Tips>{children}</Tips>
            }

        </>
    )
})

export default Component;