import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../config/firebase';
import {useEffect, useState} from "react";
import { Post } from "./post";

// interface
export interface IPost {
    title: string;
    description: string;
    id: string;
    userId: string;
    username: string;
    uniqueId: string;
}
// This component shows posts with likes on the page "create post"
export const ShowPosts = () => {
    // 2 hooks 
    const [postsList, setPostsList] = useState<IPost[] | null>(null); // define what type is setPostsList 
    const postsRef = collection(db, "posts");
    //  This set the list of posts in the postsList
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => (
            {...doc.data(), 
            id: doc.id}
            )) as IPost[]); // as post array
    };
    // The hook performs "side effects". In this case it calls the funtion getPosts again if it is necessary
    useEffect(() => {
        getPosts();
    }, [postsList]); // create postsList every time you render the main //  [postsList]
    // it returns the all posts if it is not null
    return (
        <div> 
            {postsList?.map((post, index) => (
                <div  key={index}>
                    <Post post={post} setPostsList={setPostsList}/>
                </div>
            ))}
        </div>
    );
};

