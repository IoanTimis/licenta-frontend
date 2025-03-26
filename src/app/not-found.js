import { jwtDecode } from "jwt-decode";
import { useLanguage } from "@/context/Languagecontext";
import Link from "next/link";

export default function NotFound() {
  const { translate } = useLanguage();
  const role = jwtDecode(localStorage.getItem("token")).role || null;
  let link = "/";

  if(role){
    if(role === "admin") {
      link = "/admin";
    } else if(role === "teacher") {
      link = "/teacher";
    } else if(role === "student") {
      link = "/student";
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-5xl font-extrabold text-purple-600 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          {translate("Page not found")}Pagina nu a fost găsită / Page not found
        </p>
        <p className="text-gray-700 mb-6">
          {translate("The page you are looking for does not exist, use the links below to navigate back.")}
        </p>
        <Link href={link}>
          <a className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700">
            {translate("Go back")}
          </a>
        </Link>
      </div>
    </div>
  );
}
