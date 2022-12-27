import { useEffect } from "react";
import { useState } from "react";
import Axios from 'axios';
import './SearchBox.css';

export default function SearchBox() {
    const [bookTittleSearch, setBookTittleSearch] = useState('');
    const [submit, setSubmit] = useState(false)
    const [booksData, setBooksData] = useState([]);
    const [booksVolumeInfo, setBooksVolumeInfo] = useState([]);

    // useEffects are here
    useEffect(() => {
        if (booksData.length > 0) {
            // console.log(booksData.length);
            let volumeInfo = [];
            for (let i = 0; i < booksData.length; i++) {
                // console.log('volumeInfo', booksData[i].volumeInfo);
                volumeInfo.push(booksData[i].volumeInfo)
            }
            setBooksVolumeInfo(volumeInfo);
        }
    }, [booksData])
    useEffect(() => {
        if (submit && bookTittleSearch.length>0) {
            Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTittleSearch}`)
                .then((res) => {
                    if (res) {
                        // console.log('res',res);
                        // all books data --> res.data.itemsl
                        // single book data --> res.data.items[0].volumeInfo
                        setBooksData(res.data.items);
                        // console.log(booksData);

                    }
                })
                .catch((err) => {
                    window.location.reload();
                    console.log(err);
                });

            return setSubmit(false)
        }



    }, [submit, bookTittleSearch, booksData, booksVolumeInfo])

    const bookSearchHandler = (e) => {
        e.preventDefault();
        // console.log(bookTittleSearch);
        setSubmit(true)
    }
    return (
        <div className="SearchBox">
            <form method="/" className="form">
                <p>BOOK SEARCH</p>
                <input type="text" value={bookTittleSearch} placeholder="Book Name" onChange={(e) => { setBookTittleSearch(e.target.value) }} className="bookSearch" />
                <button type="submit" onClick={(e) => { bookSearchHandler(e) }}>Search</button>
            </form>
            <div className="displayBox">
                {/* // booksVolumeInfo.pageCount, booksVolumeInfo.infoLink, booksVolumeInfo.title, booksVolumeInfo.imageLinks.smallThumbnail
    // booksVolumeInfo.maturityRating */}
                {booksVolumeInfo.map((info, i) => {
                    return (
                        <a key={i} className="card" target='_blank' href={info.infoLink}>
                            {(info.imageLinks.smallThumbnail)?
                            <img src={info.imageLinks.smallThumbnail} alt="bookImage" />:
                            <img  src='/' alt="bookImage"/>
                            }
                            <p>Tittle: {info.title}</p>
                            <p>Author: {info.authors[0]}</p>
                            <p>Page Count: {info.pageCount}</p>
                            <p>Rating: {info.maturityRating}</p>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}