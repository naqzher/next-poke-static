import { FC } from "react";
import Head from "next/head";
import { Navbar } from '../ui';

interface Props{
    children?: React.ReactNode;
    title?: string;
}
const path = (typeof window !== 'undefined') ? window.location.origin : '';

export const Layout:FC<Props> = ({ children, title }) => {

  // console.log(path);

  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Joao" />
            <meta name="description" content="Info poke" />
            <meta name="keywords" content="" />

            <meta property="og:title" content={`Información sobre ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
        </Head>
        <Navbar/>
        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>
    </>
  )
}
