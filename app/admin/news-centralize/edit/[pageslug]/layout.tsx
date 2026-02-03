export default function NewsCentralizeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/grapesjs-theme.css" />
      {children}
    </>
  );
}
