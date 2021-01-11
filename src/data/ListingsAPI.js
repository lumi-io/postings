import axios from 'axios';

function getPostings() {
    axios.get(`http://127.0.0.1:5000/admin/postings`)
    .then(res => {
        console.log(res);
        return res.data
    })
}

export default getPostings;