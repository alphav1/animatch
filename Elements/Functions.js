function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getList(user, param) {
    try {
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/animelist/${param}`)

        if (res.status == 200) {
            let list = await res.json()
            return list.data
        } else if (res.status == 500) {
            sleep(500)
            return getList(user, param)
        } else {
            return (res.status)
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
    }
}

export async function getFriends(user) {
    try {
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/friends`)
        if (res.status == 200) {
            let data = await res.json()
            return (data.data)
        } else if (res.status == 500) {
            console.log(res.status)
            sleep(500)
            return getFriends(user, param)
        } else {
            return (res.status)
        }
    } catch (error) {
        return (`ERROR from the API call in search(): ${error}`)
    }
}

function getGenreList(list) {
    let l1 = {}
    for (let i = 0; i < list.length; i++) {
        let genres = list[i].anime.genres
        for (let x = 0; x < genres.length; x++) {
            let l = Object.keys(l1)
            if (l.includes(genres[x].name)) {
                l1[genres[x].name] += 1
            } else {
                let key = genres[x].name
                Object.assign(l1, { [key]: 1 })
            }
        }
    }
    return l1
}

function getCommonGenres(l1, l2) {
    let keys2 = Object.keys(l2)
    let keys1 = Object.keys(l1)
    let common = {}
    for (let i = 0; i < keys1.length; i++) {
        if (keys2.includes(keys1[i])) {
            let key = keys1[i]
            if (l1[key] >= l2[key]) {
                let val = l2[key]
                Object.assign(common, { [key]: val })
            } else {
                let val = l1[key]
                Object.assign(common, { [key]: val })
            }
        }
    }
    return common
}

export function compareLists(list1, list2) {
    let l1 = getGenreList(list1)
    let l2 = getGenreList(list2)
    let common = getCommonGenres(l1, l2)
    return common
}

export async function compareUsers(user1, user2) {
    let watching = [await getList(user1, "watching"), await getList(user2, "watching")]
    if (typeof watching[0] == typeof 0) {
        return watching[0]
    }
    else if (typeof watching[1] == typeof 0) {
        return watching[1]
    }
    let compared1 = compareLists(watching[0], watching[1])
    sleep(1000)
    let completed = [await getList(user1, "completed"), await getList(user2, "completed")]
    let compared2 = compareLists(completed[0], completed[1])
    return ({ "watching": compared1, "completed": compared2 })
}

export async function getScore(user) {
    let list = await getList(user, "completed")
    let scoreList = []
    for (let i = 0; i < list.length; i++) {
        scoreList.push({ "name": list[i].anime.title, "score": list[i].score, "image": list[i].anime.images.jpg.large_image_url })
    }
    return scoreList
}

export async function getScoreComp(user1, user2) {
    let l1 = await getScore(user1)
    let l2 = await getScore(user2)
    let commList = []
    for (let i = 0; i < l1.length; i++) {
        for (let x = 0; x < l2.length; x++) {
            if (l2[x].name == l1[i].name && l2[x].score != 0 && l1[i].score != 0) {
                commList.push({ "name": l1[i].name, "user1": l1[i].score, "user2": l2[x].score, "difference": Math.abs(l1[i].score - l2[x].score), "image": l1[i].image })
            }
        }
    }
    return commList
}

export async function getFavorites(user) {
    try {
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/favorites`)
        if (res.status == 200) {
            let list = await res.json()
            return list.data.anime
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
    }
}

export async function compareFavorites(list1, list2) {
    let common = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i].mal_id == list2[j].mal_id) {
                common.push({ "title": list1[i].title, "image": list1[i].images.jpg.large_image_url })
                break
            }
        }
    }
    return common
}

export async function printFav(list) {
    for (let i = 0; i < list.length; i++) {
        return list[i]
    }
}

export function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned on"
    }
    else if (diff >= 1 && diff <= 2) {
        return "You agree on"
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree on"
    }
    else {
        return "You strongly disagree on"
    }
}

export function getAlignVal(data) {
    let perf = 0
    let agr = 0
    let dis = 0
    let sdis = 0
    for (let i = 0; i < (Object.values(data).length); i++)
        if (data[i].difference == 0) {
            perf++
        }
        else if ((data[i].difference >= 1) && (data[i].difference <= 2)) {
            agr++
        }
        else if ((data[i].difference >= 3) && (data[i].difference <= 4)) {
            dis++
        }
        else {
            sdis++
        }
    console.log("perf" + perf)
    console.log("agr" + agr)
    console.log("dis" + dis)
    console.log("sdis" + sdis)
    return { "perf": perf, "agr": agr, "dis": dis, "sdis": sdis }
}

export function getOpinion(rating) {
    if ((rating >= 0) && (rating <= 4)) {
        return ("very much hated it")
    }
    else if ((rating >= 5) && (rating <= 6)) {
        return ("found it mediocre")
    }
    else if ((rating >= 7) && (rating <= 8)) {
        return ("enjoyed it a lot")
    }
    else {
        return "absolutely loved it"
    }
}

export function genreScore(wLength, cLength) {
    let addW = (wLength) * 2
    let addC = (cLength) * 1
    return (parseInt(addW) + parseInt(addC))
}

export function listScore(data) {
    let addP = (data["perf"]) * 3
    console.log(addP)
    let addA = (data["agr"]) * 1
    console.log(addA)
    let addD = (data["dis"]) * (-1)
    console.log(addD)
    let addS = (data["sdis"]) * (-4)
    console.log(addS)
    return (addP + addA + addD + addS)
}

export function interpret(errorCode) {
    switch (parseInt(errorCode)) {
        case 404:
            return "ERROR 404: You have selected an invalid user!"
        case 429:
            return "ERROR 429: Too many requests"
        case 400:
            return "ERROR 400: Bad request"
        case 500:
            return "ERROR 500: Internal Server Error"
        default:
            return "error " + errorCode;
    }
}

export function getAniScore(fScore, gScore, data) {
    const AniScore = (parseInt(fScore) + parseInt(gScore) + parseInt(data.length * 3))
    return (AniScore)
}

export async function getUserPhoto(user) {
    try {
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}`)
        if (res.status == 200) {
            let list = await res.json()
            return list.data.images
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
    }
}
