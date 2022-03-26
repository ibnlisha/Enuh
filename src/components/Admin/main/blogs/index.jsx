import axios from 'axios'
import { useEffect, useState } from 'react'
import Table from '../../table'
import { useSelector } from 'react-redux'
// import './Arts.css'

const Blogs = () => {
  const [data, setData] = useState([])
  const [hasNoBlog, setHasNoBlog] = useState(false)
  const token = useSelector(state => state.currentUser.userInfo.token)
  useEffect(()=>{
    const getData = async () =>{
      //set get request to the server
      const {data} = await axios.get('/api/blogs',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      setData([...data])
      if(!data.length) 
        setHasNoBlog(true)
    }
    getData()
  },[setData, token, setHasNoBlog])
  const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Blog title',
        Footer: 'Blog title',
        accessor: 'blog_title',
    },
    {
        Header: 'Image cover',
        Footer: 'Image cover',
        accessor: 'file_path',
        Cell: ({value}) => <img src={value} alt="art piece" width='120'/>
    },
    {
        Header: 'Teaser text',
        Footer: 'Teaser text',
        accessor: 'teaser',
        Cell: ({value}) => value.substring(0,80) + '...'
    },
    {
      Header: 'Blog post',
      Footer: 'Blog post',
      accessor: 'post',
      Cell: ({value}) => value.substring(0,100) + '...'
    },
    {
      Header: 'Author id',
      Footer: 'Author id',
      accessor: 'author',
    },
    {
      Header: 'Number of reads',
      Footer: 'Number of reads',
      accessor: 'reads',
    },
    {
      Header: 'Date of post',
      Footer: 'Date of post',
      accessor: 'date_posted',
    }
  ]
  return (<>
  {data.length || hasNoBlog ? 
  <Table MOC_DATA={data} 
  COLUMNS={COLUMNS} 
  routeName='blogs'
  title = 'Blogs'
  apiName='blogs'
  noItems = {hasNoBlog}
  />
  : <h3 style={{flex: '4'}}>Loading...</h3>}
  </>)
}

export default Blogs