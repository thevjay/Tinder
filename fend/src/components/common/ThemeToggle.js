import React, { useEffect, useState } from 'react'
import { SunIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom'

const ThemeToggle = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const navigate = useNavigate()

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
    },[theme,navigate])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

  return (
    <div className='mx-12 text-2xl'>
        <SunIcon className={theme === 'light' ? 'size-5 hover:text-black' : 'size-5 hover:text-white'} onClick={toggleTheme} />
    </div>
  )
}

export default ThemeToggle
