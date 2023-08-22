import { IPost} from "./ShowPost";
import {db, auth} from "../../config/firebase"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc, } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

// this interface has been "copied" from another interface Post
interface Props {
    post: IPost;
    setPostsList: React.Dispatch<React.SetStateAction<IPost[] | null>>; 
}


// new interface
interface Like {
    likeId: string;
    userId: string;
}
// This component represents the list of posts with likes handling
export const Post = (props: Props) => {
    const {post} = props;
    // give us information about the user
    const [user] = useAuthState(auth); 
    // hook use state - likes is the list of Like interface
    const [likes, setLikes] = useState<Like[] | null>(null);
    // import likes from Firestore database
    const likesRef = collection(db, 'likes');
    // import posts from Firestore database
    const postsRef = collection(db, "posts");
    // The database query get the likes with proper id (related to post)
    const likesDoc = query(likesRef, where("postId", "==", post.id));  // using by getLikes
    // it sets likes mapping the list of likes
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    };
    // This funtion add likes to the database
    const addLike = async () => {
        try { // exception handling
            const newDoc = await addDoc(likesRef, { userId: user?.uid, 
                postId: 
                post.id 
            }); // add new doc and get the doc in the same time
            if(user){ // set likes with condition
            setLikes((prev) =>
                prev 
                ? [...prev, {userId: user.uid, likeId: newDoc.id, }] 
                : [{userId: user.uid, likeId: newDoc.id}]
            );
        } 
        } catch (err) {
            console.log(err);
        }
    };
    // This funtion remove likes from database
    const removeLike = async () => {
        try {
            
            const likeToDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
            );
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if(user){ // if not equal set the like
                setLikes((prev) =>
                    prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removePost = async () => {  
        try {
            const postToDeleteQuery = query(
                postsRef,
                where("uniqueId", "==", post.uniqueId), 
                where("userId", "==", user?.uid)
            );

            const postToDeleteData = await getDocs(postToDeleteQuery);
            const postId = postToDeleteData.docs[0].id;
           
            const postToDelete = doc(db, "posts", postId);
            await deleteDoc(postToDelete);
            if(user){ // delete post
                props.setPostsList((prev) =>
                    prev && prev.filter((post) => post.id !== postToDelete.id)
                );
            };
            // delete likes
            const likeToDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            for(let i = 0; i < likeToDeleteData.docs.length; i++){
                const likeId = likeToDeleteData.docs[i].id;
                const likeToDelete = doc(db, "likes", likeId);
                await deleteDoc(likeToDelete);
                if(user){ // if not equal set the like
                    setLikes((prev) =>
                        prev && prev.filter((like) => like.likeId !== likeId)
                    );
                };
            };
        } catch (err){
            console.log(err);
        }
    }
    // It checks if the user have added like before or no
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    // The hook performs "side effects". In this case it calls the funtion getLikes again if it is necessary
    useEffect(() => {
        getLikes();
    }, []);
    // The post component returns the list of posts 
    return(
        <div>
            <div className="title">
                <h1> {post.title}</h1>
            </div>
            <div className="body">
                <p> {post.description}</p>
            </div>
            <div>
                <p> {post.uniqueId}</p>
            </div>
            <div className="footer">
                <p> @{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}> 
                    { hasUserLiked ? <>&#128078;</> : <>&#128077;</>} 
                </button>
                {likes && <p> Likes: {likes?.length}</p>}
                <button onClick={removePost}>
                    remove
                </button>
            </div>
        </div>
    );

};


/*
import { Post as IPost} from "./show-post";
import {db, auth} from "../../config/firebase"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

// this interface has been "copied" from another interface Post
interface Props {
    post: IPost;
}
// new interface
interface Like {
    likeId: string;
    userId: string;
    postId: string;
}
// This component represents the list of posts with likes handling
export const Post = (props: Props) => {
    const {post} = props;
    // give us information about the user
    const [user] = useAuthState(auth); 
    // hook use state - likes is the list of Like interface
    const [likes, setLikes] = useState<Like[] | null>(null);
    // import likes from Firestore database
    const likesRef = collection(db, 'likes');
    // import posts from Firestore database
    const postsRef = collection(db, "posts");
    // The database query get the likes with proper id (related to post)
    const likesDoc = query(likesRef, where("postId", "==", post.id));  // using by getLikes
    // it sets likes mapping the list of likes
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id })));
    };
    // This funtion add likes to the database
    const addLike = async () => {
        try { // exception handling
            const newDoc = await addDoc(likesRef, { userId: user?.uid, 
                postId: 
                post.id 
            }); // add new doc and get the doc in the same time
            if(user){ // set likes with condition
            setLikes((prev) =>
                prev 
                ? [...prev, {userId: user.uid, likeId: newDoc.id}] 
                : [{userId: user.uid, likeId: newDoc.id}]
            );
        } 
        } catch (err) {
            console.log(err);
        }
    };
    // This funtion remove likes from database
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
            );
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if(user){ // if not equal set the like
                setLikes((prev) =>
                    prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removePost = async () => {
        try {
            const postToDeleteQuery = query(
                postsRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
            );

            const postToDeleteData = await getDocs(postToDeleteQuery);
            const postId = postToDeleteData.docs[0].id;
            const postToDelete = doc(db, "posts", postId);
            await deleteDoc(postToDelete);
            if(user){ // if not equal set the like
                setLikes((like) =>
                    like && like.filter((like) => like.postId !== likeId)
                );
            }
        } catch (err){
            console.log(err);
        }
    }
    // It checks if the user have added like before or no
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    // The hook performs "side effects". In this case it calls the funtion getLikes again if it is necessary
    useEffect(() => {
        getLikes();
    }, []);
    // The post component returns the list of posts 
    return(
        <div>
            <div className="title">
                <h1> {post.title}</h1>
            </div>
            <div className="body">
                <p> {post.description}</p>
            </div>
            <div className="footer">
                <p> @{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}> 
                    { hasUserLiked ? <>&#128078;</> : <>&#128077;</>} 
                </button>
                {likes && <p> Likes: {likes?.length}</p>}
                <button onClick={removePost}>
                    remove
                </button>
            </div>
        </div>
    );

};
*/