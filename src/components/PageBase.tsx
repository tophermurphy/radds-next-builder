"use client";

// Route to Layout
import Default from "./layouts/Default";

export interface PageBaseProps {
  page: Global.Page
}
// TODO Set up for addtional Layouts

const Layout = Default;

const PageBase = ({ page }: PageBaseProps) => {

  return (
      <Layout page={page} />
  );
};

export default PageBase;
