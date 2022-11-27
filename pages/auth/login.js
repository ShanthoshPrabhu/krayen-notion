import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../../firebase";

export default function login() {
    const[email , setEmail] = useState('');
    const [password,setPassword]=useState('');

    function login(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
      .then(()=>{
        window.location.replace('/')
      }).catch(err => console.log(err))
    }
    
    return (
      <>
        {/* <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div> */}
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                      />
                    </div>
  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={login}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                {/* <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div> */}
                <div className="w-1/2 text-right">
                  <Link href="/auth/signup">
                    <a href="/auth/signup" className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='h-screen flex flex-col  items-center justify-center '>
          <div className=" flex flex-col break-words mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 p-10">
             <form className='w-60'>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring   w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={login}
                    >
                      Log in
                    </button>
                  </div>
             </form>
          </div>
      </div>
      </>
    );
  }