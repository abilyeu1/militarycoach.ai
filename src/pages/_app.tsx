//react imports

//next

import HOC from "@/components/Hoc";
import store from "@/redux/store/store";
import "@/styles/globals.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HOC>
            <ToastContainer position="top-right" />
            <Component {...pageProps} />
          </HOC>
        </PersistGate>
      </Provider>
      <Script id="tawkTo" strategy="lazyOnload">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/655a963891e5c13bb5b1b368/1hfktljob';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            let elements = document.getElementsByTagName('iframe');
            for(let i=0;i<elements.length;i++){
              elements[i].style.right = "40px";
              elements[i].style.bottom = "40px";
              
            }
            })();`}
      </Script>
    </>
  );
}

// f7olpocgp4v81703239797447
// c5jjj07ot4f1703239797547
