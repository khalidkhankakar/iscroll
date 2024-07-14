import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage, } from "./appwrite";



export const saveUserToDatabase = async (user) => {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_USERS_ID,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
        return error
    }
}
export const createAccountUser = async (user) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDatabase({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error
    }

}



export const signInAccount = async (user) => {
    try {
        const createUserSession = await account.createEmailSession(user.email, user.password);
        return createUserSession;
    } catch (error) {
        console.log(error);
        return error
    }
}

export const userAuth = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;
        let currentUser = await databases.listDocuments(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_USERS_ID,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return error
    }
}

export const createPost = async (post) => {
    try {
        // upload the image to appwrite buket
        const uploadedFile = await uploadFile(post.file[0])
        if (!uploadedFile) throw Error;

        // Getting the file url 
        const fileUrl = getFileUrl(uploadedFile.$id);

        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error
        }

        // convert tags in array
        const tags = post?.tags.replace(/ /g, '').split(',') || [];

        // Save to appwrite
        const savedPost = await databases.createDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_POSTS_ID,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )
        if (!savedPost) {
            await deleteFile(uploadedFile.$id);
            throw Error
        }
        return savedPost;

    } catch (error) {
        console.log(error);
    }
}

export const uploadFile = async (file) => {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.BUCKETS_MEDIA_ID,
            ID.unique(),
            file
        )
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

const getFileUrl = (fileId) => {
    try {
        const fileUrl = storage.getFilePreview(appwriteConfig.BUCKETS_MEDIA_ID, fileId, 2000, 2000, 'top', 100)
        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

const deleteFile = async (fileId) => {
    await storage.deleteFile(appwriteConfig.BUCKETS_MEDIA_ID, fileId);
    return { status: 'ok' }
}
const getLastIdForInfiniteScroll = (lastPage)=>{
    if(lastPage && lastPage.documents.length === 0 ) return null;
    const lastId = lastPage.documents[lastPage?.documents.length - 1].$id;
    return lastId;
}

export async function getRecentPosts(pageParam='') {
    // const posts = databases.listDocuments(
    //     appwriteConfig.DATABASE_SCROLL_ID,
    //     appwriteConfig.COLLECTION_POSTS_ID,
    //     [Query.orderDesc('$createdAt'), Query.limit(20)]
    // )
    // if (!posts) throw Error;
    // return posts;
    try {
        if (pageParam == '') {
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(5)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId };
        }else{
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(5),
                    Query.cursorAfter(pageParam)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId};
        }
    } catch (error) {
        console.log(error);
    }
}


// like the Image

export const likePost = async (postId, likesArr) => {
    console.log(postId);
    console.log(likesArr);
    try {
        const liked = await databases.updateDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_POSTS_ID,
            postId,
            {
                likes: likesArr
            }
        )
        if (!likePost) throw Error;
        return liked
    } catch (error) {
        console.log(error);
    }
}

export const savedPost = async (postId, userId) => {
    try {
        const saved = await databases.createDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_SAVES_ID,
            ID.unique(),
            {
                user: userId,
                post: postId
            }
        )
        if (!saved) throw Error;
        return saved;

    } catch (error) {
        console.log(error);
    }
}

const deleteSavedPost = async (savedRecordId) => {
    try {
        const deleted = await databases.deleteDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_SAVES_ID,
            savedRecordId
        )
        if (!deleted) throw Error;
        return deleted;
    } catch (error) {
        console.log(error);
    }
}

export const getSpecficPost = async (postId) => {
    try {
        const getPost = await databases.getDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_POSTS_ID,
            postId,
        );

        if (!getPost) throw Error;
        console.log(getPost);
        return getPost;
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = async (post) => {
    const fileUpdate = post.file.length > 0;
    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageid
        }
        if (fileUpdate) {
            // upload the image to appwrite buket
            const uploadedFile = await uploadFile(post.file[0])
            if (!uploadedFile) throw Error;

            // Getting the file url 
            const fileUrl = getFileUrl(uploadedFile.$id);

            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error
            }
            image = { ...image, imageUrl: fileUrl, imageId: uploadFile.$id }
        }

        // convert tags in array
        const tags = post?.tags.replace(/ /g, '').split(',') || [];

        // Save to appwrite
        const upadatePost = await databases.updateDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_POSTS_ID,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
            }
        )
        if (!upadatePost) {
            await deleteFile(post.imageId);
            throw Error
        }
        return upadatePost;

    } catch (error) {
        console.log(error);
    }
}

export const getInfinitePosts = async (pageParam = '') => {
    // const queries = [Query.orderDesc('$updatedAt', Query.limit(5))]
    // if(pageParam){
    //     queries.push(Query.cursorAfter(pageParam.toString()))
    // }
    try {
        if (pageParam == '') {
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                    Query.orderDesc('$updatedAt'),
                    Query.limit(5)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId};
        }else{
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                    Query.orderDesc('$updatedAt'),
                    Query.limit(5),
                    Query.cursorAfter(pageParam)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId};
        }
    } catch (error) {
        console.log(error);
    }

}

export const getProfileDetails = async (profileId) => {
    try {
        const getProfile = await databases.getDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_USERS_ID,
            profileId,
        );

        if (!getProfile) throw Error;
        return getProfile;
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (document) => {
    const fileUpdate = document.file.length > 0;
    try {
        let image = {
            imageUrl: document.imageUrl,
            imageId: document.imageid
        }
        if (fileUpdate) {
            // upload the image to appwrite buket
            const uploadedFile = await uploadFile(document.file[0])
            if (!uploadedFile) throw Error;

            // Getting the file url 
            const fileUrl = getFileUrl(uploadedFile.$id);

            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error
            }
            image = { ...image, imageUrl: fileUrl, imageId: uploadFile.$id }
        }


        // Save to appwrite
        const upadatePost = await databases.updateDocument(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_USERS_ID,
            document.Id,
            {
                name: document.name,
                bio: document.bio,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
            }
        )
        if (!upadatePost) {
            await deleteFile(document.imageId);
            throw Error
        }
        return upadatePost;

    } catch (error) {
        console.log(error);
    }
}
export const getTopCreators = async () => { 
    try {
        const topCreators = await databases.listDocuments(
            appwriteConfig.DATABASE_SCROLL_ID,
            appwriteConfig.COLLECTION_USERS_ID,
            [
                Query.orderDesc('$updatedAt'),
                Query.limit(6),
            ]
        )
        if (!topCreators) throw Error;
        return topCreators;
    } catch (error) {
        console.log(error);
    }
 }

export const getUserPosts = async (userId, pageParam='')=>{
    try {
        if (pageParam == '') {
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                    Query.equal('creator', userId),
                    Query.orderDesc('$updatedAt'),
                    Query.limit(5)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId};
        }else{
            const posts = await databases.listDocuments(
                appwriteConfig.DATABASE_SCROLL_ID,
                appwriteConfig.COLLECTION_POSTS_ID,
                [
                        Query.equal('creator', userId),
                    Query.orderDesc('$updatedAt'),
                    Query.limit(5),
                    Query.cursorAfter(pageParam)
                ]
            )
            if (!posts) throw Error;
            const lastId = posts.documents[posts.documents.length - 1].$id;
            return {posts, lastId};
        }
    } catch (error) {
        console.log(error);
    }

}