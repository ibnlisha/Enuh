import './index.css'
import {useEffect, useState } from 'react'
import Table from '../../table'
import axios from 'axios'

const Subs = () => {
  const [subs, setSubs] = useState([])
  const [noSubsFound, setNoSubsFound] = useState(false)
  useEffect(()=>{
    const loadSubs = async () =>{
      const {data} = await axios.get('/api/subscription')
      setSubs([...data])
      if(!data.length) setNoSubsFound(true)
    }
    loadSubs()
  },[setSubs])
  const COLUMNS = [
    {
      Header: 'id',
      Footer: 'id',
      accessor: 'id'
    },
    {
      Header: 'Name of subscriber',
      Footer: 'Name of subscriber',
      accessor: 'name_of_subcriber'
    },
    {
      Header: 'Email address',
      Footer: 'Email address',
      accessor: 'email'
    },
  ]
  return (
    <>{subs.length || noSubsFound ? 
      <Table COLUMNS={COLUMNS} MOC_DATA = {subs} 
      routeName = 'subscriber-list'
      apiName='subscription'
      noItems={noSubsFound}
      title='Subscriber list' />:
      <h3 style={{flex: '4'}}>Loading...</h3>}</>
  )
}

export default Subs