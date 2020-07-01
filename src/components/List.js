import React, {useEffect} from "react"
import {observer} from "mobx-react"
import {useStores} from "../stores"
import InfiniteScroll from 'react-infinite-scroller'
import {List, Spin} from "antd"
import styled from "styled-components"

const Img = styled.img`
width:100px;
height:120px;
object-fit:contain;
border:1px solid #ccc;
`


const Component = observer(() => {
    const {HistoryStore,UserStore} = useStores()
    const loadMore = () => {
        HistoryStore.find()
    }

    useEffect(() => {
        return () => {
            HistoryStore.reset()
        }
        // eslint-disable-next-line
    },[UserStore.currentUser])
    return (
        <div>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={true}
            >
                <List
                    dataSource={HistoryStore.list}
                    renderItem={
                        item => <List.Item key={item.id}>
                            <div>
                                <Img src={item.attributes.url.attributes.url}/>
                            </div>
                            <div>
                                <h5>{item.attributes.filename}</h5>
                            </div>
                            <div>
                                <a target="_blank"  rel="noopener noreferrer"
                                   href={item.attributes.url.attributes.url}>点击预览</a>
                            </div>
                        </List.Item>
                    }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip="加载中"/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    )
})
export default Component