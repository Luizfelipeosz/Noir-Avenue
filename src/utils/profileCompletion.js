export function calculateProfileCompletion(user) {
  const fields = [
    user?.name,
    user?.email,
    user?.telefone,
    user?.endereco,
  ];

  return Math.floor(
    (fields.filter(Boolean).length / fields.length) * 100
  );
}