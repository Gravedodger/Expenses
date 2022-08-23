import { useEffect, useState } from "react"

export const useClickTarget = () => {
    const [whatIsTarget, setWhatIsTarget] = useState()
useEffect(()=>{
const checkEvent = (e) => {
    setWhatIsTarget(()=> e.target)
}
    window.addEventListener("click", checkEvent)
    return () => window.removeEventListener("click", checkEvent)
},[])
return whatIsTarget
}