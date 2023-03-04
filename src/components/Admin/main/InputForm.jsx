import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useRef, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactCrop, {makeAspectCrop, centerCrop, Crop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import getCroppedImage from './getCroppedImage'

const GraphicForm = ({formTitle, apiName, aspect,
    mainRoute, desc, article}) => {
    const [data, setData] = useState({
        title: '',
        image_desc: '',
        image_file: null,
        authors: [],
        article_path: '',
        date_of_publication: new Date()
    })
    const [crop, setCrop] = useState(Crop)
    const [completedCrop, setCompletedCrop] = useState()
    const [imgSrc, setImgSrc] = useState('')
    const [previewUrl, setPreviewUrl] = useState('')
    const [show, setShow] = useState(false)
    const token = useSelector(state => state.currentUser.userInfo.token)
    const authorRef = useRef()
    const imgRef = useRef()
    const [editIdx, setEditIdx] = useState(-1)
    const [author, setAuthor] = useState(data.authors[editIdx] || '')
    const [error, setError] = useState()
    const [uploadProgress, setUploadProgress] = useState(0)
    const navigate = useNavigate()
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append('title', data.title)
            desc && formData.append(desc, data.image_desc)
            if(article){
                formData.append('date_of_publication', data.date_of_publication.toUTCString())
                formData.append('authors', data.authors)
                formData.append('article_path', data.article_path)
            }
            formData.append('image_file', data.image_file)
            await axios.post(`/api/${apiName}/new`, formData, {
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
            e.target.reset()
            navigate(`/admin/${mainRoute}`)
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        }
    }
    const handleChange = e => {
        const temp = data;
        temp[e.target.name] = e.target.value
        setData(temp)
    }
    const onload = e => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            width,
            height
            ),
            width,
            height
        )

  setCrop(crop)
    }
  return (
    <div style = {{
        flex: '4',
        textAlign: 'left',
    }}>
        <form 
        encType='multipart/form-data'
        style = {{
            width: 'calc(100% - 2em)',
            display: 'flex',
            flexDirection: 'column',
            margin: '1em',
            fontSize: '1em'
        }}
        onSubmit = {handleSubmit}>
            <h1>Add {formTitle}</h1>
            {error&& <span 
            style = {{
                backgroundColor: '#F0E130',
                padding: '0.5em 1em',

            }}
            ><FontAwesomeIcon icon = {faExclamationTriangle}/>{error}</span>}
            <label htmlFor="title">Title</label>
            <input type="text" id='title' name ='title'
            onChange={handleChange} 
            className = 'formControl' required
            placeholder='Enter title' />
            {show && imgSrc &&
            <div className='modalContainer'>
                    <div className="modal" 
                    style={{ width: '60%', 
                    margin: '0 auto',
                    flexDirection: 'column'}}>
                        <h1>Crop image</h1>
                        {/* crope the image before upload */}
                        {/* <ReactCrop crop={crop} 
                        aspect = {aspect}
                        onChange = {(_,pc) => setCrop(pc)}
                        onComplete = {(_,pc) => setCrop(pc)} 
                        src={imgSrc}
                        ruleOfThirds 
                        onImageLoaded={onload}
                        imageStyle = {{maxHeight: 'calc(100vh - 10em)'}}
                        /> */}
                        <ReactCrop crop = {crop} aspect={aspect} 
                        onComplete = {c => setCompletedCrop(c)}
                        onChange = {(_,pc) => setCrop(pc)}>
                            <img ref = {imgRef} src={imgSrc} alt='file to be uploaded' onLoad={onload}/>
                        </ReactCrop>
                        <button className='btn' 
                        type='button'
                        onClick ={async ()=>{
                            const blob = await getCroppedImage(imgRef.current, completedCrop, 'upload.png')
                            const temp = {...data}
                            temp.image_file = blob
                            setData(temp)
                            setPreviewUrl(URL.createObjectURL(blob))
                            setShow(false)
                        }}>Crop</button>
                    </div>
                </div>}
            {previewUrl && <div>
                <h3 style={{margin: '0.1em'}}>Preview</h3>
                <img src={previewUrl} alt="Preview of upload" width = '240'/>
            </div>
            }
            <label htmlFor="image" className='btn'
            >
                {!imgSrc? 'Upload':'Change'} {article? 'graphical abstract': 'image'}
                </label>
            <input type="file" name="image_file" id="image" 
            onChange={e => {
                const {files} = e.target
                setShow(false)
                if(files && !!files.length){
                    const reader = new FileReader()
                    reader.addEventListener('load', ()=>{
                    setImgSrc(reader.result.toString() || '')
                    setShow(true)
                    })
                    reader.readAsDataURL(files[0])
                }
            }}
            style = {{display: 'none', }}
            required = {!article}
            className = 'formControl'
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
            {desc && <>
                <label htmlFor="desc">Description</label>
                <textarea name="image_desc" id="desc" cols="30" 
                placeholder='Graphic description...'
                onChange={handleChange}
                className = 'formControl' required
                rows="10"></textarea>
            </>}
            {article && <>
            {!!data.authors.length && <>
                <h4 style={{margin: '0'}}>Preview of authors</h4>
                <ol>{data.authors.map((author, idx)=><li key = {idx}
                onClick ={()=> setEditIdx(idx)}
                className = 'tooltip'
                ><a href="#authors" className='link'>{author}</a>
                <span className='tooltipText'>Click to edit</span>
                </li>)}</ol>
            </>}
            <label htmlFor="authors">{editIdx > -1? 'Edit': 'Add'} author</label>
            <input type="text" id ='authors' 
            className = 'formControl'
            name = 'author'
            // defaultValue='ibn'
            defaultValue = {author}
            ref={authorRef}
            onChange={(e)=>setAuthor(e.target.value)}
            placeholder="Author's name"
            />
            {author && <button type ='button' 
            // style = {btnStyle}
            className = 'btn'
            onClick = {()=> {
                const temp = data.authors;
                if(editIdx > -1){
                    temp[editIdx] = author
                }else{
                    temp.push(author)
                }
                setData({...data, authors: temp})
                //clear input
                authorRef.current.value = ''
                //clear author state
                setAuthor('')
                setEditIdx(-1)
            }}>Save</button>
            }
            <label htmlFor="url">Link to publication</label>
            <input type="url" name="article_path" id="url" 
            className = 'formControl'
            onChange ={handleChange}
            placeholder = 'Enter url'
            />
            <label htmlFor="date">Date of publication</label>
            <input type="date" name="date_of_publication" id="date" 
            style={{
                width: 'fit-content'
            }} className = 'formControl'/>
            </>}
            <input type="submit" value="Submit" 
            className='btn'/>
        </form>
    </div>
  )
}

export default GraphicForm

