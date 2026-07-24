// import { resolve } from "path"

type HttpVerb = "GET"|"PUT"|"POST"|"DELETE"

export function makeHttpReq<T>(verb:HttpVerb, endpoint: string, input?:T) {
    return new Promise(async(resolve, reject)=> {
        try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/${endpoint}`,{
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(input),
                    method: verb
            })
            if(!res.ok) throw new Error("Failed to process this request")
            const data = await res.json()

            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}