export default function ChallengeStartLayout({
  children,
}: {
  children: React.ReactNode
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
