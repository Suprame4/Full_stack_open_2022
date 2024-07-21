const _ = require('lodash')

const dummy = (blogs) => {

    return 1
}

const totalLikes = (list) => {

    if(list.length === 0) return 0
    
    const likes = list.reduce((acc, obj) => acc + obj.likes, 0);

    return likes;
}

const favoriteBlog = (list) => {

    const mostLiked = list.reduce((maxObj, obj) => {
        return obj.likes > maxObj.likes ? obj : maxObj;

    }, list[0])

    return mostLiked;
}

const mostBlogs = () => {

}

const mostLikes = () => {

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}