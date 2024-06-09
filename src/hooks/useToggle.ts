"use client"
import { useState } from "react";

export default function useToggle(){
    const [isToggled,setIsToggled]=useState<boolean>(false);
    return [isToggled,()=>setIsToggled(!isToggled)] as const;
}