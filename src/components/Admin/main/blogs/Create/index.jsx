import { useRef, useState, useEffect } from "react"
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const CreateBlog = () => {
  const [data, setData] = useState({
    blog_title: '',
    teaser: '',
    file: null,
  })
  const token = useSelector(({currentUser})=> currentUser.userInfo.token)
  const authorId = useSelector(({currentUser})=> currentUser.userInfo.id)
  const [err, setErr] = useState()
  const [continues, setContinues] = useState(false)
  const navigator = useNavigate()
  const handleChange = e => {
    const temp = {...data}
    temp[e.target.name] = e.target.value
    setData(temp)
  }
  const initialValue=`<h1>${data.blog_title}</h1><p>${data.teaser}</p>`
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);
  const save = async (e) => {
    // e.preventDefault()
    const formData = new FormData()
    formData.append('blog_title', data.blog_title)
    formData.append('teaser', data.teaser.substring(0,150))
    formData.append('post', editorRef.current.getContent())
    formData.append('author', authorId)
    formData.append('image_file', data.file)
    try {
      if(authorId){
      await axios.post('/api/blogs/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      navigator('/admin/blogs')}
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
     <h1>Create a Blog post</h1>
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
           height: 500,
           menubar: 'file edit view insert format tools table help',
           plugins: [
             'advlist autolink lists link image imagetools charmap print preview anchor',
             'searchreplace visualblocks code fullscreen importcss',
             'insertdatetime media table paste code help wordcount', 'emoticons',
             'fullscreen hr save quickbars'
            ],
            content_css: '../blog.css',
            a11y_advanced_options: true,
            image_caption: true,
            image_title: true,
            image_advtab: true,
            color_cols: 5, 
            save_onsavecallback: save,
           images_upload_url: 'postAcceptor.php',
            /* we override default upload handler to simulate successful upload*/
            images_upload_handler: uploadHandler,
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
       console.log(data)
       setContinues(true)
     }}>
       <label htmlFor="title">Blog title</label>
       <input type="text" name='blog_title' placeholder="Title"
       onChange={handleChange} required
       className = 'formControl'
       />
       <label htmlFor="cover">Cover page</label>
       <input type="file" name='file'
       className = 'formControl'
       accept=".jpg, .jpeg, .png"
       onChange={e => {
         setData({...data, file: e.target.files[0]})
       }} required
       />
       <label htmlFor="title">Blog teaser</label>
       <textarea id="" cols="30" rows="10"
       maxLength='150'
       onChange={handleChange} required
       name='teaser'className = 'formControl'>
        </textarea>
       <button type='submit' className="btn">Continue</button>
       </form>
     }
    </div>
  )
}

export default CreateBlog