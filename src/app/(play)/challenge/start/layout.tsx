export default function ChallengeStartLayout({
  children,
  especiales,
  numeros, 
  palabras
}: {
  children: React.ReactNode;
  especiales: React.ReactNode;
  numeros: React.ReactNode;
  palabras: React.ReactNode;
}) {

  return (
    <div>
      {/* <pre>
        {challenge?.category_name}
      </pre> */}
      <div>
        {children}
      </div>
    </div>
  );
}
