import React, { useEffect, useState } from 'react'
import Table from '../../table'
import axios from 'axios'
import { months } from '../../../../utils/months'
import { useSelector } from 'react-redux'
import {v4 as uuid} from 'uuid'

const Articles = () => {
    const [data, setData] = useState([])
    const token = useSelector(state => state.currentUser.userInfo.token)
    const [noArticleFound, setNoArticleFound] = useState(false)
    useEffect(()=>{
        const getData = async () =>{
            const {data} = await axios.get('/api/articles',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(!data.length) setNoArticleFound(true)
            setData([...data])
        }
        getData()
    },[setData, token, setNoArticleFound])
    const COLUMNS = [
        {
            Header: 'Id',
            Footer: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Title',
            Footer: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Graphical Abstract',
            Footer: 'Graphical Abstract',
            accessor: 'file_path',
            Cell: ({value}) => <img src={value} alt="graphical abstract" 
            width ='240'/>
        },
        {
            Header: 'Authors',
            Footer: 'Authors',
            accessor: 'authors',
            Cell: ({value}) => <ol style ={{textAlign: 'left'}}>
                {value.map(name => <li key={uuid()}>{name}</li>)}
            </ol>
        },
        {
            Header: 'Available at',
            Footer: 'Available at',
            accessor: 'article_path',
            Cell: ({value}) => <span>Read <a href={value}>Here</a></span>
        },
        {
            Header: 'Date of Publication',
            Footer: 'Date of Publication',
            accessor: 'date_of_publication',
            Cell: ({value})=>{
                const d = new Date(value);
                return (
                    <span>{months[d.getMonth()+1]}, {d.getFullYear()}</span>
                )
            }
        },
    ]
  return (
    <>{data.length || noArticleFound ? 
        <Table COLUMNS={COLUMNS} MOC_DATA = {data} 
        routeName = 'publications'
        apiName='articles'
        noItems={noArticleFound}
        title='Journal Publications' />:
        <h3 style={{flex: '4'}}>Loading...</h3>}</>
  )
}

export default Articles