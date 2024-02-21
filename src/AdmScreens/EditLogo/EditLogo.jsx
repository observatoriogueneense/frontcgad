import React, { useEffect, useState } from 'react'
import './EditLogo.css'
import MenuAdm from '../MenuAdm/MenuAdm'
import Auth from '../Auth/Auth';
import api from '../api'
import Swal from 'sweetalert2';
import { imageDb } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



const handleClick = async (URL)=>{
    try {
       const imgRef = ref(imageDb, `files/${v4()}`)
       uploadBytes(imgRef, URL)
       const snapshot = await uploadBytes(imgRef, URL)
       const downloadURL = await getDownloadURL(snapshot.ref);
       return (downloadURL)
    } catch (error) {
        console.log(error)
    }
}

//upload img
async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await handleClick(image)
  return result;
}

export default function EditLogo() {
    const [file, setFile] = useState(null)
    const [text1, setText1] = useState(null)
    const [text2, setText2] = useState(null)
    const [Id, setId] = useState(null)
    const [Data, setData] = useState(null)

    useEffect(()=>{
        const getData= async()=>{
          try {
            const resp = await api.get("/logo")
            setData(resp.data[0])
            setId(resp.data[0]._id)
          } catch (error) {}
        }
        getData()
      }, [])

    const saveImage= async()=>{
        var result=null;
        if(file){
            const description = Date.now() + file.name;
            result = await postImage({image: file, description})
        }
        
        const ObjectUpdate = {
            img:result ? result : Data.img,
            text1:text1 ? text1 : Data.text1,
            text2:text2 ? text2 : Data.text2,
        }
        await api.put("/logo/"+Id, ObjectUpdate)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração feita com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })

        window.location.reload()
    }

  return (
    <div>
        <MenuAdm select={"inicio"} />
        <Auth />
        <div className="contentAlterarLogo">
            <div className="cardLogoUpdate">
                <h3 className="textCardLogoUpdate">Atualizar Logo</h3>
                {file && (<img src={URL.createObjectURL(file)} alt="" className="iiLogo" />)}
                <input type="file" id='inpLogoUp' accept="image/*" className="inpLogoUpInp" onChange={(e)=> setFile(e.target.files[0])}  />
                <input type="text" className='inpLogoUp' placeholder='Texto 1' onChange={(e)=> setText1(e.target.value)} />
                <input type="text" className='inpLogoUp' placeholder='Texto 2' onChange={(e)=> setText2(e.target.value)} />
                <div className="textCadastrarOuEdit">
                    <button className='NewBuutLogo' onClick={saveImage}>Atualizar...</button>
                </div>
            </div>
        </div>
    </div>
  )
}
