export default function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
    return (
        <div>
            <p className="font-semibold mb-[0.75em]">
                {title}
            </p>

            <nav aria-label={title}>
                <ul className="list-style-none">
                    {children}
                </ul>
            </nav>
        </div>
    );
}