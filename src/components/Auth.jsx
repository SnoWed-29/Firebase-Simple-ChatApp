import {auth, provider} from '../firebase-config.js';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';


const cookies = new Cookies()


export const Auth = (props) => {
    const { setIsAuth } = props;
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
      } catch (err) {
        console.log(err)
      }
        

    }
    return (
      <div className='w-1/3 mx-auto py-4 flex flex-col items-center justify-center border space-y-3'>
        <p className='text-2xl font-semibold '>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle} className='font-semibold px-4 py-2 rounded-md shadow-xl border-t'>Sign In With Google</button>
      </div>
    );
}