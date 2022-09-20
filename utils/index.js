
// [min, max] => 如果在这个区间内就返回n,n<min,返回min,n>max,返回max
const clamp = (n, min, max) => {
  return Math.min(max, Math.max(n, min))
}

// 扁平化数组
const flattAry = (ary) => {
  if (!Array.isArray(ary)) return ary
  const result = []
  const next = (arz) => {
    if (Array.isArray(arz)) {
      arz.forEach(iten => {
        next(iten)
      })
    } else {
      result.push(arz)
    }
  }
  next(ary)
  return result
}

// 打乱数组
const shuffleAry = (ary) => {
  if (!Array.isArray(ary)) return []
  ary.sort((a, b) => Math.random() - 0.5 )  // sort必须返回 >0 =0 <0, 不能返回true,false
  return ary
}

const shuffleAry2 = (ary) => {
  if (Array.isArray(ary)) {
    for (let i = ary.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [ary[i], ary[j]] = [ary[j], ary[i]]
    }
  }
  return ary
}

const toString = (v) => Object.prototype.toString.call(v)

const randomString = () => Math.random().toString(32).slice(2)

// like ptyhon; this is {1}
const templateString = (str, args) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    index = Number(index)
    if (Number.isNaN(index)) return match
    if (index >= args.length ) throw new Error("index out of range")
    return args[index]
  })
}

const a = {
  a: "b",
  b: {
    a: {
      c: "d"
    },
    b: [7, 2, 3, 4, {name: "alex"}]
  }
}

const isType = (obj, type) =>  Object.prototype.toString.call(obj).toLowerCase() === `[object ${type}]`
const deepClone = obj => {
  const next = (obz) => {
    if (isType(obz, "object")) {
      const obj = {}
      Object.keys(obz).forEach(kez => {
        obj[kez] = next(obz[kez])
      })
      return obj
    } else if (isType(obz, "array")) {
      const ary = []
      obz.forEach(kez => {
        ary.push(next(kez))
      })
      return ary
    } else {
      return obz
    }
  }
  if (isType(obj, "object")) {
    const result = {}
    Object.keys(obj).forEach(key => {
      result[key] = next(obj[key])
    })
    return result
  } else if (isType(obj, "array")) {
    const result = []
    obj.forEach(item => {
      result.push(next(obj[item]))
    })
    return result
  } else {
    return obj
  }
}

const cloneA = deepClone(a)
cloneA.b.a.c = "e"
cloneA.b.b[4]["name"] = "egon"
console.log(JSON.stringify(cloneA, null, 2))
console.log(JSON.stringify(a, null, 2))


