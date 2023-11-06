import { getAPIColors, getPayloadSiteOptions } from "@/lib/payloadAPI";
import ThemeProvider from "@/components/ThemeProvider";
import LayoutProvider from "@/components/LayoutProvider";

export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    const siteOptions = await getPayloadSiteOptions();
    const { docs: colors } = await getAPIColors();

    return (
      <html lang="en">
        <body>
          <ThemeProvider theme_colors={colors} >
            <LayoutProvider value={siteOptions}>
              {children}
            </LayoutProvider>
          </ThemeProvider>
          </body>
      </html>
    );
  }