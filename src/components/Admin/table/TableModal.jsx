import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import {useSelector} from 'react-redux'

const TableModal = ({show, showModal, 
    selectedItems, apiName, flagged,
    setShow, setShowModal,
    data, setData}) => {
        const numSelected = Object.keys(selectedItems).length
    const token = useSelector(state => state.currentUser.userInfo.token)

 return(
    <>
     {show && <div className="modalContainer" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="modal" style={{
                    flexDirection: 'column',
                    backgroundColor: 'beige',
                    width: '20%',
                    height: 'fit-content',
                    padding: '0.5em',
                    borderRadius: '0.5em',
                }}>
                    <div style={{
                         textAlign: 'right',
                        width: '100%',
                        fontSize: '1.5em',
                    }}><FontAwesomeIcon icon = {faTimes} 
                    style ={{cursor: 'pointer'}}
                    onClick = {
                        () => setShow(false)
                    }/></div>
                    <h3 style={{margin: '0'}}>Delete asset</h3>
                    <img src={flagged.file_path} alt="item" style ={{width: '100%'}} />
                    <span style={{
                        marginTop: '0.5em',
                        fontSize: '0.8em'
                    }}><strong>Item id:</strong> {flagged.id}
                    <p><strong>Are you sure you want to delete this item</strong></p>
                    </span>
                    
                    <div>
                        <button 
                        onClick={ async e => {
                            try {
                                //delete item from the database
                                await axios.delete(`/api/${apiName}/${flagged.id}/delete`,{
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                //remove deleted item from the state
                                const temp = data.filter(({id}) => 
                                id !== flagged.id)
                                setData(temp);
                                setShow(false);
                            } catch (error) {
                                //flash error
                                console.log(error)
                            }
                        }}
                        className='btn danger'>Confirm</button>
                        <button 
                        className='btn'
                        onClick = { ()=> setShow(false)}>Cancel</button>
                    </div>
                </div>
            </div>}
            {showModal && <div className="modalContainer" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="modal" style={{
                    // flexDirection: 'column',
                    display: 'block',
                    backgroundColor: 'beige',
                    width: '20%',
                    minWidth: 'fit-content',
                    height: 'fit-content',
                    padding: '1em',
                    borderRadius: '0.5em',
                }}>
                    <div style={{
                         textAlign: 'right',
                        width: '100%',
                        fontSize: '1.5em',
                    }}><FontAwesomeIcon icon = {faTimes} 
                    style ={{cursor: 'pointer'}}
                    onClick = {
                        () => setShowModal(false)
                    }/></div>
                    {!!numSelected ?
                    <>
                    <div><strong>Delete items</strong></div>
                    <p>Are you sure you want to delete {numSelected} item{numSelected > 1 && 's'}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button 
                        onClick={ () => {
                            const flaggedItems = Object.keys(selectedItems)
                            try {
                                flaggedItems.forEach(async (val,idx,arr) => {
                                    await axios.delete(`/api/${apiName}/${data[val].id}/delete`,{
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    })
                                    //remove deleted items from the state
                                    //check if we are at the last index
                                   if(idx + 1 === arr.length){
                                        const temp = data.filter((_, idx) => 
                                        arr.indexOf(idx.toString()) === -1
                                    )
                                    setData(temp);
                                   }
                                })
                                setShowModal(false);
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        className = 'btn danger'>Confirm</button>
                        <button 
                        className='btn'
                        onClick = { ()=> setShowModal(false)}>Cancel</button>
                    </div></>:
                    <p>No asset selected</p>}
                </div>
            </div>}
    </>
  )
}
export default TableModal