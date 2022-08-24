import { useState } from "react";
import ReactStars from "react-rating-stars-component";


function AddComment(props) {
    const [textAreaValue, setTextAreaValue] = useState(""); // neyi güncelleyecek isek onun başına set koyup tanımlama yapıyoruz.
    // useState' e ilk değer olarak boş bir string değeri veriyoruz.

    const [starCount, setStarCount] = useState(0)

    const handleChange = (e) => { // yeni bir durum ayarlamak için handleChange() kullanılır.
        if (starCount === 0) { //ilk yıldızlar boştur.
            alert("Yorum yapmadan önce oy vermelisiniz.")
        } else {
            setTextAreaValue(e.target.value); //event.target.value sözdizimini kullanarak alan değerine erişebiliriz.

        }
    }


    const handleSubmit = (e) => { //arrow function şeklinde handleSubmiti tanımlıyoruz.

        e.preventDefault(); //submitin default olarak gerçekleştirdiği işlemlerin yapılmasını engeller. Sayfanın yenilenmesini engeller.

        if (textAreaValue.length < 3) {
            alert("Yorumunuz çok kısa.")

        }else  {
            const changedComments = [...props.comments, { text: textAreaValue, stars: starCount }]

            props.setComments(changedComments)

        }

    }


    const ratingChanged = (rating) => {    // yıldız sayısını gönderir.
        setStarCount(rating)
    }

    return (
        <div className="warning">
            <h1> Yorum Yap </h1>
            <form onSubmit={handleSubmit}>
                <ReactStars
                    count={5}
                    size={36}
                    activeColor="#03393d"
                    onChange={ratingChanged}  // yıldız değişimizi göstermek için.
                />
                <br></br>
                <textarea value={textAreaValue} onChange={handleChange} placeholder="What is your comment?" cols="40" rows="7" />
                <br></br>
                <input type="submit" value="Submit" className="submit" />
            </form>

        </div>
    );
};


export default AddComment;

//onChange={handleChange} -> onChange yani bir elemanın değeri değiştirildiğinde Onchange olay meydana gelir.
//Bu değişimi handleChange fonksiyonumuza eşitliyoruz.
