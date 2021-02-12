import axios from 'axios';

export default async function getListings() {
    axios.get(`http://127.0.0.1:5000/admin/postings`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            console.log(data.allPostings);
            return data.allPostings;
        })
        .catch(err => {
            console.log("API Error");
        })
    return;
}