import { useRef, useState, useEffect } from "react"
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const EditBlog = () => {
  const [data, setData] = useState({})
  const [oldBlog, setOldBlog] = useState({})
  const [err, setErr] = useState()
  const [continues, setContinues] = useState(false)
  const navigator = useNavigate()
  const {id} = useParams()
  const token = useSelector(state => state.currentUser.userInfo.token)

  const handleChange = e => {
    const temp = {...data}
    temp[e.target.name] = e.target.value
    setData(temp)
    setOldBlog({...temp})
  }
  const initialValue= data.post
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    const getData = async () =>{
      const {data} = await axios.get(`/api/blogs/${id}`)
      setData(data)
    }
    getData()
    setDirty(false)
  }, [initialValue, setData, id]);
  const save = async () => {
    // e.preventDefault()
    let changed = false
    const formData = new FormData()
    if(oldBlog.blog_title === data.blog_title){
      formData.append('blog_title', data.blog_title)
      changed = true
    }
    if(oldBlog.teaser === data.teaser){
      formData.append('teaser', data.teaser)
      changed = true
    }
    if(oldBlog.post === editorRef.current.getContent()){
      formData.append('post', editorRef.current.getContent())
      changed = true
    }
    if(data.file){
      formData.append('image_file', data.file)
      changed = true
    }
    try {
      if(changed){
        await axios.put(`/api/blogs/${id}/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`

          }
        })
      }
      navigator('/admin/blogs')
    } catch (error) {
      setErr(error.response.data.message)
    }
  }
  const saveTemporarily = () => {
    if (editorRef.current) {
      // alert('here')
      setDirty(false);
      editorRef.current.setDirty(false);
      // will save the data in the redux state
    }
  }
  const uploadHandler = async (blobInfo, success, failure, progress) => {
    try {
      const formData = new FormData()
      formData.append('image_file', blobInfo.blob())
      const results = await axios.post('/api/uploads/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: ProgressEvent => {
          progress(
              Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)
          )
      }
      })
      success(results.data.file_path)
    } catch (error) {
      console.log(error)
      failure(error.error)
    }
  }
  return (
    <div style = {{
        flex: '4',
        textAlign: 'left',
        margin: '1em'
    }}>
     <h1>Edit blog post</h1>
     {err&& <p style = {{
                backgroundColor: '#F0E130',
                padding: '0.5em 1em',
            }}><FontAwesomeIcon icon = {faExclamationTriangle}/>{err}</p>}
     {continues?
     <>
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={initialValue}
         outputFormat = 'html'
         onDirty={() => setDirty(true)}
         
         init={{
           height: 700,
           menubar: 'file edit view insert format tools table help',
           plugins: [
             'advlist autolink lists link image imagetools charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount', 'emoticons',
             'fullscreen hr save quickbars'
           ],
           a11y_advanced_options: true,
           image_caption: true,
           image_title: true,
           image_advtab: true,
           color_cols: 5, 
           images_upload_url: 'postAcceptor.php',
            /* we override default upload handler to simulate successful upload*/
            images_upload_handler: uploadHandler,
            save_onsavecallback: save,
            save_enablewhendirty: false,
           toolbar: 'undo redo | save |fontselect fontsizeselect| ' +
           'bold italic forecolor backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | formatselect |' +
           'removeformat | emoticons | hr | fullscreen',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         apiKey = 'nr308j7mc5qlu3aoo74j6t2id6kqg4u5truk7ypq50v4tcxk'
       />
       <button onClick={saveTemporarily} disabled={!dirty} className = 'btn'>
         Save and continue later</button>
      {dirty && <span style = {{marginLeft: '0.5em'}}>You have unsaved content!</span>}
     </>:
     <form onSubmit={e=>{
       e.preventDefault()
       setContinues(true)
     }} style = {{display: 'flex'}}>
       <div  style = {{flex: '2'}}>
        <img src={data.file_path} alt="blog cover" 
        style={{width: '100%'}}/>
        <label htmlFor="cover">Change blog cover image</label>
        <input type="file" name='file'
        className = 'formControl'
        accept=".jpg, .jpeg, .png"
        onChange={e => {
          setData({...data, file: e.target.files[0]})
        }}
        />
       </div>
       <div style = {{flex: '3', margin: '0 1em'}}>
        <label htmlFor="title">Blog title</label>
        <input type="text" name='blog_title' placeholder="Title"
        onChange={handleChange} required
        className = 'formControl'
        defaultValue={data.blog_title}
        />
        <label htmlFor="title">Blog teaser</label>
        <textarea id="" cols="30" rows="10"
        maxLength='100'
        defaultValue={data.teaser}
        onChange={handleChange} required
        name='teaser'className = 'formControl'>
          </textarea>
        <button type='submit' className="btn">Continue</button>
       </div>
       </form>
     }
    </div>
  )
}

export default EditBlog
// const EditBlog = () => {
    
//   return (
//     <div style ={{
//         flex: '4'
//     }}>
//         Not yet my friend
//     </div>
//   )
// }

// export default EditBlog

