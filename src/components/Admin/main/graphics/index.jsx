import { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../../table'
import { useSelector } from 'react-redux'

const Graphics = () => {
    const [graphics, loadGraphics] = useState([]);
    const token = useSelector(state => state.currentUser.userInfo.token)
    const [noGraphicFound, setNoGraphicFound] = useState(false)
    // const navigate = useNavigate()
    useEffect(()=>{
        const getGraphics = async () => {
            const {data} = await axios.get('/api/scientific-drawings',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            loadGraphics([...data])
            if(!data.length) setNoGraphicFound(true)
        }
        getGraphics()
    },[loadGraphics, token, setNoGraphicFound])
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
            Header: 'Graphic',
            Footer: 'Graphic',
            accessor: 'file_path',
            Cell: ({value}) => <img src={value} alt = 'graphic' 
            width= '240' />
        },
        {
            Header: 'Graphic description',
            Footer: 'Graphic description',
            accessor: 'image_desc',
        },
        
    ]
    return (
        <>
            {graphics.length || noGraphicFound ? 
            <Table COLUMNS={COLUMNS} 
            MOC_DATA={graphics}
            apiName = 'scientific-drawings'
            routeName='graphics'
            noItems={noGraphicFound}
            title ='Graphics'/>
             :<h3 style={{flex: '4'}}>Loading...</h3> 
            } 
        </>
    )
}

export default Graphics