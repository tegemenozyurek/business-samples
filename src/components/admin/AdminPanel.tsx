export function AdminPanel() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface-soft p-8 text-center">
        <h1 className="text-2xl font-semibold text-heading">Admin</h1>
        <p className="mt-4 text-sm leading-relaxed text-subtle">
          Form yönetimi bağlantısı kaldırıldı. Backend yapılandırması olmadan
          gönderiler listelenemez.
        </p>
      </div>
    </div>
  );
}
