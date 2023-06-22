import axios from 'axios'
import { useState} from 'react'
import Request from './Request.js'
export default function Main(){
    const [info,setInfo]=useState([])

    axios.get('https://api.vendoo.ge/api/beta/catalog?keyword=phone&sort=relevance&sortDir=desc&page=1&limit=20', {
        Keyword: 'phone',
      })
      .then(function (response) {
        setInfo(response.data.products);
      })

      .catch(function (error) {
        console.log(error);
      });

    return(

        <Request props={info}/>
    )
}

