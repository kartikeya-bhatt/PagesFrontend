import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from 'react-native';

import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const url = "https://my-worker.krtky020.workers.dev/posts"
            const resp = await fetch(url, {
                method: "GET",
            })
            const postsResp = await resp.json();
            setPosts(postsResp);
        };
        getPosts();
    }, []);

    const styles = StyleSheet.create({
        titleText: {
            fontSize: 20,
            fontWeight: "bold"
        }
    });

    return (
            <div className="row pt-5">
                <div className="col-12 col-lg-6 offset-lg-3">
                    {posts.map((post) => {
                        return (
                            <div className="card my-3">
                                <div className="card-header">
                                    <Text style={styles.titleText}>
                                        {post.title}
                                    </Text>
                                </div>
                                <div className="card-body">
                                    {post.content}
                                </div>
                                <div className="card-footer">
                                    <i>{post.username}
                                    </i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
    );

}

export default Posts;
