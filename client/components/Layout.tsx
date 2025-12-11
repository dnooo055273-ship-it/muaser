interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  );
}
