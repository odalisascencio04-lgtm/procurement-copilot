import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata = {
  title: "Procurement Copilot AI",
  description:
    "AI-powered procurement management platform",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

return (

<html lang="en">

<body>

<AuthProvider>

{children}

</AuthProvider>

</body>

</html>

);

}