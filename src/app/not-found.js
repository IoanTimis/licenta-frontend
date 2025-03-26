export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-5xl font-extrabold text-purple-600 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Pagina nu a fost găsită / Page not found
        </p>
        <p className="text-gray-700 mb-6">
          Se pare că pagina căutată nu există. Verifică link-ul sau revino pe pagina principală.
        </p>
      </div>
    </div>
  );
}
