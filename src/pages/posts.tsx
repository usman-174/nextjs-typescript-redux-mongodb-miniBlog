import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface postsProps {

}

 const posts: React.FC<postsProps> = ({}) => {
     const [Title, setTitle] = useState('')
     const [Description, setDescription] = useState('')
     const onSubmitForm = async(e)=>{
        e.preventDefault()
        try {
            const {data}= await axios.post('/api/create',{
                title:Title,
                description:Description
            })
            console.log(data);
        } catch (error) {
            console.log(error.message);
            
        }
         
     }
     useEffect(()=>{
        const get = async ()=>{
           try {
            const {data} = await axios.get('/api/create')
            data&& alert(data)
           } catch (error) {
               console.log(error.message);
               
           }

        }  
        get()
    },[])
        return (<>
        <form onSubmit={onSubmitForm}>
            <input type="text"  value={Title} name='title' onChange={(e)=>setTitle(e.target.value)} />
            <br/>
            
            <input type="text"  value={Description}name='description'  onChange={(e)=>setDescription(e.target.value)}/>
            <button type='submit'>SUBMIT</button>
        </form>
        </>);
}
export default posts 