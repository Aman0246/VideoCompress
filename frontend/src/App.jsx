
import './App.css'
import './a.css'

function App() {


  return (
    <>
      <div className='top_conatiner'>
        <div className='hover'>
           <input id='aman'  type="file" style={{display:'none'}} />
           <label htmlFor="aman">
          <img  style={{height:'50vh',borderRadius:'50%'}} src="https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com.png" alt="Wait" />
          <div style={{color:'#44affb',fontSize:'x-large'}}>Upload Your Video Here</div>
           </label>
  
        </div>
      </div>



<div  style={{display:'flex',flexDirection:'column'}}>  
<div style={{margin:'auto'}}>
<button style={{padding:'10px 20px',borderRadius:'10px',background:'#00ecff',fontSize:'large'}}>Uploads</button>
</div>
</div>

    </>
  )
}

export default App
// 