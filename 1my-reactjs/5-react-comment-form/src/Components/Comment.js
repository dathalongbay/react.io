import ReactStars from "react-rating-stars-component";

function Comment(props) {
    return (
        <div>
            <h2> Yorumlar </h2>
            {!props.comments.length ? <p>Chưa có comment nào </p> :
                (<ul>
                        {props.comments.map((comment, index) => {
                            return (
                                // yalnızca öğelerin sabit ID'leri yoksa, öğenin index numarasını anahtar olarak kullanabilirsiniz <li key={index}> .
                                <li key={index}>
                                    {comment.text}
                                    <ReactStars
                                        value={comment.stars}
                                        edit={false} // yıldızların yorum yaptıktan sonra değişmemesi için
                                        count={5}
                                        size={24}
                                        activeColor="#03393d"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
        </div>
    );
}

export default Comment;
