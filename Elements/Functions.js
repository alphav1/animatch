
export async function getList(user, param) {
    try {
        console.log('call loading')
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/animelist/${param}`)
        if (res.status == 200) {
            console.log(res)
            let list = await res.json()
            return list.data
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
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
                // console.log('new object: ', genres[x].name)
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
    console.log(list1, list2)
    let l1 = getGenreList(list1)
    let l2 = getGenreList(list2)
    console.log("internal listCompare:")
    console.log(l1, l2)
    let common = getCommonGenres(l1, l2)
    console.log(common)
    return common
}

export async function compareUsers(user1, user2) {
    let watching = [await getList(user1, "watching"), await getList(user2, "watching")]
    let completed = [await getList(user1, "completed"), await getList(user2, "completed")]
    let compared1 = compareLists(watching[0], watching[1])
    let compared2 = compareLists(completed[0], completed[1])
    console.log("comp1:")
    console.log(compared1)
    console.log("comp2:")
    console.log(compared2)
    return ({ "watching": compared1, "completed": compared2 })
}