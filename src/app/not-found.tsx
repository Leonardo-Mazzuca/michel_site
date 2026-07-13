export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-sage-600">404</h1>
      <p className="mt-4 text-xl text-neutral-600">
        Página não encontrada / Page not found
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="/pt"
          className="rounded-2xl bg-sage-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sage-700"
        >
          Voltar ao início (PT)
        </a>
        <a
          href="/en"
          className="rounded-2xl border-2 border-sage-600 px-6 py-3 font-semibold text-sage-700 transition-colors hover:bg-sage-50"
        >
          Back to home (EN)
        </a>
      </div>
    </div>
  );
}
