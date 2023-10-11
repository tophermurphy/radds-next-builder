import Nav from "./parts/Nav";
import Footer from "./parts/Footer";
import BlockRouter from "@/components/BlockRouter";
import PageTitle from "./parts/PageTitle";
import Header from "./parts/Header";


const Layout = ({page}: {page: Global.Page}) => {
    return (
        <>
        <Header />
        <main id={page.slug} className="layout __default">
            { !page.remove_heading &&
                <PageTitle title={page.title} />
            }
            <BlockRouter content={page.content} />
        </main>
        <Footer />
        </>
    )
}

export default Layout;