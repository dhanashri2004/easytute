"use client";

import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { API_SINGLETON } from "../services/API"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";


const Login = () => {

    const [loading, setLoading] = useState(false)

    const [credentials, setCredentials] = useState({
        email: null,
        password: null
    })

    const router = useRouter()

    const loginUser = () => {
        if (!credentials.email || !credentials.password) {
            toast('Missing Credentials, please provide email and password', { hideProgressBar: true, autoClose: 2000, type: 'warning', theme: "dark", position: 'bottom-right' })
            return
        }
        setLoading(true)
        API_SINGLETON.post('/login', {
            email: credentials.email, password: credentials.password
        }).then((result) => {
            Cookies.set('token', result.data.token)
            console.log(Cookies);
            setLoading(false)
            router.push('/')
        }).catch((error) => {
            setLoading(false)
            toast(error.message, { hideProgressBar: true, autoClose: 2000, type: 'warning', theme: "dark", position: 'bottom-right' })
        })
    }

    return (
        <main className="dark h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark-login-input dark:text-gray-100">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block dark:text-gray-400">Email</label>
                        <input onChange={(e) => setCredentials({ ...credentials, email: e.currentTarget.value })} type="email" name="email" id="email" placeholder="Ex. john@test.com" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark-login-input-200 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">Password</label>
                        <input onChange={(e) => setCredentials({ ...credentials, password: e.currentTarget.value })} type="password" name="password" id="password" placeholder="Ex. 123" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark-login-input-200 dark:text-gray-100 focus:dark:border-violet-400" />
                        <div className="flex justify-end text-xs dark:text-gray-400">
                            <a rel="noopener noreferrer" className="mt-2" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm dark:text-gray-200 dark:bg-violet-500" type="button" onClick={loginUser}>{loading ? "Loading..." : "Login"}</button>
                </form>
                <div className="flex justify-center  pt-4 space-x-4">
                    <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                        <Link rel="noopener noreferrer" href="/register" className="ml-2 underline dark:text-gray-100">Sign up</Link>
                    </p>
                </div>

            </div>

        </main>
    )
}

export default Login 