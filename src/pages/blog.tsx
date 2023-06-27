// blog.tsx
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Separator from '../components/Separator';
import { useRouter } from 'next/router';

const BlogPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Blog - Roland Van Duine</title>
      </Head>

      <Header />
      <Menu />

      <main className="flex min-h-screen items-start justify-center bg-ebony-clay-950">
        <div className="container flex items-center justify-start gap-12 px-4 py-16">
          <div className="w-1/2">
            <h1 className="text-5xl pb-4 font-extrabold tracking-tight text-white sm:text-[5rem]">
              WIP: Blog
            </h1>
            <p className="text-lg text-white">
              This page is under construction. Check back later for exciting blog content!
            </p>

            <button className="text-lg text-white mt-4 underline" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      </main>

    </>
  );
};

export default BlogPage;
