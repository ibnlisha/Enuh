import axios from 'axios'
import { useEffect, useState } from 'react'
import Table from '../../table'
import './Arts.css'
import { useSelector } from 'react-redux'

const PencilArt = () => {
  const [data, setData] = useState([])
  const [hasNoArt, setHasNoArt] = useState(false)
  const token = useSelector(state => state.currentUser.userInfo.token)

  useEffect(()=>{
    const getData = async () =>{
      //set get request to the server
      const {data} = await axios.get('/api/pencil-arts',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      setData([...data])
      if(!data.length) setHasNoArt(true)
    }
    getData()
  },[setData, token, setHasNoArt])
  const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'title',
    },
    {
        Header: 'Pencil art',
        Footer: 'Pencil art',
        accessor: 'file_path',
        Cell: ({value}) => <img src={value} alt="art piece" width='120'/>
    },
    {
        Header: 'Description',
        Footer: 'Description',
        accessor: 'art_desc',
    },
  ]
  return (<>
  {data.length || hasNoArt ? <Table MOC_DATA={data} 
  COLUMNS={COLUMNS} 
  routeName='pencil-arts'
  title = 'Pencil Arts'
  apiName='pencil-arts'
  hasItems = {hasNoArt}
  />: <h3 style={{flex: '4'}}>Loading...</h3>}
  </>)
}

export default PencilArt