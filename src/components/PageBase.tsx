"use client";

import type { Page } from "@/types/payload-types";

// Route to Layout
import Default from "./layouts/Default";

export interface PageBaseProps {
  page: Global.Page
}
// TODO Set up for addtional Layouts

const Layout = Default;

const PageBase = ({ page }: {page: Page}) => {
  if( !page ) return;
  return (
      <Layout page={page} />
  );
};

export default PageBase;
