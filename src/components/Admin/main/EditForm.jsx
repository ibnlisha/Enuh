import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditForm = ({formTitle, apiName, mainRoute, desc, article}) => {
    const [err, setErr] = useState()
    const [originalData, setOriginalData] = useState({})
    const { id } = useParams()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const token = useSelector(state => state.currentUser.userInfo.token)
    useEffect(()=>{
        const getItem = async ()=>{
            //handle error for wrong id
            try {
                const rslts = await axios.get(`/api/${apiName}/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData({...rslts.data})
                //save old data
                setOriginalData({...rslts.data}) 
            } catch (error) {
                setErr(error.response.data.error)
            }
        }
        getItem()
    },[setData, id, setErr, setOriginalData, apiName, token])
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            let isChanged = false
            const formData = new FormData();
            //check if the data is changed before adding to formData
            if(originalData.title !== data.title) {
                isChanged = true
                formData.append('title', data.title)}
            if(desc && originalData.image_desc !== data.image_desc){
                isChanged = true
                formData.append(desc, data.image_desc)
            } 
            
            //append file if the image is changed
            if(data.image_file){
                isChanged = true
                formData.append('image_file', data.image_file)}
            //Are we editing an article?
            if(article){
                //remove possible empty authors
                const authors = data.authors.filter(val => val)
                //check if the date was changed
                if(originalData.date_of_publication !== data.date_of_publication){
                    isChanged = true
                    formData.append('date_of_publication', data.date_of_publication)
                }else if(originalData.authors.toString() !== authors.toString()){ //is the author list edited?
                    formData.append('authors', authors)
                    isChanged = true
                 }else if(originalData.article_path !== data.article_path) {//check if the url of the article was changed
                    formData.append('article_path', data.article_path)
                    isChanged = true
                }
            }
            //only send a request if the data was changed
            if(isChanged){
                    await axios.put(`/api/${apiName}/${id}/edit`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        },
                        onUploadProgress: ProgressEvent => {
                            setUploadProgress(
                                Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)
                            )
                        }
                    })
                }
            e.target.reset()
            navigate(`/admin/${mainRoute}`)
        } catch (error) {
            console.log(error)
            if(error.response)
            setErr(error.response.data.error)
            else
            setErr('Oops! Something went wrong')
        }
    }
    const inputStyle = {
        fontSize: '1em',
        marginBottom: '0.5em',
        border: 'none',
        boxShadow: '0 0 15px -10px rgba(0,0,0, 0.7)',
        padding: '0.5em',
    }
    const handleChange = e => {
        const temp = data;
        temp[e.target.name] = e.target.value
        setData(temp)
    }
    const btnStyle = {
        ...inputStyle,
        width: 'fit-content',
        backgroundColor: 'steelblue',
        padding: '0.5em 1.5em',
        borderRadius: '0.3em',
        cursor: 'pointer'
    }
  return (
    <div style = {{
        flex: '4',
        textAlign: 'left',
    }}>
        {err? <p style = {{
                backgroundColor: '#F0E130',
                padding: '0.5em 1em',

            }}><FontAwesomeIcon icon = {faExclamationTriangle}/>{err}</p>:
        <form 
        encType='multipart/form-data'
        style = {{
            width: 'calc(100% - 2em)',
            display: 'flex',
            flexWrap: 'wrap',
            margin: '1em',
            fontSize: '1em',
            textAlign: 'left'
        }}
        onSubmit = {handleSubmit}
        >
            <h1 style={{width: '100%'}}
            >Edit {formTitle}</h1>
            <div style={{flex: '2'}}>
                <img src={data.file_path} alt={data.image_desc} 
                style  = {{width: '100%'}}
                />
            <label htmlFor="image">Change {article? 'graphical abstract': 'image'}</label>
                <input type="file" name="image_file" id="image" 
                onChange={e => {
                    const temp = data
                    temp[e.target.name] = e.target.files[0]
                }}
                style={inputStyle}
                accept=".jpg, .jpeg, .png"/>
                <div style={{
                    height: '0.4em',
                    width: '100%',
                    backgroundColor: 'lightgrey'
                }}>
                    <div style={{
                        backgroundColor: 'lightgreen',
                        width: `${uploadProgress}%`,
                        height: '100%'
                    }}></div>
                </div>
            </div>
            <div style={{
                flex: '3',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '1em',
                // boxShadow: '0 0 15px -10px rgba(0,0,0, 0.7)',
                }}>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' name ='title'
                onChange={handleChange} 
                defaultValue = {data.title}
                style={inputStyle} required
                placeholder='Graphics title' />
                {desc && <>
                <label htmlFor="desc">Description</label>
                <textarea name="image_desc" id="desc" cols="30" 
                placeholder='Graphic description...'
                defaultValue={data[desc]}
                onChange={handleChange}
                style={inputStyle} required
                rows="10"></textarea>
            </>}
            {article && <>
            {data.authors && !!data.authors.length && <>
                <label htmlFor="authors"> Authors</label>
                <ol>{data.authors.map((author, idx)=><li key = {idx}>
                    <input type="text" id ='authors' 
                    style={{...inputStyle, width: 'calc(100% - 1.3em)'}}
                    name = 'author'
                    onChange={(e)=> {
                        const temp = [...data.authors]
                        temp[idx] = e.target.value
                        setData({...data, authors: temp})
                    }}
                    defaultValue = {author}
                    placeholder="Author's name"
                    />
                </li>)}
                <button type='button'
                className='btn'
                onClick = {()=> {
                    const temp = [...data.authors]
                    temp.push('')
                    setData({...data, authors: temp})
                }}
                >Add a new author</button>
                </ol>
                <label htmlFor="url">Link to publication</label>
                <input type="url" name="article_path" id="url" 
                style={inputStyle}
                onChange ={handleChange}
                placeholder = 'Enter url'
                defaultValue = {data.article_path}
                />
                <label htmlFor="date">Date of publication</label>
                <input type="date" name="date_of_publication" id="date"
                defaultValue={data.date_of_publication.split('T')[0]}
                onChange = {handleChange} 
                style={{
                    ...inputStyle,
                    width: 'fit-content'
                }} />
            </>}</>}
           
            <input type="submit" value="Submit" 
            style = {btnStyle}/>
            </div>
        </form>}
    </div>
  )
}

export default EditForm