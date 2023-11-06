import Nav from "./parts/Nav";
import Footer from "./parts/Footer";
import BlockRouter from "@/components/BlockRouter";
import PageTitle from "./parts/PageTitle";
import Header from "./parts/Header";

import SectionRouter from "../SectionRouter";

import type { Page } from "@/types/payload-types";


export default async function Layout({ page }: { page: Page }) {


  return (
    <>
      {/* <Header /> */}
      <main id={page.slug} className="layout __default">
        {/* { !page.remove_heading &&
                <PageTitle title={page.title} />
            } */}
        <SectionRouter sections={page.sections} />
      </main>
      {/* <Footer /> */}
    </>
  );
};

