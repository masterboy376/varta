import '../styles/globals.css'
import '../styles/custom.css'
import { VartaProvider } from '../context/context'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const styles = {
    wrapper: 'bg-gray-900 min-h-screen'
  }
  return (
    <VartaProvider>
      <div className={styles.wrapper}>
        <ToastContainer
        toastStyle={{ backgroundColor: "rgb(31, 41, 55)", color:"rgb(243, 244, 246)" }}
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </div>
    </VartaProvider>
  )
}

export default MyApp
